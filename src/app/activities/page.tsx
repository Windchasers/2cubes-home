export default function ActivitiesPage() {
  const activities = {
    chinese: [
      { year: "2016", text: "「批评术—中德海报与书籍设计展」，Folkwang 美术馆，埃森，德国" },
      { year: "2015", text: "「传统与未来—汉字二十四时展」，广州，中国" },
      { year: "2014", text: "「Get it Louder 大声展」，北京，中国" },
      { year: "2014", text: "「威尼斯双年展 设计联盟邀请」，威尼斯，意大利" },
      { year: "2013", text: "「亚洲平面设计双年展 第二届」，上海，中国" },
      { year: "2013", text: "「宁波国际设计双年展」，宁波，中国" },
      { year: "2013", text: "「中国设计展」，深圳，中国" },
      { year: "2013", text: "「优秀汉字形象设计作品展」，台北，中国台湾" },
      { year: "2013", text: "「北京设计周」，北京，中国" },
      { year: "2013", text: "「上海设计周」，上海，中国" },
      { year: "2013", text: "「Typojanchi 第一届」，首尔，韩国" },
      { year: "2012", text: "「中国设计展 策展人」，深圳，中国" },
      { year: "2012", text: "「Get it Louder 大声展 策展人」，上海／北京，中国" },
      { year: "2012", text: "「北京设计周—PAPERS 装置」，北京，中国" },
      { year: "2011", text: "「中国五位设计师邀请展」，鹿特丹，荷兰" },
      { year: "2011", text: "「北京设计周 受邀艺术家」，北京，中国" },
      { year: "2011", text: "「Imaginary Margeland 设计展」，伦敦，英国" },
      { year: "2011", text: "「Officina Progetti 邀请艺术家，\"Design Humanism or art in Italy 2010–2011\"」，米兰 & 都灵，意大利" },
      { year: "2010", text: "「Critical Attitudes in Chinese Design 建筑与设计展」，鹿特丹，荷兰" },
      { year: "2009", text: "「GREEN ART FAIR 2009 当代艺术展」，北京，中国" },
      { year: "2009", text: "「中国设计新果冻世代」，波特兰艺术博物馆，俄勒冈州，美国" },
      { year: "2008", text: "「Design of the year 2007 设计博物馆」，伦敦，英国" }
    ],
    english: [
      { year: "2016", text: "Bilderkritik — Chinesisches Plakat- und Buchdesign heute, Museum Folkwang, Essen, 2016, DE" },
      { year: "2015", text: "Invited Designer for Exhibition \"Chinese Typography in 24 Moments, Guangzhou, 2015, CN\"" },
      { year: "2014", text: "Curator of Get it Louder, Beijing, 2014, CN" },
      { year: "2014", text: "Invited Artist for La Biennale di Venezia, Venice, 2014, IT" },
      { year: "2013", text: "The 2nd Shanghai Biennial of Asia Graphic Design, Shanghai, 2013, CN" },
      { year: "2013", text: "Ningbo International Design Biennial, Ningbo, 2013, CN" },
      { year: "2013", text: "China Design Exhibition, Shenzhen, 2013, CN" },
      { year: "2013", text: "Invited Designer for Outstanding Chinese Character Design Works, NTUST, Taipei, 2013, TW" },
      { year: "2013", text: "Beijing Design Week, 2013, CN" },
      { year: "2013", text: "Design Shanghai, Shanghai, 2013, CN" },
      { year: "2013", text: "The First Typojanchi, Seoul, 2013, KR" },
      { year: "2012", text: "Curator of China Design Exhibition, Shenzhen, 2012, CN" },
      { year: "2012", text: "Curator of Get It Louder Exhibition, Shanghai, Beijing, 2012, CN" },
      { year: "2012", text: "Beijing Design Week — PAPERS INSTALLATION, Beijing, 2012, CN" },
      { year: "2011", text: "China 5 Artists and designers Invitation Exhibition, Rotterdam, 2011, NL" },
      { year: "2011", text: "Invited Artist for Beijing Design Week, Beijing, 2011, CN" },
      { year: "2011", text: "Imaginary Margeland Design Exhibition, Bloomsbury Festival, London, 2011, UK" },
      { year: "2011", text: "Invited Artist for Officina Progetti, \"Design Humanism or art in Italy 2010–2011, Milano & Torino, 2011, IT\"" },
      { year: "2010", text: "Critical Attitudes in Chinese Design, Architecture and Design Exhibition, Rotterdam, 2010, NL" },
      { year: "2009", text: "GREEN ART FAIR 2009 Contemporary Art Exhibition, Beijing, 2009, CN" },
      { year: "2009", text: "China Design Novel Jelly Generation, Portland Art Museum, Portland Oregon, 2009, US" },
      { year: "2008", text: "Design of the year 2007 Design Museum, London, 2008, UK" }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Title row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold">活动与展览</h1>
          </div>
          <div>
            <h1 className="text-4xl font-bold">ACTIVITIES & EXHIBITIONS</h1>
          </div>
        </div>

        {/* Activities content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chinese activities */}
          <div>
            <div className="space-y-3">
              {activities.chinese.map((activity, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  <span className="font-medium">{activity.year}</span> {activity.text}
                </div>
              ))}
            </div>
          </div>

          {/* English activities */}
          <div>
            <div className="space-y-3">
              {activities.english.map((activity, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  <span className="font-medium">{activity.year}</span> {activity.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-16 text-[20px] text-gray-600">
          <div>@ 2cubesDesign.com</div>
          <div>China ChangSha & Japan Tokyo</div>
        </div>
      </div>
    </div>
  );
}