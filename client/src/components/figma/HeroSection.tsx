import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Users, Award, ArrowUpRight, ArrowDownRight, Activity, Shield, Database, Server, Globe, Lock, FileText, BarChart3 } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', processados: 2400, documentos: 1200, seguranca: 98 },
  { month: 'Fev', processados: 1398, documentos: 1900, seguranca: 97 },
  { month: 'Mar', processados: 9800, documentos: 800, seguranca: 99 },
  { month: 'Abr', processados: 3908, documentos: 2500, seguranca: 98 },
  { month: 'Mai', processados: 4800, documentos: 1800, seguranca: 99 },
  { month: 'Jun', processados: 3800, documentos: 2200, seguranca: 100 },
];

const systemData = [
  { name: 'Processamento', value: 45, color: '#00d4aa' },
  { name: 'Armazenamento', value: 32, color: '#0ea5e9' },
  { name: 'Segurança', value: 23, color: '#22c55e' },
];

export function HeroSection() {
  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="verum-card p-8 border-0 hologram-effect">
        <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-green-500 flex items-center justify-center shadow-xl verum-glow">
                <Shield className="h-8 w-8 text-black font-bold" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">VERUM NODE - Sistema Ativo</h1>
                <p className="text-muted-foreground text-lg mt-1">
                  Plataforma Neural Governamental Brasileira
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full verum-pulse"></div>
                <span className="text-green-400 font-semibold">Sistema Operacional</span>
              </div>
              <div className="flex items-center space-x-2">
                <Server className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">16 Núcleos Ativos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">5.7TB Processados</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-muted-foreground">Criptografia AES-256</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="h-12 px-5 bg-accent/30 text-accent-foreground border-accent-foreground/20 font-semibold">
              <TrendingUp className="mr-2 h-4 w-4" />
              +34% Eficiência
            </Badge>
            <Badge variant="secondary" className="h-12 px-5 bg-green-900/30 text-green-400 border-green-400/30 font-semibold">
              <Shield className="mr-2 h-4 w-4" />
              Segurança Total
            </Badge>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="verum-card border-0 group hover:shadow-xl transition-all duration-300 hover:verum-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dados Processados</CardTitle>
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="h-6 w-6 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5.7TB</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-3">
              <ArrowUpRight className="h-4 w-4 text-green-400" />
              <span>+2.3TB esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card className="verum-card border-0 group hover:shadow-xl transition-all duration-300 hover:verum-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documentos Analisados</CardTitle>
            <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">847.2K</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-3">
              <ArrowUpRight className="h-4 w-4 text-green-400" />
              <span>+15% precisão</span>
            </div>
          </CardContent>
        </Card>

        <Card className="verum-card border-0 group hover:shadow-xl transition-all duration-300 hover:verum-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.847</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-3">
              <ArrowUpRight className="h-4 w-4 text-green-400" />
              <span>267 conectados agora</span>
            </div>
          </CardContent>
        </Card>

        <Card className="verum-card border-0 group hover:shadow-xl transition-all duration-300 hover:verum-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nível de Segurança</CardTitle>
            <div className="w-12 h-12 rounded-xl bg-orange-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.8%</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-3">
              <ArrowUpRight className="h-4 w-4 text-green-400" />
              <span>Máxima proteção</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Goals */}
      <Card className="verum-card border-0 hologram-effect">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Metas do Sistema</span>
          </CardTitle>
          <CardDescription>
            Acompanhe o progresso das metas governamentais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Eficiência de Processamento</span>
              <span className="text-sm text-muted-foreground font-mono">92/100</span>
            </div>
            <Progress value={92} className="h-3" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Segurança de Dados</span>
              <span className="text-sm text-muted-foreground font-mono">99/100</span>
            </div>
            <Progress value={99} className="h-3" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Disponibilidade do Sistema</span>
              <span className="text-sm text-muted-foreground font-mono">99.8/100</span>
            </div>
            <Progress value={99.8} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}