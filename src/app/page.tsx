import Footer from '@/components/Footer';
import projectsData from '@/data/projects.json';
import Image from 'next/image';

export default function HomePage() {
  const projects = projectsData.projects;
  const heroSrc = 'https://4p6gppmls93l24ur.public.blob.vercel-storage.com/images/projects/4/thumbnail.jpg';

  return (
    <div className="bg-white text-black">
      <section className="relative w-screen h-screen">
        <Image
          src={heroSrc}
          alt="2cubes Design hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <Footer className="absolute bottom-6 left-[10px] right-[10px] mt-0" />
      </section>
    </div>
  );
}
