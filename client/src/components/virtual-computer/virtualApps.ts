import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Wifi, 
  Battery,
  Settings,
  Folder,
  Terminal,
  Calculator,
  FileText,
  Image,
  Music,
  Music2,
  Video,
  Globe,
  Brain,
  Zap,
  Shield,
  Activity,
  Power,
  Volume2,
  Minimize2,
  Maximize2,
  X,
  Search,
  Calendar,
  Mail,
  Camera,
  Phone,
  Printer,
  Download,
  Upload,
  Save,
  Cloud,
  Archive
} from 'lucide-react';

export const virtualApps = [
  // Sistema
  { id: 'file-manager', name: 'File Manager', icon: Folder, category: 'system', isRunning: false, windowState: 'normal' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, category: 'system', isRunning: false, windowState: 'normal' },
  { id: 'task-manager', name: 'Task Manager', icon: Activity, category: 'system', isRunning: false, windowState: 'normal' },
  { id: 'settings', name: 'Settings', icon: Settings, category: 'system', isRunning: false, windowState: 'normal' },
  { id: 'print-manager', name: 'Print Manager', icon: Printer, category: 'system', isRunning: false, windowState: 'normal' },
  { id: 'save-manager', name: 'Save Manager', icon: Save, category: 'system', isRunning: false, windowState: 'normal' },
  
  // Produtividade
  { id: 'calculator', name: 'Calculator', icon: Calculator, category: 'productivity', isRunning: false, windowState: 'normal' },
  { id: 'notepad', name: 'Notepad', icon: FileText, category: 'productivity', isRunning: false, windowState: 'normal' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, category: 'productivity', isRunning: false, windowState: 'normal' },
  { id: 'mail', name: 'Mail', icon: Mail, category: 'productivity', isRunning: false, windowState: 'normal' },
  
  // Mídia e SpotDL Integration
  { id: 'media-hub', name: 'VERUM Media Hub', icon: Music, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'music-library', name: 'VERUM Music', icon: Music2, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'metadata-manager', name: 'Metadata Manager', icon: Archive, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'sync-lyrics', name: 'Sync Lyrics', icon: FileText, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'image-viewer', name: 'Image Viewer', icon: Image, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'video-player', name: 'Video Player', icon: Video, category: 'media', isRunning: false, windowState: 'normal' },
  { id: 'camera', name: 'Camera', icon: Camera, category: 'media', isRunning: false, windowState: 'normal' },
  
  // IA e Desenvolvimento
  { id: 'ai-assistant', name: 'AI Assistant', icon: Brain, category: 'ai', isRunning: false, windowState: 'normal' },
  { id: 'neural-processor', name: 'Neural Processor', icon: Zap, category: 'ai', isRunning: false, windowState: 'normal' },
  { id: 'security-center', name: 'Security Center', icon: Shield, category: 'ai', isRunning: false, windowState: 'normal' },
  { id: 'web-browser', name: 'Web Browser', icon: Globe, category: 'development', isRunning: false, windowState: 'normal' },
];