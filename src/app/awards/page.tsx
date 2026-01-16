import Footer from '@/components/Footer';

export default function AwardsPage() {
  const awards = {
    chinese: [
      { year: "2019", text: "HKDA GDA，1 金奖 / 1 银奖 / 1 铜奖 / 1 评审奖，香港，中国" },
      { year: "2018", text: "TDC 东京字体指导俱乐部 TDC奖，东京，日本" },
      { year: "2016", text: "Dummy Award Venice，年度摄影书奖，北京，中国" },
      { year: "2014", text: "威尼斯双年展 设计联盟奖，威尼斯，意大利" },
      { year: "2012", text: "52 Faces Dot Award，传播设计，德国" },
      { year: "2011", text: "GDC 11，深圳，中国 大奖" },
      { year: "2009", text: "HKDA 设计展，2 银奖 / 1 铜奖，香港，中国" },
      { year: "2008", text: "D&AD，优异奖，英国" },
      { year: "2007", text: "东京字体指导俱乐部 TDC奖 / 优异奖，东京，日本" },
      { year: "2007", text: "第18届艺术指导俱乐部年度奖，优异奖，纽约，美国" },
      { year: "2006", text: "HKDA 设计展，1 金奖 / 1 银奖 / 1 铜奖，中国" },
      { year: "2005", text: "GDC 05 大奖，深圳，中国" },
      { year: "2004", text: "东京字体指导俱乐部，非会员奖 / 优异奖，东京，日本" },
      { year: "2004", text: "宁波国际海报双年展，1 金奖 / 2 优异奖，中国" }
    ],
    english: [
      { year: "2019", text: "HKDA GDA, 1 Gold prize / 1 Silver / 1 Bronze / 1 Jury Award, Hong Kong, CN" },
      { year: "2018", text: "Tokyo Type Directors Club, TDC Prize, Tokyo, JP" },
      { year: "2012", text: "Dummy Award Venice, Annual Photography Book Award, Beijing, CN" },
      { year: "2014", text: "La Biennale di Venezia, Design Alliance Award, Venice, IT" },
      { year: "2012", text: "52 Faces Dot Award: Communication Design, DE" },
      { year: "2011", text: "GDC 11, Shenzhen, CN Great Award, CN" },
      { year: "2009", text: "HKDA Design Show, CN, 2 Silver Prize / 1 Bronze, Hong Kong, CN" },
      { year: "2009", text: "D&AD, 2 Merit Awards, UK" },
      { year: "2008", text: "Tokyo Type Directors Club, TDC Prize / Merit Award, Tokyo, JP" },
      { year: "2007", text: "18th Art Directors Club Annual Award, 1 Merit Award, NY, USA" },
      { year: "2007", text: "Tokyo Type Directors Club, 2 Merit Award, Tokyo, JP" },
      { year: "2006", text: "HKDA Design Show, 1 Gold Prize / 1 Silver Prize / 1 Bronze Prize, CN" },
      { year: "2006", text: "86th Art Directors Club Annual Award, Merit Award, NY, USA" },
      { year: "2005", text: "GDC 05 Great Award — Shenzhen, CN" },
      { year: "2004", text: "Tokyo Type Directors Club, Non‑Member Prize / Merit Awards, Tokyo, JP" },
      { year: "2004", text: "Ningbo International Poster Biennial, 1 Gold prize / 2 Merit Awards, CN" }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-[10px] py-16">
        {/* Title row */}
        <div className="grid grid-cols-1 m:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold">奖项</h1>
          </div>
          <div>
            <h1 className="text-4xl font-bold">AWARD</h1>
          </div>
        </div>

        {/* Awards content */}
        <div className="grid grid-cols-1 m:grid-cols-2 gap-8">
          {/* Chinese awards */}
          <div>
            <div className="space-y-3">
              {awards.chinese.map((award, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  <span className="font-medium">{award.year}</span> {award.text}
                </div>
              ))}
            </div>
          </div>

          {/* English awards */}
          <div>
            <div className="space-y-3">
              {awards.english.map((award, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  <span className="font-medium">{award.year}</span> {award.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer className="mt-16 text-gray-600" />
      </div>
    </div>
  );
}