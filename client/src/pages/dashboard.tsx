import { useState } from 'react';
import { TerminalInterface } from '@/components/terminal/terminal-interface';
import { Calculator } from '@/components/apps/calculator';
import { Notepad } from '@/components/apps/notepad';
import { FileManager } from '@/components/apps/file-manager';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { SAMPLE_APPS, SAMPLE_DOCUMENTS } from '@/lib/constants';
import { useSystemStats } from '@/hooks/use-system-stats';
import { SecurityStatus } from '@/components/security/security-status';

export default function Dashboard() {
  const stats = useSystemStats();
  const [openApps, setOpenApps] = useState<string[]>([]);

  const toggleApp = (appName: string) => {
    setOpenApps(prev => 
      prev.includes(appName) 
        ? prev.filter(app => app !== appName)
        : [...prev, appName]
    );
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      {/* Opened Applications */}
      {openApps.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Running Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
              <div className="relative col-span-full">
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
              <div className="relative col-span-full">
                <Button 
                  className="absolute top-2 right-2 z-10 w-8 h-8 p-0 bg-red-600 hover:bg-red-700"
                  onClick={() => toggleApp('filemanager')}
                >
                  ×
                </Button>
                <FileManager />
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

      {/* Quick Actions */}
      <div className="col-span-4 space-y-6">
        {/* Node Store Panel */}
        <GlassPanel className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-store text-verum-purple mr-2"></i>
            VERUM Node Store
          </h3>
          <div className="space-y-3">
            {SAMPLE_APPS.slice(0, 2).map((app, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-verum-glass rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-verum-purple rounded-lg flex items-center justify-center mr-3`}>
                    <i className={`${app.iconClass} text-white text-xs`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{app.name}</div>
                    <div className="text-xs text-gray-400">{app.securityValidated ? 'Security validated' : 'Pending validation'}</div>
                  </div>
                </div>
                <button 
                  className="text-xs bg-verum-purple text-white px-3 py-1 rounded hover:bg-verum-purple/80"
                  onClick={() => {
                    if (app.name.includes('Calculator') || app.name.includes('Calc')) {
                      toggleApp('calculator');
                    } else if (app.name.includes('Notepad') || app.name.includes('Text')) {
                      toggleApp('notepad');
                    } else if (app.name.includes('Files') || app.name.includes('Explorer')) {
                      toggleApp('filemanager');
                    }
                  }}
                >
                  {index === 0 ? 'Open' : 'Launch'}
                </button>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* System Monitor */}
        <GlassPanel className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-chart-line text-verum-cyan mr-2"></i>
            Enterprise Monitor
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>TOML Build Performance</span>
                <span className="text-verum-green">Excellent</span>
              </div>
              <div className="w-full bg-verum-border rounded-full h-2">
                <div className="bg-verum-green h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cross-platform Compatibility</span>
                <span className="text-verum-cyan">98%</span>
              </div>
              <div className="w-full bg-verum-border rounded-full h-2">
                <div className="bg-verum-cyan h-2 rounded-full" style={{width: '98%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Security Validation</span>
                <span className="text-verum-purple">Maximum</span>
              </div>
              <div className="w-full bg-verum-border rounded-full h-2">
                <div className="bg-verum-purple h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Development Tools */}
        <GlassPanel className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-tools text-verum-orange mr-2"></i>
            Dev Environment
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-verum-glass hover:bg-verum-orange hover:bg-opacity-20 p-3 rounded-lg text-center transition-all">
              <i className="fas fa-file-code text-verum-orange text-lg mb-1"></i>
              <div className="text-xs">TOML Editor</div>
            </button>
            <button className="bg-verum-glass hover:bg-verum-cyan hover:bg-opacity-20 p-3 rounded-lg text-center transition-all">
              <i className="fas fa-play text-verum-cyan text-lg mb-1"></i>
              <div className="text-xs">Build System</div>
            </button>
            <button className="bg-verum-glass hover:bg-verum-green hover:bg-opacity-20 p-3 rounded-lg text-center transition-all">
              <i className="fas fa-vials text-verum-green text-lg mb-1"></i>
              <div className="text-xs">Test Suite</div>
            </button>
            <button className="bg-verum-glass hover:bg-verum-purple hover:bg-opacity-20 p-3 rounded-lg text-center transition-all">
              <i className="fas fa-rocket text-verum-purple text-lg mb-1"></i>
              <div className="text-xs">Deploy</div>
            </button>
          </div>
        </GlassPanel>
      </div>

      {/* Office Section */}
      <div className="col-span-8">
        <GlassPanel>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <i className="fas fa-briefcase text-verum-green mr-3"></i>
              Decentralized Office Suite
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
                P2P Enabled
              </span>
              <span className="text-xs bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded">
                Offline Ready
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-verum-glass rounded-lg p-4 hover:bg-opacity-10 cursor-pointer transition-all">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-file-word text-blue-400 text-2xl"></i>
                <span className="text-xs text-gray-400">24 docs</span>
              </div>
              <h3 className="font-medium mb-1">VERUM Writer</h3>
              <p className="text-xs text-gray-400">Decentralized document processing</p>
            </div>
            
            <div className="bg-verum-glass rounded-lg p-4 hover:bg-opacity-10 cursor-pointer transition-all">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-table text-verum-green text-2xl"></i>
                <span className="text-xs text-gray-400">12 sheets</span>
              </div>
              <h3 className="font-medium mb-1">VERUM Calc</h3>
              <p className="text-xs text-gray-400">P2P spreadsheet collaboration</p>
            </div>
            
            <div className="bg-verum-glass rounded-lg p-4 hover:bg-opacity-10 cursor-pointer transition-all">
              <div className="flex items-center justify-between mb-3">
                <i className="fas fa-presentation text-verum-orange text-2xl"></i>
                <span className="text-xs text-gray-400">8 decks</span>
              </div>
              <h3 className="font-medium mb-1">VERUM Present</h3>
              <p className="text-xs text-gray-400">Holographic presentations</p>
            </div>
          </div>
          
          {/* Recent Documents */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Documents</h3>
            <div className="space-y-2">
              {SAMPLE_DOCUMENTS.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-verum-glass rounded-lg hover:bg-opacity-10 cursor-pointer transition-all">
                  <div className="flex items-center">
                    <i className={`${doc.iconClass} ${doc.color} mr-3`}></i>
                    <div>
                      <div className="text-sm font-medium">{doc.title}</div>
                      <div className="text-xs text-gray-400">Modified {doc.lastModified} • {doc.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      doc.syncStatus === 'synced' ? 'bg-verum-green' :
                      doc.syncStatus === 'syncing' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span className="text-xs text-gray-400 capitalize">{doc.syncStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Security Panel */}
      <div className="col-span-4">
        <GlassPanel>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
            AXON Security
          </h3>
          
          <div className="space-y-4">
            <SecurityStatus
              title="Hardware Validation"
              icon="fas fa-microchip"
              status="active"
              description="OpenCore EFI integration active"
            />
            
            <SecurityStatus
              title="Witness Protocol"
              icon="fas fa-eye"
              status="active"
              description="Multi-layer verification enabled"
            />
            
            <SecurityStatus
              title="Cryptographic Security"
              icon="fas fa-lock"
              status="active"
              description="Enterprise-grade encryption"
            />
            
            <div className="p-3 bg-verum-glass rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <i className="fas fa-bug text-verum-orange mr-2"></i>
                  <span className="text-sm font-medium">Penetration Testing</span>
                </div>
                <span className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">active</span>
              </div>
              <div className="text-xs text-gray-400">Last scan: 2 hours ago</div>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-verum-green bg-opacity-10 border border-verum-green rounded-lg">
            <div className="flex items-center">
              <i className="fas fa-info-circle text-verum-green mr-2"></i>
              <div>
                <div className="text-sm font-medium text-verum-green">System Secure</div>
                <div className="text-xs text-gray-400">All security protocols active</div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
    </div>
  );
}
