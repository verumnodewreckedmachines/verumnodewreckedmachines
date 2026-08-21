import { Search, Plus, Bell, Command, Shield, Activity, Lock, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="h-20 bg-card/80 backdrop-blur-xl border-b border-border/60 flex items-center px-8">
      <div className="flex items-center space-x-8 flex-1">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar dados, documentos ou executar análises..."
              className="verum-input pl-12 pr-20 h-12 border-0 focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/70 bg-input/90"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted/60 px-2 py-1 rounded-md">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button className="verum-button h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 border-0 shadow-lg font-semibold">
            <Shield className="mr-2 h-4 w-4" />
            Nova Análise
          </Button>
          
          <Button className="verum-button h-11 px-4 border-0 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Criar
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-11 w-11 hover:bg-accent/50 rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground border-2 border-background font-bold">
              3
            </Badge>
          </div>

          <div className="flex items-center space-x-6 pl-6 border-l border-border/60">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm bg-muted/30 px-3 py-2 rounded-lg">
                <Activity className="h-4 w-4 text-primary verum-pulse" />
                <span className="text-muted-foreground">Sistema:</span>
                <span className="font-semibold text-foreground">VERUM AI</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm bg-muted/30 px-3 py-2 rounded-lg">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-muted-foreground">Segurança:</span>
                <span className="font-semibold text-green-400">MÁXIMA</span>
              </div>
            </div>
            
            <Avatar className="h-10 w-10 ring-2 ring-primary/30 shadow-lg">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Administrador" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-primary-foreground font-bold">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}