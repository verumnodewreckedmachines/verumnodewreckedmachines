import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Thermometer, Activity, BarChart3, TrendingUp } from 'lucide-react';

interface IntelMetrics {
  coreCount: number;
  threadCount: number;
  baseClock: number;
  boostClock: number;
  temperature: number;
  power: number;
  utilization: number;
  instructions: number;
  cache: {
    l1: number;
    l2: number;
    l3: number;
  };
  features: {
    turboBoost: boolean;
    hyperThreading: boolean;
    avx512: boolean;
    deepLearning: boolean;
  };
}

export function IntelPerformanceWidget() {
  const [metrics, setMetrics] = useState<IntelMetrics>({
    coreCount: 24,
    threadCount: 48,
    baseClock: 3.8,
    boostClock: 5.2,
    temperature: 67,
    power: 125,
    utilization: 78,
    instructions: 4.2,
    cache: {
      l1: 1.5,
      l2: 24,
      l3: 54
    },
    features: {
      turboBoost: true,
      hyperThreading: true,
      avx512: true,
      deepLearning: true
    }
  });

  const [performanceMode, setPerformanceMode] = useState<'balanced' | 'performance' | 'power-saver'>('performance');

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        temperature: Math.max(45, Math.min(85, prev.temperature + (Math.random() - 0.5) * 8)),
        power: Math.max(65, Math.min(180, prev.power + (Math.random() - 0.5) * 20)),
        utilization: Math.max(25, Math.min(95, prev.utilization + (Math.random() - 0.5) * 15)),
        instructions: Math.max(2.5, Math.min(6.8, prev.instructions + (Math.random() - 0.5) * 0.8)),
        boostClock: performanceMode === 'performance' ? 
          Math.max(4.8, Math.min(5.4, prev.boostClock + (Math.random() - 0.5) * 0.3)) :
          Math.max(3.2, Math.min(4.2, prev.boostClock + (Math.random() - 0.5) * 0.2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [performanceMode]);

  const getTempColor = (temp: number) => {
    if (temp < 60) return 'text-blue-400';
    if (temp < 75) return 'text-green-400';
    if (temp < 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPowerColor = (power: number) => {
    if (power < 100) return 'text-green-400';
    if (power < 150) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* CPU Overview */}
      <Card className="p-6 col-span-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Cpu className="h-6 w-6 mr-3 text-blue-400" />
            <h3 className="text-xl font-semibold">VERUM NODE Processor</h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={performanceMode === 'power-saver' ? 'default' : 'outline'}
              onClick={() => setPerformanceMode('power-saver')}
            >
              Power Saver
            </Button>
            <Button
              size="sm"
              variant={performanceMode === 'balanced' ? 'default' : 'outline'}
              onClick={() => setPerformanceMode('balanced')}
            >
              Balanced
            </Button>
            <Button
              size="sm"
              variant={performanceMode === 'performance' ? 'default' : 'outline'}
              onClick={() => setPerformanceMode('performance')}
            >
              Performance
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Cores / Threads</div>
            <div className="text-2xl font-bold text-blue-400">{metrics.coreCount} / {metrics.threadCount}</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Base Clock</div>
            <div className="text-2xl font-bold text-green-400">{metrics.baseClock} GHz</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Boost Clock</div>
            <div className="text-2xl font-bold text-purple-400">{metrics.boostClock.toFixed(1)} GHz</div>
          </div>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Instructions/sec</div>
            <div className="text-2xl font-bold text-orange-400">{metrics.instructions.toFixed(1)}B</div>
          </div>
        </div>
      </Card>

      {/* Performance Metrics */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          <h4 className="font-semibold">Performance</h4>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">CPU Utilization</span>
              <span className="text-sm font-medium">{metrics.utilization.toFixed(0)}%</span>
            </div>
            <Progress value={metrics.utilization} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Temperature</span>
              <span className={`text-sm font-medium ${getTempColor(metrics.temperature)}`}>
                {metrics.temperature.toFixed(0)}°C
              </span>
            </div>
            <Progress value={(metrics.temperature / 100) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Power Draw</span>
              <span className={`text-sm font-medium ${getPowerColor(metrics.power)}`}>
                {metrics.power.toFixed(0)}W
              </span>
            </div>
            <Progress value={(metrics.power / 200) * 100} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Cache Information */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          <h4 className="font-semibold">Cache Memory</h4>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">L1 Cache</span>
            <span className="text-sm font-medium">{metrics.cache.l1} MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">L2 Cache</span>
            <span className="text-sm font-medium">{metrics.cache.l2} MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">L3 Cache</span>
            <span className="text-sm font-medium">{metrics.cache.l3} MB</span>
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          <h4 className="font-semibold">VERUM Features</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Turbo Boost</span>
            <Badge variant={metrics.features.turboBoost ? "default" : "secondary"}>
              {metrics.features.turboBoost ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Hyper-Threading</span>
            <Badge variant={metrics.features.hyperThreading ? "default" : "secondary"}>
              {metrics.features.hyperThreading ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">AVX-512</span>
            <Badge variant={metrics.features.avx512 ? "default" : "secondary"}>
              {metrics.features.avx512 ? "Supported" : "Not Supported"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Deep Learning</span>
            <Badge variant={metrics.features.deepLearning ? "default" : "secondary"}>
              {metrics.features.deepLearning ? "Optimized" : "Standard"}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}