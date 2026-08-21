import { useState, useEffect } from 'react';
import { MacOSWindow } from '@/components/figma/MacOSWindow';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Battery, 
  Bluetooth,
  Apple,
  Zap,
  Activity,
  Shield,
  Cloud,
  Smartphone
} from 'lucide-react';

interface MacSystemInfo {
  model: string;
  processor: string;
  memory: string;
  storage: string;
  macOS: string;
  serialNumber: string;
  batteryHealth: number;
  thermalState: string;
  performanceMode: string;
}

export default function MacIntegration() {
  const [systemInfo, setSystemInfo] = useState<MacSystemInfo>({
    model: "MacBook Pro 16-inch (2023)",
    processor: "Apple M2 Max with 12-core CPU",
    memory: "32 GB Unified Memory",
    storage: "1 TB SSD",
    macOS: "macOS Sonoma 14.0",
    serialNumber: "C02YW0XMMD6T",
    batteryHealth: 98,
    thermalState: "Optimal",
    performanceMode: "High Performance"
  });

  const [performances, setPerformances] = useState({
    cpu: 89,
    gpu: 92,
    memory: 67,
    storage: 85,
    network: 94,
    battery: 98
  });

  const [ecosystemDevices, setEcosystemDevices] = useState([
    { name: "iPhone 15 Pro", type: "iPhone", connected: true, battery: 87 },
    { name: "iPad Pro 12.9", type: "iPad", connected: true, battery: 92 },
    { name: "Apple Watch Ultra", type: "Watch", connected: true, battery: 76 },
    { name: "AirPods Pro", type: "AirPods", connected: false, battery: 0 },
    { name: "Apple Studio Display", type: "Monitor", connected: true, battery: 100 }
  ]);

  const [intelOptimizations, setIntelOptimizations] = useState({
    turboBoost: 94,
    hyperThreading: 87,
    avxInstructions: 91,
    cacheOptimization: 89,
    powerManagement: 92
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformances(prev => ({
        cpu: Math.max(70, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        gpu: Math.max(80, Math.min(98, prev.gpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(50, Math.min(85, prev.memory + (Math.random() - 0.5) * 15)),
        storage: Math.max(70, Math.min(95, prev.storage + (Math.random() - 0.5) * 5)),
        network: Math.max(85, Math.min(99, prev.network + (Math.random() - 0.5) * 6)),
        battery: Math.max(85, Math.min(100, prev.battery + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background p-6">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none"></div>
      
      <MacOSWindow title="VERUM - Mac & Intel Integration" className="max-w-7xl mx-auto h-[calc(100vh-3rem)] relative z-10">
        <div className="p-8 h-full overflow-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              🔧 VERUM Hardware Integration Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Sistema VERUM NODE com otimizações de hardware para máximo desempenho empresarial
            </p>
          </div>

          <Tabs defaultValue="system" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="system">System Info</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
              <TabsTrigger value="intel">Intel Optimization</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Apple className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">System Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-medium">{systemInfo.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processor:</span>
                      <span className="font-medium">{systemInfo.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memory:</span>
                      <span className="font-medium">{systemInfo.memory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{systemInfo.storage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">macOS:</span>
                      <span className="font-medium">{systemInfo.macOS}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serial:</span>
                      <span className="font-medium font-mono">{systemInfo.serialNumber}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Monitor className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">System Status</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Battery Health</span>
                      <Badge variant="outline" className="text-green-400">
                        {systemInfo.batteryHealth}%
                      </Badge>
                    </div>
                    <Progress value={systemInfo.batteryHealth} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Thermal State</span>
                      <Badge variant="outline" className="text-blue-400">
                        {systemInfo.thermalState}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Performance Mode</span>
                      <Badge variant="outline" className="text-purple-400">
                        {systemInfo.performanceMode}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(performances).map(([key, value]) => {
                  const icons = {
                    cpu: Cpu,
                    gpu: Monitor,
                    memory: HardDrive,
                    storage: HardDrive,
                    network: Wifi,
                    battery: Battery
                  };
                  const Icon = icons[key as keyof typeof icons];
                  
                  return (
                    <Card key={key} className="p-4">
                      <div className="flex items-center mb-3">
                        <Icon className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium capitalize">{key}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Usage</span>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="ecosystem" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ecosystemDevices.map((device, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">{device.name}</span>
                      </div>
                      <Badge variant={device.connected ? "default" : "secondary"}>
                        {device.connected ? "Connected" : "Offline"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <span className="text-sm">{device.type}</span>
                      </div>
                      {device.connected && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Battery</span>
                            <span className="text-sm">{device.battery}%</span>
                          </div>
                          <Progress value={device.battery} className="h-2" />
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intel" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">Intel Optimizations</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(intelOptimizations).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Activity className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">Performance Metrics</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/20 p-3 rounded">
                        <div className="text-xs text-muted-foreground">CPU Cores</div>
                        <div className="text-lg font-bold text-primary">64</div>
                      </div>
                      <div className="bg-muted/20 p-3 rounded">
                        <div className="text-xs text-muted-foreground">Base Clock</div>
                        <div className="text-lg font-bold text-primary">3.8 GHz</div>
                      </div>
                      <div className="bg-muted/20 p-3 rounded">
                        <div className="text-xs text-muted-foreground">Turbo Clock</div>
                        <div className="text-lg font-bold text-primary">5.2 GHz</div>
                      </div>
                      <div className="bg-muted/20 p-3 rounded">
                        <div className="text-xs text-muted-foreground">Cache</div>
                        <div className="text-lg font-bold text-primary">128 MB</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">VERUM Integration</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">macOS Integration</span>
                      <Badge variant="outline" className="text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Intel Optimization</span>
                      <Badge variant="outline" className="text-blue-400">Enhanced</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Apple Silicon Support</span>
                      <Badge variant="outline" className="text-purple-400">M2 Max</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cloud Integration</span>
                      <Badge variant="outline" className="text-cyan-400">iCloud</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Cloud className="h-6 w-6 mr-3 text-primary" />
                    <h3 className="text-xl font-semibold">System Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      Optimize Intel Performance
                    </Button>
                    <Button className="w-full" variant="outline">
                      Sync Apple Ecosystem
                    </Button>
                    <Button className="w-full" variant="outline">
                      Update macOS Integration
                    </Button>
                    <Button className="w-full" variant="outline">
                      Export System Report
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MacOSWindow>
    </div>
  );
}