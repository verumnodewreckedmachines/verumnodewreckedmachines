import { useState } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { AppCard } from '@/components/store/app-card';
import { SAMPLE_APPS } from '@/lib/constants';
import { Application } from '@shared/schema';

export default function NodeStore() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Apps', count: 247 },
    { id: 'development', label: 'Development', count: 89 },
    { id: 'security', label: 'Security', count: 34 },
    { id: 'design', label: 'Design', count: 56 },
    { id: 'productivity', label: 'Productivity', count: 68 }
  ];

  const handleInstall = (app: any) => {
    console.log('Installing app:', app.name);
    // TODO: Implement actual installation logic
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Sidebar */}
        <div className="col-span-3">
          <GlassPanel>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <i className="fas fa-store text-verum-purple mr-3"></i>
              VERUM Node Store
            </h2>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-verum-glass rounded-lg border border-verum-border text-white placeholder-gray-400 focus:outline-none focus:border-verum-cyan"
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all
                    ${selectedCategory === category.id 
                      ? 'bg-verum-purple bg-opacity-20 border border-verum-purple' 
                      : 'hover:bg-verum-glass'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.label}</span>
                    <span className="text-xs text-gray-400">{category.count}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Featured */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Featured</h3>
              <div className="space-y-3">
                <div className="p-3 bg-verum-glass rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-2"></i>
                    <div>
                      <div className="text-sm font-medium">Editor's Choice</div>
                      <div className="text-xs text-gray-400">Curated selections</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-verum-glass rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-verum-green mr-2"></i>
                    <div>
                      <div className="text-sm font-medium">Security Validated</div>
                      <div className="text-xs text-gray-400">Enterprise verified</div>
                    </div>
                  </div>
                </div>
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
                  {categories.find(c => c.id === selectedCategory)?.label} Applications
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Enterprise-grade applications with security validation and witness protocol verification
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-400">Sort by:</span>
                  <select className="ml-2 bg-verum-glass border border-verum-border rounded px-2 py-1 text-white">
                    <option>Most Popular</option>
                    <option>Recently Updated</option>
                    <option>Rating</option>
                    <option>Size</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAMPLE_APPS.map((app, index) => {
                const appData: Application = {
                  id: index + 1,
                  name: app.name,
                  description: `${app.category} application with enterprise features and security validation.`,
                  version: app.version,
                  category: app.category,
                  developer: app.developer,
                  iconUrl: null,
                  downloadUrl: null,
                  size: parseInt(app.size.replace(' MB', '')) * 1024 * 1024,
                  rating: app.rating,
                  downloads: app.downloads,
                  isVerified: app.isVerified,
                  securityValidated: app.securityValidated,
                  metadata: null,
                  createdAt: new Date()
                };
                
                return (
                  <AppCard
                    key={index}
                    app={appData}
                    onInstall={handleInstall}
                  />
                );
              })}
              
              {/* Additional demo apps */}
              {Array.from({ length: 6 }, (_, i) => {
                const demoApp: Application = {
                  id: i + 100,
                  name: `Demo App ${i + 1}`,
                  description: "Enterprise application with advanced features and security validation.",
                  version: "1.0.0",
                  category: "Utility",
                  developer: "VERUM Labs",
                  iconUrl: null,
                  downloadUrl: null,
                  size: Math.floor(Math.random() * 500) * 1024 * 1024,
                  rating: Math.floor(Math.random() * 2) + 4,
                  downloads: Math.floor(Math.random() * 50000) + 1000,
                  isVerified: true,
                  securityValidated: Math.random() > 0.3,
                  metadata: null,
                  createdAt: new Date()
                };
                
                return (
                  <AppCard
                    key={`demo-${i}`}
                    app={demoApp}
                    onInstall={handleInstall}
                  />
                );
              })}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
