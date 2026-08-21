import { useState, useEffect } from 'react';

interface SystemStats {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkActivity: number;
  securityStatus: 'secure' | 'warning' | 'critical';
  witnessProtocolActive: boolean;
  axonNodesOnline: boolean;
}

export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 12,
    memoryUsage: 8.2,
    diskUsage: 65,
    networkActivity: 24,
    securityStatus: 'secure',
    witnessProtocolActive: true,
    axonNodesOnline: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpuUsage: Math.floor(Math.random() * 20) + 5,
        memoryUsage: Math.round((Math.random() * 2 + 7) * 10) / 10,
        networkActivity: Math.floor(Math.random() * 50) + 10,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
