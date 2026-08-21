import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DynamicTransform } from '@/components/effects/DynamicTransform';
import { 
  Database, 
  Cpu, 
  HardDrive, 
  Zap, 
  Shield, 
  TrendingUp,
  Activity,
  Settings,
  Brain,
  Palette,
  Smartphone,
  Laptop,
  Terminal,
  Code,
  BarChart3
} from 'lucide-react';

export default function VerumDashboard() {
  const [, navigate] = useLocation();

  // Seus aplicativos personalizados com componentes Figma
  const verumApps = [
    { 
      name: 'VERUM Console IA', 
      icon: Brain, 
      route: '/ai-console', 
      color: 'from-violet-500 via-purple-500 to-indigo-600', 
      description: 'Claude Sonnet-4 · Seu assistente pessoal',
      status: 'premium'
    },
    { 
      name: 'Chat Inteligente', 
      icon: Terminal, 
      route: '/claude-chat', 
      color: 'from-emerald-400 via-teal-500 to-cyan-600', 
      description: 'Conversa direta com IA avançada',
      status: 'ativo'
    },
    { 
      name: 'Seus Assets Figma', 
      icon: Palette, 
      route: '/figma-assets', 
      color: 'from-pink-400 via-rose-500 to-red-500', 
      description: '18 componentes premium integrados',
      status: 'personalizado'
    },
    { 
      name: 'Apple Ecosystem', 
      icon: Smartphone, 
      route: '/apple-integration', 
      color: 'from-slate-400 via-gray-500 to-zinc-600', 
      description: 'macOS · iOS · Watch · iCloud',
      status: 'conectado'
    },
    { 
      name: 'Intel Performance', 
      icon: Laptop, 
      route: '/intel-pack', 
      color: 'from-blue-400 via-sky-500 to-indigo-600', 
      description: 'Otimização máxima de hardware',
      status: 'otimizado'
    },
    { 
      name: 'OpenAI Alternative', 
      icon: Zap, 
      route: '/openai-chat', 
      color: 'from-green-400 via-emerald-500 to-teal-600', 
      description: 'GPT-4o como backup',
      status: 'backup'
    },
    { 
      name: 'Virtual Computer', 
      icon: Terminal, 
      route: '/virtual-computer', 
      color: 'from-indigo-400 via-purple-500 to-pink-600', 
      description: 'AI-Powered Virtual Desktop + Print + Save System',
      status: 'novo'
    },
  ];

  const realTimeMetrics = [
    { label: 'Neural Processing', value: 97, icon: Brain, color: 'text-purple-400', unit: 'TFLOPS' },
    { label: 'CPU Intel', value: 34, icon: Cpu, color: 'text-blue-400', unit: '%' },
    { label: 'RAM DDR5', value: 68, icon: Database, color: 'text-green-400', unit: 'GB' },
    { label: 'NVMe SSD', value: 52, icon: HardDrive, color: 'text-yellow-400', unit: '%' },
  ];

  const figmaIntegration = [
    { component: 'Menubar', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Pagination', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Progress', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Radio Groups', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Resizable Panels', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Scroll Areas', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Select Premium', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Separators', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Sliders', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Switches', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Tables Advanced', status: 'integrado', color: 'text-emerald-400' },
    { component: 'Input OTP', status: 'integrado', color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Efeito de fundo sutil */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
      </div>
      
      {/* Header Personalizado VERUM */}
      <div className="relative border-b border-[#2a2a2a] bg-[#0f0f0f]/90 backdrop-blur-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-light bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                VERUM OS
              </h1>
              <p className="text-gray-400 text-sm">
                Seu Sistema Personalizado · Design Figma Premium · Zero Propaganda OpenAI
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              Figma Integrado
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Brain className="w-3 h-3 mr-1" />
              IA Ativa
            </Badge>
            <Button variant="outline" size="sm" className="border-[#2a2a2a] hover:border-purple-500/30">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative p-6 space-y-8">
        {/* Suas Aplicações - Design Personalizado */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-light mr-4">Suas Aplicações Exclusivas</h2>
            <Separator className="flex-1 bg-gradient-to-r from-[#2a2a2a] to-transparent" />
            <span className="text-sm text-gray-500 ml-4">Powered by Figma Premium</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verumApps.map((app, index) => {
              const IconComponent = app.icon;
              return (
                <DynamicTransform
                  key={app.name}
                  effect={{
                    type: 'holographic',
                    trigger: 'hover',
                    intensity: 'medium',
                    duration: 800,
                    delay: index * 100,
                    particles: true
                  }}
                >
                  <Card 
                    className="bg-[#1a1a1a]/60 border-[#2a2a2a] hover:border-purple-500/30 transition-all duration-500 cursor-pointer group overflow-hidden relative backdrop-blur-sm"
                    onClick={() => navigate(app.route)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-5 group-hover:opacity-15 transition-all duration-500`} />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${app.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-[#0f0f0f]/80 border-[#2a2a2a] capitalize"
                      >
                        {app.status}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{app.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                        <span className="text-xs text-gray-500">Funcionando</span>
                      </div>
                      <div className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Clique para abrir →
                      </div>
                    </div>
                  </div>
                  </Card>
                </DynamicTransform>
              );
            })}
          </div>
        </section>

        {/* Performance Real */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-light mr-4">Performance em Tempo Real</h2>
            <Separator className="flex-1 bg-gradient-to-r from-[#2a2a2a] to-transparent" />
            <BarChart3 className="w-4 h-4 text-gray-500 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realTimeMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card 
                  key={metric.label} 
                  className="bg-[#1a1a1a]/60 border-[#2a2a2a] p-6 hover:border-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                    <div className="text-right">
                      <span className="text-2xl font-light">{metric.value}</span>
                      <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium mb-3">{metric.label}</h3>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    Otimizado para performance máxima
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Status Figma Integration */}
        <section>
          <Card className="bg-[#1a1a1a]/60 border-[#2a2a2a] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-pink-400" />
                <h3 className="text-lg font-medium">Seus Componentes Figma Premium</h3>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                18/18 Integrados
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {figmaIntegration.map((item, index) => (
                <div 
                  key={item.component}
                  className="flex items-center justify-between p-3 bg-[#0f0f0f]/50 rounded-lg border border-[#2a2a2a]/50 hover:border-emerald-500/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium">{item.component}</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                    <span className={`text-xs ${item.color}`}>✓</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-lg border border-emerald-500/20">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-medium text-emerald-400">100% Seus Designs</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Todos os componentes são baseados nos seus designs Figma premium, sem nenhuma influência OpenAI
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}