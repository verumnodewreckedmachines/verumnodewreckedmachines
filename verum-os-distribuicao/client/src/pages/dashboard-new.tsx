import { useState } from 'react';
import { TerminalInterface } from '@/components/terminal/terminal-interface';
import { Calculator } from '@/components/apps/calculator';
import { Notepad } from '@/components/apps/notepad';
import { FileManager } from '@/components/apps/file-manager';
import { KernelManager } from '@/components/apps/kernel-manager';
import { WebServer } from '@/components/apps/web-server';
import { OmegaConsole } from '@/components/apps/omega-console';
import { QuantumBridge } from '@/components/apps/quantum-bridge';
import { AICentral } from '@/components/apps/ai-central';
import { AxonOmegaIntegration } from '@/components/apps/axon-omega-integration';
import { VerumSupreme } from '@/components/apps/verum-supreme';
import { CommandCenter } from '@/components/apps/command-center';
import { SecurityOTP } from '@/components/apps/security-otp';
import { DataTableAdvanced } from '@/components/apps/data-table-advanced';
import { TransformShowcase } from '@/components/apps/transform-showcase';
import { TerminalPurposeDemo } from '@/components/apps/terminal-purpose-demo';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { HolographicTransform, QuantumTransform } from '@/components/ui/dynamic-transforms';

export default function Dashboard() {
  const [openApps, setOpenApps] = useState<string[]>([]);

  const toggleApp = (appName: string) => {
    setOpenApps(prev => 
      prev.includes(appName) 
        ? prev.filter(app => app !== appName)
        : [...prev, appName]
    );
  };

  const apps = [
    { name: 'VERUM Calculator Pro', type: 'calculator', icon: 'fas fa-calculator' },
    { name: 'Holographic Notepad', type: 'notepad', icon: 'fas fa-edit' },
    { name: 'Enterprise File Manager', type: 'filemanager', icon: 'fas fa-folder-open' },
    { name: 'Alpha Kernel Manager', type: 'kernelmanager', icon: 'fas fa-microchip' },
    { name: 'Hono Web Server', type: 'webserver', icon: 'fas fa-server' },
    { name: 'OMEGA Console', type: 'omegaconsole', icon: 'fas fa-atom' },
    { name: 'Quantum Bridge', type: 'quantumbridge', icon: 'fas fa-network-wired' },
    { name: 'AI Central Hub', type: 'aicentral', icon: 'fas fa-brain' },
    { name: 'AXON OMEGA Integration', type: 'axonomega', icon: 'fas fa-cog' },
    { name: 'VERUM SUPREME', type: 'verumsupreme', icon: 'fas fa-crown' },
    { name: 'Central de Comando', type: 'commandcenter', icon: 'fas fa-terminal' },
    { name: 'Sistema OTP Seguro', type: 'securityotp', icon: 'fas fa-shield-alt' },
    { name: 'Tabela de Dados VERUM', type: 'datatable', icon: 'fas fa-table' },
    { name: 'Transform Effects', type: 'transforms', icon: 'fas fa-magic' },
    { name: 'Por Que Terminal?', type: 'terminalpurpose', icon: 'fas fa-question-circle' }
  ];

  return (
    <div className="flex-1 p-6 overflow-auto">
      {/* Quick Launch */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-rocket text-verum-cyan mr-2"></i>
          Quick Launch - Aplicações Funcionais
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.map((app, index) => (
            <HolographicTransform
              key={app.type}
              trigger="hover"
              intensity="medium"
              delay={index * 0.05}
            >
              <Button
                onClick={() => toggleApp(app.type)}
                className="h-20 bg-verum-glass hover:bg-verum-purple/20 flex flex-col items-center justify-center"
              >
                <i className={`${app.icon} text-2xl mb-2 text-verum-cyan`}></i>
                <span className="text-sm text-center">{app.name}</span>
              </Button>
            </HolographicTransform>
          ))}
        </div>
      </div>

      {/* Opened Applications */}
      {openApps.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Aplicações Abertas</h2>
          <div className="space-y-6">
            {openApps.includes('calculator') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('calculator')}
                >
                  ×
                </Button>
                <Calculator />
              </div>
            )}
            {openApps.includes('notepad') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('notepad')}
                >
                  ×
                </Button>
                <Notepad />
              </div>
            )}
            {openApps.includes('filemanager') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('filemanager')}
                >
                  ×
                </Button>
                <FileManager />
              </div>
            )}
            {openApps.includes('kernelmanager') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('kernelmanager')}
                >
                  ×
                </Button>
                <KernelManager />
              </div>
            )}
            {openApps.includes('webserver') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('webserver')}
                >
                  ×
                </Button>
                <WebServer />
              </div>
            )}
            {openApps.includes('omegaconsole') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('omegaconsole')}
                >
                  ×
                </Button>
                <OmegaConsole />
              </div>
            )}
            {openApps.includes('quantumbridge') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('quantumbridge')}
                >
                  ×
                </Button>
                <QuantumBridge />
              </div>
            )}
            {openApps.includes('aicentral') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('aicentral')}
                >
                  ×
                </Button>
                <AICentral />
              </div>
            )}
            {openApps.includes('axonomega') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('axonomega')}
                >
                  ×
                </Button>
                <AxonOmegaIntegration />
              </div>
            )}
            {openApps.includes('verumsupreme') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('verumsupreme')}
                >
                  ×
                </Button>
                <VerumSupreme />
              </div>
            )}
            
            {openApps.includes('commandcenter') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('commandcenter')}
                >
                  ×
                </Button>
                <CommandCenter />
              </div>
            )}

            {openApps.includes('securityotp') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('securityotp')}
                >
                  ×
                </Button>
                <SecurityOTP />
              </div>
            )}

            {openApps.includes('datatable') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('datatable')}
                >
                  ×
                </Button>
                <DataTableAdvanced />
              </div>
            )}

            {openApps.includes('transforms') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('transforms')}
                >
                  ×
                </Button>
                <TransformShowcase />
              </div>
            )}

            {openApps.includes('terminalpurpose') && (
              <div className="relative">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('terminalpurpose')}
                >
                  ×
                </Button>
                <TerminalPurposeDemo />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Terminal Panel */}
        <div className="col-span-8">
          <TerminalInterface />
        </div>

        {/* Quick Info */}
        <div className="col-span-4 space-y-6">
          {/* System Status */}
          <GlassPanel className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-desktop text-verum-green mr-2"></i>
              VERUM OS Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Sistema:</span>
                <span className="text-verum-green">Funcional</span>
              </div>
              <div className="flex justify-between">
                <span>Apps Abertas:</span>
                <span className="text-verum-cyan">{openApps.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className="text-verum-green">99.7%</span>
              </div>
              <div className="flex justify-between">
                <span>Segurança:</span>
                <span className="text-verum-green">Ativa</span>
              </div>
            </div>
          </GlassPanel>

          {/* Features */}
          <GlassPanel className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-star text-verum-purple mr-2"></i>
              Funcionalidades
            </h3>
            <div className="space-y-2">
              <div className="text-sm flex items-center">
                <i className="fas fa-check text-verum-green mr-2"></i>
                Calculadora funcional
              </div>
              <div className="text-sm flex items-center">
                <i className="fas fa-check text-verum-green mr-2"></i>
                Editor de texto
              </div>
              <div className="text-sm flex items-center">
                <i className="fas fa-check text-verum-green mr-2"></i>
                Gerenciador de arquivos
              </div>
              <div className="text-sm flex items-center">
                <i className="fas fa-check text-verum-green mr-2"></i>
                Terminal interativo
              </div>
              <div className="text-sm flex items-center">
                <i className="fas fa-check text-verum-green mr-2"></i>
                Sistema holográfico
              </div>
            </div>
          </GlassPanel>

          {/* Instructions */}
          <GlassPanel className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-info-circle text-verum-cyan mr-2"></i>
              Como Usar
            </h3>
            <div className="space-y-2 text-sm">
              <div>• Clique nos botões acima para abrir apps</div>
              <div>• Terminal: calc 15*3, weather Rio</div>
              <div>• Witness: witness "meu texto"</div>
              <div>• Sistema: system-info, ps, top</div>
              <div>• Navegue pelo menu lateral</div>
              <div>• Feche apps com o botão × vermelho</div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}