"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
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
 * Palette is a coordinated warm lilac → coral family (see DEFAULT_COLORS).
 * Tweak `colors` to recolour the whole language.
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
  /** URL of the logo rendered (blurred) at the centre of the cube. */
  logoSrc?: string;
};

// Coordinated analogous palette (warm lilac → coral) — keeping the band in
// one hue family avoids the muddy grey of complementary blue/red mixing.
const DEFAULT_COLORS: HeroColors = {
  base: "#f1e9f4",
  secondary: "#bd8fc6",
  accent: "#ff7a4d",
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
uniform float uBandWidth;
uniform float uAccentOpacity;
uniform float uOpacity;
uniform vec2 uRes;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorAccent;

${NOISE_GLSL}

void main(){
  // aspect-corrected centred coordinates
  vec2 uv = vUv - 0.5;
  uv.x *= uRes.x / uRes.y;

  float progress = uProgress;
  float t = uTime;

  // Domain-warp the space, then read one large-scale noise field. Low
  // frequency + warping yields a single flowing "silk" gradient band
  // instead of repeating stripes.
  float w = snoise(uv * uBaseFreq + vec2(t, t * 0.6));
  vec2 warped = uv + uZoom * 0.4 * vec2(cos(w * 3.1415), sin(w * 3.1415));
  float field = snoise(warped * uBaseFreq + t * 0.3) * 0.5 + 0.5; // 0..1

  // Base gradient sweeping across the single band.
  vec3 col = mix(uColorA, uColorB, smoothstep(0.5 - uBandWidth, 0.5 + uBandWidth, field));

  // One soft accent ridge riding the crest of the band.
  float ridge = smoothstep(0.52, 0.6, field) * (1.0 - smoothstep(0.6, 0.8, field));
  col = mix(col, uColorAccent, ridge * uAccentOpacity);

  // Barely-there life noise (the post grain does the rest).
  col += snoise3(vec3(uv * 2.0, t * 2.0)) * 0.012 * (1.0 - progress);

  // Centre-out reveal.
  vec2 st = gl_FragCoord.xy / uRes.xy - vec2(0.5);
  st.y *= uRes.y / uRes.x;
  float reveal = smoothstep(0.0, 0.35, (0.05 + progress * 1.7) - length(st));
  col = mix(uColorA, col, reveal);

  // Soft vignette to settle the edges.
  col *= 1.0 - length(st) * 0.22 * (1.0 - progress * 0.4);

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

// Extruded 3D logo inside the cube — soft wrap-lit so the extruded side
// walls read as real thickness, with a gentle fresnel rim and fade-in.
const LOGO_VERTEX = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vNormal = normalize( normalMatrix * normal );
  vec4 mv = modelViewMatrix * vec4( position, 1.0 );
  vView = normalize( -mv.xyz );
  gl_Position = projectionMatrix * mv;
}
`;

const LOGO_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vView;

void main(){
  vec3 N = normalize( vNormal );
  if ( !gl_FrontFacing ) N = -N;
  vec3 V = normalize( vView );
  vec3 L = normalize( vec3( 0.45, 0.7, 0.55 ) );

  float wrap = clamp( dot( N, L ), 0.0, 1.0 ) * 0.55 + 0.45; // soft wrap light
  float fres = pow( 1.0 - clamp( dot( N, V ), 0.0, 1.0 ), 2.0 );

  vec3 col = uColor * wrap + fres * 0.22;
  gl_FragColor = vec4( col, 1.0 );
}
`;

// Composites the offscreen-rendered 3D logo with a scatter blur, so it reads
// as if diffused by the frosted glass it sits inside (optical consistency).
const LOGO_COMPOSITE_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const LOGO_COMPOSITE_FRAG = /* glsl */ `
uniform sampler2D uLogoTex;
uniform float uOpacity;
uniform float uBlur;
uniform vec2 uTexel;
varying vec2 vUv;

void main(){
  vec4 acc = vec4( 0.0 );
  for ( int x = -2; x <= 2; x++ ) {
    for ( int y = -2; y <= 2; y++ ) {
      vec2 o = vec2( float( x ), float( y ) ) * uTexel * uBlur;
      acc += texture2D( uLogoTex, vUv + o );
    }
  }
  acc /= 25.0;
  gl_FragColor = vec4( acc.rgb, acc.a * uOpacity );
}
`;

export default function WebGLHero({ className, colors, logoSrc }: WebGLHeroProps) {
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

    // Measure the actual displayed box. Using the rect (not clientHeight,
    // which can read 0 before layout) keeps the draw-buffer aspect identical
    // to the CSS display aspect, so the cube never gets stretched.
    const measure = () => {
      const rect = container.getBoundingClientRect();
      return {
        w: Math.max(1, Math.round(rect.width || window.innerWidth)),
        h: Math.max(1, Math.round(rect.height || window.innerHeight)),
      };
    };

    let { w: width, h: height } = measure();
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.setClearColor(new THREE.Color(palette.base), 1);

    const scene = new THREE.Scene();
    // Long lens (low FOV) + distant camera ≈ near-orthographic, so the cube's
    // near/far faces stay near-equal and it reads as a true cube.
    const camera = new THREE.PerspectiveCamera(18, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);

    // ── Background plane ──────────────────────────────────────────────
    const bgUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      // Warp strength — how much the single band folds/flows.
      uZoom: { value: 0.9 },
      // Low frequency = one large cohesive band rather than many stripes.
      uBaseFreq: { value: 0.55 },
      // Half-width of the base→secondary transition (bigger = softer band).
      uBandWidth: { value: 0.32 },
      // Keep the accent ridge subtle so it reads as one calm gradient.
      uAccentOpacity: { value: 0.5 },
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
    // A frosted glass cube (echoing "2cubes"), equal edges, near-centre.
    const lens = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), lensMaterial);
    const lensHome = new THREE.Vector3(isNarrow ? 0 : -0.4, isNarrow ? 0.1 : 0.25, 2);
    lens.position.copy(lensHome);
    // Scaled up to match apparent size under the long lens.
    lens.scale.setScalar(isNarrow ? 1.6 : 1.95);
    // Balanced 3/4 view so all three visible faces read with equal edges.
    lens.rotation.set(-0.28, 0.62, 0);
    lens.renderOrder = 2;
    scene.add(lens);
    cubeCamera.position.copy(lens.position);

    // ── Extruded 3D logo, rendered offscreen then blurred into the glass ──
    // The 3D logo lives in its own scene so we can render it to a texture,
    // scatter-blur it, and composite it under the frosted faces.
    const logoScene = new THREE.Scene();

    const logoUniforms = {
      uColor: { value: new THREE.Vector3(0.95, 0.93, 1.0) },
    };

    const logoMaterial = new THREE.ShaderMaterial({
      uniforms: logoUniforms,
      vertexShader: LOGO_VERTEX,
      fragmentShader: LOGO_FRAGMENT,
      side: THREE.DoubleSide,
    });

    // Group shares the cube's transform → same perspective, turns with glass.
    const logoGroup = new THREE.Group();
    logoGroup.position.copy(lensHome);
    logoGroup.rotation.copy(lens.rotation);
    logoScene.add(logoGroup);

    let logoMesh: THREE.Mesh | null = null;
    const logoTargetSize = isNarrow ? 0.8 : 1.0;
    const logoThickness = 0.13; // thinner slab

    const svgLoader = new SVGLoader();
    svgLoader.setCrossOrigin("anonymous");
    svgLoader.load(
      logoSrc ?? "",
      (data) => {
        const shapes: THREE.Shape[] = [];
        for (const path of data.paths) {
          for (const shape of SVGLoader.createShapes(path)) shapes.push(shape);
        }
        if (shapes.length === 0) return;

        const geo = new THREE.ExtrudeGeometry(shapes, {
          depth: 20,
          bevelEnabled: true,
          bevelThickness: 1.5,
          bevelSize: 1,
          bevelSegments: 2,
        });
        geo.computeBoundingBox();
        const bb = geo.boundingBox;
        if (!bb) return;
        geo.translate(
          -(bb.max.x + bb.min.x) / 2,
          -(bb.max.y + bb.min.y) / 2,
          -(bb.max.z + bb.min.z) / 2,
        );
        const footprint = Math.max(bb.max.x - bb.min.x, bb.max.y - bb.min.y);
        const zSize = bb.max.z - bb.min.z || 20;
        const s = logoTargetSize / footprint;
        const sz = (logoTargetSize * logoThickness) / zSize;
        // Negative Y flips the SVG's y-down axis into world space.
        geo.scale(s, -s, sz);
        geo.computeVertexNormals();

        logoMesh = new THREE.Mesh(geo, logoMaterial);
        logoGroup.add(logoMesh);
      },
      undefined,
      () => {
        // CORS / parse failure — scene still works without the logo.
      },
    );

    // Offscreen target (low-res → naturally soft) + screen-space composite.
    const logoRTScale = 0.32;
    const logoRT = new THREE.WebGLRenderTarget(
      Math.max(2, Math.round(width * logoRTScale)),
      Math.max(2, Math.round(height * logoRTScale)),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter },
    );

    const compositeUniforms = {
      uLogoTex: { value: logoRT.texture },
      uOpacity: { value: 0 },
      uBlur: { value: 1.6 },
      uTexel: {
        value: new THREE.Vector2(
          1 / logoRT.width,
          1 / logoRT.height,
        ),
      },
    };

    const compositeMaterial = new THREE.ShaderMaterial({
      uniforms: compositeUniforms,
      vertexShader: LOGO_COMPOSITE_VERT,
      fragmentShader: LOGO_COMPOSITE_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    // Screen-filling quad placed just in front of the camera; drawn between
    // the background (0) and the glass cube (2) so the glass overlays it.
    const logoComposite = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      compositeMaterial,
    );
    logoComposite.renderOrder = 1;
    logoComposite.frustumCulled = false;
    scene.add(logoComposite);

    const COMPOSITE_DIST = 2;
    const fitComposite = () => {
      const h = 2 * COMPOSITE_DIST * Math.tan((camera.fov * Math.PI) / 360);
      logoComposite.scale.set(h * camera.aspect, h, 1);
    };
    fitComposite();

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
    const forward = new THREE.Vector3();
    const baseClearColor = new THREE.Color(palette.base);
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
        compositeUniforms.uOpacity.value = 0.9;
        logoGroup.scale.setScalar(1);
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
        // Logo emerges softly from the cube's core and settles into place.
        .to(
          compositeUniforms.uOpacity,
          { value: 0.9, duration: 2, ease: "power2.out" },
          1.0,
        )
        .fromTo(
          logoGroup.scale,
          { x: 0.55, y: 0.55, z: 0.55 },
          { x: 1, y: 1, z: 1, duration: 2.2, ease: "power3.out" },
          1.0,
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
      camera.position.x = camTarget.x * 0.4;
      camera.position.y = -camTarget.y * 0.24;
      camera.lookAt(0, 0, 0);

      // Gentle turntable spin around the vertical axis (stays upright).
      lens.rotation.y += 0.0011;

      // Logo lives in the cube's space: match its orientation each frame so
      // it shares the same perspective and turns with the glass.
      logoGroup.rotation.copy(lens.rotation);

      // Render the 3D logo offscreen (low-res → soft) with the main camera.
      renderer.setRenderTarget(logoRT);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.render(logoScene, camera);
      renderer.setRenderTarget(null);
      renderer.setClearColor(baseClearColor, 1);

      // Keep the composite quad filling the view, just ahead of the camera.
      camera.getWorldDirection(forward);
      logoComposite.position
        .copy(camera.position)
        .addScaledVector(forward, COMPOSITE_DIST);
      logoComposite.quaternion.copy(camera.quaternion);

      // Refresh the cube map for the lens (hide the glass + composite so they
      // don't recursively sample themselves into the refraction).
      lens.visible = false;
      logoComposite.visible = false;
      cubeCamera.update(renderer, scene);
      lens.visible = true;
      logoComposite.visible = true;

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
    const applySize = () => {
      const m = measure();
      if (m.w === width && m.h === height) return;
      width = m.w;
      height = m.h;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      bgUniforms.uRes.value.set(width * pixelRatio, height * pixelRatio);
      logoRT.setSize(
        Math.max(2, Math.round(width * logoRTScale)),
        Math.max(2, Math.round(height * logoRTScale)),
      );
      compositeUniforms.uTexel.value.set(1 / logoRT.width, 1 / logoRT.height);
      fitBackground();
      fitComposite();
      if (prefersReducedMotion) renderFrame();
    };
    window.addEventListener("resize", applySize);
    // Tracks the displayed box directly (page-scale, entrance reveal, etc.)
    // and corrects any pre-layout mismeasure on the first callback.
    const resizeObserver = new ResizeObserver(applySize);
    resizeObserver.observe(container);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", applySize);
      resizeObserver.disconnect();
      window.removeEventListener("site-enter-complete", startOnce);
      bgMesh.geometry.dispose();
      bgMaterial.dispose();
      lens.geometry.dispose();
      lensMaterial.dispose();
      logoMesh?.geometry.dispose();
      logoMaterial.dispose();
      logoComposite.geometry.dispose();
      compositeMaterial.dispose();
      logoRT.dispose();
      cubeRenderTarget.dispose();
      composer.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [colors, logoSrc]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
    />
  );
}
