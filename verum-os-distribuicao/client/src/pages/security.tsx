import { GlassPanel } from '@/components/ui/glass-panel';
import { SecurityStatus } from '@/components/security/security-status';
import { useSystemStats } from '@/hooks/use-system-stats';

export default function Security() {
  const stats = useSystemStats();

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main Security Dashboard */}
        <div className="col-span-8">
          <GlassPanel>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <i className="fas fa-shield-alt text-blue-400 mr-3"></i>
                AXON OMEGA Security Suite
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
                  Maximum Security
                </span>
                <span className="text-xs bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded">
                  Hardware Validated
                </span>
              </div>
            </div>
            
            {/* Security Overview */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-verum-green bg-opacity-20 border border-verum-green rounded-lg p-4 text-center">
                <i className="fas fa-shield-alt text-verum-green text-2xl mb-2"></i>
                <div className="text-lg font-bold text-verum-green">Secure</div>
                <div className="text-xs text-gray-400">System Status</div>
              </div>
              <div className="bg-verum-cyan bg-opacity-20 border border-verum-cyan rounded-lg p-4 text-center">
                <i className="fas fa-eye text-verum-cyan text-2xl mb-2"></i>
                <div className="text-lg font-bold text-verum-cyan">Active</div>
                <div className="text-xs text-gray-400">Witness Protocol</div>
              </div>
              <div className="bg-verum-purple bg-opacity-20 border border-verum-purple rounded-lg p-4 text-center">
                <i className="fas fa-lock text-verum-purple text-2xl mb-2"></i>
                <div className="text-lg font-bold text-verum-purple">256-bit</div>
                <div className="text-xs text-gray-400">Encryption</div>
              </div>
              <div className="bg-verum-orange bg-opacity-20 border border-verum-orange rounded-lg p-4 text-center">
                <i className="fas fa-bug text-verum-orange text-2xl mb-2"></i>
                <div className="text-lg font-bold text-verum-orange">0</div>
                <div className="text-xs text-gray-400">Vulnerabilities</div>
              </div>
            </div>
            
            {/* Security Modules */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Core Security Modules</h3>
                <div className="grid grid-cols-2 gap-4">
                  <SecurityStatus
                    title="Hardware Validation"
                    icon="fas fa-microchip"
                    status="active"
                    description="OpenCore EFI integration with UEFI secure boot validation"
                  />
                  <SecurityStatus
                    title="Witness Protocol"
                    icon="fas fa-eye"
                    status="active"
                    description="Multi-layer verification with audit trails and real-time monitoring"
                  />
                  <SecurityStatus
                    title="Cryptographic Security"
                    icon="fas fa-lock"
                    status="active"
                    description="Enterprise-grade encryption using battle-tested OpenCore libraries"
                  />
                  <SecurityStatus
                    title="Penetration Testing"
                    icon="fas fa-bug"
                    status="active"
                    description="Automated vulnerability scanning and security assessment"
                    lastCheck="2 hours ago"
                  />
                </div>
              </div>
              
              {/* Security Logs */}
              <div>
                <h3 className="text-lg font-medium mb-4">Security Event Log</h3>
                <div className="bg-black bg-opacity-50 rounded-lg p-4 h-64 overflow-auto">
                  <div className="space-y-2 font-mono text-xs">
                    <div className="text-verum-green">[14:23:47] AXON_OMEGA: Hardware validation passed - EFI signature verified</div>
                    <div className="text-verum-cyan">[14:23:46] WITNESS: Protocol integrity check completed - All nodes verified</div>
                    <div className="text-verum-green">[14:23:45] CRYPTO: Key rotation completed - New encryption keys deployed</div>
                    <div className="text-yellow-400">[14:23:44] SCAN: Penetration test initiated - Full system vulnerability assessment</div>
                    <div className="text-verum-green">[14:23:43] OPENCORE: Bootloader security validation passed</div>
                    <div className="text-verum-cyan">[14:23:42] WITNESS: Real-time monitoring active - 3 security nodes online</div>
                    <div className="text-verum-green">[14:23:41] AXON_OMEGA: Security protocols enabled - Maximum protection level</div>
                    <div className="text-gray-400">[14:23:40] SYSTEM: VERUM OS security suite initialized</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
        
        {/* Security Controls */}
        <div className="col-span-4 space-y-6">
          {/* Security Status */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-cog text-verum-cyan mr-2"></i>
              Security Controls
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-verum-glass rounded-lg">
                <div>
                  <div className="text-sm font-medium">AXON OMEGA Executor</div>
                  <div className="text-xs text-gray-400">Hardware-level security</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-4 bg-verum-green rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-verum-glass rounded-lg">
                <div>
                  <div className="text-sm font-medium">Witness Protocol</div>
                  <div className="text-xs text-gray-400">Multi-layer verification</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-4 bg-verum-green rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-verum-glass rounded-lg">
                <div>
                  <div className="text-sm font-medium">Real-time Scanning</div>
                  <div className="text-xs text-gray-400">Continuous threat detection</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-4 bg-verum-green rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-verum-glass rounded-lg">
                <div>
                  <div className="text-sm font-medium">Network Protection</div>
                  <div className="text-xs text-gray-400">Firewall and intrusion detection</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-4 bg-verum-green rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
          
          {/* Threat Intelligence */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-chart-line text-verum-orange mr-2"></i>
              Threat Intelligence
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-verum-green bg-opacity-10 border border-verum-green rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-verum-green">Security Score</span>
                  <span className="text-lg font-bold text-verum-green">98/100</span>
                </div>
                <div className="w-full bg-verum-border rounded-full h-2">
                  <div className="bg-verum-green h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Threats Blocked Today</span>
                  <span className="text-verum-green">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Malware Signatures</span>
                  <span className="text-verum-cyan">Updated</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Patches</span>
                  <span className="text-verum-green">Current</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Full Scan</span>
                  <span className="text-gray-400">2 hours ago</span>
                </div>
              </div>
            </div>
          </GlassPanel>
          
          {/* Quick Actions */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-bolt text-verum-purple mr-2"></i>
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full bg-verum-orange text-white p-3 rounded-lg hover:bg-opacity-80 transition-all">
                <i className="fas fa-search mr-2"></i>
                Run Full System Scan
              </button>
              <button className="w-full bg-verum-glass p-3 rounded-lg hover:bg-opacity-10 transition-all">
                <i className="fas fa-sync mr-2"></i>
                Update Security Signatures
              </button>
              <button className="w-full bg-verum-glass p-3 rounded-lg hover:bg-opacity-10 transition-all">
                <i className="fas fa-history mr-2"></i>
                View Security Report
              </button>
              <button className="w-full bg-verum-glass p-3 rounded-lg hover:bg-opacity-10 transition-all">
                <i className="fas fa-cogs mr-2"></i>
                Advanced Settings
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
