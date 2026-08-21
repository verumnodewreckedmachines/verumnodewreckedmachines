import { ReactNode } from 'react';
import { Shield, Activity, Wifi } from 'lucide-react';

interface MacOSWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function MacOSWindow({ children, title = "VERUM NODE", className = "" }: MacOSWindowProps) {
  return (
    <div className={`verum-window ${className}`}>
      {/* VERUM NODE Title Bar */}
      <div className="verum-titlebar flex items-center justify-between px-6">
        <div className="traffic-lights flex items-center">
          <div className="traffic-light traffic-light-red hover:opacity-80 transition-all duration-200" />
          <div className="traffic-light traffic-light-yellow hover:opacity-80 transition-all duration-200" />
          <div className="traffic-light traffic-light-green hover:opacity-80 transition-all duration-200" />
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg">
                <Shield className="h-4 w-4 text-black font-bold" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground tracking-tight text-lg">{title}</div>
              <div className="text-xs text-muted-foreground font-medium">Sistema Governamental</div>
            </div>
          </div>
        </div>
        
        <div className="w-[68px] flex justify-end">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-primary verum-pulse" />
              <span className="font-medium">Ativo</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Wifi className="h-3 w-3 text-green-400" />
              <span className="font-medium">Seguro</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden hologram-effect">
        {children}
      </div>
    </div>
  );
}