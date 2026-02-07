import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-white text-black">

      {/* ========================================== */}
      {/* 1. XS Layout (<480px)                     */}
      {/* ========================================== */}
      <div className="block s:hidden px-[10px] pb-12 font-['Futura_PT']">
        {/* Header/Intro */}
        <section className="flex flex-col items-center pt-20 whitespace-normal">
          <div className="mb-12">
            <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg" alt="2cubes Logo" width={30} height={39} priority />
          </div>
          <div className="w-[276px] text-center">
            <p className="text-[16px] leading-[35px] tracking-[-0.03em]">2cubes Design Lab, founded in 2022, is a creative studio based in Changsha, China, and Tokyo, Japan.</p>
          </div>
          <div className="w-[300px] mt-[10px] text-center">
            <p className="text-[9px] leading-[16px] tracking-[-0.03em]">Its services include brand design, packaging design, exhibition design, cultural and creative product design, and new media design...</p>
          </div>

          <div className="w-[226px] h-[236px] mt-[10px] relative">
            <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/chinese-base.svg" alt="Map" fill className="object-contain" />
          </div>
          <div className="w-[300px] mt-[10px] text-center">
            <p className="text-[7px] leading-[12px] tracking-[-0.03em]">China Office: Design Studio, 233 Art Community – 233 Art Museum...</p>
          </div>
          <div className="w-[226px] h-[236px] mt-[10px] relative">
            <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/japan-base.svg" alt="Map" fill className="object-contain" />
          </div>
          <div className="w-[300px] mt-[20px] text-center">
            <p className="text-[7px] leading-[12px] tracking-[-0.03em]">Japan Office: 东京都大田区大森北3-4-4 KT大森北北ビル4阶</p>
          </div>
        </section>

        {/* Team */}
        <section className="mt-[60px]">
          <div className="flex flex-col items-center mb-[20px]">
            <h2 className="text-[16px] font-futura tracking-[-0.03em] mb-2 uppercase">Team Introduction</h2>
            <div className="w-full border-t-[0.5px] border-black"></div>
          </div>
          <div className="space-y-[40px]">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col">
                <div className="w-full aspect-square bg-[#D9D9D9] mb-[15px] relative">
                  {/* Placeholder for member photo */}
                </div>
                <div className="flex items-end justify-between mb-[20px]">
                  <h3 className="text-[18px] font-futura uppercase tracking-[-0.03em] leading-none">{member.name}</h3>
                  <div className="text-[7px] text-right tracking-[-0.03em] leading-none">
                    <p>{member.location} / {member.roles.join(' / ')}</p>
                  </div>
                </div>
                <div className="text-[9px] leading-[15px] tracking-[-0.03em] text-black">
                  <p dangerouslySetInnerHTML={{ __html: member.description }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mt-20 space-y-10">
          <div>
            <h2 className="text-[24px] font-bold border-b border-gray-200 pb-2 mb-4">奖项 / AWARD</h2>
            <div className="space-y-2">
              {awards.chinese.map((award, i) => (
                <div key={i} className="flex text-[13px]">
                  <span className="w-12 flex-shrink-0 font-futura">{award.year}</span>
                  <span>{award.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer className="mt-20 pt-8 border-t border-gray-100 text-black" />
      </div>

      {/* ========================================== */}
      {/* 2. S Layout (480px - 768px)                */}
      {/* ========================================== */}
      <div className="hidden s:block m:hidden px-6 pb-12 font-['Futura_PT']">
        <section className="flex flex-col items-center pt-20 text-center">
          <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg" alt="Logo" width={50} height={65} />
          <h1 className="text-3xl mt-12 mb-6">2cubes Design Lab, founded in 2022</h1>
          <p className="max-w-md text-sm leading-relaxed">Its services include brand design, packaging design, exhibition design...</p>
          <div className="grid grid-cols-1 gap-10 mt-16 w-full max-w-sm">
            <div className="flex flex-col items-center">
              <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/chinese-base.svg" alt="China" width={300} height={310} />
              <p className="mt-4 text-xs">China Office address...</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/japan-base.svg" alt="Japan" width={300} height={250} />
              <p className="mt-4 text-xs">Japan Office address...</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mt-24">
          <h2 className="text-3xl text-center mb-12 border-b border-black pb-4 inline-block mx-auto w-full">Team Introduction</h2>
          <div className="grid grid-cols-1 gap-12">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="text-3xl uppercase mb-2">{member.name}</h3>
                <div className="w-full aspect-square bg-gray-200 mb-6"></div>
                <p className="text-sm font-bold mb-2">{member.location} / {member.roles.join(' / ')}</p>
                <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: member.description }} />
              </div>
            ))}
          </div>
        </section>

        <Footer className="mt-24 pt-8 border-t border-gray-100 text-black" />
      </div>

      {/* ========================================== */}
      {/* 3. M Layout (768px - 1024px)               */}
      {/* ========================================== */}
      <div className="hidden m:block l:hidden px-10 pb-20">
        <section className="text-center pt-24 mb-32">
          <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg" alt="Logo" width={80} height={105} className="mx-auto mb-12" />
          <h1 className="text-[50px] font-futura leading-tight mb-12">2cubes Design Lab, founded in 2022</h1>
          <div className="max-w-2xl mx-auto space-y-6 text-[18px]">
            <p>Its services include brand design, packaging design...</p>
          </div>
          <div className="mt-20 flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/chinese-base.svg" alt="China" width={400} height={420} />
              <p className="mt-4 text-sm">China Office address text here...</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/japan-base.svg" alt="Japan" width={440} height={360} />
              <p className="mt-4 text-sm">Japan Office address text here...</p>
            </div>
          </div>
        </section>

        {/* Team 2-Cols */}
        <section className="mb-32">
          <h2 className="text-[50px] font-futura uppercase border-b border-black pb-4 mb-16 text-center">Team Introduction</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-20">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="text-[36px] uppercase mb-4">{m.name}</h3>
                <div className="w-full aspect-square bg-gray-200 mb-6"></div>
                <p className="text-[14px] leading-relaxed" dangerouslySetInnerHTML={{ __html: m.description }} />
              </div>
            ))}
          </div>
        </section>

        <Footer className="pt-8 border-t border-gray-100 text-black" />
      </div>

      {/* ========================================== */}
      {/* 4. L Layout (1024px+)                      */}
      {/* ========================================== */}
      <div className="hidden l:block bg-white px-[44px] pb-[40px]">
        <section className="mx-auto max-w-[936px] text-center font-futura text-black">
          <Image
            src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/logo.svg"
            alt="2cubes Logo"
            width={58}
            height={76}
            className="mx-auto"
            priority
          />

          <h1 className="mx-auto mt-[34px] max-w-[760px] text-[58px] font-normal leading-[1.28] tracking-[-0.03em]">
            2cubes Design Lab, founded in 2022, is a creative studio based in Changsha, China, and Tokyo, Japan.
          </h1>

          <p className="mx-auto mt-[18px] max-w-[760px] text-[22px] font-normal leading-[1.72] tracking-[-0.03em]">
            Its services include brand design, packaging design, exhibition design, cultural and creative product
            design, and new media design.
            <br />
            With extensive experience in full-project design and execution, 2cubes maintains a global perspective and
            provides professional design services to clients across diverse industries worldwide.
          </p>

          <div className="mx-auto mt-[28px] grid max-w-[760px] grid-cols-2 items-start gap-x-[28px]">
            <div className="flex flex-col items-center">
              <Image
                src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/chinese-base.svg"
                alt="China Office Map"
                width={270}
                height={280}
                className="h-auto w-[270px]"
              />
              <div className="mt-[22px] text-center text-[13px] leading-[1.7] tracking-[-0.03em]">
                <p>China Office:</p>
                <p>Design Studio, 233 Art Community - 233 Art Museum,</p>
                <p>Yuhua District, Changsha, Hunan Province, China</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/japan-base.svg"
                alt="Japan Office Map"
                width={340}
                height={282}
                className="h-auto w-[340px]"
              />
              <div className="mt-[22px] text-center text-[13px] leading-[1.7] tracking-[-0.03em]">
                <p>Japan Office:</p>
                <p>东京都大田区大森北3-4-4</p>
                <p>KT大森北北ビル4階</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-[74px] max-w-[936px] font-futura text-black">
          <h2 className="text-center text-[42px] font-normal uppercase tracking-[-0.03em]">Team Introduction</h2>

          <div className="mt-[46px] grid grid-cols-3 gap-x-[58px] gap-y-[68px]">
            {teamMembers.map((member, i) => (
              <article
                key={member.name}
                className={`${
                  i === 3 ? "col-start-1" : ""
                } ${i === 4 ? "col-start-2" : ""}`}
              >
                <h3 className="border-b border-black pb-[4px] text-[33px] uppercase leading-none tracking-[-0.03em]">
                  {member.name}
                </h3>
                <div className="mt-[6px] h-[220px] w-full bg-[#c6c6c6]" />
                <p className="mt-[10px] text-[10px] leading-[1.45] tracking-[-0.03em]">
                  {member.location} / {member.roles.join(" / ")}
                </p>
                <p
                  className="mt-[8px] text-[10px] leading-[1.6] tracking-[-0.03em]"
                  dangerouslySetInnerHTML={{ __html: member.description }}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-[78px] grid max-w-[936px] grid-cols-2 gap-x-[58px] font-futura text-black">
          <div>
            <h3 className="text-[36px] font-normal tracking-[-0.03em]">奖项</h3>
            <div className="mt-[7px] h-[1px] w-full bg-black" />
            <ul className="mt-[14px] space-y-[5px] text-[10px] leading-[1.45] tracking-[-0.03em]">
              {awards.chinese.map((award) => (
                <li key={`cn-${award.year}-${award.title}`}>
                  {award.year} &nbsp; {award.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[36px] font-normal uppercase tracking-[-0.03em]">Award</h3>
            <div className="mt-[7px] h-[1px] w-full bg-black" />
            <ul className="mt-[14px] space-y-[5px] text-[10px] leading-[1.45] tracking-[-0.03em]">
              {awards.english.map((award) => (
                <li key={`en-${award.year}-${award.title}`}>
                  {award.year} &nbsp; {award.title}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto mt-[72px] grid max-w-[936px] grid-cols-2 gap-x-[58px] font-futura text-black">
          <div>
            <h3 className="text-[36px] font-normal tracking-[-0.03em]">活动与展览</h3>
            <div className="mt-[7px] h-[1px] w-full bg-black" />
            <ul className="mt-[14px] space-y-[5px] text-[10px] leading-[1.45] tracking-[-0.03em]">
              {events.chinese.map((event) => (
                <li key={`event-cn-${event.year}-${event.title}`}>
                  {event.year} &nbsp; {event.title}, {event.location}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[36px] font-normal uppercase tracking-[-0.03em]">Events & Exhibitions</h3>
            <div className="mt-[7px] h-[1px] w-full bg-black" />
            <ul className="mt-[14px] space-y-[5px] text-[10px] leading-[1.45] tracking-[-0.03em]">
              {events.english.map((event) => (
                <li key={`event-en-${event.year}-${event.title}`}>
                  {event.year} &nbsp; {event.title}, {event.location}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer className="mx-auto mt-[64px] max-w-[936px] pt-[18px] text-black" />
      </div>

    </div>
  );
}
