import { MacOSWindow } from '@/components/figma/MacOSWindow';
import { MacOSSidebar } from '@/components/figma/MacOSSidebar';
import { Header } from '@/components/figma/Header';
import { HeroSection } from '@/components/figma/HeroSection';
import { DataTable } from '@/components/figma/DataTable';

export default function FigmaShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background matrix-bg p-6">
      <div className="cyber-grid fixed inset-0 opacity-30 pointer-events-none"></div>
      <MacOSWindow title="VERUM NODE" className="h-[calc(100vh-3rem)] flex flex-col shadow-2xl relative z-10">
        <div className="flex flex-1 overflow-hidden">
          <MacOSSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-gradient-to-b from-background/80 to-background/95 backdrop-blur-sm">
              <div className="p-8 space-y-8">
                <HeroSection />
                <DataTable />
              </div>
            </main>
          </div>
        </div>
      </MacOSWindow>
    </div>
  );
}