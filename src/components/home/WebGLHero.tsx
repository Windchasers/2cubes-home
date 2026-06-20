"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

/**
 * WebGL hero modelled on the monopo.vn first screen:
 *   1. a slow flowing noise-gradient background (revealed from the centre)
 *   2. a glass "lens" cube that refracts the scene (cube-camera + fresnel
 *      chromatic dispersion shader) — echoing the 2cubes name
 *   3. a full-screen film-grain post pass (the "tiny particle" texture)
 *
 * Palette is intentionally different from monopo's teal — a deep violet base
 * with a warm coral accent. Tweak `colors` to recolour the whole language.
 */

type HeroColors = {
  /** Darkest base tone — also used as the renderer clear colour. */
  base: string;
  /** Secondary base tone the noise blends toward. */
  secondary: string;
  /** Accent tone for the contour filaments. */
  accent: string;
};

type WebGLHeroProps = {
  className?: string;
  colors?: HeroColors;
};

const DEFAULT_COLORS: HeroColors = {
  base: "#f3eff8",
  secondary: "#4d8dab",
  accent: "#ff6a3d",
};

const INTRO_SESSION_KEY = "site-intro-completed";

const hexToVec3 = (hex: string): [number, number, number] => {
  const c = new THREE.Color(hex);
  return [c.r, c.g, c.b];
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Ashima simplex noise (2D + 3D), shared by the background shader.
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}

float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

float snoise3(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const BG_VERTEX = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BG_FRAGMENT = /* glsl */ `
varying vec2 vUv;

uniform float uTime;
uniform float uProgress;
uniform float uZoom;
uniform float uBaseFreq;
uniform float uPatternScale;
uniform float uAccentOpacity;
uniform float uOpacity;
uniform vec2 uRes;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorAccent;

${NOISE_GLSL}

mat2 rotate2d(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }

float lines(in vec2 pos, float b){
  pos *= uPatternScale;
  return smoothstep(0.0, .5 + b * .5, abs((sin(pos.x * 3.1415) + b * 2.0)) * .5);
}

float circle(in vec2 st, in float radius, in float blur){
  return 1.0 - smoothstep(radius - (radius * blur), radius + (radius * blur), dot(st, st) * 4.0);
}

void main(){
  // aspect-corrected centred coordinates
  vec2 uv = vUv - 0.5;
  uv.x *= uRes.x / uRes.y;

  float progress = uProgress;

  float baseNoise = snoise(uBaseFreq * uv + uTime);
  vec2 basePos = rotate2d(baseNoise) * uv * uZoom;
  float basePattern = lines(basePos, .5);

  vec2 accentPos = rotate2d(baseNoise) * uv * uZoom;
  float accentPattern = lines(accentPos, .1);

  // centre-out reveal mask (screen space)
  vec2 st = gl_FragCoord.xy / uRes.xy - vec2(.5);
  st.y *= uRes.y / uRes.x;
  float c = circle(st, .2 + progress * 4.0, 2.);

  float nc = snoise3(vec3(uv * 2.0, uTime * 4.0)) * .03;
  float d = length(st) * (1.0 - progress) * 0.6;

  vec3 baseMix = mix(uColorA, uColorB, basePattern);
  vec3 accentMix = mix(baseMix, uColorAccent, accentPattern - (1. - uAccentOpacity));

  float finalMask = smoothstep(1., 1., pow(c, 6.) * 10. + nc * (1. - progress));
  vec3 col = mix(vec3(finalMask) * uColorA, accentMix, clamp(finalMask + progress, 0., 1.)) * (1.0 - d);

  gl_FragColor = vec4(col, uOpacity);
}
`;

const LENS_VERTEX = /* glsl */ `
varying vec3 vWorldNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPos = worldPosition.xyz;
  vWorldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  vViewDir = worldPosition.xyz - cameraPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

// Frosted glass: per-fragment refraction with a jittered normal + blurred
// (mip-biased) cube samples, milky tint and partial translucency.
const LENS_FRAGMENT = /* glsl */ `
uniform samplerCube tCube;
uniform float uRefractionRatio;
uniform float uFresnelBias;
uniform float uFresnelScale;
uniform float uFresnelPower;
uniform float uFrost;
uniform float uDispersion;
uniform float uAlpha;
uniform float uReveal;
uniform vec3  uTint;

varying vec3 vWorldNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }

void main() {
  vec3 I = normalize( vViewDir );
  vec3 N = normalize( vWorldNormal );

  // Scatter the surface normal slightly → frosted diffusion.
  vec3 jitter = vec3(
    hash(vWorldPos * 42.0),
    hash(vWorldPos * 42.0 + 11.1),
    hash(vWorldPos * 42.0 + 27.3)
  ) - 0.5;
  N = normalize( N + jitter * uFrost * 0.6 );

  // Mip-LOD bias blurs the refraction → frosted look.
  float bias = uFrost * 5.0;

  vec3 rr = refract( I, N, uRefractionRatio * (1.0 - uDispersion) );
  vec3 rg = refract( I, N, uRefractionRatio );
  vec3 rb = refract( I, N, uRefractionRatio * (1.0 + uDispersion) );

  vec3 refracted;
  refracted.r = textureCube( tCube, vec3( -rr.x, rr.yz ), bias ).r;
  refracted.g = textureCube( tCube, vec3( -rg.x, rg.yz ), bias ).g;
  refracted.b = textureCube( tCube, vec3( -rb.x, rb.yz ), bias ).b;

  vec3 refl = reflect( I, N );
  vec3 reflected = textureCube( tCube, vec3( -refl.x, refl.yz ), bias ).rgb;

  float fres = clamp( uFresnelBias + uFresnelScale * pow( 1.0 + dot( I, N ), uFresnelPower ), 0.0, 1.0 );

  vec3 col = mix( refracted, reflected, fres );
  col = mix( col, uTint, uFrost * 0.45 );   // milky frosted body
  col += fres * 0.12;                        // soft rim highlight

  float alpha = clamp( uAlpha * (0.5 + fres * 0.6), 0.0, 1.0 ) * uReveal;
  gl_FragColor = vec4( col, alpha );
}
`;

const GRAIN_SHADER = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    amount: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float amount;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    float random( vec2 p ){
      vec2 K1 = vec2( 23.14069263277926, 2.665144142690225 );
      return fract( cos( dot( p, K1 ) ) * 12345.6789 );
    }

    void main(){
      vec4 color = texture2D( tDiffuse, vUv );
      vec2 uvRandom = vUv;
      uvRandom.y *= random( vec2( uvRandom.y, amount ) );
      color.rgb += random( uvRandom ) * 0.075;
      gl_FragColor = color;
    }
  `,
};

export default function WebGLHero({ className, colors }: WebGLHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const palette = colors ?? DEFAULT_COLORS;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL — parent background colour remains as fallback.
    }

    container.appendChild(canvas);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.setClearColor(new THREE.Color(palette.base), 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    // ── Background plane ──────────────────────────────────────────────
    const bgUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uZoom: { value: 1.35 },
      uBaseFreq: { value: 1.05 },
      // Lower = fewer, larger, more cohesive bands (was effectively ~10).
      uPatternScale: { value: 3.0 },
      uAccentOpacity: { value: 0.9 },
      uOpacity: { value: 0 },
      uRes: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
      uColorA: { value: new THREE.Vector3(...hexToVec3(palette.base)) },
      uColorB: { value: new THREE.Vector3(...hexToVec3(palette.secondary)) },
      uColorAccent: { value: new THREE.Vector3(...hexToVec3(palette.accent)) },
    };

    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: BG_VERTEX,
      fragmentShader: BG_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });

    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMaterial);
    bgMesh.position.z = 0;
    scene.add(bgMesh);

    const fitBackground = () => {
      const dist = camera.position.z - bgMesh.position.z;
      const vh = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * dist;
      const vw = vh * camera.aspect;
      // 1.4× overscan leaves room for the mouse parallax.
      bgMesh.scale.set(vw * 1.4, vh * 1.4, 1);
    };
    fitBackground();

    // ── Glass lens cube (cube-camera refraction) ──────────────────────
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);

    const lensUniforms = {
      tCube: { value: cubeRenderTarget.texture },
      uRefractionRatio: { value: 0.9 },
      uFresnelBias: { value: 0.04 },
      uFresnelScale: { value: 1.5 },
      uFresnelPower: { value: 2.2 },
      uFrost: { value: 0.28 },
      uDispersion: { value: 0.018 },
      uAlpha: { value: 0.85 },
      uReveal: { value: 0 },
      uTint: { value: new THREE.Vector3(0.82, 0.8, 0.92) },
    };

    const lensMaterial = new THREE.ShaderMaterial({
      uniforms: lensUniforms,
      vertexShader: LENS_VERTEX,
      fragmentShader: LENS_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });

    const isNarrow = width < 768;
    // A frosted glass cube (echoing "2cubes"), standing upright.
    const lens = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), lensMaterial);
    const lensHome = new THREE.Vector3(isNarrow ? 0 : -1.6, isNarrow ? 0.2 : 0.8, 2);
    lens.position.copy(lensHome);
    lens.scale.setScalar(isNarrow ? 1.4 : 1.7);
    // Slight tilt so two faces + the top read, but kept upright ("正").
    lens.rotation.set(-0.18, 0.5, 0);
    scene.add(lens);
    cubeCamera.position.copy(lens.position);

    // ── Post-processing: film grain ───────────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(pixelRatio);
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const grainPass = new ShaderPass(GRAIN_SHADER);
    grainPass.renderToScreen = true;
    composer.addPass(grainPass);

    // ── Mouse parallax ────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const camTarget = new THREE.Vector2(0, 0);
    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ── Entrance timeline ─────────────────────────────────────────────
    const playEntrance = () => {
      if (prefersReducedMotion) {
        bgUniforms.uOpacity.value = 1;
        bgUniforms.uProgress.value = 1;
        lensUniforms.uReveal.value = 1;
        return;
      }
      const tl = gsap.timeline();
      tl.to(bgUniforms.uOpacity, { value: 1, duration: 1.4, ease: "power2.inOut" }, 0)
        .to(bgUniforms.uProgress, { value: 1, duration: 2.2, ease: "power2.inOut" }, 0)
        .to(
          lensUniforms.uReveal,
          { value: 1, duration: 1.6, ease: "power2.out" },
          0.6,
        )
        .fromTo(
          lens.scale,
          { x: lens.scale.x * 0.6, y: lens.scale.y * 0.6, z: lens.scale.z * 0.6 },
          {
            x: lens.scale.x,
            y: lens.scale.y,
            z: lens.scale.z,
            duration: 2,
            ease: "power3.out",
          },
          0.6,
        )
        // Quarter-turn settle so the cube reads as a 3D solid on entry.
        .fromTo(
          lens.rotation,
          { y: lens.rotation.y - 0.9 },
          { y: lens.rotation.y, duration: 2.4, ease: "power3.out" },
          0.6,
        );
    };

    let entranceStarted = false;
    const startOnce = () => {
      if (entranceStarted) return;
      entranceStarted = true;
      playEntrance();
    };

    const hasSeenIntro =
      window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    if (hasSeenIntro) {
      startOnce();
    } else {
      window.addEventListener("site-enter-complete", startOnce, { once: true });
    }

    // ── Render loop (throttled to ~60fps) ─────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    let acc = 0;
    const frameInterval = 1 / 60;

    const renderFrame = () => {
      // Slow, barely-there drift like monopo.
      bgUniforms.uTime.value += 0.0009;
      grainPass.uniforms.amount.value = clock.getElapsedTime();

      // Mouse-eased camera parallax.
      camTarget.x = lerp(camTarget.x, mouse.x, 0.05);
      camTarget.y = lerp(camTarget.y, mouse.y, 0.05);
      camera.position.x = camTarget.x * 0.6;
      camera.position.y = -camTarget.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Gentle turntable spin around the vertical axis (stays upright).
      lens.rotation.y += 0.0011;

      // Refresh the cube map for the lens (hide it while sampling).
      lens.visible = false;
      cubeCamera.update(renderer, scene);
      lens.visible = true;

      composer.render();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (prefersReducedMotion) return;
      acc += clock.getDelta();
      if (acc < frameInterval) return;
      acc = acc % frameInterval;
      renderFrame();
    };

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      loop();
    }

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      bgUniforms.uRes.value.set(width * pixelRatio, height * pixelRatio);
      fitBackground();
      if (prefersReducedMotion) renderFrame();
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("site-enter-complete", startOnce);
      bgMesh.geometry.dispose();
      bgMaterial.dispose();
      lens.geometry.dispose();
      lensMaterial.dispose();
      cubeRenderTarget.dispose();
      composer.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [colors]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
    />
  );
}
