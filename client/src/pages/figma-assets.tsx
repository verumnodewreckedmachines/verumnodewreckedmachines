import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function FigmaAssets() {
  const components = [
    'Aspect Ratio', 'Form', 'Hover Card', 'Input OTP', 'Input', 'Label',
    'Menubar', 'Pagination', 'Progress', 'Radio Group', 'Resizable',
    'Scroll Area', 'Select', 'Separator', 'Sidebar', 'Slider', 'Switch', 'Table'
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-light mb-2">Figma Premium Assets</h1>
          <p className="text-gray-400">Componentes UI premium integrados do Figma</p>
        </div>

        <div className="mb-8">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-3">🎨</span>
              Status da Integração
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00d4aa]">{components.length}</p>
                <p className="text-gray-400">Componentes Disponíveis</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00d4aa]">100%</p>
                <p className="text-gray-400">Compatibilidade</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00d4aa]">Premium</p>
                <p className="text-gray-400">Licença Ativa</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {components.map((component) => (
            <Card key={component} className="bg-[#1a1a1a] border-[#2a2a2a] p-4 hover:border-[#00d4aa]/30 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">📦</span>
                <h4 className="font-medium mb-2">{component}</h4>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-400">Integrado</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                Sincronizar Figma
              </Button>
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                Exportar Componentes
              </Button>
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                Atualizar Assets
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}