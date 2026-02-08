interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const commonClasses =
    "mt-32 text-black flex justify-between items-center text-[7px] l:text-[12px] l:leading-[15px] font-futura font-[450] tracking-[-0.03em]";

  return (
    <div className={`${commonClasses} ${className}`.trim()}>
      <div>@ 2cubesDesign.com</div>
      <div>China &amp; Japan</div>
    </div>
  );
}
