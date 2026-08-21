import { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function WebServer() {
  const [selectedTab, setSelectedTab] = useState('server');
  const [serverStatus, setServerStatus] = useState('stopped');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(34);
  const [networkUsage, setNetworkUsage] = useState(8);
  const [requestCount, setRequestCount] = useState(0);
  const [activeConnections, setActiveConnections] = useState(0);
  const [uptime, setUptime] = useState(0);

  const toggleServer = () => {
    setServerStatus(prev => prev === 'running' ? 'stopped' : 'running');
    if (serverStatus === 'stopped') {
      setUptime(0);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (serverStatus === 'running') {
      interval = setInterval(() => {
        // Simulate dynamic metrics
        setCpuUsage(prev => Math.max(5, Math.min(95, prev + (Math.random() - 0.5) * 10)));
        setMemoryUsage(prev => Math.max(10, Math.min(85, prev + (Math.random() - 0.5) * 5)));
        setNetworkUsage(prev => Math.max(1, Math.min(50, prev + (Math.random() - 0.5) * 8)));
        setRequestCount(prev => prev + Math.floor(Math.random() * 3));
        setActiveConnections(prev => Math.max(0, prev + Math.floor((Math.random() - 0.5) * 4)));
        setUptime(prev => prev + 1);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [serverStatus]);

  const honoMiddleware = [
    { name: '@hono/hello', version: '0.1.2', status: 'active', type: 'Hello World', description: 'Example middleware with X-Message header' },
    { name: '@hono/mcp', version: '0.1.0', status: 'active', type: 'Model Context Protocol', description: 'HTTP streaming transport for MCP servers' },
    { name: '@hono/medley-router', version: '0.0.4', status: 'active', type: 'Fast Router', description: 'High-performance router using @medley/router' },
    { name: '@hono/node-ws', version: '1.2.0', status: 'active', type: 'WebSocket', description: 'WebSocket support for Node.js runtime' },
    { name: '@hono/oauth-providers', version: '0.8.2', status: 'active', type: 'OAuth', description: 'Social login providers (Google, GitHub, Discord, etc.)' },
    { name: '@hono/otel', version: '0.2.2', status: 'active', type: 'Telemetry', description: 'OpenTelemetry instrumentation with W3C Trace Context' },
    { name: '@hono/prometheus', version: '1.0.2', status: 'active', type: 'Metrics', description: 'RED metrics collection and /metrics endpoint' },
    { name: '@hono/react-renderer', version: '1.0.1', status: 'active', type: 'React SSR', description: 'Server-side rendering with React 19 streaming' },
    { name: '@hono/react-compat', version: '0.0.3', status: 'active', type: 'React Alias', description: 'React compatibility API for hono/jsx' },
    { name: '@hono/sentry', version: '1.2.2', status: 'active', type: 'Error Tracking', description: 'Exception capture and reporting via Sentry' },
    { name: '@hono/session', version: '0.1.0', status: 'active', type: 'Session Management', description: 'Encrypted JWT sessions with secure storage' },
    { name: '@hono/standard-validator', version: '0.1.2', status: 'active', type: 'Validation', description: 'Standard Schema validator (Zod, Valibot, ArkType)' },
    { name: '@hono/stytch-auth', version: '0.1.1', status: 'active', type: 'Authentication', description: 'Stytch B2C/B2B authentication with JWT validation' },
    { name: '@hono/swagger-editor', version: '1.0.1', status: 'active', type: 'API Tools', description: 'Interactive Swagger Editor for API development' },
    { name: '@hono/swagger-ui', version: '0.5.2', status: 'active', type: 'API Documentation', description: 'Interactive API docs with Swagger UI components' },
    { name: '@hono/trpc-server', version: '0.4.0', status: 'active', type: 'Type-safe RPC', description: 'tRPC server middleware with full-stack type safety' },
    { name: '@hono/tsyringe', version: '1.0.1', status: 'active', type: 'Dependency Injection', description: 'Microsoft TSyringe DI container integration' },
    { name: '@hono/typebox-validator', version: '0.3.3', status: 'active', type: 'Validation', description: 'TypeBox schema validation with JSON Schema support' },
    { name: '@hono/typia-validator', version: '0.1.2', status: 'active', type: 'Validation', description: 'Ultra-fast Typia validation with compile-time optimization' },
    { name: '@hono/ua-blocker', version: '0.1.3', status: 'active', type: 'Security', description: 'User-Agent blocking for AI bots and security threats' },
    { name: '@hono/valibot-validator', version: '0.5.2', status: 'active', type: 'Validation', description: 'Valibot schema validation with async support' },
    { name: '@hono/zod-openapi', version: '0.19.9', status: 'active', type: 'API Schema', description: 'OpenAPI 3.1 documentation generation with Zod schemas' },
    { name: '@hono/zod-validator', version: '0.7.0', status: 'active', type: 'Validation', description: 'Zod schema validation with custom validation functions' }
  ];

  const edgeTargets = [
    { platform: 'Cloudflare Workers', status: 'ready', latency: '< 1ms', regions: '300+' },
    { platform: 'Deno Deploy', status: 'ready', latency: '< 2ms', regions: '35+' },
    { platform: 'Vercel Edge', status: 'ready', latency: '< 3ms', regions: '20+' },
    { platform: 'Netlify Edge', status: 'ready', latency: '< 4ms', regions: '15+' }
  ];

  return (
    <GlassPanel className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <i className="fas fa-server text-verum-orange text-2xl mr-3"></i>
        <h2 className="text-2xl font-semibold">VERUM Web Server</h2>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-verum-border">
        {['server', 'middleware', 'security', 'analytics', 'deployment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 capitalize relative ${
              selectedTab === tab
                ? 'text-verum-cyan border-b-2 border-verum-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
            {tab === 'server' && serverStatus === 'running' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-verum-green rounded-full animate-pulse"></span>
            )}
          </button>
        ))}
      </div>

      {/* Server Tab */}
      {selectedTab === 'server' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Hono Edge Server</h3>
              <p className="text-sm text-gray-400">Ultra-fast web framework for the edge</p>
            </div>
            <Button
              onClick={toggleServer}
              className={`${
                serverStatus === 'running' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-verum-green hover:bg-verum-green/80'
              }`}
            >
              {serverStatus === 'running' ? (
                <>
                  <i className="fas fa-stop mr-2"></i>
                  Stop Server
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i>
                  Start Server
                </>
              )}
            </Button>
          </div>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">Status</div>
                <div className={`w-3 h-3 rounded-full ${
                  serverStatus === 'running' ? 'bg-verum-green animate-pulse' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className={`text-lg font-semibold ${
                serverStatus === 'running' ? 'text-verum-green' : 'text-gray-400'
              }`}>
                {serverStatus === 'running' ? 'Online' : 'Offline'}
              </div>
              <div className="text-xs text-gray-500">
                Port 8787 {serverStatus === 'running' ? '• Edge Runtime' : ''}
              </div>
            </div>

            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">CPU Usage</div>
              <div className="flex items-center space-x-2">
                <div className="text-lg font-semibold text-verum-cyan">{Math.round(cpuUsage)}%</div>
                <div className="flex-1">
                  <Progress 
                    value={cpuUsage} 
                    className="h-2"
                    style={{
                      background: 'rgba(29, 78, 216, 0.2)',
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {serverStatus === 'running' ? '8 cores active' : 'Idle'}
              </div>
            </div>

            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">Memory</div>
              <div className="flex items-center space-x-2">
                <div className="text-lg font-semibold text-verum-orange">{Math.round(memoryUsage)}%</div>
                <div className="flex-1">
                  <Progress 
                    value={memoryUsage} 
                    className="h-2"
                    style={{
                      background: 'rgba(249, 115, 22, 0.2)',
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {serverStatus === 'running' ? '2.4GB / 8GB' : 'Reserved'}
              </div>
            </div>

            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">Network</div>
              <div className="flex items-center space-x-2">
                <div className="text-lg font-semibold text-verum-purple">{Math.round(networkUsage)}%</div>
                <div className="flex-1">
                  <Progress 
                    value={networkUsage} 
                    className="h-2"
                    style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {serverStatus === 'running' ? `${activeConnections} connections` : 'No traffic'}
              </div>
            </div>
          </div>

          {/* Enhanced Server Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">Total Requests</div>
              <div className="text-2xl font-bold text-verum-cyan">{requestCount.toLocaleString()}</div>
              <div className="text-xs text-gray-500">
                {serverStatus === 'running' ? '+' + Math.floor(requestCount / (uptime || 1)) + '/sec' : 'Stopped'}
              </div>
            </div>
            
            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">Uptime</div>
              <div className="text-2xl font-bold text-verum-green">
                {Math.floor(uptime / 60)}:{(uptime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500">
                {serverStatus === 'running' ? 'minutes:seconds' : 'Server offline'}
              </div>
            </div>

            <div className="p-4 bg-verum-glass rounded border border-verum-border">
              <div className="text-sm text-gray-400 mb-2">Response Time</div>
              <div className="text-2xl font-bold text-verum-orange">
                {serverStatus === 'running' ? '< 1ms' : 'N/A'}
              </div>
              <div className="text-xs text-gray-500">
                {serverStatus === 'running' ? 'Edge optimized' : 'Not available'}
              </div>
            </div>
          </div>

          {serverStatus === 'running' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Live Server Logs</h4>
                <Badge variant="outline" className="text-verum-green border-verum-green">
                  <i className="fas fa-circle text-xs mr-1 animate-pulse"></i>
                  Live
                </Badge>
              </div>
              <div className="bg-verum-dark p-4 rounded border border-verum-border font-mono text-xs max-h-48 overflow-y-auto">
                <div className="text-verum-green">[{new Date().toLocaleTimeString()}] 🚀 VERUM Hono Edge Server v2.4.1 started</div>
                <div className="text-gray-300">[{new Date().toLocaleTimeString()}] 🌐 Listening on http://localhost:8787</div>
                <div className="text-gray-300">[{new Date().toLocaleTimeString()}] ⚡ Edge runtime: Cloudflare Workers compatible</div>
                <div className="text-gray-300">[{new Date().toLocaleTimeString()}] 📦 Middleware loaded: {honoMiddleware.length} packages</div>
                <div className="text-verum-purple">[{new Date().toLocaleTimeString()}] 🔒 Security: Stytch Auth + OAuth + Bot Protection enabled</div>
                <div className="text-verum-orange">[{new Date().toLocaleTimeString()}] 📊 Monitoring: Prometheus + Sentry + OpenTelemetry active</div>
                <div className="text-verum-cyan">[{new Date().toLocaleTimeString()}] ✅ GET /api/health → 200 (0.4ms)</div>
                <div className="text-verum-cyan">[{new Date().toLocaleTimeString()}] 📈 GET /api/metrics → 200 (0.2ms)</div>
                <div className="text-yellow-400">[{new Date().toLocaleTimeString()}] 🛡️ UA-Blocker: 47 AI bots blocked</div>
                <div className="text-verum-green">[{new Date().toLocaleTimeString()}] 🔄 Session management: JWT rotation active</div>
                <div className="text-blue-400">[{new Date().toLocaleTimeString()}] 📝 OpenAPI docs available at /swagger</div>
                <div className="text-purple-400">[{new Date().toLocaleTimeString()}] 🔌 WebSocket server ready on /ws</div>
                <div className="text-green-400">[{new Date().toLocaleTimeString()}] 🎯 tRPC server mounted at /trpc</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Middleware Tab */}
      {selectedTab === 'middleware' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-verum-cyan">Hono Middleware Ecosystem</h3>
            <span className="text-sm text-gray-400">{honoMiddleware.length} packages loaded</span>
          </div>
          
          {/* Middleware Categories */}
          {[
            { category: 'Validation Frameworks', items: honoMiddleware.filter(m => m.type.includes('Validation')) },
            { category: 'Authentication & Security', items: honoMiddleware.filter(m => ['Authentication', 'Security', 'OAuth'].includes(m.type)) },
            { category: 'API Development', items: honoMiddleware.filter(m => ['API Tools', 'API Documentation', 'API Schema', 'Type-safe RPC'].includes(m.type)) },
            { category: 'Monitoring & Observability', items: honoMiddleware.filter(m => ['Metrics', 'Telemetry', 'Error Tracking'].includes(m.type)) },
            { category: 'Core Infrastructure', items: honoMiddleware.filter(m => ['Fast Router', 'WebSocket', 'Session Management', 'Dependency Injection', 'Model Context Protocol'].includes(m.type)) },
            { category: 'Frontend & SSR', items: honoMiddleware.filter(m => ['React SSR', 'React Alias'].includes(m.type)) },
            { category: 'Examples & Utilities', items: honoMiddleware.filter(m => ['Hello World'].includes(m.type)) }
          ].filter(cat => cat.items.length > 0).map((category, catIndex) => (
            <div key={catIndex} className="space-y-3">
              <h4 className="text-md font-medium text-verum-orange border-b border-verum-border pb-2">
                {category.category} ({category.items.length})
              </h4>
              <div className="grid gap-3">
                {category.items.map((middleware, index) => (
                  <div key={index} className="glass-panel p-4 border border-verum-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-verum-cyan font-mono text-sm">{middleware.name}</span>
                        <span className="text-xs bg-verum-purple/20 text-verum-purple px-2 py-1 rounded">
                          {middleware.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">v{middleware.version}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          middleware.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">{middleware.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Tab */}
      {selectedTab === 'security' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-verum-cyan">Security & Protection</h3>
            <span className="text-sm text-gray-400">Enterprise-grade protection</span>
          </div>
          
          <div className="grid gap-4">
            {/* Authentication Systems */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Authentication Systems</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-verum-cyan font-mono text-sm">@hono/stytch-auth</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-xs text-gray-300">B2C/B2B authentication with JWT validation, consumer and enterprise support</p>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-verum-cyan font-mono text-sm">@hono/oauth-providers</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-xs text-gray-300">Social login providers (Google, GitHub, Discord, Apple, etc.)</p>
                </div>
              </div>
            </div>

            {/* Bot Protection */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Bot & AI Protection</h4>
              <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-verum-cyan font-mono text-sm">@hono/ua-blocker</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                </div>
                <p className="text-xs text-gray-300 mb-3">Advanced User-Agent blocking for AI bots and security threats</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    <span className="text-gray-400">AI Bots Blocked: 47</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    <span className="text-gray-400">Non-respecting: 23</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Tracking */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Error Monitoring</h4>
              <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-verum-cyan font-mono text-sm">@hono/sentry</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                </div>
                <p className="text-xs text-gray-300">Exception capture and reporting with performance monitoring</p>
              </div>
            </div>

            {/* Session Management */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Session Security</h4>
              <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-verum-cyan font-mono text-sm">@hono/session</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
                </div>
                <p className="text-xs text-gray-300">Encrypted JWT sessions with secure storage and rotation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {selectedTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-verum-cyan">Performance Analytics</h3>
            <Badge variant="outline" className="text-verum-orange border-verum-orange">
              <i className="fas fa-chart-line text-xs mr-1"></i>
              Real-time
            </Badge>
          </div>
          
          <div className="grid gap-6">
            {/* Performance Overview */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Edge Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border text-center">
                  <div className="text-2xl font-bold text-verum-cyan">{Math.round(cpuUsage)}%</div>
                  <div className="text-xs text-gray-400">CPU Load</div>
                  <div className="text-xs text-green-400 mt-1">↑ Optimal</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border text-center">
                  <div className="text-2xl font-bold text-verum-orange">&lt; 1ms</div>
                  <div className="text-xs text-gray-400">Latency</div>
                  <div className="text-xs text-green-400 mt-1">↓ Excellent</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border text-center">
                  <div className="text-2xl font-bold text-verum-purple">99.9%</div>
                  <div className="text-xs text-gray-400">Uptime</div>
                  <div className="text-xs text-green-400 mt-1">↑ Enterprise</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border text-center">
                  <div className="text-2xl font-bold text-verum-green">{activeConnections}</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                  <div className="text-xs text-blue-400 mt-1">→ Live</div>
                </div>
              </div>
            </div>

            {/* Request Analytics */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Request Analytics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Total Requests</span>
                    <span className="text-lg font-bold text-verum-cyan">{requestCount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-green-400">+24.3% from last hour</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-lg font-bold text-verum-green">99.7%</span>
                  </div>
                  <div className="text-xs text-green-400">+0.2% improved</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Avg Response</span>
                    <span className="text-lg font-bold text-verum-orange">0.8ms</span>
                  </div>
                  <div className="text-xs text-green-400">-12% faster</div>
                </div>
              </div>
            </div>

            {/* Middleware Performance */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Middleware Performance</h4>
              <div className="space-y-3">
                {[
                  { name: 'Zod Validation', time: '0.1ms', requests: '2.3K', status: 'optimal' },
                  { name: 'Stytch Auth', time: '0.3ms', requests: '1.8K', status: 'good' },
                  { name: 'Prometheus Metrics', time: '0.05ms', requests: '4.1K', status: 'optimal' },
                  { name: 'OpenAPI Docs', time: '0.2ms', requests: '847', status: 'good' },
                  { name: 'tRPC Server', time: '0.4ms', requests: '1.2K', status: 'good' }
                ].map((middleware, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-verum-dark/20 rounded border border-verum-border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        middleware.status === 'optimal' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className="text-sm font-medium">{middleware.name}</span>
                    </div>
                    <div className="flex space-x-4 text-xs">
                      <span className="text-verum-cyan">{middleware.time}</span>
                      <span className="text-gray-400">{middleware.requests} req/h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Analytics */}
            <div className="glass-panel p-6 border border-verum-border rounded-lg">
              <h4 className="text-md font-semibold text-verum-orange mb-4">Security Analytics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="text-sm text-gray-400 mb-2">Threats Blocked (24h)</div>
                  <div className="text-2xl font-bold text-red-400">47</div>
                  <div className="text-xs text-red-400 mt-1">AI bots, scrapers, attacks</div>
                </div>
                <div className="bg-verum-dark/40 p-4 rounded border border-verum-border">
                  <div className="text-sm text-gray-400 mb-2">Authentication Success</div>
                  <div className="text-2xl font-bold text-green-400">98.3%</div>
                  <div className="text-xs text-green-400 mt-1">Stytch + OAuth combined</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deployment Tab */}
      {selectedTab === 'deployment' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Edge Deployment Targets</h3>
            <div className="space-y-3">
              {edgeTargets.map((target, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-verum-glass rounded">
                  <div>
                    <div className="font-medium">{target.platform}</div>
                    <div className="text-sm text-gray-400">{target.regions} regions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-verum-cyan">{target.latency}</div>
                    <div className="text-xs px-2 py-1 rounded bg-verum-green bg-opacity-20 text-verum-green">
                      {target.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Deployment Commands</h4>
            <div className="bg-verum-dark p-3 rounded border border-verum-border font-mono text-xs space-y-2">
              <div>
                <span className="text-verum-green"># Build for production</span>
                <br />
                <span className="text-gray-300">yarn build</span>
              </div>
              <div>
                <span className="text-verum-green"># Deploy to Cloudflare Workers</span>
                <br />
                <span className="text-gray-300">wrangler deploy</span>
              </div>
              <div>
                <span className="text-verum-green"># Deploy to Deno Deploy</span>
                <br />
                <span className="text-gray-300">deno deploy --project=verum-os</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-verum-glass rounded">
              <div className="text-sm text-gray-400 mb-2">Bundle Size</div>
              <div className="text-lg font-semibold text-verum-cyan">24.7 KB</div>
              <div className="text-xs text-gray-400">Gzipped ESM</div>
            </div>
            <div className="p-4 bg-verum-glass rounded">
              <div className="text-sm text-gray-400 mb-2">Cold Start</div>
              <div className="text-lg font-semibold text-verum-orange">&lt; 10ms</div>
              <div className="text-xs text-gray-400">Edge runtime</div>
            </div>
          </div>
        </div>
      )}
    </GlassPanel>
  );
}