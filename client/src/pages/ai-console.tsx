import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Settings, Volume2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  provider?: string;
}

interface PdfResponse {
  filename: string;
  pages: number;
  text: string;
  ipfs?: { cid: string } | null;
  ipfsError?: string;
  integrity?: { algorithm: string; hash: string; signed: boolean };
  opentimestamps?: { status: string; proofFilename: string; proofBase64: string } | null;
}

interface ProviderKeys {
  anthropicApiKey: string;
  deepseekApiKey: string;
  mistralApiKey: string;
  googleApiKey: string;
  elevenLabsApiKey: string;
  elevenLabsVoiceId: string;
}

type ChatLanguage = 'pt-BR' | 'en-US';

export default function AIConsole() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeAI, setActiveAI] = useState<'deepseek' | 'mistral' | 'gemini' | 'claude'>('deepseek');
  const [documentContext, setDocumentContext] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [grounded, setGrounded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage>('pt-BR');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [configuredProviders, setConfiguredProviders] = useState<Record<string, boolean>>({});
  const [providerKeys, setProviderKeys] = useState<Partial<ProviderKeys>>(() => {
    try {
      return JSON.parse(localStorage.getItem('verum-provider-config') || '{}') as Partial<ProviderKeys>;
    } catch {
      return {};
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (Object.values(providerKeys).some(Boolean)) {
      fetch('/api/verum-ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(providerKeys),
      }).catch(() => undefined);
    }
  }, []);

  const copy = language === 'pt-BR' ? {
    title: 'VERUM AI Console - Chat com IA',
    subtitle: 'Converse com a IA, envie PDFs e ouca respostas em voz',
    configure: 'Configurar APIs',
    settings: 'Configuracao local',
    settingsNote: 'As chaves sao usadas apenas nesta sessao.',
    cancel: 'Cancelar',
    apply: 'Aplicar configuracao',
    applying: 'Aplicando...',
    start: 'Inicie uma conversa com a IA',
    attach: 'Anexar PDF',
    reading: 'Lendo PDF...',
    sources: 'Buscar fontes DuckDuckGo',
    send: 'Enviar',
    placeholder: 'Digite sua mensagem...',
    language: 'Idioma',
  } : {
    title: 'VERUM AI Console - AI Chat',
    subtitle: 'Chat with AI, send PDFs and listen to voice responses',
    configure: 'Configure APIs',
    settings: 'Local configuration',
    settingsNote: 'Keys are used only in this session.',
    cancel: 'Cancel',
    apply: 'Apply configuration',
    applying: 'Applying...',
    start: 'Start a conversation with AI',
    attach: 'Attach PDF',
    reading: 'Reading PDF...',
    sources: 'Search DuckDuckGo sources',
    send: 'Send',
    placeholder: 'Type your message...',
    language: 'Language',
  };

  const saveProviderSettings = async () => {
    setIsSavingSettings(true);
    try {
      const response = await fetch('/api/verum-ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(providerKeys),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao configurar');
      localStorage.setItem('verum-provider-config', JSON.stringify(providerKeys));
      setConfiguredProviders(data.configured || {});
      setShowSettings(false);
      toast({ title: 'OK', description: 'Chaves configuradas!' });
    } catch (error) {
      toast({ title: 'Erro', description: error instanceof Error ? error.message : 'Falha', variant: 'destructive' });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isSpeaking) return;
    await sendChatRequest(message, documentContext);
    setInput('');
  };

  const sendChatRequest = async (message: string, context?: string) => {
    if (!message.trim() || isSpeaking) return;
    setMessages(prev => [...prev, { role: 'user', content: message, timestamp: new Date() }]);
    try {
      const response = await fetch('/api/verum-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, provider: activeAI, context: context || undefined, grounded }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.details || error.error || 'Erro na comunicacao');
      }
      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        provider: data.provider,
      }]);
    } catch (error) {
      toast({ title: 'Erro', description: error instanceof Error ? error.message : 'Falha', variant: 'destructive' });
    }
  };

  const readPdf = async (file: File) => {
    setIsReadingPdf(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      const response = await fetch('/api/media/extract-pdf', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao ler PDF');
      const pdfData = data as PdfResponse;
      setDocumentContext(pdfData.text);
      setDocumentName(`${data.filename} (${data.pages} paginas)`);
      if (pdfData.opentimestamps?.proofBase64) {
        const proofBytes = Uint8Array.from(atob(pdfData.opentimestamps.proofBase64), c => c.charCodeAt(0));
        const proofUrl = URL.createObjectURL(new Blob([proofBytes], { type: 'application/octet-stream' }));
        const proofLink = document.createElement('a');
        proofLink.href = proofUrl;
        proofLink.download = pdfData.opentimestamps.proofFilename;
        proofLink.click();
        URL.revokeObjectURL(proofUrl);
      }
      const pdfPrompt = `Analise o PDF "${pdfData.filename}". Faca um resumo, destaque pontos principais. Nao invente hashes. Responda em portugues.`;
      await sendChatRequest(pdfPrompt, `Texto do PDF:\n${pdfData.text}`);
      toast({ title: 'PDF pronto', description: `Arquivo: ${pdfData.filename}` });
    } catch (error) {
      toast({ title: 'Erro', description: 'Falha ao ler PDF', variant: 'destructive' });
    } finally {
      setIsReadingPdf(false);
    }
  };

  const speak = async (text: string) => {
    setIsSpeaking(true);
    try {
      const response = await fetch('/api/media/text-to-speech/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 1000), language: 'pt-BR' }),
      });
      if (!response.ok) throw new Error('TTS indisponivel');
      const audio = new Audio(URL.createObjectURL(await response.blob()));
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      await audio.play();
    } catch {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
        toast({ title: 'TTS indisponivel', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{copy.title}</h1>
          <p className="text-gray-400">{copy.subtitle}</p>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setShowSettings(v => !v)}>
              <Settings className="mr-2 h-4 w-4" /> {copy.configure}
            </Button>
          </div>

          {showSettings && (
            <Card className="mt-4 space-y-3 border-cyan-900 bg-[#151515] p-4">
              <h2 className="text-lg font-semibold">{copy.settings}</h2>
              <p className="text-xs text-gray-400">{copy.settingsNote}</p>
              <label className="block text-sm text-gray-300">
                {copy.language}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as ChatLanguage)}
                  className="mt-1 w-full rounded border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2 text-white"
                >
                  <option value="pt-BR">Portugues (Brasil)</option>
                  <option value="en-US">English (US)</option>
                </select>
              </label>
              {([
                ['deepseekApiKey', 'DEEPSEEK_API_KEY'],
                ['mistralApiKey', 'MISTRAL_API_KEY'],
                ['googleApiKey', 'GOOGLE_API_KEY'],
                ['anthropicApiKey', 'ANTHROPIC_API_KEY'],
                ['elevenLabsApiKey', 'ELEVENLABS_API_KEY'],
                ['elevenLabsVoiceId', 'ELEVENLABS_VOICE_ID'],
              ] as const).map(([key, label]) => (
                <label key={key} className="block text-sm text-gray-300">
                  {label}
                  <Input
                    type={key.endsWith('ApiKey') ? 'password' : 'text'}
                    value={providerKeys[key] || ''}
                    onChange={(e) => setProviderKeys(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={`Cole ${label}`}
                    className="mt-1 bg-[#0d0d0d]"
                  />
                </label>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShowSettings(false)}>{copy.cancel}</Button>
                <Button onClick={saveProviderSettings} disabled={isSavingSettings} className="bg-cyan-600">
                  {isSavingSettings ? copy.applying : copy.apply}
                </Button>
              </div>
            </Card>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveAI('deepseek')}
              className={`px-4 py-2 rounded-lg ${activeAI === 'deepseek' ? 'bg-[#00d4aa] text-black font-bold' : 'bg-[#2a2a2a] text-gray-400'}`}
            >DeepSeek</button>
            <button
              onClick={() => setActiveAI('mistral')}
              className={`px-4 py-2 rounded-lg ${activeAI === 'mistral' ? 'bg-blue-500 text-white font-bold' : 'bg-[#2a2a2a] text-gray-400'}`}
            >Mistral</button>
            <button
              onClick={() => setActiveAI('gemini')}
              className={`px-4 py-2 rounded-lg ${activeAI === 'gemini' ? 'bg-purple-500 text-white font-bold' : 'bg-[#2a2a2a] text-gray-400'}`}
            >Gemini</button>
            <button
              onClick={() => setActiveAI('claude')}
              className={`px-4 py-2 rounded-lg ${activeAI === 'claude' ? 'bg-yellow-500 text-black font-bold' : 'bg-[#2a2a2a] text-gray-400'}`}
            >Claude</button>
          </div>
        </div>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a] mb-6 h-96 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>{copy.start}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-[#00d4aa] text-black' : 'bg-[#2a2a2a] text-white'}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.role === 'assistant' && (
                      <button onClick={() => speak(message.content)} className="mt-2 text-xs text-cyan-300" disabled={isSpeaking}>
                        <Volume2 className="mr-1 inline h-3 w-3" /> Ouvir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="mb-3 flex flex-wrap items-center gap-3">
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && readPdf(e.target.files[0])} />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isReadingPdf}>
            {isReadingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            {isReadingPdf ? copy.reading : copy.attach}
          </Button>
          {documentName && <span className="text-sm">{documentName}</span>}
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={grounded} onChange={(e) => setGrounded(e.target.checked)} />
            {copy.sources}
          </label>
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={copy.placeholder}
            className="bg-[#1a1a1a] border-[#2a2a2a] text-white flex-1"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={isSpeaking || !input.trim()} className="bg-[#00d4aa]">
            {copy.send}
          </Button>
        </div>
      </div>
    </div>
  );
}
