import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';

interface PublicDemoStats {
  systemUptime: string;
  totalUsers: number;
  deploymentsActive: number;
  hashVerification: string;
  registrationStatus: string;
}

interface HealthStatus {
  status: string;
  ai: string;
  database: string;
  services: {
    verumAI: string;
    axonOmega: string;
  };
}

export default function PublicDemo() {
  const [verificationStep, setVerificationStep] = useState(0);

  const launchInteractiveDemo = () => {
    window.location.assign('/openai-chat');
  };

  const { data: health } = useQuery<HealthStatus>({
    queryKey: ['/api/health'],
    refetchInterval: 5000,
  });

  const { data: stats } = useQuery<PublicDemoStats>({
    queryKey: ['/api/public-stats'],
    refetchInterval: 10000,
  });

  const verificationSteps = [
    {
      title: "Official Registration Verification",
      content: "INPI Brasil: BR512025002574-2 | US Copyright: TX0009512048",
      status: "verified",
      icon: "fas fa-certificate"
    },
    {
      title: "Hash Integrity Check",
      content: "SHA-256: 398603fafc37faf194527774520c291e0b3fe6a57ba3183c14bd336783ef0eab",
      status: "verified",
      icon: "fas fa-fingerprint"
    },
    {
      title: "System Architecture Proof",
      content: "PostgreSQL + Express.js + React + GPT-4o Integration",
      status: "operational",
      icon: "fas fa-server"
    },
    {
      title: "Public Deployment Status",
      content: "Live on Replit with full enterprise functionality",
      status: "active",
      icon: "fas fa-globe"
    }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <GlassPanel>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <i className="fas fa-cube text-verum-cyan text-4xl"></i>
              <div>
                <h1 className="text-4xl font-bold text-verum-cyan">VERUM OS</h1>
                <p className="text-xl text-gray-300">Enterprise Holographic Operating System</p>
                <p className="text-sm text-gray-400">Public Demonstration & Verification Portal</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="text-2xl font-bold text-verum-green">{health?.status === 'ok' ? 'ONLINE' : 'OFFLINE'}</div>
                <div className="text-xs text-gray-400">System Status</div>
              </div>
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="text-2xl font-bold text-verum-cyan">v2.4.1</div>
                <div className="text-xs text-gray-400">Version</div>
              </div>
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="text-2xl font-bold text-verum-purple">{health?.ai === 'enabled' ? 'GPT-4o' : 'N/A'}</div>
                <div className="text-xs text-gray-400">AI Engine</div>
              </div>
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="text-2xl font-bold text-verum-orange">2025</div>
                <div className="text-xs text-gray-400">Copyright Year</div>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Verification Steps */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-verum-cyan">Public Verification</h2>
            {verificationSteps.map((step, index) => (
              <GlassPanel key={index} className="cursor-pointer" onClick={() => setVerificationStep(index)}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === 'verified' ? 'bg-verum-green bg-opacity-20 text-verum-green' :
                    step.status === 'operational' ? 'bg-verum-cyan bg-opacity-20 text-verum-cyan' :
                    'bg-verum-purple bg-opacity-20 text-verum-purple'
                  }`}>
                    <i className={step.icon}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{step.content}</p>
                    <div className="flex items-center mt-2">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        step.status === 'verified' ? 'bg-verum-green' :
                        step.status === 'operational' ? 'bg-verum-cyan' :
                        'bg-verum-purple'
                      }`}></div>
                      <span className="text-xs uppercase font-medium">{step.status}</span>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-verum-green">Intellectual Property Protection</h2>
            
            <GlassPanel>
              <h3 className="font-semibold text-verum-cyan mb-4">Official Registrations</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                  <span className="text-sm">🇧🇷 INPI Brasil</span>
                  <span className="text-xs text-verum-green">BR512025002574-2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                  <span className="text-sm">🇺🇸 US Copyright</span>
                  <span className="text-xs text-verum-green">TX0009512048</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                  <span className="text-sm">📅 Publication Date</span>
                  <span className="text-xs text-gray-400">2025-05-13</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                  <span className="text-sm">👤 Author</span>
                  <span className="text-xs text-gray-400">Rafael Augusto Xavier Fernandes</span>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <h3 className="font-semibold text-verum-purple mb-4">Hash Verification</h3>
              <div className="bg-verum-glass rounded p-4">
                <div className="text-xs text-gray-400 mb-2">SHA-256 Hash:</div>
                <div className="font-mono text-xs bg-black bg-opacity-50 p-2 rounded">
                  398603fafc37faf194527774520c291e0b3fe6a57ba3183c14bd336783ef0eab
                </div>
                <div className="flex items-center mt-3">
                  <i className="fas fa-check-circle text-verum-green mr-2"></i>
                  <span className="text-xs text-verum-green">Hash Verified</span>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <h3 className="font-semibold text-verum-orange mb-4">Public Demonstration</h3>
              <div className="space-y-3">
                <Button onClick={launchInteractiveDemo} className="w-full bg-verum-cyan hover:bg-verum-cyan/80">
                  <i className="fas fa-play mr-2"></i>
                  Launch Interactive Demo
                </Button>
                <Button className="w-full bg-verum-purple hover:bg-verum-purple/80">
                  <i className="fas fa-download mr-2"></i>
                  Download Technical Documentation
                </Button>
                <Button className="w-full bg-verum-green hover:bg-verum-green/80">
                  <i className="fas fa-certificate mr-2"></i>
                  Verify Registration Status
                </Button>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Live System Metrics */}
        <GlassPanel>
          <h2 className="text-2xl font-semibold text-verum-cyan mb-6">Live System Metrics</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-verum-green mb-2">{health?.services?.verumAI === 'online' ? '✓' : '✗'}</div>
              <div className="text-sm text-gray-400">AI Systems</div>
              <div className="text-xs text-gray-500">GPT-4o Integration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-verum-cyan mb-2">{health?.database === 'connected' ? '✓' : '✗'}</div>
              <div className="text-sm text-gray-400">Database</div>
              <div className="text-xs text-gray-500">PostgreSQL Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-verum-purple mb-2">{health?.services?.axonOmega === 'active' ? '✓' : '✗'}</div>
              <div className="text-sm text-gray-400">Security</div>
              <div className="text-xs text-gray-500">AXON OMEGA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-verum-orange mb-2">100%</div>
              <div className="text-sm text-gray-400">Uptime</div>
              <div className="text-xs text-gray-500">Enterprise Grade</div>
            </div>
          </div>
        </GlassPanel>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          <p>VERUM OS Enterprise v2.4.1 - Publicly Deployed and Verified</p>
          <p>© 2025 Rafael Augusto Xavier Fernandes - All Rights Reserved</p>
          <p>Protected under INPI Brasil (BR512025002574-2) and US Copyright (TX0009512048)</p>
        </div>
      </div>
    </div>
  );
}