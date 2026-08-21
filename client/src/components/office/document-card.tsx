import { Document } from '@shared/schema';
import { GlassPanel } from '@/components/ui/glass-panel';

interface DocumentCardProps {
  document: Document;
  onOpen?: (document: Document) => void;
}

export function DocumentCard({ document, onOpen }: DocumentCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'writer':
        return 'fas fa-file-alt';
      case 'calc':
        return 'fas fa-chart-bar';
      case 'present':
        return 'fas fa-presentation';
      default:
        return 'fas fa-file';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'writer':
        return 'text-blue-400';
      case 'calc':
        return 'text-verum-green';
      case 'present':
        return 'text-verum-orange';
      default:
        return 'text-gray-400';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'bg-verum-green';
      case 'syncing':
        return 'bg-yellow-400 animate-pulse';
      case 'offline':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <GlassPanel 
      className="p-3 cursor-pointer" 
      onClick={() => onOpen?.(document)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <i className={`${getIcon(document.type)} ${getIconColor(document.type)} mr-3 flex-shrink-0`}></i>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{document.title}</div>
            <div className="text-xs text-gray-400">
              Modified {document.lastModified?.toLocaleDateString() || 'Unknown'} • {document.size ? formatSize(document.size) : 'Unknown size'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <div className={`w-2 h-2 rounded-full ${getSyncStatusColor(document.syncStatus || 'offline')}`}></div>
          <span className="text-xs text-gray-400 capitalize">
            {document.syncStatus || 'Offline'}
          </span>
        </div>
      </div>
    </GlassPanel>
  );
}
