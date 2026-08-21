import { useState, useEffect } from "react";
import { Shield, Key, Smartphone, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface OTPSession {
  id: string;
  service: string;
  code: string;
  expiresAt: Date;
  status: "active" | "expired" | "used";
}

export function SecurityOTP() {
  const [otpValue, setOtpValue] = useState("");
  const [sessions, setSessions] = useState<OTPSession[]>([
    {
      id: "1",
      service: "VERUM Supreme Access",
      code: "123456",
      expiresAt: new Date(Date.now() + 30000),
      status: "active"
    },
    {
      id: "2", 
      service: "OMEGA Console Admin",
      code: "789012",
      expiresAt: new Date(Date.now() + 25000),
      status: "active"
    },
    {
      id: "3",
      service: "Quantum Bridge Auth",
      code: "345678",
      expiresAt: new Date(Date.now() + 15000),
      status: "active"
    }
  ]);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newTimeRemaining: Record<string, number> = {};
      
      setSessions(prevSessions => 
        prevSessions.map(session => {
          const remaining = Math.max(0, session.expiresAt.getTime() - now.getTime());
          newTimeRemaining[session.id] = remaining;
          
          if (remaining === 0 && session.status === "active") {
            return { ...session, status: "expired" as const };
          }
          return session;
        })
      );
      
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateNewOTP = (service: string) => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newSession: OTPSession = {
      id: Date.now().toString(),
      service,
      code: newCode,
      expiresAt: new Date(Date.now() + 30000),
      status: "active"
    };
    
    setSessions(prev => [...prev, newSession]);
  };

  const verifyOTP = () => {
    const activeSession = sessions.find(s => s.code === otpValue && s.status === "active");
    if (activeSession) {
      setSessions(prev => 
        prev.map(s => s.id === activeSession.id ? { ...s, status: "used" as const } : s)
      );
      setOtpValue("");
      return true;
    }
    return false;
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "expired": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "used": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="w-4 h-4" />;
      case "expired": return <AlertTriangle className="w-4 h-4" />;
      case "used": return <CheckCircle className="w-4 h-4" />;
      default: return <Key className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl border border-verum-border space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-verum-cyan mb-2">
            Sistema OTP VERUM
          </h2>
          <p className="text-gray-400">
            Autenticação de dois fatores quântica
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-verum-cyan" />
          <Badge className="bg-verum-cyan/20 text-verum-cyan border-verum-cyan/30">
            Nível Máximo
          </Badge>
        </div>
      </div>

      {/* OTP Input */}
      <Card className="border-verum-border bg-verum-glass/20">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-verum-cyan" />
            Verificação de Código
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <InputOTP 
              maxLength={6} 
              value={otpValue} 
              onChange={setOtpValue}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <div className="flex gap-3">
              <Button 
                onClick={verifyOTP}
                disabled={otpValue.length !== 6}
                className="bg-verum-cyan/20 hover:bg-verum-cyan/30 text-verum-cyan border border-verum-cyan/30"
              >
                Verificar Código
              </Button>
              <Button 
                variant="outline"
                onClick={() => setOtpValue("")}
                className="border-verum-border hover:bg-verum-glass/30"
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Sessões Ativas</h3>
          <Button 
            size="sm"
            onClick={() => generateNewOTP("Novo Serviço")}
            className="bg-verum-purple/20 hover:bg-verum-purple/30 text-verum-purple border border-verum-purple/30"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Gerar OTP
          </Button>
        </div>

        <div className="grid gap-3">
          {sessions.map((session) => {
            const remaining = timeRemaining[session.id] || 0;
            const progress = (remaining / 30000) * 100;
            
            return (
              <HoverCard key={session.id}>
                <HoverCardTrigger asChild>
                  <Card className="border-verum-border bg-verum-glass/10 hover:bg-verum-glass/20 transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-verum-cyan/20">
                            {getStatusIcon(session.status)}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{session.service}</h4>
                            <div className="flex items-center gap-2 text-sm">
                              <code className="bg-verum-dark/50 px-2 py-1 rounded text-verum-cyan">
                                {session.code}
                              </code>
                              {session.status === "active" && (
                                <span className="text-gray-400">
                                  expira em {formatTime(remaining)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                      
                      {session.status === "active" && (
                        <div className="mt-3">
                          <Progress 
                            value={progress} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{session.service}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Código:</span>
                        <br />
                        <code className="font-mono">{session.code}</code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <br />
                        <span className="capitalize">{session.status}</span>
                      </div>
                    </div>
                    {session.status === "active" && (
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Expira em: {formatTime(remaining)}
                        </span>
                      </div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>

      {/* Security Stats */}
      <Card className="border-verum-border bg-verum-glass/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">Estatísticas de Segurança</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-verum-green mb-1">
                {sessions.filter(s => s.status === "used").length}
              </div>
              <div className="text-sm text-gray-400">Verificações Bem-sucedidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-verum-cyan mb-1">
                {sessions.filter(s => s.status === "active").length}
              </div>
              <div className="text-sm text-gray-400">Códigos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-verum-orange mb-1">
                {sessions.filter(s => s.status === "expired").length}
              </div>
              <div className="text-sm text-gray-400">Códigos Expirados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}