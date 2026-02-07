import Image from "next/image";
import React from "react";

const contactLines = [
  "E-mail_ 2cubes Design@foxmail.com",
  "Ins_@2cubes Design",
  "Xiaohongshu_2cubes Design",
  "Behance_2cubes Design",
];

const socialLinks = [
  {
    href: "mailto:2cubesDesign@foxmail.com",
    icon: "/images/social-media-icons/email.svg",
    alt: "Email",
  },
  {
    href: "#",
    icon: "/images/social-media-icons/ins.svg",
    alt: "Instagram",
  },
  {
    href: "#",
    icon: "/images/social-media-icons/redbook.svg",
    alt: "Xiaohongshu",
  },
  {
    href: "#",
    icon: "/images/social-media-icons/behance.svg",
    alt: "Behance",
  },
];

export default function ContactPage() {
  return (
    <div className="text-black">
      {/* XS / S / M fallback layout */}
      <div className="flex flex-col items-center px-[10px] pb-20 pt-20 l:hidden">
        <div className="mb-12">
          <Image
            src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg"
            alt="2cubes Logo"
            width={80}
            height={105}
            priority
          />
        </div>

        <div className="space-y-3 text-center font-futura text-[48px] font-normal tracking-wide">
          {contactLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mb-10 mt-10 h-px w-[300px] bg-black opacity-30" />

        <div className="flex items-center justify-center gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              className="transition-opacity hover:opacity-80"
              aria-label={link.alt}
            >
              <Image src={link.icon} alt={link.alt} width={40} height={40} />
            </a>
          ))}
        </div>
      </div>

      {/* L layout */}
      <div className="hidden min-h-[calc(100vh-96px)] bg-white l:block">
        <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-[1024px] flex-col items-center px-[14px] pb-[16px] pt-[12px] font-futura">
          <Image
            src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg"
            alt="2cubes Logo"
            width={58}
            height={76}
            priority
          />

          <div className="mt-[26px] space-y-[4px] text-center text-[22px] font-normal leading-[1.7] tracking-[-0.03em]">
            {contactLines.map((line) => (
              <p key={`l-${line}`}>{line}</p>
            ))}
          </div>

          <div className="mt-[14px] h-px w-[380px] bg-black/45" />

          <div className="mt-[14px] flex items-center justify-center gap-[14px]">
            {socialLinks.map((link) => (
              <a
                key={`l-${link.alt}`}
                href={link.href}
                className="transition-opacity hover:opacity-80"
                aria-label={link.alt}
              >
                <Image src={link.icon} alt={link.alt} width={40} height={40} />
              </a>
            ))}
          </div>

          <div className="mt-auto grid w-full grid-cols-3 text-[12px] font-[450] leading-none tracking-[-0.03em]">
            <p className="justify-self-start">@ 2cubes Design.com</p>
            <p className="justify-self-center">China &amp; Japan</p>
            <p />
          </div>
        </section>
      </div>
    </div>
  );
}
