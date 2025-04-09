import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Project ${params.id} - another design`,
  };
}

export async function generateStaticParams() {
  // Generate params for project IDs 1 through 6 (based on available project folders)
  return Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function ProjectDetailPage({ params }: Props) {
  const { id } = params;

  // 使用占位图URL，避免在静态生成时尝试加载不存在的图片
  const mainImageUrl = `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Main+Image`;
  const detail1ImageUrl = `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+1`;
  const detail2ImageUrl = `https://placehold.co/800x600/e2e2e2/white?text=Project+${id}+Detail+2`;

  return (
    <div className="container mx-auto p-6 pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project {id}</h1>
        <p className="text-gray-500">Category: branding</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="project-images space-y-4">
          <img
            src={mainImageUrl}
            alt={`Project ${id} Main Image`}
            className="w-full"
          />
          <img
            src={detail1ImageUrl}
            alt={`Project ${id} Detail 1`}
            className="w-full"
          />
          <img
            src={detail2ImageUrl}
            alt={`Project ${id} Detail 2`}
            className="w-full"
          />
        </div>

        <div className="project-details">
          <h2 className="text-xl font-bold mb-4">Project Description</h2>
          <p className="mb-4">
            This is a detailed description of the project. It provides information about the client, the challenge, and the solution we provided.
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam nisl nisl eget aliquam ultricies.
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Client</h3>
            <p>Client Name</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Year</h3>
            <p>2024</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Services</h3>
            <p>Branding, Design, Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
}
