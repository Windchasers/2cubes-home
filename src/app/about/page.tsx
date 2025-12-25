import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Information | 2cubes Design',
  description: 'About 2cubes Design Lab',
};

// Data Types
interface TeamMember {
  name: string;
  location: string;
  roles: string[];
  description: string;
}

interface Award {
  year: string;
  title: string;
  titleEn?: string; // Optional English title if mixed
}

interface Event {
  year: string;
  title: string;
  location: string;
}

// Data
const teamMembers: TeamMember[] = [
  {
    name: 'ZHIWEI SUN',
    location: '中国办公室',
    roles: ['平面设计师', '动态设计师'],
    description: '2cubes design平面设计师。<br/>本科毕业于中国/西安美术学院。<br/>具有多年设计艺术行业经验，带领团队持续为客户提供具有竞争力的设计类服务。作品曾获德国红点奖、台湾金点奖、东京TDC、中国最美的书、Award 360等国际国内奖项。'
  },
  {
    name: 'LUNYI HE',
    location: '中国办公室',
    roles: ['平面设计师', '策展人'],
    description: '2cubes design创意总监、平面设计师；233艺术社区艺术指导、策展人。<br>本科毕业于中国/西安美术学院，硕士研究生毕业于英国/皇家艺术学院。<br>深耕艺术设计领域多年，深度参与在地艺术与展览项目。其作品多次获得Tokyo TDC、澳门设计大奖等国内外重要奖项。'
  },
  {
    name: 'ZHONGHAO WU',
    location: '中国办公室',
    roles: ['高级软件工程师', '全栈开发者', 'AIGC创作者'],
    description: '2cubes design全栈开发者及AIGC创作者。<br>本科毕业于中国/湖南师范大学，硕士研究生毕业于澳大利亚/昆士兰大学。<br>曾任Expensify核心贡献者。拥有跨学科背景，致力于将艺术设计思维与现代软件工程相结合。擅长 React Native 生态、全栈开发及生成式AI工作流搭建。在政务服务平台、跨境电商SaaS及创意工具开发领域拥有丰富的实战经验，热衷于探索技术与创意的边界。'
  },
  {
    name: 'WENWEI LI',
    location: '日本办公室',
    roles: ['平面设计师', '信息设计师'],
    description: '2cubes design日本分部负责人、平面设计师。<br>本科毕业于中国/西安美术学院，现研究生就读于日本/多摩美术大学。<br>主要从事品牌视觉与信息设计方向的研究与实践，长期参与并主导品牌视觉系统、视觉叙事内容与实验性设计项目的策划与执行。作品曾入选并获奖于东京TDC、中国GDC新升奖等国内外设计赛事。'
  },
  {
    name: 'YUCHEN XU',
    location: '日本办公室',
    roles: ['客户执行AE', '商务BD', '供应链管理'],
    description: '2cubes design日本分部商务BD、供应链负责人。<br>本科毕业于中国/西安美术学院，硕士研究生毕业于日本/东京福祉大学。<br>具有丰富行业经验，对商业环境有着敏锐的感知反应。负责拓展2cubes design的项目合作渠道、高效推进设计项目执行、以及保障设计产品高品质生产。'
  }
];

const awards = {
  chinese: [
    { year: '2022', title: 'Tokyo TDC 优异奖' },
    { year: '2023', title: '中国最美的书' },
    { year: '2023', title: 'Award360 年度文化品牌设计' },
    { year: '2023', title: 'Hiiibrand Awards 品牌形象优异奖' },
    { year: '2023', title: 'GDC Award 2023 优异奖' },
    { year: '2023', title: 'NewOne Awards 视觉传达 毕业设计奖' },
    { year: '2023', title: 'Graduate360 2023 年度 毕业设计100 获奖' },
    { year: '2023', title: 'Tokyo TDC 优异奖' },
    { year: '2024', title: 'Tokyo TDC 优异奖' },
    { year: '2024', title: '台湾金点设计奖' },
    { year: '2024', title: 'NewOne Awards 视觉传达 毕业设计奖' },
    { year: '2025', title: 'GDC新升奖 优异奖' },
    { year: '2025', title: 'Tokyo TDC 优异奖' },
    { year: '2025', title: '澳门设计大奖*4' },
    { year: '2025', title: 'Hiiibrand Awards 书籍设计优异奖' },
  ],
  english: [
    { year: '2022', title: 'Tokyo TDC Award, Excellence Award' },
    { year: '2023', title: "China's Most Beautiful Book Award" },
    { year: '2023', title: 'Award360 Annual Cultural Brand Design Award' },
    { year: '2023', title: 'Hiiibrand Awards, Brand Identity Excellence Award' },
    { year: '2023', title: 'GDC Award 2023, Excellence Award' },
    { year: '2023', title: 'NewOne Awards, Visual Communication Graduation Design Award' },
    { year: '2023', title: 'Graduate360 2023, Top 100 Graduation Designs Award' },
    { year: '2023', title: 'Tokyo TDC Award, Excellence Award' },
    { year: '2024', title: 'Tokyo TDC Award, Excellence Award' },
    { year: '2024', title: 'Golden Pin Design Award (Taiwan)' },
    { year: '2024', title: 'NewOne Awards, Visual Communication Graduation Design Award' },
    { year: '2025', title: 'GDC Rising Star Award, Excellence Award' },
    { year: '2025', title: 'Tokyo TDC Award, Excellence Award' },
    { year: '2025', title: 'Macau Design Awards (x4)' },
    { year: '2025', title: 'Hiiibrand Awards, Book Design Excellence Award' },
  ]
};

const events = {
  chinese: [
    { year: '2022', title: '「Tokyo TDC Excellent Work」', location: '东京，日本' },
    { year: '2023', title: '「Tokyo TDC Excellent Work」', location: '东京，日本' },
    { year: '2024', title: '「Tokyo TDC Excellent Work」', location: '东京，日本' },
    { year: '2024', title: '「New One Award Merit」', location: '上海，中国' },
    { year: '2024', title: '「石记：新龙口乡村叙事——黑 ?村计划」', location: '烟台，中国' },
    { year: '2024', title: '「非物质文化遗产的现代回声」', location: '广州，中国' },
    { year: '2025', title: '「生长的语法-综合设计展」', location: '长沙，中国' },
  ],
  english: [
    { year: '2022', title: '「Tokyo TDC Excellent Work」', location: 'Tokyo, Japan' },
    { year: '2023', title: '「Tokyo TDC Excellent Work」', location: 'Tokyo, Japan' },
    { year: '2024', title: '「Tokyo TDC Excellent Work」', location: 'Tokyo, Japan' },
    { year: '2024', title: '「New One Award Merit」', location: 'Shanghai, China' },
    { year: '2024', title: '「Stone Chronicles: New Longkou Rural Narrative — Haotang Village Project」', location: 'Yantai, China' },
    { year: '2024', title: '「The Modern Echo of Intangible Cultural Heritage」', location: 'Guangzhou, China' },
    { year: '2025', title: '「The Grammar of Growth — Integrated Design Exhibition」', location: 'Changsha, China' },
  ]
};

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <section id="about" className="text-center mb-32">
          {/* Logo 2³ */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <Image
                src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg"
                alt="2cubes Logo"
                width={80}
                height={105}
                priority
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-[70px] font-normal leading-tight mb-12 max-w-6xl mx-auto font-futura">
            2cubes Design Lab, founded in 2022,
            <br />
            is a creative studio based in Changsha, China,
            <br />
            and Tokyo, Japan.
          </h1>

          {/* Description */}
          <div className="max-w-4xl mx-auto space-y-6 text-[24px] text-gray-800 leading-relaxed">
            <p>
              Its services include brand design, packaging design, exhibition design, cultural and creative product design, and new media design.
            </p>
            <p>
              With extensive experience in full-project design and execution,
              <br />
              2cubes maintains a global perspective and provides professional design
              <br />
              services to clients across diverse industries worldwide.
            </p>
          </div>

          {/* Maps Placeholder */}
          <div className="mt-20 flex justify-center gap-20">
            <div className="flex flex-col items-center gap-6">
              <Image
                src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/chinese-base.svg"
                alt="Changsha Office Map"
                width={531}
                height={553}
                className="max-w-[300px] md:max-w-none h-auto"
              />
              <div className="text-center text-black text-[24px] font-futura -mt-[67px] relative z-10">
                <p className="mb-2">China Office:</p>
                <p>Design Studio, 233 Art Community – 233 Art Museum,</p>
                <p>Yuhua District, Changsha, Hunan Province, China</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <Image
                src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/japan-base.svg"
                alt="Japan Office Map"
                width={584}
                height={486}
                className="max-w-[300px] md:max-w-none h-auto"
              />
              <div className="text-center text-[24px] text-black font-futura">
                <p className="mb-2">Japan Office:</p>
                <p>東京都大田区大森北3-4-4</p>
                <p>KT大森北ビル4階</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Team Introduction Section */}
      <section className="mb-32 px-[30px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[70px] font-futura uppercase border-b border-black pb-4 inline-block">Team Introduction</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-[48px] font-futura uppercase mb-2">{member.name}</h3>
              <div className="w-full h-px bg-black mb-4"></div>
              <div className="w-full aspect-square bg-gray-200 mb-6"></div>
              <div className="space-y-1 text-sm font-bold mb-4">
                <p>{member.location}</p>
                <p>{member.roles.join(' / ')}</p>
              </div>
              <p 
                className="text-[14px] leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: member.description }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="mb-24 px-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {/* Chinese Column */}
          <div>
            <div className="flex items-baseline mb-8 border-b border-gray-200 pb-2">
              <h2 className="text-[50px] font-bold">奖项</h2>
            </div>
            <div className="space-y-2">
              {awards.chinese.map((award, index) => (
                <div key={index} className="flex text-[16px]">
                  <span className="w-16 flex-shrink-0 font-futura">{award.year}</span>
                  <span>{award.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* English Column */}
          <div>
            <div className="flex items-baseline mb-8 border-b border-gray-200 pb-2">
              <span className="text-[50px] font-futura">AWARD</span>
            </div>
            <div className="space-y-2">
              {awards.english.map((award, index) => (
                <div key={index} className="flex text-[16px]">
                  <span className="w-16 flex-shrink-0 font-futura">{award.year}</span>
                  <span>{award.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="mb-24 px-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {/* Chinese Column */}
          <div>
            <div className="flex items-baseline mb-8 border-b border-gray-200 pb-2">
              <h2 className="text-[50px] font-bold">活动与展览</h2>
            </div>
            <div className="space-y-2">
              {events.chinese.map((event, index) => (
                <div key={index} className="flex text-[16px]">
                  <span className="w-16 flex-shrink-0 font-futura">{event.year}</span>
                  <span>{event.title} , {event.location}</span>
                </div>
              ))}
            </div>
          </div>

          {/* English Column */}
          <div>
            <div className="flex items-baseline mb-8 border-b border-gray-200 pb-2">
              <span className="text-[50px] font-futura">EVENTS & EXHIBITIONS</span>
            </div>
            <div className="space-y-2">
              {events.english.map((event, index) => (
                <div key={index} className="flex text-[16px]">
                  <span className="w-16 flex-shrink-0 font-futura">{event.year}</span>
                  <span>{event.title} , {event.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Page Footer */}
      <div className="px-[30px]">
        <div className="flex justify-between items-center text-[20px] font-futura pt-8 border-t border-gray-100">
          <div>@ 2cubes Design.com</div>
          <div>China & Japan</div>
        </div>
      </div>
    </div>
  );
}
