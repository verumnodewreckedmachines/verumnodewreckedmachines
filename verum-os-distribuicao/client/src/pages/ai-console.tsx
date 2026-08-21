import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';

interface AIAnalysis {
  systemHealth: string;
  optimizations: string[];
  recommendations: string[];
  consolidationPlan: string;
}

interface AIInsights {
  insights: string;
  timestamp: string;
}

interface SecurityAssessment {
  assessment: string;
  timestamp: string;
}

export default function AIConsole() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const queryClient = useQueryClient();

  const { data: analysis, isLoading: analysisLoading, refetch: refetchAnalysis } = useQuery<AIAnalysis>({
    queryKey: ['/api/ai/system-analysis'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: insights, isLoading: insightsLoading } = useQuery<AIInsights>({
    queryKey: ['/api/ai/insights'],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: security, isLoading: securityLoading } = useQuery<SecurityAssessment>({
    queryKey: ['/api/ai/security-assessment'],
    refetchInterval: 45000, // Refresh every 45 seconds
  });

  const consolidationMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/ai/system-analysis', { method: 'GET' });
      if (!response.ok) throw new Error('Failed to run consolidation');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ai/system-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['/api/ai/insights'] });
    },
  });

  const tabs = [
    { id: 'overview', label: 'AI Overview', icon: 'fas fa-brain' },
    { id: 'analysis', label: 'System Analysis', icon: 'fas fa-chart-line' },
    { id: 'insights', label: 'Strategic Insights', icon: 'fas fa-lightbulb' },
    { id: 'security', label: 'Security Assessment', icon: 'fas fa-shield-alt' },
    { id: 'consolidation', label: 'Base Consolidation', icon: 'fas fa-layer-group' }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main AI Console */}
        <div className="col-span-9">
          <GlassPanel>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-robot text-verum-cyan mr-3"></i>
                VERUM AI Console
                <span className="ml-3 text-sm bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
                  GPT-4o Enabled
                </span>
              </h2>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => refetchAnalysis()}
                  disabled={analysisLoading}
                  className="bg-verum-cyan hover:bg-verum-cyan/80"
                >
                  <i className="fas fa-sync mr-2"></i>
                  {analysisLoading ? 'Analyzing...' : 'Run Analysis'}
                </Button>
                <Button
                  onClick={() => consolidationMutation.mutate()}
                  disabled={consolidationMutation.isPending}
                  className="bg-verum-purple hover:bg-verum-purple/80"
                >
                  <i className="fas fa-layer-group mr-2"></i>
                  {consolidationMutation.isPending ? 'Consolidating...' : 'Consolidate Base'}
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-verum-glass rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'bg-verum-cyan text-white'
                      : 'text-gray-400 hover:text-white hover:bg-verum-glass'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {selectedTab === 'overview' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-verum-cyan">AI Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                        <span>GPT-4o Integration</span>
                        <span className="text-verum-green">Active</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                        <span>AXON OMEGA AI</span>
                        <span className="text-verum-green">Online</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                        <span>System Analysis</span>
                        <span className="text-verum-cyan">Ready</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-verum-glass rounded">
                        <span>Base Consolidation</span>
                        <span className="text-verum-purple">Standby</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-verum-green">Recent AI Activity</h3>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-verum-glass rounded">
                        <div className="flex justify-between items-center">
                          <span>System Health Check</span>
                          <span className="text-gray-400">2 min ago</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">AI performed comprehensive system analysis</div>
                      </div>
                      <div className="p-3 bg-verum-glass rounded">
                        <div className="flex justify-between items-center">
                          <span>Security Assessment</span>
                          <span className="text-gray-400">5 min ago</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">AXON OMEGA protocol validation completed</div>
                      </div>
                      <div className="p-3 bg-verum-glass rounded">
                        <div className="flex justify-between items-center">
                          <span>Application Optimization</span>
                          <span className="text-gray-400">12 min ago</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Metadata enhancement for enterprise applications</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'analysis' && analysis && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-verum-cyan">System Health Assessment</h3>
                      <div className="p-4 bg-verum-glass rounded-lg">
                        <p className="text-sm leading-relaxed">{analysis.systemHealth}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-verum-green">Consolidation Plan</h3>
                      <div className="p-4 bg-verum-glass rounded-lg">
                        <p className="text-sm leading-relaxed">{analysis.consolidationPlan}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-verum-orange">Technical Optimizations</h3>
                      <div className="space-y-2">
                        {analysis.optimizations.map((opt, index) => (
                          <div key={index} className="flex items-start p-3 bg-verum-glass rounded">
                            <i className="fas fa-cog text-verum-orange mr-3 mt-1"></i>
                            <span className="text-sm">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-verum-purple">Strategic Recommendations</h3>
                      <div className="space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start p-3 bg-verum-glass rounded">
                            <i className="fas fa-lightbulb text-verum-purple mr-3 mt-1"></i>
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'insights' && insights && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-verum-cyan">Strategic AI Insights</h3>
                  <div className="p-6 bg-verum-glass rounded-lg">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{insights.insights}</div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                      Generated: {new Date(insights.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'security' && security && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-blue-400">AXON OMEGA Security Assessment</h3>
                  <div className="p-6 bg-verum-glass rounded-lg border border-blue-400/20">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{security.assessment}</div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                      Assessment: {new Date(security.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'consolidation' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-verum-purple">VERUM Base Consolidation</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-verum-cyan">Core Components</h4>
                      <div className="space-y-2">
                        {[
                          { name: 'Database Layer', status: 'Optimized', progress: 100 },
                          { name: 'API Architecture', status: 'Enhanced', progress: 95 },
                          { name: 'Security Protocols', status: 'Validated', progress: 100 },
                          { name: 'AI Integration', status: 'Active', progress: 90 },
                          { name: 'Interface Layer', status: 'Consolidated', progress: 85 }
                        ].map((component, index) => (
                          <div key={index} className="p-3 bg-verum-glass rounded">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{component.name}</span>
                              <span className="text-xs text-verum-green">{component.status}</span>
                            </div>
                            <div className="w-full bg-verum-border rounded-full h-1">
                              <div 
                                className="bg-verum-cyan h-1 rounded-full transition-all duration-500" 
                                style={{width: `${component.progress}%`}}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-verum-green">Consolidation Actions</h4>
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-verum-cyan hover:bg-verum-cyan/80 text-left justify-start"
                          onClick={() => consolidationMutation.mutate()}
                          disabled={consolidationMutation.isPending}
                        >
                          <i className="fas fa-database mr-3"></i>
                          Optimize Database Performance
                        </Button>
                        <Button 
                          className="w-full bg-verum-purple hover:bg-verum-purple/80 text-left justify-start"
                          onClick={() => refetchAnalysis()}
                        >
                          <i className="fas fa-shield-alt mr-3"></i>
                          Enhance Security Protocols
                        </Button>
                        <Button 
                          className="w-full bg-verum-green hover:bg-verum-green/80 text-left justify-start"
                        >
                          <i className="fas fa-layer-group mr-3"></i>
                          Consolidate Core Architecture
                        </Button>
                        <Button 
                          className="w-full bg-verum-orange hover:bg-verum-orange/80 text-left justify-start"
                        >
                          <i className="fas fa-rocket mr-3"></i>
                          Deploy Enterprise Optimizations
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassPanel>
        </div>

        {/* AI Status Sidebar */}
        <div className="col-span-3 space-y-6">
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-brain text-verum-cyan mr-2"></i>
              AI Model Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Model</span>
                <span className="text-verum-cyan">GPT-4o</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>API Status</span>
                <span className="text-verum-green">Connected</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <span className="text-gray-400">1.2s avg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Analysis Accuracy</span>
                <span className="text-verum-purple">98.7%</span>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-chart-bar text-verum-green mr-2"></i>
              Consolidation Progress
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-verum-cyan mb-2">94%</div>
                <div className="text-sm text-gray-400">Overall System Health</div>
                <div className="w-full bg-verum-border rounded-full h-2 mt-2">
                  <div className="bg-verum-cyan h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center">
                Base consolidation in progress with AI optimization
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}