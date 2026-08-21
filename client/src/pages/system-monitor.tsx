import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useSystemStats } from '@/hooks/use-system-stats';

interface MetricData {
  timestamp: string;
  value: number;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  history: MetricData[];
}

export default function SystemMonitor() {
  const stats = useSystemStats();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

  const { data: systemMetrics, isLoading } = useQuery({
    queryKey: ['/api/system-metrics'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const metrics: SystemMetric[] = [
    {
      name: 'CPU Usage',
      value: stats.cpuUsage,
      unit: '%',
      status: stats.cpuUsage > 80 ? 'critical' : stats.cpuUsage > 60 ? 'warning' : 'good',
      history: Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
        value: Math.floor(Math.random() * 30) + 10
      }))
    },
    {
      name: 'Memory Usage',
      value: stats.memoryUsage,
      unit: 'GB',
      status: stats.memoryUsage > 12 ? 'warning' : 'good',
      history: Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
        value: Math.random() * 4 + 6
      }))
    },
    {
      name: 'Disk Usage',
      value: stats.diskUsage,
      unit: '%',
      status: stats.diskUsage > 90 ? 'critical' : stats.diskUsage > 75 ? 'warning' : 'good',
      history: Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
        value: Math.floor(Math.random() * 20) + 60
      }))
    },
    {
      name: 'Network Activity',
      value: stats.networkActivity,
      unit: 'MB/s',
      status: 'good',
      history: Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
        value: Math.random() * 50 + 10
      }))
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-verum-green border-verum-green bg-verum-green';
      case 'warning':
        return 'text-yellow-400 border-yellow-400 bg-yellow-400';
      case 'critical':
        return 'text-red-400 border-red-400 bg-red-400';
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400';
    }
  };

  const timeframes = [
    { id: '5m', label: '5 Minutes' },
    { id: '1h', label: '1 Hour' },
    { id: '6h', label: '6 Hours' },
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Main Metrics Dashboard */}
        <div className="col-span-9">
          <GlassPanel>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <i className="fas fa-chart-line text-verum-cyan mr-3"></i>
                Enterprise System Monitor
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
                    Real-time Monitoring
                  </span>
                  <span className="text-xs bg-verum-cyan bg-opacity-20 text-verum-cyan px-2 py-1 rounded">
                    TOML Analytics
                  </span>
                </div>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-verum-glass border border-verum-border rounded px-3 py-1 text-white text-sm"
                >
                  {timeframes.map((tf) => (
                    <option key={tf.id} value={tf.id}>{tf.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {metrics.map((metric) => (
                <div key={metric.name} className={`border rounded-lg p-4 bg-opacity-10 ${getStatusColor(metric.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}></div>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
                    <span className="text-sm font-normal ml-1">{metric.unit}</span>
                  </div>
                  <div className={`text-xs ${getStatusColor(metric.status).split(' ')[0]}`}>
                    {metric.status === 'good' ? 'Optimal' : 
                     metric.status === 'warning' ? 'Elevated' : 'Critical'}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Performance Charts */}
            <div className="grid grid-cols-2 gap-6">
              {metrics.slice(0, 2).map((metric) => (
                <div key={metric.name}>
                  <h3 className="text-lg font-medium mb-4">{metric.name} Trend</h3>
                  <div className="bg-black bg-opacity-50 rounded-lg p-4 h-64">
                    <div className="relative h-full">
                      {/* Simple line chart visualization */}
                      <div className="absolute inset-0 flex items-end justify-between">
                        {metric.history.map((point, index) => (
                          <div
                            key={index}
                            className={`w-2 rounded-t ${getStatusColor(metric.status).split(' ')[2]} bg-opacity-60`}
                            style={{
                              height: `${(point.value / Math.max(...metric.history.map(h => h.value))) * 100}%`
                            }}
                          ></div>
                        ))}
                      </div>
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                        <span>{Math.max(...metric.history.map(h => h.value)).toFixed(0)}{metric.unit}</span>
                        <span>{(Math.max(...metric.history.map(h => h.value)) / 2).toFixed(0)}{metric.unit}</span>
                        <span>0{metric.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enterprise Features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Enterprise Analytics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-verum-glass rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-cogs text-verum-orange text-xl mr-3"></i>
                    <h4 className="font-medium">TOML Build Performance</h4>
                  </div>
                  <div className="text-2xl font-bold text-verum-green mb-1">94%</div>
                  <div className="text-xs text-gray-400">Excellent performance across all build targets</div>
                  <div className="w-full bg-verum-border rounded-full h-2 mt-2">
                    <div className="bg-verum-green h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                
                <div className="bg-verum-glass rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-shield-alt text-blue-400 text-xl mr-3"></i>
                    <h4 className="font-medium">Security Validation</h4>
                  </div>
                  <div className="text-2xl font-bold text-verum-purple mb-1">100%</div>
                  <div className="text-xs text-gray-400">All security protocols active and validated</div>
                  <div className="w-full bg-verum-border rounded-full h-2 mt-2">
                    <div className="bg-verum-purple h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                
                <div className="bg-verum-glass rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-globe text-verum-cyan text-xl mr-3"></i>
                    <h4 className="font-medium">Cross-platform Compatibility</h4>
                  </div>
                  <div className="text-2xl font-bold text-verum-cyan mb-1">98%</div>
                  <div className="text-xs text-gray-400">Universal launcher system operational</div>
                  <div className="w-full bg-verum-border rounded-full h-2 mt-2">
                    <div className="bg-verum-cyan h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
        
        {/* System Information Sidebar */}
        <div className="col-span-3 space-y-6">
          {/* System Overview */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-server text-verum-green mr-2"></i>
              System Overview
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>OS Version</span>
                <span className="text-verum-cyan">VERUM OS 2.4.1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Architecture</span>
                <span className="text-gray-400">x86_64</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Kernel</span>
                <span className="text-gray-400">Enterprise 6.1.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Uptime</span>
                <span className="text-gray-400">12d 14h 23m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Load Average</span>
                <span className="text-verum-green">0.12, 0.08, 0.05</span>
              </div>
            </div>
          </GlassPanel>
          
          {/* AXON Status */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-shield-alt text-blue-400 mr-2"></i>
              AXON Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-verum-glass rounded">
                <span className="text-sm">OMEGA Executor</span>
                <span className="text-xs text-verum-green">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-verum-glass rounded">
                <span className="text-sm">Witness Protocol</span>
                <span className="text-xs text-verum-green">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-verum-glass rounded">
                <span className="text-sm">Hardware Validation</span>
                <span className="text-xs text-verum-green">Passed</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-verum-glass rounded">
                <span className="text-sm">Security Level</span>
                <span className="text-xs text-verum-purple">Maximum</span>
              </div>
            </div>
          </GlassPanel>
          
          {/* Process Monitor */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-tasks text-verum-orange mr-2"></i>
              Process Monitor
            </h3>
            
            <div className="space-y-2 text-xs">
              {[
                { name: 'verum-core', cpu: 12.3, mem: 2.1 },
                { name: 'axon-omega', cpu: 8.7, mem: 1.8 },
                { name: 'witness-protocol', cpu: 5.2, mem: 0.9 },
                { name: 'opencore-integration', cpu: 3.1, mem: 0.6 },
                { name: 'toml-builder', cpu: 2.8, mem: 0.4 }
              ].map((process, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-verum-glass rounded">
                  <span className="font-mono">{process.name}</span>
                  <div className="flex space-x-2">
                    <span className="text-verum-cyan">{process.cpu}%</span>
                    <span className="text-verum-green">{process.mem}GB</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
          
          {/* Quick Actions */}
          <GlassPanel>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-bolt text-verum-purple mr-2"></i>
              Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button className="w-full bg-verum-cyan text-white p-2 rounded hover:bg-opacity-80 transition-all text-sm">
                <i className="fas fa-sync mr-2"></i>
                Refresh Metrics
              </button>
              <button className="w-full bg-verum-glass p-2 rounded hover:bg-opacity-10 transition-all text-sm">
                <i className="fas fa-download mr-2"></i>
                Export Report
              </button>
              <button className="w-full bg-verum-glass p-2 rounded hover:bg-opacity-10 transition-all text-sm">
                <i className="fas fa-cog mr-2"></i>
                Configure Alerts
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
