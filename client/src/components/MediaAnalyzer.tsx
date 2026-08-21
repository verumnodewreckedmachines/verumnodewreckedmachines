import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Image, Volume2, Mic, Eye, Brain } from 'lucide-react';

interface AnalysisResult {
  message: string;
  filename?: string;
  size?: number;
  type?: string;
  analysis: string;
  processedBy: string;
  timestamp: string;
}

export function MediaAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [textForTTS, setTextForTTS] = useState('');
  const [isProcessingTTS, setIsProcessingTTS] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo primeiro",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      
      let endpoint = '/api/media/analyze';
      
      if (selectedFile.type === 'application/pdf') {
        formData.append('pdf', selectedFile);
        endpoint = '/api/media/analyze-pdf';
      } else if (selectedFile.type.startsWith('image/')) {
        formData.append('image', selectedFile);
        endpoint = '/api/media/analyze-image';
      } else if (selectedFile.type.startsWith('audio/')) {
        formData.append('audio', selectedFile);
        endpoint = '/api/media/analyze-audio';
      } else {
        formData.append('file', selectedFile);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Análise Concluída",
        description: `${selectedFile.name} processado com sucesso`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Erro na Análise",
        description: error instanceof Error ? error.message : "Falha no processamento do arquivo",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processTextToSpeech = async () => {
    if (!textForTTS.trim()) {
      toast({
        title: "Erro",
        description: "Digite um texto para síntese de voz",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingTTS(true);
    
    try {
      const response = await fetch('/api/media/text-to-speech', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textForTTS }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Use Web Speech API for actual speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textForTTS);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
      
      toast({
        title: "TTS Processado",
        description: "Texto convertido para áudio com VERUM AI",
      });
      
      console.log('TTS Metadata:', data);
    } catch (error) {
      console.error('TTS error:', error);
      toast({
        title: "Erro TTS",
        description: error instanceof Error ? error.message : "Falha na síntese de voz",
        variant: "destructive"
      });
    } finally {
      setIsProcessingTTS(false);
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="w-8 h-8" />;
    
    if (selectedFile.type === 'application/pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (selectedFile.type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    if (selectedFile.type.startsWith('audio/')) return <Volume2 className="w-8 h-8 text-green-500" />;
    
    return <Upload className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-light mb-2 flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-[#00d4aa]" />
            VERUM AI Media Analyzer
          </h1>
          <p className="text-gray-400">Análise Avançada com VERUM AI + PDF + Vision + TTS</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* File Upload Section */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload de Arquivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center">
                {getFileIcon()}
                <p className="mt-4 text-gray-400">
                  {selectedFile ? selectedFile.name : "Arraste um arquivo ou clique para selecionar"}
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.mp3,.wav,.ogg,.m4a,.aac"
                  onChange={handleFileSelect}
                  className="mt-4 bg-[#2a2a2a] border-[#3a3a3a]"
                />
              </div>
              
              {selectedFile && (
                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong>Arquivo:</strong> {selectedFile.name}</p>
                  <p><strong>Tamanho:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Tipo:</strong> {selectedFile.type}</p>
                </div>
              )}
              
              <Button 
                onClick={analyzeFile}
                disabled={!selectedFile || isAnalyzing}
                className="w-full bg-[#00d4aa] hover:bg-[#00b894] text-black"
              >
                {isAnalyzing ? (
                  <>
                    <Eye className="w-4 h-4 mr-2 animate-spin" />
                    Analisando com VERUM AI...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analisar com VERUM AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Text to Speech Section */}
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Síntese de Voz VERUM AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Digite o texto para converter em voz..."
                value={textForTTS}
                onChange={(e) => setTextForTTS(e.target.value)}
                className="bg-[#2a2a2a] border-[#3a3a3a] min-h-32 resize-none"
                maxLength={1000}
              />
              
              <div className="text-sm text-gray-400 text-right">
                {textForTTS.length}/1000 caracteres
              </div>
              
              <Button 
                onClick={processTextToSpeech}
                disabled={!textForTTS.trim() || isProcessingTTS}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isProcessingTTS ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                    Processando TTS...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Converter para Voz
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {result && (
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#00d4aa]">
                <Brain className="w-5 h-5" />
                Resultado da Análise VERUM AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {result.filename && (
                  <div>
                    <p className="text-gray-400">Arquivo</p>
                    <p className="font-medium">{result.filename}</p>
                  </div>
                )}
                {result.size && (
                  <div>
                    <p className="text-gray-400">Tamanho</p>
                    <p className="font-medium">{(result.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400">Processado por</p>
                  <p className="font-medium text-[#00d4aa]">{result.processedBy}</p>
                </div>
                <div>
                  <p className="text-gray-400">Timestamp</p>
                  <p className="font-medium">{new Date(result.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div className="border-t border-[#2a2a2a] pt-4">
                <h4 className="font-semibold mb-2 text-[#00d4aa]">Análise Completa:</h4>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {result.analysis}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Capabilities Info */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-[#00d4aa]">Capacidades VERUM AI Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  Análise de PDF
                </h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Extração de texto completo</li>
                  <li>• Resumo executivo inteligente</li>
                  <li>• Análise técnica detalhada</li>
                  <li>• Integração com VERUM OS</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" />
                  Computer Vision
                </h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Análise visual avançada</li>
                  <li>• Extração de texto de imagens</li>
                  <li>• Contexto técnico e metadados</li>
                  <li>• VERUM AI Vision Pro</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-green-500" />
                  Síntese de Voz
                </h4>
                <ul className="text-gray-400 space-y-1">
                  <li>• Text-to-Speech nativo</li>
                  <li>• Processamento em português</li>
                  <li>• Web Speech API</li>
                  <li>• Preparado para librosa</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default MediaAnalyzer;