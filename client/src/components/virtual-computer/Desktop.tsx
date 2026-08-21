import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DynamicTransform } from '@/components/effects/DynamicTransform';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Wifi, 
  Battery,
  Settings,
  Folder,
  Terminal,
  Calculator,
  FileText,
  Image,
  Music,
  Video,
  Globe,
  Brain,
  Zap,
  Shield,
  Activity,
  Power,
  Volume2,
  Minimize2,
  Maximize2,
  X,
  Search,
  Calendar,
  Mail,
  Camera,
  Phone,
  Printer,
  Download,
  Upload,
  Save,
  Cloud,
  Archive
} from 'lucide-react';
import { VirtualAppContent } from './VirtualAppContent';
import { virtualApps } from './virtualApps';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  battery: number;
}

interface DesktopProps {
  systemStats: SystemStats;
  runningApps: string[];
  selectedApp: string | null;
  virtualData: any;
  launchApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  saveSystemState: () => boolean;
  loadSystemState: () => boolean;
  setSelectedApp: (appId: string | null) => void;
  showStartMenu: boolean;
  setShowStartMenu: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Desktop({
  systemStats,
  runningApps,
  selectedApp,
  virtualData,
  launchApp,
  closeApp,
  minimizeApp,
  saveSystemState,
  loadSystemState,
  setSelectedApp,
  showStartMenu,
  setShowStartMenu,
  searchQuery,
  setSearchQuery
}: DesktopProps) {
  const filteredApps = virtualApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const appsByCategory = filteredApps.reduce((acc, app) => {
    if (!acc[app.category]) acc[app.category] = [];
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof virtualApps>);

  const saveAppData = (appId: string) => {
    const timestamp = new Date().toISOString();
    // Save logic here
    console.log(`Saving app data for ${appId} at ${timestamp}`);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-6">
        <div className="grid grid-cols-8 gap-4 h-full">
          {virtualApps.slice(0, 16).map((app, index) => (
            <DynamicTransform
              key={app.id}
              effect={{
                type: "holographic",
                trigger: "hover",
                intensity: "medium",
                delay: index * 100,
              }}
            >
              <div
                className="flex flex-col items-center cursor-pointer group p-1 rounded-lg hover:bg-white/5 transition-all duration-300"
                onClick={() => {
                  // Debounce para evitar cliques acidentais
                  setTimeout(() => launchApp(app.id), 150);
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <app.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs text-white text-center font-medium group-hover:text-blue-300">
                  {app.name}
                </span>
              </div>
            </DynamicTransform>
          ))}
        </div>
      </div>

      {/* System Stats Corner */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <Cpu className="h-3 w-3 text-blue-400" />
            <span className="text-white">{systemStats.cpu}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <MemoryStick className="h-3 w-3 text-green-400" />
            <span className="text-white">{systemStats.memory}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery className="h-3 w-3 text-yellow-400" />
            <span className="text-white">{systemStats.battery}%</span>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="absolute bottom-14 left-4 w-80 bg-black/90 backdrop-blur-lg rounded-lg border border-gray-700 shadow-2xl">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {Object.entries(appsByCategory).map(([category, apps]) => (
                <div key={category} className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {apps.map((app) => (
                      <Button
                        key={app.id}
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-gray-700 text-sm py-2"
                        onClick={() => {
                          launchApp(app.id);
                          setShowStartMenu(false);
                        }}
                      >
                        <app.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span className="truncate">{app.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Application Windows */}
      {runningApps.map((appId, index) => {
        const app = virtualApps.find(a => a.id === appId);
        if (!app || selectedApp !== appId) return null;

        // Posicionamento estável sem random
        const offsetX = (index * 30) % 200;
        const offsetY = (index * 20) % 100;

        return (
          <Card
            key={appId}
            className="virtual-window absolute w-4/5 h-4/5 bg-gray-900/95 border-gray-700 backdrop-blur-sm resize overflow-hidden shadow-2xl"
            style={{
              top: `${80 + offsetY}px`,
              left: `${60 + offsetX}px`,
              zIndex: selectedApp === appId ? 50 : 40 + index
            }}
          >
            <CardHeader className="pb-2 bg-gray-800/50 border-b border-gray-700 cursor-move select-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <app.icon className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white text-sm font-medium">{app.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => minimizeApp(appId)}
                    className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-700"
                  >
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0 text-gray-400 hover:bg-gray-700"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => saveAppData(appId)}
                    className="h-6 w-6 p-0 text-green-400 hover:bg-green-700"
                    title="Save"
                  >
                    <Save className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => closeApp(appId)}
                    className="h-6 w-6 p-0 text-red-400 hover:bg-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 h-full overflow-auto custom-scrollbar">
              <VirtualAppContent 
                appId={appId} 
                virtualData={virtualData}
                saveSystemState={saveSystemState}
                loadSystemState={loadSystemState}
              />
            </CardContent>
          </Card>
        );
      })}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-sm border-t border-gray-700 flex items-center px-4">
        <Button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4"
        >
          <Monitor className="h-4 w-4 mr-2" />
          Start
        </Button>

        <Separator orientation="vertical" className="mx-3 h-8" />

        <div className="flex-1 flex items-center space-x-2">
          {runningApps.map(appId => {
            const app = virtualApps.find(a => a.id === appId);
            if (!app) return null;

            return (
              <Button
                key={appId}
                variant={selectedApp === appId ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedApp(appId)}
                className="flex items-center space-x-2"
              >
                <app.icon className="h-4 w-4" />
                <span className="hidden md:inline">{app.name}</span>
              </Button>
            );
          })}
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-300">
          <div className="flex items-center space-x-1">
            <Cpu className="h-3 w-3 text-blue-400" />
            <span>CPU: {systemStats.cpu}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <MemoryStick className="h-3 w-3 text-green-400" />
            <span>RAM: {systemStats.memory}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="h-3 w-3 text-yellow-400" />
            <span>Net: {systemStats.network}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery className="h-3 w-3 text-orange-400" />
            <span>{systemStats.battery}%</span>
          </div>
          <div className="text-gray-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}