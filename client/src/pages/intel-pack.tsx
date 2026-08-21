import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IntelPerformanceWidget } from '@/components/intel/IntelPerformanceWidget';

export default function IntelPack() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-light mb-2">VERUM Performance Pack</h1>
          <p className="text-gray-400">Otimizações avançadas VERUM NODE para máximo desempenho</p>
        </div>

        <IntelPerformanceWidget />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-3">💻</span>
              VERUM Turbo Boost
            </h3>
            <p className="text-gray-400 mb-4">Otimização automática VERUM NODE de frequência do processador</p>
            <Progress value={87} className="mb-4" />
            <p className="text-sm text-gray-500">Performance: 87% acima do baseline</p>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-3">🧠</span>
              Intel AI Acceleration
            </h3>
            <p className="text-gray-400 mb-4">Aceleração de IA com Intel AI Boost</p>
            <Progress value={95} className="mb-4" />
            <p className="text-sm text-gray-500">AI Tasks: 95% mais rápido</p>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-3">⚡</span>
              Hyper-Threading
            </h3>
            <p className="text-gray-400 mb-4">Execução paralela otimizada de threads</p>
            <Progress value={92} className="mb-4" />
            <p className="text-sm text-gray-500">Threads: 16 cores virtuais ativos</p>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="text-2xl mr-3">🔥</span>
              Thermal Management
            </h3>
            <p className="text-gray-400 mb-4">Controle inteligente de temperatura</p>
            <Progress value={76} className="mb-4" />
            <p className="text-sm text-gray-500">Temp: 76°C (Optimal)</p>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações Avançadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                Intel VTune Profiler
              </Button>
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                oneAPI Toolkit
              </Button>
              <Button className="bg-[#00d4aa] hover:bg-[#00b894] text-black">
                Intel Threading Building Blocks
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}