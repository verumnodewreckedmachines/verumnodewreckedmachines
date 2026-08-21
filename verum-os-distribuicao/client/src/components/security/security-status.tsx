import { GlassPanel } from '@/components/ui/glass-panel';

interface SecurityStatusProps {
  title: string;
  icon: string;
  status: 'active' | 'warning' | 'error';
  description: string;
  lastCheck?: string;
}

export function SecurityStatus({ 
  title, 
  icon, 
  status, 
  description, 
  lastCheck 
}: SecurityStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return 'fas fa-check-circle text-verum-green';
      case 'warning':
        return 'fas fa-exclamation-triangle text-yellow-400';
      case 'error':
        return 'fas fa-times-circle text-red-400';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'text-verum-green';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
    }
  };

  return (
    <GlassPanel className="p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <i className={`${icon} text-blue-400 mr-2`}></i>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <i className={getStatusIcon()}></i>
      </div>
      <div className="text-xs text-gray-400 mb-1">{description}</div>
      {lastCheck && (
        <div className="text-xs text-gray-500">Last check: {lastCheck}</div>
      )}
    </GlassPanel>
  );
}
