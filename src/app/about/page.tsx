'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { language, t } = useLanguage();
  
  return (
    <div className="container mx-auto p-6 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="about-section">
          <h2 className="about-title">{t('about.designTitle')}</h2>
          {language === 'en' ? (
            <>
              <p className="mb-4">
                another design is a transmedia visual design team. The multidisciplinary integration encourages it to challenge the traditional way of thinking, expand the boundary of design language, and explore the diversity of design in different fields.
              </p>
              <p className="mb-4">
                Specializing in design strategies crossing culture and business, the team devotes to provide professional services and innovative strategies for its clients by seeking the balance between cultural and commercial programs.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                another design 是一个跨媒介视觉设计团队，多元学科的交融让它挑战传统思维模式,拓展设计语言的边界，探索不同领域中设计的多样性。
              </p>
              <p className="mb-4">
                专注于跨越文化与商业的设计策略，通过寻求文化性与商业性项目之间的平衡，为客户提供专业的服务与创新的策略。
              </p>
            </>
          )}
        </div>

        <div className="about-section mt-12 md:mt-0">
          <h2 className="about-title">{t('about.teamTitle')}</h2>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.coFounder')}</h3>
            <p>LIU Zhao</p>
            <p className="text-sm text-gray-600 mt-2">AGI / Alliance Graphique Internationale (AGI) member</p>
            <p className="text-sm text-gray-600">Chairman/Academic Committee of Shenzhen Graphic Design Association</p>
            <p className="text-sm text-gray-600 mt-2">
              He serves as a judge for several international design competitions, including
              served as the jury member of the Asia-Pacific Design Yearbook 2021-2022;
              served as the jury member of the 2021 China International Poster Biennale;
              served as the 2022 ONE SHOW Design category international judge;
              served as the 2022 New York TDC Ascenders judge;
              served as the 2022 Topawards Asia judge;
              served as the 2022 One Show Asia judge;
              served as the Award 360 Judge;
              served as the Final judge of the 2022 KTK Design Award;
              served as the judge of the 2023 Macau Design Award;
              served as the international judge of the 2024 London D&AD Brand Category etc.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.coFounder')}</h3>
            <p>ZHAN Huode</p>
            <p className="text-sm text-gray-600 mt-2">AGI member</p>
            <p className="text-sm text-gray-600">Member of Shenzhen Graphic Design Association</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.artDirector')}</h3>
            <p>DU Xiaojun</p>
            <p>LI Lexuan</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.projectManager')}</h3>
            <p>FU Difan</p>
            <p>Cabbie</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.designer')}</h3>
            <p>CHEN Kai</p>
            <p>Deng Di</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">{t('about.intern')}</h3>
            <p>Huang Miaoyan</p>
          </div>
        </div>
      </div>

      <div className="about-section mt-16">
        <h2 className="about-title">{t('about.award')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">2023</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>NY ONE SHOW, Bronze Pencil</li>
              <li>NY ADC, 2 Merit Awards</li>
              <li>D&AD, 2 Graphite Pencil</li>
            </ul>

            <h3 className="text-lg font-bold mb-4 mt-8">2021</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tokyo Type Directors Club, TDC Prize</li>
              <li>GDC Award, 1 Gold Prize, 2 Silver, 4 Bronze, 2 Judging Awards, 6 Merit Awards</li>
              <li>Award360 2021 Best Social Design of the Year, Award360 2021 100 Design of the Year</li>
              <li>100th New York ADC, Bronze Award, Merit Awards</li>
              <li>ONE SHOW Design, Merit Award</li>
              <li>D&AD Merit Awards</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">2020</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>D&AD Merit Awards</li>
              <li>ONE SHOW Design, Merit Award</li>
              <li>99th New York ADC, 2 Merit Awards</li>
              <li>Award360 2020 100 Design of the Year</li>
              <li>Design for Asia Awards, Silver Award, Bronze Award</li>
              <li>Tokyo Type Directors Club, Excellence Awards</li>
            </ul>

            <h3 className="text-lg font-bold mb-4 mt-8">2019</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>GDC Award, 1 Gold Prize, 1 Silver, 4 Merit Awards</li>
              <li>ONE SHOW Design, Merit Award</li>
              <li>Tokyo Type Directors Club, 2 Excellence Awards</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about-section mt-16">
        <h2 className="about-title">client</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-md font-bold mb-4">technology</h3>
            <ul className="space-y-1">
              <li>oppo</li>
              <li>Tencent</li>
              <li>RSS3</li>
            </ul>

            <h3 className="text-md font-bold mb-4 mt-8">architecture</h3>
            <ul className="space-y-1">
              <li>ACDI</li>
              <li>MENG ARCHITECTS</li>
              <li>O-OFFICE</li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">museums & art centers</h3>
            <ul className="space-y-1">
              <li>GUANGDONG MUSEUM OF ART</li>
              <li>LIANZHOU MUSEUM OF PHOTOGRAPHY</li>
              <li>OCT-LOFT</li>
              <li>TIMES MUSEUM</li>
              <li>OCT Art & Design Gallery</li>
            </ul>

            <h3 className="text-md font-bold mb-4 mt-8">civic & public</h3>
            <ul className="space-y-1">
              <li>UABB</li>
              <li>FAMOUS FURNITURE FAIR</li>
              <li>LIANZHOUFOTO</li>
              <li>DESIGN SPRING</li>
              <li>GUANGZHOU CONTEMPORARY ART FAIR</li>
              <li>SCCDA</li>
              <li>Design Twin-Cities</li>
              <li>Shenzhen Design Week</li>
              <li>SGDA</li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">fashion</h3>
            <ul className="space-y-1">
              <li>BVLGARI</li>
              <li>FUI SPACE</li>
              <li>NISISS</li>
              <li>LOCAL LANDSCAPE</li>
            </ul>

            <h3 className="text-md font-bold mb-4 mt-8">education</h3>
            <ul className="space-y-1">
              <li>GUANGZHOU ACADEMY OF FINE ARTS</li>
              <li>Eurasia University</li>
            </ul>

            <h3 className="text-md font-bold mb-4 mt-8">publishers & media</h3>
            <ul className="space-y-1">
              <li>THE TIME WEEKLY</li>
              <li>DBL</li>
            </ul>

            <h3 className="text-md font-bold mb-4 mt-8">corporate</h3>
            <ul className="space-y-1">
              <li>Hennessy</li>
              <li>OCT INTERNATIONAL TOWN</li>
              <li>TaiKoo Hui</li>
              <li>WENHEYOU SUPERB</li>
              <li>Aoyuan</li>
              <li>OCT</li>
              <li>VANKE</li>
              <li>CHINA MERCHANTS SHEKOU HOLDINGS</li>
              <li>Daily Neaty</li>
              <li>LONGMU BAY</li>
              <li>BYHEALTH</li>
              <li>aranya</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
