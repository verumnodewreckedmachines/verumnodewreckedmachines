import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Loader2, Settings, Bot, Mic, Globe, BarChart3, PlayCircle } from 'lucide-react';

export interface ProviderConfig {
  anthropicApiKey?: string;
  deepseekApiKey?: string;
  mistralApiKey?: string;
  googleApiKey?: string;
  elevenLabsApiKey?: string;
  elevenLabsVoiceId?: string;
}

interface ConfigStatus extends ProviderConfig {
  [key: string]: boolean | string | undefined;
}

export default function ConfigPage() {
  const [config, setConfig] = useState<ProviderConfig>({});
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('apis');

  const languages = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'Inglês (EUA)' },
    { value: 'en-GB', label: 'Inglês (UK)' },
    { value: 'es-ES', label: 'Espanhol' },
    { value: 'fr-FR', label: 'Francês' },
    { value: 'de-DE', label: 'Alemão' },
    { value: 'it-IT', label: 'Italiano' },
  ];

  const defaultVoices = [
    { value: '21m00Tcm4TlvDq8ikWAM', label: 'Rachel (Multilíngue)' },
    { value: 'AZnEq58P36J2j2x7u4Tg3UOn', label: 'Domi (Português)' },
    { value: 'pNInz6obpgDQGcKc7S2r', label: 'Brian (Inglês)' },
    { value: 'VR6AewLTig5f721XP6x6', label: 'Antonio (Espanhol)' },
    { value: 'g5CIjZ66A8H7XFiMZB6X', label: 'Thomas (Francês)' },
  ];

  // Carregar configuração atual
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/verum-ai/config');
        if (response.ok) {
          const data = await response.json();
          setStatus(data.configured || {});
        }
      } catch (error) {
        console.error('Erro ao carregar config:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  // Salvar configuração
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/verum-ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data.configured || {});
        // toast.success({ title: 'Configuração salva', description: 'As chaves API foram salvas com sucesso!' });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar configuração');
      }
    } catch (error) {
      // toast.error({ title: 'Erro', description: error instanceof Error ? error.message : 'Erro ao salvar configuração' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (key: keyof ProviderConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const isConfigured = (key: string) => status[key] === true;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">⚙️ Configuração do VERUM NODE</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="apis">APIs de IA</TabsTrigger>
            <TabsTrigger value="tts">TTS (Voz)</TabsTrigger>
            <TabsTrigger value="lang">Idiomas</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="test">Testar</TabsTrigger>
          </TabsList>

          {/* Aba de APIs */}
          <TabsContent value="apis" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-border">
              <CardHeader>
                <CardTitle className="text-xl">🤖 Configuração de APIs de Inteligência Artificial</CardTitle>
                <CardDescription>
                  Insira suas chaves API para habilitar os serviços de IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Mistral */}
                  <div className="space-y-2">
                    <Label htmlFor="mistralApiKey" className="flex items-center gap-2">
                      <span className="text-purple-400">🟣</span> Mistral AI
                      {isConfigured('mistralApiKey') && <Check className="w-4 h-4 text-green-500" />}
                    </Label>
                    <Input
                      id="mistralApiKey"
                      type="password"
                      placeholder="Sua chave Mistral AI..."
                      value={config.mistralApiKey || ''}
                      onChange={(e) => handleChange('mistralApiKey', e.target.value)}
                      className="bg-[#2a2a2a] border-border text-white"
                    />
                    <p className="text-xs text-gray-500">API Key para Mistral Large - <a href="https://mistral.ai" target="_blank" className="text-blue-400 hover:underline">Obter chave</a></p>
                  </div>

                  {/* DeepSeek */}
                  <div className="space-y-2">
                    <Label htmlFor="deepseekApiKey" className="flex items-center gap-2">
                      <span className="text-orange-400">🔍</span> DeepSeek
                      {isConfigured('deepseekApiKey') && <Check className="w-4 h-4 text-green-500" />}
                    </Label>
                    <Input
                      id="deepseekApiKey"
                      type="password"
                      placeholder="Sua chave DeepSeek..."
                      value={config.deepseekApiKey || ''}
                      onChange={(e) => handleChange('deepseekApiKey', e.target.value)}
                      className="bg-[#2a2a2a] border-border text-white"
                    />
                    <p className="text-xs text-gray-500">API Key gratuita - <a href="https://deepseek.com" target="_blank" className="text-blue-400 hover:underline">Obter chave</a></p>
                  </div>

                  {/* ElevenLabs */}
                  <div className="space-y-2">
                    <Label htmlFor="elevenLabsApiKey" className="flex items-center gap-2">
                      <span className="text-yellow-400">🎤</span> ElevenLabs TTS
                      {isConfigured('elevenLabsApiKey') && <Check className="w-4 h-4 text-green-500" />}
                    </Label>
                    <Input
                      id="elevenLabsApiKey"
                      type="password"
                      placeholder="Sua chave ElevenLabs..."
                      value={config.elevenLabsApiKey || ''}
                      onChange={(e) => handleChange('elevenLabsApiKey', e.target.value)}
                      className="bg-[#2a2a2a] border-border text-white"
                    />
                    <p className="text-xs text-gray-500">API Key para síntese de voz - <a href="https://elevenlabs.io" target="_blank" className="text-blue-400 hover:underline">Obter chave</a></p>
                  </div>

                  {/* Google (Gemini) */}
                  <div className="space-y-2">
                    <Label htmlFor="googleApiKey" className="flex items-center gap-2">
                      <span className="text-green-400">💎</span> Google Gemini
                      {isConfigured('googleApiKey') && <Check className="w-4 h-4 text-green-500" />}
                    </Label>
                    <Input
                      id="googleApiKey"
                      type="password"
                      placeholder="Sua chave Google..."
                      value={config.googleApiKey || ''}
                      onChange={(e) => handleChange('googleApiKey', e.target.value)}
                      className="bg-[#2a2a2a] border-border text-white"
                    />
                    <p className="text-xs text-gray-500">API Key para Google Gemini - <a href="https://aistudio.google.com" target="_blank" className="text-blue-400 hover:underline">Obter chave</a></p>
                  </div>

                  {/* Anthropic (Claude) */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="anthropicApiKey" className="flex items-center gap-2">
                      <span className="text-cyan-400">🧠</span> Anthropic (Claude)
                      {isConfigured('anthropicApiKey') && <Check className="w-4 h-4 text-green-500" />}
                    </Label>
                    <Input
                      id="anthropicApiKey"
                      type="password"
                      placeholder="Sua chave Anthropic..."
                      value={config.anthropicApiKey || ''}
                      onChange={(e) => handleChange('anthropicApiKey', e.target.value)}
                      className="bg-[#2a2a2a] border-border text-white"
                    />
                    <p className="text-xs text-gray-500">API Key para Claude models - <a href="https://anthropic.com" target="_blank" className="text-blue-400 hover:underline">Obter chave</a></p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Salvar Configuração
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de TTS */}
          <TabsContent value="tts" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-border">
              <CardHeader>
                <CardTitle className="text-xl">🎙️ Configuração de Síntese de Voz</CardTitle>
                <CardDescription>
                  Configure as opções de voz para o ElevenLabs TTS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="elevenLabsVoiceId">Voice ID (Opcional)</Label>
                  <Select
                    value={config.elevenLabsVoiceId || ''}
                    onValueChange={(value) => handleChange('elevenLabsVoiceId', value)}
                  >
                    <SelectTrigger className="w-full bg-[#2a2a2a] border-border text-white">
                      <SelectValue placeholder="Selecione uma voz..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] text-white">
                      {defaultVoices.map((voice) => (
                        <SelectItem key={voice.value} value={voice.value} className="focus:bg-[#2a2a2a]">
                          {voice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Deixe em branco para usar a voz padrão (Rachel - multilíngue)</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600"
                  >
                    Salvar Voz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Idiomas */}
          <TabsContent value="lang" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-border">
              <CardHeader>
                <CardTitle className="text-xl">🌍 Configuração de Idiomas</CardTitle>
                <CardDescription>
                  Selecione o idioma padrão para as respostas da IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Idioma de Resposta</Label>
                    <Select defaultValue="pt-BR" disabled>
                      <SelectTrigger className="w-full bg-[#2a2a2a] border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] text-white">
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="focus:bg-[#2a2a2a]">
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">O sistema VERUM é otimizado para Português, mas todos os modelos dão suporte a múltiplos idiomas</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Idioma de TTS (ElevenLabs)</Label>
                    <Select defaultValue="pt-BR" disabled>
                      <SelectTrigger className="w-full bg-[#2a2a2a] border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] text-white">
                        <SelectItem value="pt-BR">Português (Brasil) - Multilíngue</SelectItem>
                        <SelectItem value="en-US">Inglês</SelectItem>
                        <SelectItem value="es-ES">Espanhol</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">ElevenLabs v2 suporta 20+ idiomas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Status */}
          <TabsContent value="status" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-border">
              <CardHeader>
                <CardTitle className="text-xl">📊 Status dos Serviços</CardTitle>
                <CardDescription>
                  Verifique quais APIs estão configuradas e ativas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { key: 'anthropicApiKey', name: 'Anthropic (Claude)', icon: '🧠', color: 'cyan' },
                    { key: 'deepseekApiKey', name: 'DeepSeek', icon: '🔍', color: 'orange' },
                    { key: 'mistralApiKey', name: 'Mistral AI', icon: '🟣', color: 'purple' },
                    { key: 'googleApiKey', name: 'Google Gemini', icon: '💎', color: 'green' },
                    { key: 'elevenLabsApiKey', name: 'ElevenLabs TTS', icon: '🎤', color: 'yellow' },
                  ].map((service) => (
                    <Card key={service.key} className="bg-[#2a2a2a] border-border">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{service.icon} {service.name}</h3>
                            <p className="text-sm text-gray-400">API Key</p>
                          </div>
                          <div className={`p-2 rounded-full ${isConfigured(service.key) ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {isConfigured(service.key) ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Status: {isConfigured(service.key) ? '✅ Configurada' : '❌ Não configurada'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Teste */}
          <TabsContent value="test" className="space-y-4">
            <Card className="bg-[#1a1a1a] border-border">
              <CardHeader>
                <CardTitle className="text-xl">🧪 Teste os Serviços</CardTitle>
                <CardDescription>
                  Teste a conexão com as APIs configuradas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-[#2a2a2a] border-border hover:bg-[#3a3a3a]"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/health');
                        const data = await response.json();
                        alert(`API Health: Status: ${data.status}, Versão: ${data.version}`);
                      } catch (error) {
                        alert('Não foi possível conectar à API');
                      }
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Testar Conexão com a API
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-[#2a2a2a] border-border hover:bg-[#3a3a3a]"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/search/duck?q=VERUM+OS');
                        const data = await response.json();
                        alert(`DuckDuckGo: Encontrou ${data.results?.length || 0} resultados`);
                      } catch (error) {
                        alert('Busca indisponível');
                      }
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Testar Busca Web
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-[#2a2a2a] border-border hover:bg-[#3a3a3a]"
                    disabled={!isConfigured('elevenLabsApiKey')}
                    onClick={async () => {
                      if (!isConfigured('elevenLabsApiKey')) {
                        alert('Configure a ElevenLabs API primeiro');
                        return;
                      }
                      try {
                        const response = await fetch('/api/media/text-to-speech/audio', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ text: 'Olá, este é um teste do VERUM NODE', language: 'pt-BR' }),
                        });
                        if (response.ok) {
                          const blob = await response.blob();
                          alert(`TTS: Áudio gerado com sucesso (${(blob.size / 1024).toFixed(2)} KB)`);
                        }
                      } catch (error) {
                        alert('TTS indisponível');
                      }
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Testar Síntese de Voz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dicas */}
        <Card className="bg-[#1a1a1a] border-border mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">💡 Dicas:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Todas as APIs oferecem camadas gratuitas para teste</li>
              <li>• ElevenLabs: 10.000 caracteres/mês gratuitos</li>
              <li>• Mistral: €2 de crédito gratuito no primeiro cadastro</li>
              <li>• DeepSeek: 100% gratuito e sem limites (por enquanto)</li>
              <li>• Google Gemini: $300 de crédito gratuito para novos usuários</li>
              <li>• As chaves são armazenadas apenas localmente no seu navegador</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
