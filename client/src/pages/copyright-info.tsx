import { MacOSWindow } from '@/components/figma/MacOSWindow';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Globe, Calendar, User, Mail, MapPin } from 'lucide-react';

export default function CopyrightInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background p-6">
      <div className="cyber-grid fixed inset-0 opacity-20 pointer-events-none"></div>
      
      <MacOSWindow title="VERUM NODE - Copyright Protection" className="max-w-6xl mx-auto h-[calc(100vh-3rem)] relative z-10">
        <div className="p-8 h-full overflow-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              🛡️ VERUM NODE - Propriedade Intelectual Protegida
            </h1>
            <p className="text-lg text-muted-foreground">
              Sistema empresarial com direitos autorais oficiais registrados nos Estados Unidos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Copyright Registration */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 mr-3 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">US Copyright Registration</h2>
                  <Badge className="mt-2 bg-green-400/20 text-green-400">Oficialmente Protegido</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Registration Number:</span>
                  <span className="font-mono text-lg font-bold text-green-400">TX0009512048</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Registration Date:</span>
                  <span className="font-semibold">2025-06-18</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Publication Date:</span>
                  <span className="font-semibold">2025-05-13</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type of Work:</span>
                  <span className="font-semibold">Computer Files/Program</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nation of First Publication:</span>
                  <span className="font-semibold">Brasil 🇧🇷</span>
                </div>
              </div>
            </Card>

            {/* Work Information */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 mr-3 text-blue-400" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Work Information</h2>
                  <Badge className="mt-2 bg-blue-400/20 text-blue-400">Code of Soul - Open OJ</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground block">Title:</span>
                  <span className="font-bold text-lg">Code of Soul - Open OJ</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Application Title:</span>
                  <span className="font-semibold">Code of Soul - Open OJ</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Date of Creation:</span>
                  <span className="font-semibold">2025</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Basis of Claim:</span>
                  <span className="font-semibold">Computer Program</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Description:</span>
                  <span className="font-semibold">Electronic file (eService)</span>
                </div>
              </div>
            </Card>

            {/* Copyright Owner */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <User className="h-8 w-8 mr-3 text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Copyright Claimant</h2>
                  <Badge className="mt-2 bg-purple-400/20 text-purple-400">Proprietário Oficial</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground block">Full Name:</span>
                  <span className="font-bold text-lg">Rafael Augusto Xavier Fernandes</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Birth Year:</span>
                  <span className="font-semibold">1988</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Domicile:</span>
                  <span className="font-semibold">United States</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Citizenship:</span>
                  <span className="font-semibold">Brazil 🇧🇷</span>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Authorship:</span>
                  <span className="font-semibold">Computer Program</span>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Mail className="h-8 w-8 mr-3 text-orange-400" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Rights & Permissions</h2>
                  <Badge className="mt-2 bg-orange-400/20 text-orange-400">Contact Information</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Address:</span>
                    <span className="font-semibold">1968 S. Coast Hwy Suite 412</span>
                    <span className="font-semibold block">Laguna Beach, CA 92651, USA</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Email:</span>
                    <span className="font-semibold">rafael@humanriskdefender.com</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground block">Phone:</span>
                    <span className="font-semibold">(620) 604-8378</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground block">USCO Catalog:</span>
                    <span className="font-mono text-xs">voyager_38787351</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-muted/10 rounded-lg border border-muted">
            <h3 className="font-bold text-lg mb-3">⚖️ Legal Protection Notice</h3>
            <p className="text-sm text-muted-foreground">
              Este sistema VERUM NODE é protegido por direitos autorais oficiais dos Estados Unidos. 
              Qualquer uso não autorizado, reprodução ou distribuição pode resultar em ações legais. 
              Para licenciamento ou permissões, entre em contato com o proprietário dos direitos autorais.
            </p>
          </div>
        </div>
      </MacOSWindow>
    </div>
  );
}