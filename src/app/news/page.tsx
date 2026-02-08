import Footer from '@/components/Footer';
import React from 'react';

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "TOKYO TDC 2023-2025",
      superscript: "1",
      description: "2cubes' members have been selected for the Tokyo TDC\nfor three consecutive years.",
      list: [
        "P1 — Semantic Disorder — Tokyo TDC 2025",
        "P2 — Bread Exhibition — Tokyo TDC 2024",
        "P3 — The Melody from the Street — Tokyo TDC 2023"
      ]
    },
    {
      id: 2,
      title: "TOKYO TDC 2023-2025",
      superscript: "2",
      description: "2cubes' members have been selected for the Tokyo TDC\nfor three consecutive years.",
      list: [
        "P1 — Semantic Disorder — Tokyo TDC 2025",
        "P2 — Bread Exhibition — Tokyo TDC 2024",
        "P3 — The Melody from the Street — Tokyo TDC 2023"
      ]
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen font-['Futura_PT']">
      <div className="w-full px-[10px] py-10 s:py-14 l:px-[16px] l:pt-[50px] l:pb-[35px] l:-mt-[46px]">
        <div className="space-y-32">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center w-full">

              {/* Title Section */}
              <div className="text-center mb-6 s:mb-12 l:mb-[2px] l:w-[992px] l:mx-auto">
                <h2 className="text-[26px] s:text-[35px] m:text-[40px] l:text-[40px] font-normal uppercase leading-[1.2] s:leading-[90px] m:leading-[90px] l:leading-[90px] mb-2 s:mb-6 l:mb-[-8px] inline-flex items-start tracking-[-0.03em]">
                  <span className="block leading-[90px]">{item.title}</span>
                  <span className="block text-sm s:text-[18px] m:text-[20px] l:text-[24px] leading-[14px] ml-[4px] mt-[32px] tracking-[-0.03em]">{item.superscript}</span>
                </h2>

                <div className="space-y-4 l:space-y-[2px] text-[13px] s:text-[13px] m:text-[16px] l:text-[15px] font-normal leading-relaxed l:leading-[24px] font-futura l:mt-0">
                  <p className="m-0 px-4 s:px-0 max-w-[448px] m:max-w-[736px] l:max-w-[520px] mx-auto text-center whitespace-pre-line">{item.description}</p>
                  <div className="flex flex-col gap-1 l:gap-[6px] items-center">
                    {item.list.map((line, index) => (
                      <p key={index} className="m-0">{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              {/* XS: 2 columns, squareish aspect, gap-10px
                    S:  2 columns, 219/198.7 aspect (~1.1), gap-10px
                    M:  3 columns, 239/175.5 aspect (~1.36), gap-10px
                    L:  3 columns, 324/169.5 aspect (~1.91), gap-10px
                */}
              <div className="w-full grid grid-cols-2 m:grid-cols-3 gap-[10px]">
                {/* 
                     Display Logic:
                     XS: 2 images (1 row) - Indices 1, 2
                     S:  4 images (2 rows) - Indices 1, 2, 3, 4
                     M:  3 images (1 row) - Indices 1, 2, 3
                     L:  3 images (1 row) - Indices 1, 2, 3
                  */}
                {[1, 2, 3, 4].map((imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`w-full bg-[#D9D9D9] relative
                        aspect-square 
                        s:aspect-[219/198.7] 
                        m:aspect-[239/175.5]
                        l:aspect-[324/169.5]
                        
                        ${/* Visiblity Classes */ ''}
                        ${imgIndex === 3 ? 'hidden s:block' : '' /* Index 3: Hidden XS, Show S, Show M, Show L */}
                        ${imgIndex === 4 ? 'hidden s:block m:hidden' : '' /* Index 4: Hidden XS, Show S, Hide M, Hide L */}
                      `}
                  >
                    {/* Placeholder for images */}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Page Footer */}
        <Footer />
      </div>
    </div>
  );
}
