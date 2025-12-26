import React from 'react';

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "TOKYO TDC 2023-2025",
      superscript: "1",
      description: "2cubes' members have been selected for the Tokyo TDC for three consecutive years.",
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
      description: "2cubes' members have been selected for the Tokyo TDC for three consecutive years.",
      list: [
        "P1 — Semantic Disorder — Tokyo TDC 2025",
        "P2 — Bread Exhibition — Tokyo TDC 2024",
        "P3 — The Melody from the Street — Tokyo TDC 2023"
      ]
    }
  ];

  return (
    <div className="bg-white text-black min-h-screen font-['Futura_PT']">
      <div className="w-full px-[30px] py-10 sm:py-14">
        <div className="space-y-32">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center w-full">
              
              {/* Title Section */}
              <div className="text-center mb-12 max-w-[1400px] mx-auto">
                <h2 className="text-[70px] sm:text-[70px] font-normal uppercase leading-tight mb-6 relative inline-block">
                  {item.title}
                  <sup className="text-2xl sm:text-[30px] absolute -top-2 -right-6">{item.superscript}</sup>
                </h2>
                
                <div className="space-y-4 text-lg sm:text-[33px] font-medium leading-relaxed">
                  <p>{item.description}</p>
                  <div className="flex flex-col gap-1">
                    {item.list.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((imgIndex) => (
                  <div key={imgIndex} className="w-full aspect-[4/3] bg-gray-200">
                    {/* Placeholder for images as per design */}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Page Footer */}
        <div className="flex justify-between items-end mt-32 text-sm font-medium">
            <div className="flex items-center gap-2">
               <span>@ 2cubes Design.com</span>
            </div>
            <div>China & Japan</div>
        </div>
      </div>
    </div>
  );
}
