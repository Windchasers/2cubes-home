import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

/* ── Vercel Blob base URL ───────────────────────────── */
const BLOB = 'https://4p6gppmls93l24ur.public.blob.vercel-storage.com';

/* ── thumbnail data (all hosted on Vercel Blob) ─────── */
const thumbnails = [
  { id: 0,  src: `${BLOB}/book-design-just-a-novel/cover.avif` },
  { id: 1,  src: `${BLOB}/images/preview-thumbnails/thumbnail-01.avif` },
  { id: 2,  src: `${BLOB}/images/preview-thumbnails/thumbnail-02.avif` },
  { id: 3,  src: `${BLOB}/images/preview-thumbnails/thumbnail-03.avif` },
  { id: 4,  src: `${BLOB}/images/preview-thumbnails/thumbnail-04.avif` },
  { id: 5,  src: `${BLOB}/images/preview-thumbnails/thumbnail-05.avif` },
  { id: 6,  src: `${BLOB}/images/preview-thumbnails/thumbnail-06.avif` },
  { id: 7,  src: `${BLOB}/images/preview-thumbnails/thumbnail-07.avif` },
  { id: 8,  src: `${BLOB}/images/preview-thumbnails/thumbnail-08.avif` },
  { id: 9,  src: `${BLOB}/images/preview-thumbnails/thumbnail-09.avif` },
  { id: 10, src: `${BLOB}/images/preview-thumbnails/thumbnail-10.avif` },
  { id: 11, src: `${BLOB}/images/preview-thumbnails/thumbnail-11.avif` },
  { id: 12, src: `${BLOB}/images/preview-thumbnails/thumbnail-12.avif` },
  { id: 13, src: `${BLOB}/images/preview-thumbnails/thumbnail-13.avif` },
  { id: 14, src: `${BLOB}/images/preview-thumbnails/thumbnail-14.avif` },
  { id: 15, src: `${BLOB}/images/preview-thumbnails/thumbnail-15.avif` },
  { id: 16, src: `${BLOB}/images/preview-thumbnails/thumbnail-16.avif` },
  { id: 17, src: `${BLOB}/images/preview-thumbnails/thumbnail-17.avif` },
  { id: 18, src: `${BLOB}/images/preview-thumbnails/thumbnail-18.avif` },
  { id: 19, src: `${BLOB}/images/preview-thumbnails/thumbnail-19.avif` },
  { id: 20, src: `${BLOB}/images/preview-thumbnails/thumbnail-20.avif` },
];

export default function PreviewPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="w-full px-[10px] pt-0 pb-10 s:pb-14 l:px-[16px]">
        <div className="grid grid-cols-1 s:grid-cols-2 m:grid-cols-3 gap-[10px]">
          {thumbnails.map((t) => (
            <Link
              key={t.id}
              href={`/preview/${t.id}`}
              className="block group"
            >
              <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                <Image
                  src={t.src}
                  alt={`Case ${t.id}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={t.id <= 2}
                />
              </div>
            </Link>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
