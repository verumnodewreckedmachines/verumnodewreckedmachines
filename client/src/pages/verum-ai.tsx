import { useState } from "react";
import { Send, Bot, User, Loader2, Brain } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  provider?: string;
}

export default function VerumAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAI, setActiveAI] = useState<'claude' | 'llama' | 'mistral'>('claude');

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let endpoint = '';
      switch (activeAI) {
        case 'claude':
          endpoint = '/api/claude/chat';
          break;
        case 'llama':
          endpoint = '/api/llama/chat';
          break;
        case 'mistral':
          endpoint = '/api/mistral/chat';
          break;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response from ${activeAI}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content || data.message || "Erro na resposta da AI",
        timestamp: new Date(),
        provider: activeAI,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Chat error:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Erro ao conectar com ${activeAI}. Verifique se o serviço está ativo.`,
        timestamp: new Date(),
        provider: activeAI,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">VERUM AI Console</h1>
                <p className="text-gray-400">Sistema Inteligente VERUM NODE</p>
              </div>
            </div>
            
            {/* AI Provider Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveAI('claude')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAI === 'claude' 
                    ? 'bg-[#00d4aa] text-black font-semibold' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Claude Sonnet-4
              </button>
              <button
                onClick={() => setActiveAI('llama')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAI === 'llama' 
                    ? 'bg-blue-500 text-white font-semibold' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Llama 2 70B
              </button>
              <button
                onClick={() => setActiveAI('mistral')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAI === 'mistral' 
                    ? 'bg-purple-500 text-white font-semibold' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Mistral Large
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col h-[calc(100vh-120px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-600">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">VERUM AI Console</h3>
              <p className="text-gray-500">Converse com os sistemas de IA mais avançados do VERUM NODE</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#00d4aa]">Claude Sonnet-4</h4>
                  <p className="text-sm text-gray-400">Análise técnica e desenvolvimento</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400">Llama 2 70B</h4>
                  <p className="text-sm text-gray-400">Processamento linguístico avançado</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-400">Mistral Large</h4>
                  <p className="text-sm text-gray-400">Análise empresarial e otimização</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" 
                    ? "bg-blue-600" 
                    : message.provider === 'claude' ? "bg-[#00d4aa]"
                    : message.provider === 'llama' ? "bg-blue-500"
                    : message.provider === 'mistral' ? "bg-purple-500"
                    : "bg-gray-600"
                }`}>
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                    {message.provider && ` • ${message.provider}`}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  activeAI === 'claude' ? "bg-[#00d4aa]"
                  : activeAI === 'llama' ? "bg-blue-500"
                  : "bg-purple-500"
                }`}>
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processando com {activeAI}...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Converse com ${activeAI}... (Enter para enviar)`}
            rows={3}
            className="w-full p-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}