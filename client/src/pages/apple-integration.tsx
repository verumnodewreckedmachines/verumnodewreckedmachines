import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export default function AppleIntegration() {
  const [systemStatus, setSystemStatus] = useState({
    verumOS: false,
    monitor: false,
    mobile: false,
    cloud: false
  });
  
  const [metrics, setMetrics] = useState({
    integration: 78,
    performance: 92,
    security: 100,
    sync: 85
  });
  
  const { toast } = useToast();

  const handleActivation = (service: string) => {
    setSystemStatus(prev => ({
      ...prev,
      [service]: !prev[service as keyof typeof prev]
    }));
    
    toast({
      title: `VERUM ${service.toUpperCase()}`,
      description: `${systemStatus[service as keyof typeof systemStatus] ? 'Desativado' : 'Ativado'} com sucesso`,
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">VERUM Hardware Integration</h1>
          <p className="text-gray-400">Sistema VERUM NODE com otimizações de hardware empresarial</p>
        </div>

        {/* System Status Overview */}
        <div className="mb-8 p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Status do Sistema VERUM</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00d4aa]">{metrics.integration}%</div>
              <div className="text-sm text-gray-400">Integração</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00d4aa]">{metrics.performance}%</div>
              <div className="text-sm text-gray-400">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00d4aa]">{metrics.security}%</div>
              <div className="text-sm text-gray-400">Segurança</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00d4aa]">{metrics.sync}%</div>
              <div className="text-sm text-gray-400">Sincronização</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔧</span>
                VERUM OS Integration
              </div>
              <Badge variant={systemStatus.verumOS ? "default" : "secondary"}>
                {systemStatus.verumOS ? "ATIVO" : "INATIVO"}
              </Badge>
            </h3>
            <p className="text-gray-400 mb-4">Sistema operacional VERUM NODE com interface premium</p>
            <Progress value={systemStatus.verumOS ? 100 : 0} className="mb-4" />
            <Button 
              onClick={() => handleActivation('verumOS')}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black w-full"
            >
              {systemStatus.verumOS ? 'Desativar VERUM OS' : 'Ativar VERUM OS'}
            </Button>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⌚</span>
                VERUM Monitor
              </div>
              <Badge variant={systemStatus.monitor ? "default" : "secondary"}>
                {systemStatus.monitor ? "ATIVO" : "INATIVO"}
              </Badge>
            </h3>
            <p className="text-gray-400 mb-4">Monitoramento de sistema VERUM NODE em tempo real</p>
            <Progress value={systemStatus.monitor ? 92 : 0} className="mb-4" />
            <Button 
              onClick={() => handleActivation('monitor')}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black w-full"
            >
              {systemStatus.monitor ? 'Desativar Monitor' : 'Ativar Monitor'}
            </Button>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📱</span>
                VERUM Mobile
              </div>
              <Badge variant={systemStatus.mobile ? "default" : "secondary"}>
                {systemStatus.mobile ? "ATIVO" : "INATIVO"}
              </Badge>
            </h3>
            <p className="text-gray-400 mb-4">Aplicativo móvel VERUM NODE para controle remoto empresarial</p>
            <Progress value={systemStatus.mobile ? 85 : 0} className="mb-4" />
            <Button 
              onClick={() => handleActivation('mobile')}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black w-full"
            >
              {systemStatus.mobile ? 'Desconectar Mobile' : 'Download VERUM'}
            </Button>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">☁️</span>
                VERUM Cloud
              </div>
              <Badge variant={systemStatus.cloud ? "default" : "secondary"}>
                {systemStatus.cloud ? "SINCRONIZADO" : "OFFLINE"}
              </Badge>
            </h3>
            <p className="text-gray-400 mb-4">Sincronização automática na nuvem VERUM NODE</p>
            <Progress value={systemStatus.cloud ? metrics.sync : 0} className="mb-4" />
            <Button 
              onClick={() => handleActivation('cloud')}
              className="bg-[#00d4aa] hover:bg-[#00b894] text-black w-full"
            >
              {systemStatus.cloud ? 'Desconectar Cloud' : 'Configurar VERUM Cloud'}
            </Button>
          </Card>
        </div>

        {/* Advanced Settings */}
        <div className="mt-8 p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Configurações Avançadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
              onClick={() => toast({ title: "VERUM Sync", description: "Sincronização global iniciada" })}
            >
              Sincronizar Tudo
            </Button>
            <Button 
              variant="outline" 
              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
              onClick={() => toast({ title: "VERUM Reset", description: "Reset de configurações realizado" })}
            >
              Reset Configurações
            </Button>
            <Button 
              variant="outline" 
              className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
              onClick={() => toast({ title: "VERUM Export", description: "Configurações exportadas com sucesso" })}
            >
              Exportar Config
            </Button>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-center">
            <div className="text-2xl font-bold text-[#00d4aa]">24ms</div>
            <div className="text-sm text-gray-400">Latência API</div>
          </div>
          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-center">
            <div className="text-2xl font-bold text-[#00d4aa]">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-center">
            <div className="text-2xl font-bold text-[#00d4aa]">2.1GB</div>
            <div className="text-sm text-gray-400">Dados Sync</div>
          </div>
          <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-center">
            <div className="text-2xl font-bold text-[#00d4aa]">16</div>
            <div className="text-sm text-gray-400">Apps Ativas</div>
          </div>
        </div>
      </div>
    </div>
  );
}