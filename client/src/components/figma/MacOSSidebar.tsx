import { Home, BarChart3, FolderOpen, Settings, Users, Bell, Calendar, Archive, Star, Trash2, Shield, Database, FileText, Activity, Lock, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const sidebarItems = [
  { icon: Home, label: 'Painel Principal', active: true, count: null },
  { icon: Shield, label: 'Segurança', active: false, count: null },
  { icon: Database, label: 'Banco de Dados', active: false, count: 12 },
  { icon: BarChart3, label: 'Análises', active: false, count: null },
  { icon: Users, label: 'Usuários', active: false, count: 24 },
  { icon: FileText, label: 'Documentos', active: false, count: 156 },
  { icon: Bell, label: 'Alertas', active: false, count: 7 },
  { icon: Globe, label: 'Rede', active: false, count: 3 },
];

const collectionItems = [
  { icon: Star, label: 'Favoritos', count: 5 },
  { icon: Lock, label: 'Confidencial', count: 8 },
  { icon: Archive, label: 'Arquivo', count: 23 },
  { icon: Trash2, label: 'Lixeira', count: 2 },
];

export function MacOSSidebar() {
  return (
    <div className="w-80 h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border">
      <div className="p-6 space-y-8">
        {/* Header do Sistema */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg verum-glow">
              <Shield className="h-6 w-6 text-black font-bold" />
            </div>
            <div>
              <div className="font-bold text-sidebar-foreground text-xl">VERUM NODE</div>
              <div className="text-xs text-muted-foreground">Sistema Neural Governamental</div>
            </div>
          </div>
          
          <div className="bg-accent/20 border border-accent-foreground/20 rounded-xl p-4 verum-scan">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-accent-foreground">Status do Sistema</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full verum-pulse"></div>
                <span className="text-xs text-green-400 font-semibold">OPERACIONAL</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Carga do Sistema</span>
                <span className="text-accent-foreground font-semibold">18%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full w-[18%]"></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conectividade</span>
                <span className="text-green-400 font-semibold">100%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-full"></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Segurança</span>
                <span className="text-primary font-semibold">MÁXIMA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação Principal */}
        <div className="space-y-3">
          <div className="px-1 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Módulos do Sistema
          </div>
          <div className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-between h-11 px-4 rounded-xl transition-all duration-200 ${
                    item.active 
                      ? 'bg-primary text-primary-foreground shadow-lg verum-glow' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  {item.count && (
                    <Badge 
                      variant="secondary" 
                      className="h-5 px-2 text-xs bg-muted/60 text-muted-foreground border-0 font-bold"
                    >
                      {item.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Coleções */}
        <div className="space-y-3">
          <div className="px-1 py-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Arquivos
          </div>
          <div className="space-y-2">
            {collectionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-between h-10 px-4 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="h-5 px-2 text-xs bg-muted/60 text-muted-foreground border-0 font-bold"
                  >
                    {item.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div className="pt-4 border-t border-sidebar-border/50">
          <div className="flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-sidebar-accent/30 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg">
              <span className="font-bold text-black">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sidebar-foreground">Administrador</div>
              <div className="text-xs text-muted-foreground">Acesso Total • GOV.BR</div>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full verum-pulse"></div>
          </div>
        </div>

        {/* Configurações */}
        <div className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-start h-11 px-4 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
          >
            <Settings className="h-4 w-4 mr-3" />
            <span className="font-semibold">Configurações</span>
          </Button>
        </div>

        {/* Rodapé */}
        <div className="pt-4 border-t border-sidebar-border/50">
          <div className="text-xs text-muted-foreground text-center">
            <div className="font-semibold">VERUM NODE v2.0.1</div>
            <div className="mt-1">Governo Federal • Brasil</div>
          </div>
        </div>
      </div>
    </div>
  );
}