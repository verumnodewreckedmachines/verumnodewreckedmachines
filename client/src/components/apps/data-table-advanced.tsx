import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Search, Download, Filter, Settings, MoreHorizontal, TrendingUp, Database } from "lucide-react";

interface DataEntry {
  id: string;
  name: string;
  status: "active" | "pending" | "completed" | "error";
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  progress: number;
  type: string;
  category: string;
  lastModified: string;
  size: string;
}

export function DataTableAdvanced() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [compactMode, setCompactMode] = useState(false);
  const [progressThreshold, setProgressThreshold] = useState([50]);
  const [selectedView, setSelectedView] = useState("grid");

  const sampleData: DataEntry[] = [
    {
      id: "1",
      name: "Sistema de Autenticação Quântica",
      status: "active",
      priority: "critical",
      assignee: "Dr. Silva",
      progress: 85,
      type: "Segurança",
      category: "Enterprise",
      lastModified: "2025-01-11",
      size: "2.4 MB"
    },
    {
      id: "2",
      name: "Interface Holográfica VERUM",
      status: "completed",
      priority: "high",
      assignee: "Eng. Santos",
      progress: 100,
      type: "UI/UX",
      category: "Core",
      lastModified: "2025-01-10",
      size: "8.7 MB"
    },
    {
      id: "3",
      name: "Processamento Neural Alpha",
      status: "pending",
      priority: "medium",
      assignee: "Dr. Costa",
      progress: 65,
      type: "IA",
      category: "Advanced",
      lastModified: "2025-01-09",
      size: "12.1 MB"
    },
    {
      id: "4",
      name: "Kernel de Comunicação Quântica",
      status: "error",
      priority: "critical",
      assignee: "Eng. Oliveira",
      progress: 45,
      type: "Sistema",
      category: "Core",
      lastModified: "2025-01-08",
      size: "5.8 MB"
    },
    {
      id: "5",
      name: "Dashboard de Métricas OMEGA",
      status: "active",
      priority: "high",
      assignee: "Ana Lima",
      progress: 72,
      type: "Analytics",
      category: "Enterprise",
      lastModified: "2025-01-07",
      size: "3.2 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600/20 text-red-400 border-red-600/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredData = sampleData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    const matchesProgress = item.progress >= progressThreshold[0];
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProgress;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="glass-effect p-6 rounded-xl border border-verum-border space-y-6">
      {/* Header com Menubar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-verum-cyan mb-2">
            Tabela de Dados VERUM
          </h2>
          <p className="text-gray-400">
            Sistema avançado de gerenciamento de dados empresariais
          </p>
        </div>
        
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Exportar Dados
                <MenubarShortcut>⌘E</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Importar Dados
                <MenubarShortcut>⌘I</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Preferências</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger>
              <TrendingUp className="w-4 h-4 mr-2" />
              Visualização
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setSelectedView("grid")}>
                Visualização em Grade
              </MenubarItem>
              <MenubarItem onClick={() => setSelectedView("list")}>
                Visualização em Lista
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setCompactMode(!compactMode)}>
                Modo Compacto
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg border">
        {/* Painel de Filtros */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-white">Filtros Avançados</h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar dados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-verum-dark/50 border-verum-border"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-verum-dark/50 border-verum-border">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Completo</SelectItem>
                    <SelectItem value="error">Erro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Prioridade</Label>
                <RadioGroup value={priorityFilter} onValueChange={setPriorityFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Todas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical">Crítica</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">Alta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Média</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Baixa</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm text-gray-400 mb-2 block">
                  Progresso Mínimo: {progressThreshold[0]}%
                </Label>
                <Slider
                  value={progressThreshold}
                  onValueChange={setProgressThreshold}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="compact-mode"
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
                <Label htmlFor="compact-mode">Modo Compacto</Label>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Painel Principal da Tabela */}
        <ResizablePanel defaultSize={75}>
          <div className="p-4">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-verum-cyan">Nome</TableHead>
                    <TableHead className="text-verum-cyan">Status</TableHead>
                    <TableHead className="text-verum-cyan">Prioridade</TableHead>
                    <TableHead className="text-verum-cyan">Responsável</TableHead>
                    <TableHead className="text-verum-cyan">Progresso</TableHead>
                    <TableHead className="text-verum-cyan">Tipo</TableHead>
                    <TableHead className="text-verum-cyan">Tamanho</TableHead>
                    <TableHead className="text-verum-cyan">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item) => (
                    <TableRow key={item.id} className={compactMode ? "h-10" : "h-16"}>
                      <TableCell className="font-medium text-white">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          {!compactMode && (
                            <div className="text-sm text-gray-400">{item.category}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{item.assignee}</TableCell>
                      <TableCell>
                        <div className="w-full space-y-1">
                          <Progress value={item.progress} className="h-2" />
                          <span className="text-xs text-gray-400">{item.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-verum-purple">{item.type}</span>
                      </TableCell>
                      <TableCell className="text-gray-400">{item.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Controles de Paginação */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label className="text-sm text-gray-400">Itens por página:</Label>
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-20 bg-verum-dark/50 border-verum-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-gray-400">
                Mostrando {((currentPage - 1) * pageSize) + 1} a{" "}
                {Math.min(currentPage * pageSize, filteredData.length)} de{" "}
                {filteredData.length} resultados
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 5 && <PaginationEllipsis />}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Estatísticas da Tabela */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect p-4 rounded-lg border border-verum-border">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-verum-cyan" />
            <span className="text-sm text-gray-400">Total de Registros</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{sampleData.length}</div>
        </div>
        
        <div className="glass-effect p-4 rounded-lg border border-verum-border">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-verum-green" />
            <span className="text-sm text-gray-400">Filtrados</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{filteredData.length}</div>
        </div>
        
        <div className="glass-effect p-4 rounded-lg border border-verum-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-verum-purple" />
            <span className="text-sm text-gray-400">Progresso Médio</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {Math.round(filteredData.reduce((acc, item) => acc + item.progress, 0) / filteredData.length || 0)}%
          </div>
        </div>
        
        <div className="glass-effect p-4 rounded-lg border border-verum-border">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-verum-orange" />
            <span className="text-sm text-gray-400">Ativos</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {filteredData.filter(item => item.status === "active").length}
          </div>
        </div>
      </div>
    </div>
  );
}