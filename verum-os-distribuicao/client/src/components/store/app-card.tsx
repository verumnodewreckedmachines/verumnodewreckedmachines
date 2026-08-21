import { Application } from '@shared/schema';
import { GlassPanel } from '@/components/ui/glass-panel';

interface AppCardProps {
  app: Application;
  onInstall?: (app: Application) => void;
}

export function AppCard({ app, onInstall }: AppCardProps) {
  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDownloads = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <GlassPanel className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-verum-purple rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-cube text-white"></i>
          </div>
          <div>
            <h3 className="font-medium">{app.name}</h3>
            <p className="text-xs text-gray-400">{app.developer}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {app.isVerified && (
            <i className="fas fa-check-circle text-verum-green text-xs" title="Verified"></i>
          )}
          {app.securityValidated && (
            <i className="fas fa-shield-alt text-blue-400 text-xs" title="Security Validated"></i>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{app.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>v{app.version}</span>
        <span>{app.size ? formatSize(app.size) : 'Unknown size'}</span>
        <span>{formatDownloads(app.downloads || 0)} downloads</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fas fa-star text-xs mr-1 ${
                i < (app.rating || 0) ? 'text-yellow-400' : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => onInstall?.(app)}
          className="text-xs bg-verum-purple text-white px-3 py-1 rounded hover:bg-opacity-80 transition-all"
        >
          Install
        </button>
      </div>
    </GlassPanel>
  );
}
