import { Footer } from "@/components/page/footer";
import { Navbar } from "@/components/page/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";

const footerComponents = [
  {
    title: "Tools",
    items: [
      { text: "Glossary", path: "/glossary" }
    ]
  }
];

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <ScrollToTop />
      <Navbar />
      <main className="flex flex-col flex-1">
        {children}
      </main>
      <Footer items={footerComponents} />
    </div>
  );
}
