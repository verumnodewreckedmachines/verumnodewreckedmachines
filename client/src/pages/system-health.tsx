import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp
} from 'lucide-react';

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature: number;
    frequency: number;
  };
  memory: {
    used: number;
    total: number;
    available: number;
    swapUsed: number;
  };
  disk: {
    used: number;
    total: number;
    readSpeed: number;
    writeSpeed: number;
  };
  network: {
    downloadSpeed: number;
    uploadSpeed: number;
    latency: number;
    packetsLost: number;
  };
  security: {
    threatLevel: string;
    activeScans: number;
    lastScan: string;
    vulnerabilities: number;
  };
  ai: {
    claudeStatus: string;
    llamaStatus: string;
    mistralStatus: string;
    responseTime: number;
  };
}

interface HealthAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  resolved: boolean;
}

export default function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: { usage: 45, cores: 8, temperature: 68, frequency: 3.2 },
    memory: { used: 12.8, total: 32, available: 19.2, swapUsed: 2.1 },
    disk: { used: 256, total: 1024, readSpeed: 1250, writeSpeed: 980 },
    network: { downloadSpeed: 125.5, uploadSpeed: 87.3, latency: 24, packetsLost: 0.01 },
    security: { threatLevel: 'LOW', activeScans: 3, lastScan: '2 min ago', vulnerabilities: 0 },
    ai: { claudeStatus: 'ONLINE', llamaStatus: 'ONLINE', mistralStatus: 'ONLINE', responseTime: 127 }
  });

  const [alerts, setAlerts] = useState<HealthAlert[]>([
    {
      id: '1',
      type: 'info',
      title: 'AI System Optimized',
      description: 'Triple AI integration running at optimal performance',
      timestamp: new Date(Date.now() - 300000),
      resolved: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'CPU Temperature Rising',
      description: 'CPU temperature at 68°C, consider improving cooling',
      timestamp: new Date(Date.now() - 600000),
      resolved: false
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.max(20, Math.min(90, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          temperature: Math.max(45, Math.min(85, prev.cpu.temperature + (Math.random() - 0.5) * 4))
        },
        memory: {
          ...prev.memory,
          used: Math.max(8, Math.min(28, prev.memory.used + (Math.random() - 0.5) * 2))
        },
        network: {
          ...prev.network,
          latency: Math.max(15, Math.min(150, prev.network.latency + (Math.random() - 0.5) * 10)),
          downloadSpeed: Math.max(80, Math.min(200, prev.network.downloadSpeed + (Math.random() - 0.5) * 20))
        },
        ai: {
          ...prev.ai,
          responseTime: Math.max(80, Math.min(300, prev.ai.responseTime + (Math.random() - 0.5) * 40))
        }
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  const getHealthScore = () => {
    const cpuScore = (100 - metrics.cpu.usage) * 0.3;
    const memoryScore = ((metrics.memory.total - metrics.memory.used) / metrics.memory.total) * 100 * 0.25;
    const diskScore = ((metrics.disk.total - metrics.disk.used) / metrics.disk.total) * 100 * 0.15;
    const networkScore = Math.max(0, (150 - metrics.network.latency) / 150 * 100) * 0.15;
    const securityScore = metrics.security.vulnerabilities === 0 ? 100 : 70;
    const aiScore = (metrics.ai.responseTime < 200 ? 100 : 80) * 0.15;
    
    return Math.round(cpuScore + memoryScore + diskScore + networkScore + securityScore * 0.15 + aiScore);
  };

  const healthScore = getHealthScore();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light mb-2">System Health Dashboard</h1>
              <p className="text-gray-400">Monitoramento personalizado VERUM NODE em tempo real</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Última atualização</div>
              <div className="text-sm flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Health Score Overview */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Sistema VERUM NODE</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    healthScore >= 80 ? 'bg-green-400' : 
                    healthScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                  } animate-pulse`}></div>
                  <span className={
                    healthScore >= 80 ? 'text-green-400' : 
                    healthScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }>
                    {healthScore >= 80 ? 'EXCELENTE' : 
                     healthScore >= 60 ? 'BOM' : 'ATENÇÃO'}
                  </span>
                </div>
                <Badge className="bg-[#00d4aa] text-black">
                  Score: {healthScore}%
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#00d4aa]">{healthScore}%</div>
              <Progress value={healthScore} className="w-32 mt-2" />
            </div>
          </div>
        </Card>

        {/* Alerts Section */}
        {alerts.filter(alert => !alert.resolved).length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Status do Sistema</h3>
            <div className="space-y-3">
              {alerts.filter(alert => !alert.resolved).map(alert => (
                <Alert key={alert.id} className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold">{alert.title}</div>
                    <div className="text-sm text-gray-400">{alert.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* CPU Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Cpu className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">CPU</h3>
              </div>
              <Badge variant={metrics.cpu.usage > 80 ? "destructive" : "secondary"}>
                {metrics.cpu.cores} cores
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Uso</span>
                  <span>{metrics.cpu.usage.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.cpu.usage} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Temperatura</div>
                  <div className="text-lg font-bold">{metrics.cpu.temperature}°C</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Frequência</div>
                  <div className="text-lg font-bold">{metrics.cpu.frequency} GHz</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Memory Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">Memória</h3>
              </div>
              <Badge variant="secondary">
                {metrics.memory.total} GB
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Usado</span>
                  <span>{metrics.memory.used.toFixed(1)} GB</span>
                </div>
                <Progress value={(metrics.memory.used / metrics.memory.total) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Disponível</div>
                  <div className="text-lg font-bold">{metrics.memory.available.toFixed(1)} GB</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Swap</div>
                  <div className="text-lg font-bold">{metrics.memory.swapUsed.toFixed(1)} GB</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Disk Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <HardDrive className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">Armazenamento</h3>
              </div>
              <Badge variant="secondary">
                SSD NVMe
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Usado</span>
                  <span>{metrics.disk.used} GB</span>
                </div>
                <Progress value={(metrics.disk.used / metrics.disk.total) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Leitura</div>
                  <div className="text-lg font-bold">{metrics.disk.readSpeed} MB/s</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Escrita</div>
                  <div className="text-lg font-bold">{metrics.disk.writeSpeed} MB/s</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Network Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wifi className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">Rede</h3>
              </div>
              <Badge variant={metrics.network.latency < 50 ? "default" : "secondary"}>
                {metrics.network.latency.toFixed(0)}ms
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Download</div>
                  <div className="text-lg font-bold">{metrics.network.downloadSpeed.toFixed(1)} Mbps</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Upload</div>
                  <div className="text-lg font-bold">{metrics.network.uploadSpeed.toFixed(1)} Mbps</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Perda de pacotes</div>
                <div className="text-lg font-bold">{metrics.network.packetsLost.toFixed(2)}%</div>
              </div>
            </div>
          </Card>

          {/* Security Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">Segurança</h3>
              </div>
              <Badge variant={metrics.security.threatLevel === 'LOW' ? "default" : "destructive"}>
                {metrics.security.threatLevel}
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400">Scans Ativos</div>
                  <div className="text-lg font-bold">{metrics.security.activeScans}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Vulnerabilidades</div>
                  <div className="text-lg font-bold text-green-400">{metrics.security.vulnerabilities}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Último scan</div>
                <div className="text-sm">{metrics.security.lastScan}</div>
              </div>
            </div>
          </Card>

          {/* AI System Metrics */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Zap className="h-6 w-6 text-[#00d4aa] mr-3" />
                <h3 className="text-lg font-semibold">Sistema AI</h3>
              </div>
              <Badge variant="default">
                Triple AI
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Claude Sonnet-4</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Llama 2 70B</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mistral Large</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Tempo de resposta médio</div>
                <div className="text-lg font-bold">{metrics.ai.responseTime}ms</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <TrendingUp className="h-6 w-6 text-[#00d4aa] mr-3" />
              Tendências de Performance
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#0f0f0f] rounded">
              <div className="text-2xl font-bold text-green-400">+12%</div>
              <div className="text-sm text-gray-400">Performance geral (24h)</div>
            </div>
            <div className="text-center p-4 bg-[#0f0f0f] rounded">
              <div className="text-2xl font-bold text-blue-400">-8ms</div>
              <div className="text-sm text-gray-400">Latência AI (7d)</div>
            </div>
            <div className="text-center p-4 bg-[#0f0f0f] rounded">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime (30d)</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}