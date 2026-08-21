import { Link, useLocation } from 'wouter';
import { HolographicBorder } from '@/components/ui/holographic-border';
import { GlassPanel } from '@/components/ui/glass-panel';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useSystemStats } from '@/hooks/use-system-stats';

export function Sidebar() {
  const [location] = useLocation();
  const stats = useSystemStats();

  return (
    <div className="w-64 glass-effect border-r border-verum-border p-4 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <HolographicBorder size="sm" className="mr-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <i className="fas fa-cube text-verum-cyan text-lg"></i>
          </div>
        </HolographicBorder>
        <div>
          <h1 className="text-xl font-bold text-verum-cyan">VERUM OS</h1>
          <p className="text-xs text-gray-400">Enterprise v2.4.1</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <div className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = location === item.path || (location === '/' && item.path === '/terminal');
            
            return (
              <Link key={item.id} href={item.path}>
                <div
                  className={`
                    rounded-lg p-3 cursor-pointer transition-all
                    ${isActive 
                      ? 'bg-verum-cyan bg-opacity-20 border border-verum-cyan' 
                      : 'hover:bg-verum-glass'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <i className={`${item.icon} ${item.color} mr-3`}></i>
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="text-xs text-gray-400 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* System Status */}
      <div className="mt-auto">
        <GlassPanel className="p-3">
          <div className="text-xs text-gray-400 mb-2">System Status</div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs">CPU</span>
            <span className="text-xs text-verum-green">{stats.cpuUsage}%</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs">Memory</span>
            <span className="text-xs text-verum-cyan">{stats.memoryUsage} GB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">AXON Nodes</span>
            <span className={`text-xs ${stats.axonNodesOnline ? 'text-verum-green' : 'text-red-400'}`}>
              {stats.axonNodesOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
