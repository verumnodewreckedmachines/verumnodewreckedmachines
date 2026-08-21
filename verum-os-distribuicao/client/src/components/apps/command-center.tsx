import { useState, useEffect } from "react";
import { Search, Terminal, Settings, Cpu, Activity, Shield, Zap, Database, Network } from "lucide-react";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: string;
  shortcut?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  status?: "active" | "warning" | "error";
}

export function CommandCenter() {
  const [open, setOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 68,
    network: 23,
    security: 98
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "terminal",
      title: "Abrir Terminal Infinito",
      description: "Interface de linha de comando quântica",
      category: "Sistema",
      shortcut: "⌘T",
      icon: Terminal,
      action: () => console.log("Terminal launched"),
      status: "active"
    },
    {
      id: "verum-supreme",
      title: "VERUM Supreme",
      description: "Aplicativo principal do sistema",
      category: "Aplicações",
      shortcut: "⌘V",
      icon: Cpu,
      action: () => console.log("VERUM Supreme launched"),
      status: "active"
    },
    {
      id: "omega-console",
      title: "OMEGA Console",
      description: "Console de integração empresarial",
      category: "Aplicações",
      shortcut: "⌘O",
      icon: Shield,
      action: () => console.log("OMEGA Console launched"),
      status: "active"
    },
    {
      id: "quantum-bridge",
      title: "Quantum Bridge",
      description: "Interface de comunicação quântica",
      category: "Rede",
      shortcut: "⌘Q",
      icon: Network,
      action: () => console.log("Quantum Bridge launched"),
      status: "warning"
    },
    {
      id: "ai-central",
      title: "Central de IA",
      description: "Claude Sonnet-4 + ChatGPT-4o",
      category: "IA",
      shortcut: "⌘A",
      icon: Zap,
      action: () => console.log("AI Central launched"),
      status: "active"
    },
    {
      id: "database-manager",
      title: "Gerenciador de Banco",
      description: "PostgreSQL com Drizzle ORM",
      category: "Dados",
      shortcut: "⌘D",
      icon: Database,
      action: () => console.log("Database Manager launched"),
      status: "active"
    },
    {
      id: "system-monitor",
      title: "Monitor do Sistema",
      description: "Métricas de performance em tempo real",
      category: "Sistema",
      shortcut: "⌘M",
      icon: Activity,
      action: () => console.log("System Monitor launched"),
      status: "active"
    }
  ];

  const executeCommand = (command: CommandItem) => {
    command.action();
    setRecentCommands(prev => [command.id, ...prev.filter(id => id !== command.id)].slice(0, 5));
    setOpen(false);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl border border-verum-border space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-verum-cyan mb-2">
            Central de Comando VERUM
          </h2>
          <p className="text-gray-400">
            Interface avançada de controle do sistema
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setOpen(true)}
            className="bg-verum-cyan/20 hover:bg-verum-cyan/30 text-verum-cyan border border-verum-cyan/30"
          >
            <Search className="w-4 h-4 mr-2" />
            Comando
            <CommandShortcut>⌘K</CommandShortcut>
          </Button>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Avançado
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Configurações Avançadas</DrawerTitle>
                <DrawerDescription>
                  Configurações de sistema e métricas em tempo real
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">CPU</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-verum-cyan">{systemMetrics.cpu}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Memória</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-verum-purple">{systemMetrics.memory}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Rede</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-verum-green">{systemMetrics.network}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Segurança</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-verum-orange">{systemMetrics.security}%</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commands.slice(0, 3).map((command) => {
          const Icon = command.icon;
          return (
            <HoverCard key={command.id}>
              <HoverCardTrigger asChild>
                <Card className="cursor-pointer hover:bg-verum-glass/50 transition-all duration-300 border-verum-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-verum-cyan/20">
                        <Icon className="w-5 h-5 text-verum-cyan" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{command.title}</h3>
                        <p className="text-sm text-gray-400">{command.description}</p>
                      </div>
                      <Badge className={getStatusColor(command.status)}>
                        {command.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{command.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {command.description}
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Categoria: {command.category}
                    </span>
                    {command.shortcut && (
                      <Badge variant="secondary" className="ml-auto">
                        {command.shortcut}
                      </Badge>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-verum-cyan hover:text-verum-cyan/80 transition-colors">
            <span className="font-semibold">Comandos Recentes</span>
            <Badge variant="outline">{recentCommands.length}</Badge>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {recentCommands.map((commandId) => {
              const command = commands.find(c => c.id === commandId);
              if (!command) return null;
              
              const Icon = command.icon;
              return (
                <div
                  key={commandId}
                  className="flex items-center gap-3 p-3 rounded-lg bg-verum-glass/20 border border-verum-border/30"
                >
                  <Icon className="w-4 h-4 text-verum-cyan" />
                  <span className="text-sm text-white">{command.title}</span>
                  <span className="text-xs text-gray-400 ml-auto">{command.category}</span>
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou pesquise..." />
        <CommandList>
          <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
          
          {["Sistema", "Aplicações", "Rede", "IA", "Dados"].map((category) => {
            const categoryCommands = commands.filter(cmd => cmd.category === category);
            if (categoryCommands.length === 0) return null;
            
            return (
              <CommandGroup key={category} heading={category}>
                {categoryCommands.map((command) => {
                  const Icon = command.icon;
                  return (
                    <CommandItem
                      key={command.id}
                      onSelect={() => executeCommand(command)}
                      className="flex items-center gap-3 p-3"
                    >
                      <Icon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="font-medium">{command.title}</div>
                        <div className="text-sm text-muted-foreground">{command.description}</div>
                      </div>
                      {command.shortcut && <CommandShortcut>{command.shortcut}</CommandShortcut>}
                    </CommandItem>
                  );
                })}
                <CommandSeparator />
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
}