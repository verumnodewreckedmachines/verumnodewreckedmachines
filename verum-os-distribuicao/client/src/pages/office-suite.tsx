import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { DocumentCard } from '@/components/office/document-card';
import { SAMPLE_DOCUMENTS } from '@/lib/constants';

export default function OfficeSuite() {
  const [selectedApp, setSelectedApp] = useState<'writer' | 'calc' | 'present'>('writer');

  const officeApps = [
    {
      id: 'writer' as const,
      name: 'VERUM Writer',
      description: 'Decentralized document processing',
      icon: 'fas fa-file-word',
      color: 'text-blue-400',
      count: 24
    },
    {
      id: 'calc' as const,
      name: 'VERUM Calc',
      description: 'P2P spreadsheet collaboration',
      icon: 'fas fa-table',
      color: 'text-verum-green',
      count: 12
    },
    {
      id: 'present' as const,
      name: 'VERUM Present',
      description: 'Holographic presentations',
      icon: 'fas fa-presentation',
      color: 'text-verum-orange',
      count: 8
    }
  ];

  const handleDocumentOpen = (doc: any) => {
    console.log('Opening document:', doc.title);
    // TODO: Implement document opening logic
  };

  const handleCreateNew = () => {
    console.log('Creating new document with:', selectedApp);
    // TODO: Implement document creation logic
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Sidebar */}
        <div className="col-span-3">
          <GlassPanel>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <i className="fas fa-briefcase text-verum-green mr-3"></i>
              Office Suite
            </h2>
            
            {/* Office Apps */}
            <div className="space-y-3 mb-8">
              {officeApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all
                    ${selectedApp === app.id 
                      ? 'bg-verum-green bg-opacity-20 border border-verum-green' 
                      : 'bg-verum-glass hover:bg-opacity-10'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <i className={`${app.icon} ${app.color} text-xl`}></i>
                    <span className="text-xs text-gray-400">{app.count} docs</span>
                  </div>
                  <h3 className="font-medium mb-1">{app.name}</h3>
                  <p className="text-xs text-gray-400">{app.description}</p>
                </button>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={handleCreateNew}
                className="w-full bg-verum-green text-white p-3 rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Create New
              </button>
              
              <button className="w-full bg-verum-glass p-3 rounded-lg hover:bg-opacity-10 transition-all flex items-center justify-center">
                <i className="fas fa-upload mr-2"></i>
                Import Document
              </button>
            </div>
            
            {/* Sync Status */}
            <div className="mt-8 p-3 bg-verum-green bg-opacity-10 border border-verum-green rounded-lg">
              <div className="flex items-center mb-2">
                <i className="fas fa-sync text-verum-green mr-2"></i>
                <span className="text-sm font-medium text-verum-green">P2P Sync Active</span>
              </div>
              <div className="text-xs text-gray-400">
                Documents synchronizing across 3 nodes
              </div>
            </div>
          </GlassPanel>
        </div>
        
        {/* Main Content */}
        <div className="col-span-9">
          <GlassPanel>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {officeApps.find(app => app.id === selectedApp)?.name} Documents
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Decentralized office documents with P2P synchronization and offline capabilities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-verum-green bg-opacity-20 text-verum-green px-2 py-1 rounded">
                    P2P Enabled
                  </span>
                  <span className="text-xs bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded">
                    Offline Ready
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">View:</span>
                  <select className="ml-2 bg-verum-glass border border-verum-border rounded px-2 py-1 text-white">
                    <option>List</option>
                    <option>Grid</option>
                    <option>Timeline</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <i className="fas fa-shield-alt text-blue-400 text-xl mr-3"></i>
                  <h3 className="font-medium">End-to-End Encryption</h3>
                </div>
                <p className="text-xs text-gray-400">All documents encrypted with AXON security protocols</p>
              </div>
              
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <i className="fas fa-users text-verum-green text-xl mr-3"></i>
                  <h3 className="font-medium">Real-time Collaboration</h3>
                </div>
                <p className="text-xs text-gray-400">Peer-to-peer document sharing and editing</p>
              </div>
              
              <div className="bg-verum-glass rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <i className="fas fa-cloud-download-alt text-verum-cyan text-xl mr-3"></i>
                  <h3 className="font-medium">Offline First</h3>
                </div>
                <p className="text-xs text-gray-400">Full functionality without internet connection</p>
              </div>
            </div>
            
            {/* Documents */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Recent Documents</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="pl-10 pr-4 py-2 bg-verum-glass rounded-lg border border-verum-border text-white placeholder-gray-400 focus:outline-none focus:border-verum-cyan"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {SAMPLE_DOCUMENTS
                  .filter(doc => selectedApp === 'writer' || doc.type === selectedApp)
                  .map((doc, index) => {
                    const documentData = {
                      id: index + 1,
                      title: doc.title,
                      type: doc.type,
                      content: null,
                      size: parseInt(doc.size.replace(/[^\d.]/g, '')) * (doc.size.includes('MB') ? 1024 * 1024 : 1024),
                      ownerId: 1,
                      isEncrypted: true,
                      syncStatus: doc.syncStatus,
                      lastModified: new Date(),
                      createdAt: new Date()
                    };
                    
                    return (
                      <DocumentCard
                        key={index}
                        document={documentData}
                        onOpen={handleDocumentOpen}
                      />
                    );
                  })}
                
                {/* Additional demo documents */}
                {Array.from({ length: 5 }, (_, i) => {
                  const demoDoc = {
                    id: i + 100,
                    title: `${selectedApp === 'writer' ? 'Document' : selectedApp === 'calc' ? 'Spreadsheet' : 'Presentation'} ${i + 1}`,
                    type: selectedApp,
                    content: null,
                    size: Math.floor(Math.random() * 1000000) + 100000,
                    ownerId: 1,
                    isEncrypted: true,
                    syncStatus: ['synced', 'syncing', 'offline'][Math.floor(Math.random() * 3)],
                    lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                    createdAt: new Date()
                  };
                  
                  return (
                    <DocumentCard
                      key={`demo-${i}`}
                      document={demoDoc}
                      onOpen={handleDocumentOpen}
                    />
                  );
                })}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
