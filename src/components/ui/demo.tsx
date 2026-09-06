import { AnimatedFolder } from "@/components/ui/3d-folder";

const portfolioData = [
  {
    title: "Branding & Identities",
    projects: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        title: "Lumnia Identity",
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
        title: "Prism Motion",
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
        title: "Vertex Space",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center w-full">
      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-center w-full">
          {portfolioData.map((folder) => (
            <AnimatedFolder key={folder.title} title={folder.title} projects={folder.projects} />
          ))}
        </div>
      </section>
    </main>
  );
}
