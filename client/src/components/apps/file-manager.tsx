import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  icon: string;
}

export function FileManager() {
  const [currentPath, setCurrentPath] = useState('/Users/verum/Documents');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const sampleFiles: FileItem[] = [
    { id: '1', name: '..', type: 'folder', modified: '', icon: 'fas fa-level-up-alt' },
    { id: '2', name: 'Enterprise Projects', type: 'folder', modified: '2025-07-11', icon: 'fas fa-folder' },
    { id: '3', name: 'VERUM Architecture', type: 'folder', modified: '2025-07-11', icon: 'fas fa-folder' },
    { id: '4', name: 'Security Protocols', type: 'folder', modified: '2025-07-10', icon: 'fas fa-folder-lock' },
    { id: '5', name: 'system-analysis.json', type: 'file', size: '2.4 MB', modified: '2025-07-11', icon: 'fas fa-file-code' },
    { id: '6', name: 'deployment-guide.md', type: 'file', size: '156 KB', modified: '2025-07-11', icon: 'fas fa-file-alt' },
    { id: '7', name: 'axon-omega-config.toml', type: 'file', size: '8.2 KB', modified: '2025-07-10', icon: 'fas fa-cog' },
    { id: '8', name: 'enterprise-license.pdf', type: 'file', size: '1.2 MB', modified: '2025-07-09', icon: 'fas fa-file-pdf' },
    { id: '9', name: 'gibmacos-installer.py', type: 'file', size: '245 KB', modified: '2025-07-09', icon: 'fas fa-file-code' },
    { id: '10', name: 'holographic-ui.css', type: 'file', size: '89 KB', modified: '2025-07-08', icon: 'fas fa-palette' }
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      if (item.name === '..') {
        const pathParts = currentPath.split('/');
        pathParts.pop();
        setCurrentPath(pathParts.join('/') || '/');
      } else {
        setCurrentPath(`${currentPath}/${item.name}`);
      }
    }
    // For files, we could open them in appropriate apps
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return item.icon;
    }
    
    const extension = item.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'json': return 'fas fa-file-code';
      case 'md': return 'fas fa-file-alt';
      case 'toml': case 'yml': case 'yaml': return 'fas fa-cog';
      case 'pdf': return 'fas fa-file-pdf';
      case 'py': case 'js': case 'ts': return 'fas fa-file-code';
      case 'css': case 'scss': return 'fas fa-palette';
      case 'jpg': case 'png': case 'gif': return 'fas fa-file-image';
      default: return 'fas fa-file';
    }
  };

  return (
    <GlassPanel className="p-6 w-full max-w-6xl h-[600px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="fas fa-folder-open text-verum-cyan mr-2"></i>
          VERUM File Manager
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary">
              <i className="fas fa-arrow-left"></i>
            </Button>
            <Button size="sm" variant="secondary">
              <i className="fas fa-arrow-right"></i>
            </Button>
            <Button size="sm" variant="secondary">
              <i className="fas fa-arrow-up"></i>
            </Button>
          </div>
          
          <Input
            value={currentPath}
            onChange={(e) => setCurrentPath(e.target.value)}
            className="flex-1 bg-verum-glass"
          />
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={viewMode === 'list' ? 'default' : 'secondary'}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'grid' ? 'default' : 'secondary'}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {viewMode === 'list' ? (
          <div className="space-y-1">
            {sampleFiles.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-2 rounded cursor-pointer hover:bg-verum-glass transition-colors ${
                  selectedItems.includes(item.id) ? 'bg-verum-purple/30' : ''
                }`}
                onClick={() => toggleSelection(item.id)}
                onDoubleClick={() => handleDoubleClick(item)}
              >
                <i className={`${getFileIcon(item)} w-5 mr-3 ${
                  item.type === 'folder' ? 'text-verum-cyan' : 'text-gray-400'
                }`}></i>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-400">{item.size || ''}</span>
                  <span className="text-sm text-gray-400">{item.modified}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {sampleFiles.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded cursor-pointer hover:bg-verum-glass transition-colors text-center ${
                  selectedItems.includes(item.id) ? 'bg-verum-purple/30' : ''
                }`}
                onClick={() => toggleSelection(item.id)}
                onDoubleClick={() => handleDoubleClick(item)}
              >
                <i className={`${getFileIcon(item)} text-2xl mb-2 ${
                  item.type === 'folder' ? 'text-verum-cyan' : 'text-gray-400'
                }`}></i>
                <div className="text-sm font-medium truncate">{item.name}</div>
                {item.size && <div className="text-xs text-gray-400">{item.size}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>{sampleFiles.length - 1} items</span>
        <span>{selectedItems.length} selected</span>
      </div>
    </GlassPanel>
  );
}