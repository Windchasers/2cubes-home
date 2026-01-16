import React from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center pt-20 pb-20">

      {/* Logo */}
      <div className="mb-12 relative">
        <Image
          src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg"
          alt="2cubes Logo"
          width={80}
          height={105}
          priority
        />
      </div>

      {/* Contact Information */}
      <div className="text-center space-y-3 font-futura text-[48px] font-normal tracking-wide mb-10">
        <p>E-mail_2cubes Design@foxmail.com</p>
        <p>Ins_@2cubes Design</p>
        <p>Xiaohongshu_2cubes Design</p>
        <p>Behance_2cubes Design</p>
      </div>

      {/* Divider Line */}
      <div className="w-[300px] h-px bg-black opacity-30 mb-10"></div>

      {/* Social Icons */}
      <div className="flex gap-8 items-center justify-center">
        {/* Email */}
        <a href="mailto:2cubes Design@foxmail.com" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/social-media-icons/email.svg"
            alt="Email"
            width={40}
            height={40}
          />
        </a>

        {/* Instagram */}
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/social-media-icons/ins.svg"
            alt="Instagram"
            width={40}
            height={40}
          />
        </a>

        {/* Xiaohongshu */}
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/social-media-icons/redbook.svg"
            alt="Xiaohongshu"
            width={40}
            height={40}
          />
        </a>

        {/* Behance */}
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/social-media-icons/behance.svg"
            alt="Behance"
            width={40}
            height={40}
          />
        </a>
      </div>

      {/* Footer */}
      <Footer className="fixed bottom-8 left-0 right-0 px-[10px] text-black" />

    </div>
  );
}
