import Footer from '@/components/Footer';
import Link from 'next/link';
import ClientProjectDetail from '@/app/projects/[id]/ClientProjectDetail';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return Array.from({ length: 21 }, (_, i) => ({ id: String(i) }));
}

export default async function PreviewDetailPage({ params }: Props) {
  const { id } = await params;

  /* ── just-a-novel (id 0) → show real project detail ── */
  if (id === '0') {
    return <ClientProjectDetail routeParam="stop-guessing-just-a-novel" />;
  }

  /* ── grammar-of-growth (id 4) → show real project detail ── */
  if (id === '4') {
    return <ClientProjectDetail routeParam="the-grammar-of-growth" />;
  }

  /* ── all others → empty state ── */
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* back link */}
      <div className="px-[10px] l:px-[16px] pt-6">
        <Link
          href="/preview"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-black transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>
      </div>

      {/* placeholder content */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-neutral-400 text-lg font-light tracking-wide">
          Project {id} — Detail coming soon
        </p>
      </div>

      <div className="px-[10px] l:px-[16px] pb-10">
        <Footer />
      </div>
    </div>
  );
}
