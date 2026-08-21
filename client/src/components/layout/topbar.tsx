import { useState, useEffect } from 'react';
import { useSystemStats } from '@/hooks/use-system-stats';

export function TopBar() {
  const [currentTime, setCurrentTime] = useState('');
  const stats = useSystemStats();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 glass-effect border-b border-verum-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-400">
          ~/verum/enterprise/workspace
        </div>
        <div className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
          OFFLINE MODE
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-400">Witness Protocol:</span>
          <span className={`ml-1 ${stats.witnessProtocolActive ? 'text-verum-green' : 'text-red-400'}`}>
            {stats.witnessProtocolActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className={`w-2 h-2 rounded-full ${stats.witnessProtocolActive ? 'bg-verum-green animate-pulse-glow' : 'bg-red-400'}`}></div>
        <div className="text-sm text-gray-400">{currentTime}</div>
      </div>
    </div>
  );
}
