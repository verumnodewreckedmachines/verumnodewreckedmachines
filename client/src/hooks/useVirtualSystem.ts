import { useState, useEffect } from 'react';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  battery: number;
}

export function useVirtualSystem() {
  const [isBooted, setIsBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpu: 15,
    memory: 45,
    disk: 72,
    network: 89,
    battery: 85
  });
  const [runningApps, setRunningApps] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [virtualData, setVirtualData] = useState({
    documents: new Map<string, any>(),
    settings: new Map<string, any>(),
    printJobs: [],
    fileSystem: new Map<string, any>()
  });

  // Boot sequence
  useEffect(() => {
    if (!isBooted) {
      const bootInterval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
              setIsBooted(true);
              loadSystemState();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
      
      return () => clearInterval(bootInterval);
    }
  }, [isBooted]);

  // Update system stats - suavizado para menos movimento
  useEffect(() => {
    if (isBooted) {
      const statsInterval = setInterval(() => {
        setSystemStats(prev => ({
          cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 3)),
          memory: Math.max(10, Math.min(90, prev.memory + (Math.random() - 0.5) * 2)),
          disk: prev.disk,
          network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 8)),
          battery: Math.max(0, Math.min(100, prev.battery - 0.05))
        }));
      }, 3000);
      
      return () => clearInterval(statsInterval);
    }
  }, [isBooted]);

  // Update time
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, []);

  // Auto-save system state
  useEffect(() => {
    if (isBooted) {
      const autoSaveInterval = setInterval(() => {
        saveSystemState();
      }, 30000); // Auto-save every 30 seconds
      
      return () => clearInterval(autoSaveInterval);
    }
  }, [isBooted, runningApps, selectedApp, virtualData]);

  const launchApp = (appId: string) => {
    if (!runningApps.includes(appId)) {
      setRunningApps(prev => [...prev, appId]);
    }
    setSelectedApp(appId);
    setShowStartMenu(false);
  };

  const closeApp = (appId: string) => {
    saveAppData(appId);
    setRunningApps(prev => prev.filter(id => id !== appId));
    if (selectedApp === appId) {
      setSelectedApp(runningApps.filter(id => id !== appId)[0] || null);
    }
  };

  const minimizeApp = (appId: string) => {
    if (selectedApp === appId) {
      setSelectedApp(null);
    }
  };

  const saveAppData = (appId: string) => {
    const timestamp = new Date().toISOString();
    const appData = {
      appId,
      timestamp,
      lastSaved: timestamp,
      autoSaved: true
    };
    
    setVirtualData(prev => ({
      ...prev,
      settings: new Map(prev.settings.set(appId, appData))
    }));
  };

  const saveSystemState = () => {
    const systemState = {
      runningApps,
      selectedApp,
      systemStats,
      timestamp: new Date().toISOString(),
      virtualData
    };
    
    localStorage.setItem('verum-virtual-computer-state', JSON.stringify({
      ...systemState,
      virtualData: {
        documents: Array.from(virtualData.documents.entries()),
        settings: Array.from(virtualData.settings.entries()),
        printJobs: virtualData.printJobs,
        fileSystem: Array.from(virtualData.fileSystem.entries())
      }
    }));
    
    return true;
  };

  const loadSystemState = () => {
    try {
      const saved = localStorage.getItem('verum-virtual-computer-state');
      if (saved) {
        const state = JSON.parse(saved);
        setRunningApps(state.runningApps || []);
        setSelectedApp(state.selectedApp || null);
        
        if (state.virtualData) {
          setVirtualData({
            documents: new Map(state.virtualData.documents || []),
            settings: new Map(state.virtualData.settings || []),
            printJobs: state.virtualData.printJobs || [],
            fileSystem: new Map(state.virtualData.fileSystem || [])
          });
        }
        return true;
      }
    } catch (error) {
      console.error('Failed to load system state:', error);
    }
    return false;
  };

  return {
    isBooted,
    bootProgress,
    currentTime,
    systemStats,
    runningApps,
    selectedApp,
    searchQuery,
    showStartMenu,
    virtualData,
    launchApp,
    closeApp,
    minimizeApp,
    saveSystemState,
    loadSystemState,
    setSelectedApp,
    setSearchQuery,
    setShowStartMenu,
    setVirtualData
  };
}