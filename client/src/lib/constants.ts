export const VERUM_COLORS = {
  cyan: 'hsl(193, 100%, 50%)',
  purple: 'hsl(271, 67%, 50%)',
  green: 'hsl(159, 100%, 50%)',
  orange: 'hsl(14, 100%, 60%)',
  dark: 'hsl(240, 14%, 4%)',
  panel: 'hsl(240, 13%, 10%)',
  border: 'hsl(240, 9%, 18%)',
  glass: 'hsla(0, 0%, 100%, 0.05)',
} as const;

export const NAVIGATION_ITEMS = [
  {
    id: 'terminal',
    label: 'Terminal Infinite',
    icon: 'fas fa-terminal',
    color: 'text-verum-cyan',
    path: '/terminal',
    description: 'Advanced Command Processing'
  },
  {
    id: 'node-store',
    label: 'Node Store',
    icon: 'fas fa-store',
    color: 'text-verum-purple',
    path: '/node-store',
    description: 'Enterprise App Marketplace'
  },
  {
    id: 'office-suite',
    label: 'Office Suite',
    icon: 'fas fa-briefcase',
    color: 'text-verum-green',
    path: '/office-suite',
    description: 'Decentralized Productivity'
  },
  {
    id: 'dev-tools',
    label: 'Dev Tools',
    icon: 'fas fa-code',
    color: 'text-verum-orange',
    path: '/dev-tools',
    description: 'TOML Build System'
  },
  {
    id: 'security',
    label: 'AXON Security',
    icon: 'fas fa-shield-alt',
    color: 'text-blue-400',
    path: '/security',
    description: 'Hardware Validation'
  },
  {
    id: 'system-monitor',
    label: 'System Monitor',
    icon: 'fas fa-chart-line',
    color: 'text-yellow-400',
    path: '/system-monitor',
    description: 'Performance Analytics'
  },
  {
    id: 'ai-console',
    label: 'VERUM AI Chat',
    icon: 'fas fa-robot',
    color: 'text-verum-cyan',
    path: '/ai-console',
    description: 'Chat com IA, PDF e TTS'
  },
  {
    id: 'public-demo',
    label: 'Public Demo',
    icon: 'fas fa-globe',
    color: 'text-verum-green',
    path: '/public-demo',
    description: 'Official Verification Portal'
  },
  {
    id: 'config',
    label: 'Configurações',
    icon: 'fas fa-cog',
    color: 'text-yellow-400',
    path: '/config',
    description: 'API Keys e Idiomas'
  }
] as const;

export const TERMINAL_COMMANDS = [
  'gibmacos --list-versions',
  'axon-omega --status',
  'verum-office --launch-decentralized',
  'build-system --configure enterprise',
  'opencore --configure --security-max',
  'verum-build --optimize --enterprise',
  'axon-witness --verify-integrity',
  'verum-deploy --staging --validate',
  'toml-validator --check-syntax',
  'dependency-resolver --update-all'
] as const;

export const SAMPLE_APPS = [
  {
    name: 'VERUM Calculator Pro',
    developer: 'VERUM Labs',
    category: 'Productivity',
    version: '2.4.1',
    size: '12 MB',
    rating: 5,
    downloads: 125000,
    isVerified: true,
    securityValidated: true,
    iconClass: 'fas fa-calculator',
    color: 'text-verum-purple'
  },
  {
    name: 'AXON Security Suite',
    developer: 'VERUM Labs',
    category: 'Security',
    version: '2.4.1',
    size: '89 MB',
    rating: 5,
    downloads: 87000,
    isVerified: true,
    securityValidated: true,
    iconClass: 'fas fa-shield-alt',
    color: 'text-verum-green'
  },
  {
    name: 'Holographic Designer',
    developer: 'VERUM Creative',
    category: 'Design',
    version: '1.2.0',
    size: '512 MB',
    rating: 4,
    downloads: 45000,
    isVerified: true,
    securityValidated: true,
    iconClass: 'fas fa-palette',
    color: 'text-verum-cyan'
  }
] as const;

export const SAMPLE_DOCUMENTS = [
  {
    title: 'Enterprise Architecture Blueprint',
    type: 'writer',
    size: '247 KB',
    lastModified: '2 hours ago',
    syncStatus: 'synced',
    iconClass: 'fas fa-file-alt',
    color: 'text-blue-400'
  },
  {
    title: 'Q4 Performance Analysis',
    type: 'calc',
    size: '1.2 MB',
    lastModified: '5 hours ago',
    syncStatus: 'syncing',
    iconClass: 'fas fa-chart-bar',
    color: 'text-verum-green'
  },
  {
    title: 'VERUM OS Product Demo',
    type: 'present',
    size: '15.7 MB',
    lastModified: 'yesterday',
    syncStatus: 'synced',
    iconClass: 'fas fa-presentation',
    color: 'text-verum-orange'
  }
] as const;
