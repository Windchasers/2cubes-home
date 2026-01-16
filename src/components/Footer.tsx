import React from 'react';

interface FooterProps {
    className?: string;
    isHome?: boolean;
    showFullLocation?: boolean;
}

export default function Footer({ className = '', isHome = false, showFullLocation = false }: FooterProps) {
    const commonClasses = "flex justify-between items-center text-[7px] l:text-[12px] font-futura  tracking-wider";

    return (
        <div className={`${commonClasses} ${className}`}>
            <div>@ 2cubesDesign.com</div>
            {isHome && <span>·</span>}
            <div>{showFullLocation ? "China ChangSha & Japan Tokyo" : "China & Japan"}</div>
        </div>
    );
}
