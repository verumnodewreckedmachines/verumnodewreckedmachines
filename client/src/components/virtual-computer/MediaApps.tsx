import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// VERUM Media Hub - Inspirado no Sunnify SpotDL
export function VirtualMediaHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{[key: number]: number}>({});
  const [showMetadata, setShowMetadata] = useState(false);
  const [downloadedTracks, setDownloadedTracks] = useState<Set<number>>(new Set());

  const playAudio = (track: any) => {
    // Parar áudio atual se estiver tocando
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

    if (playingTrack === track.id) {
      // Se já está tocando, pausar
      setPlayingTrack(null);
      console.log(`⏸️ Pausado: ${track.title}`);
      return;
    }

    // Criar som de demonstração com Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Criar uma melodia simples baseada no ID da track
      const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00]; // C, D, E, F, G
      oscillator.frequency.setValueAtTime(frequencies[track.id % frequencies.length], audioContext.currentTime);
      oscillator.type = 'sine';
      
      // Volume baixo para não incomodar
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 2);
      
      console.log(`🎵 Tocando com som real: ${track.title} - ${track.artist}`);
    } catch (error) {
      console.log('🔇 Web Audio não disponível, usando simulação silenciosa');
    }

    // Simular reprodução de música
    setPlayingTrack(track.id);
    console.log(`🎵 Tocando agora: ${track.title} - ${track.artist}`);
    console.log(`📀 Álbum: ${track.album} | ⏱️ Duração: ${track.duration}`);
    
    // Simular duração da música (30 segundos para demo)
    const playTimer = setTimeout(() => {
      setPlayingTrack(null);
      console.log(`🔚 Música finalizada: ${track.title}`);
    }, 30000);
    
    // Armazenar timer para poder cancelar se necessário
    setCurrentAudio({ pause: () => {
      clearTimeout(playTimer);
      console.log(`⏹️ Reprodução interrompida: ${track.title}`);
    } } as any);
  };

  const downloadTrack = async (track: any) => {
    setDownloadProgress(prev => ({ ...prev, [track.id]: 0 }));
    console.log(`📥 Iniciando download: ${track.title} - ${track.artist}`);
    
    // Simular processo de download inspirado no Sunnify
    const steps = [
      `🔍 Analisando URL: ${track.title}`,
      `🎯 Extraindo ID: ${track.id}`,
      `📊 Obtendo metadados: ${track.album}`,
      `🎵 Preparando download de áudio...`,
      `📝 Processando metadata tags...`,
      `🎨 Baixando cover art...`,
      `💾 Salvando arquivo: ${track.title}.mp3`,
      `✅ Download concluído!`
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(steps[i]);
      setDownloadProgress(prev => ({ 
        ...prev, 
        [track.id]: Math.round((i + 1) * 100 / steps.length) 
      }));
    }

    setDownloadedTracks(prev => new Set(prev).add(track.id));
    console.log(`🎉 ${track.title} salvo na pasta música/VERUM_Downloads/`);
    
    // Limpar progresso após 2 segundos
    setTimeout(() => {
      setDownloadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[track.id];
        return newProgress;
      });
    }, 2000);
  };
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    console.log(`🔍 Buscando: "${searchTerm}" nas plataformas de música...`);
    
    // Simular busca mais realista inspirada no Sunnify
    setTimeout(() => {
      const mockResults = [
        { 
          id: 1, 
          title: searchTerm, 
          artist: 'Artist A', 
          album: 'Album X', 
          duration: '3:45', 
          quality: 'High',
          releaseDate: '2024',
          cover: '/placeholder-album.jpg',
          size: '8.5 MB'
        },
        { 
          id: 2, 
          title: `${searchTerm} (Remix)`, 
          artist: 'Artist B', 
          album: 'Album Y', 
          duration: '4:12', 
          quality: 'Ultra',
          releaseDate: '2023',
          cover: '/placeholder-album.jpg',
          size: '9.7 MB'
        },
        { 
          id: 3, 
          title: `${searchTerm} Live`, 
          artist: 'Artist A', 
          album: 'Live Album', 
          duration: '5:23', 
          quality: 'High',
          releaseDate: '2022',
          cover: '/placeholder-album.jpg',
          size: '12.1 MB'
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
      console.log(`✅ Encontradas ${mockResults.length} músicas para "${searchTerm}"`);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="bg-gray-800/80 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-lg">🎵 VERUM Media Hub</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              Powered by Sunnify
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMetadata(!showMetadata)}
              className="text-gray-400 border-gray-600 hover:text-white"
            >
              {showMetadata ? '🔍 Ocultar Detalhes' : '📊 Mostrar Detalhes'}
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Buscar música, artista, álbum ou playlist do Spotify..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="bg-purple-600 hover:bg-purple-700 min-w-[100px]"
          >
            {isSearching ? '🔍 Buscando...' : 'Buscar'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Buscando nas plataformas de música...</p>
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold">Resultados da Busca ({searchResults.length})</h4>
              <div className="text-sm text-gray-400">
                {downloadedTracks.size > 0 && `${downloadedTracks.size} música(s) baixada(s)`}
              </div>
            </div>
            {searchResults.map((result) => (
              <div key={result.id} className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-white font-medium">{result.title}</h5>
                      {downloadedTracks.has(result.id) && (
                        <Badge className="bg-green-600 text-white text-xs">✅ Baixado</Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{result.artist} • {result.album}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>⏱️ {result.duration}</span>
                      <span>🎧 {result.quality} Quality</span>
                      {showMetadata && (
                        <>
                          <span>📅 {result.releaseDate}</span>
                          <span>💾 {result.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className={playingTrack === result.id ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      onClick={() => playAudio(result)}
                    >
                      {playingTrack === result.id ? '⏸️ Pause' : '▶️ Play'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600 hover:border-purple-500"
                      onClick={() => downloadTrack(result)}
                      disabled={downloadProgress[result.id] !== undefined || downloadedTracks.has(result.id)}
                    >
                      {downloadedTracks.has(result.id) ? '✅ Baixado' : 
                       downloadProgress[result.id] !== undefined ? '⏳ Baixando...' : 
                       '📥 Download'}
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar de Download */}
                {downloadProgress[result.id] !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progresso do download</span>
                      <span>{downloadProgress[result.id]}%</span>
                    </div>
                    <Progress 
                      value={downloadProgress[result.id]} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {!isSearching && searchResults.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum resultado encontrado para "{searchTerm}"</p>
          </div>
        )}
        
        {!searchTerm && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-lg mb-2">VERUM Media Hub</p>
            <p className="mb-4">Digite um termo para buscar música</p>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                <div className="text-purple-400 font-bold text-xl">{searchResults.length}</div>
                <div className="text-xs">Resultados</div>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                <div className="text-green-400 font-bold text-xl">{downloadedTracks.size}</div>
                <div className="text-xs">Baixados</div>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                <div className="text-blue-400 font-bold text-xl">{playingTrack ? '1' : '0'}</div>
                <div className="text-xs">Tocando</div>
              </div>
            </div>
            
            <div className="text-sm space-y-1">
              <p>🎯 Busca inteligente em múltiplas plataformas</p>
              <p>📥 Download com metadados completos</p>
              <p>🎧 Preview de áudio integrado</p>
              <p className="text-purple-400 font-medium mt-3">Inspirado no Sunnify by Sunny Patel</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Metadata Manager - Inspirado no metadata.py do spotDL
export function VirtualMetadataManager() {
  const [files, setFiles] = useState([
    { id: 1, name: 'song1.mp3', title: 'Amazing Song', artist: 'Great Artist', album: 'Best Album', hasMetadata: true },
    { id: 2, name: 'track2.mp3', title: 'Unknown', artist: 'Unknown', album: 'Unknown', hasMetadata: false },
    { id: 3, name: 'music3.mp3', title: 'Cool Track', artist: 'Cool Artist', album: 'Cool Album', hasMetadata: true }
  ]);
  
  const [selectedFile, setSelectedFile] = useState<any>(null);
  
  const processMetadata = (fileId: number) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, hasMetadata: true, title: 'Processed Track', artist: 'Auto Artist', album: 'Auto Album' }
        : file
    ));
  };

  return (
    <div className="h-full flex">
      <div className="w-1/2 border-r border-gray-700">
        <div className="bg-gray-800 p-3 border-b border-gray-700">
          <h3 className="text-white font-semibold">📁 Arquivos de Música</h3>
        </div>
        <div className="overflow-auto p-2">
          {files.map((file) => (
            <div 
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className={`p-3 rounded-lg mb-2 cursor-pointer border transition-colors ${
                selectedFile?.id === file.id 
                  ? 'bg-blue-600/30 border-blue-500' 
                  : 'bg-gray-800/60 border-gray-700 hover:bg-gray-700/60'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm font-medium">{file.name}</p>
                  <p className="text-gray-400 text-xs">{file.title} - {file.artist}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${file.hasMetadata ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-1/2">
        <div className="bg-gray-800 p-3 border-b border-gray-700">
          <h3 className="text-white font-semibold">🏷️ Editor de Metadados</h3>
        </div>
        
        {selectedFile ? (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Título:</label>
              <Input 
                value={selectedFile.title} 
                className="bg-gray-700 border-gray-600 text-white"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Artista:</label>
              <Input 
                value={selectedFile.artist} 
                className="bg-gray-700 border-gray-600 text-white"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Álbum:</label>
              <Input 
                value={selectedFile.album} 
                className="bg-gray-700 border-gray-600 text-white"
                readOnly
              />
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => processMetadata(selectedFile.id)}
                disabled={selectedFile.hasMetadata}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600"
              >
                {selectedFile.hasMetadata ? '✅ Metadata OK' : '🔧 Processar Metadata'}
              </Button>
            </div>
            
            <div className="bg-gray-800/60 rounded-lg p-3 mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Status do Arquivo:</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${selectedFile.hasMetadata ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-400">
                  {selectedFile.hasMetadata ? 'Metadados completos' : 'Metadados ausentes'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400">
            <div className="text-4xl mb-4">🏷️</div>
            <p>Selecione um arquivo para editar metadados</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sync Lyrics - Inspirado no lrc.py do spotDL
export function VirtualSyncLyrics() {
  const [songInput, setSongInput] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [syncedLyrics, setSyncedLyrics] = useState<{time: string, text: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const processLyrics = async () => {
    if (!songInput.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      const mockSyncedLyrics = [
        { time: '00:15.50', text: 'Verso inicial da música' },
        { time: '00:20.30', text: 'Segunda linha da letra' },
        { time: '00:25.10', text: 'Chorus começa aqui' },
        { time: '00:30.80', text: 'Refrão principal' },
        { time: '00:35.20', text: 'Continuação do refrão' },
        { time: '00:40.60', text: 'Volta para o verso' }
      ];
      
      setSyncedLyrics(mockSyncedLyrics);
      setLyrics(mockSyncedLyrics.map(l => `[${l.time}] ${l.text}`).join('\n'));
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-900/20 to-teal-900/20">
      <div className="bg-gray-800/80 p-4 border-b border-gray-700">
        <h3 className="text-white font-bold text-lg mb-3">🎤 Sync Lyrics Manager</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Nome da música e artista..."
            value={songInput}
            onChange={(e) => setSongInput(e.target.value)}
            className="flex-1 bg-gray-700 border-gray-600 text-white"
          />
          <Button 
            onClick={processLyrics}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? '⏳' : '🔍'} Buscar Lyrics
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="w-1/2 border-r border-gray-700">
          <div className="bg-gray-800/60 p-3 border-b border-gray-600">
            <h4 className="text-white font-medium">📝 Lyrics Sincronizadas</h4>
          </div>
          
          <div className="h-full overflow-auto p-4">
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin w-6 h-6 border-3 border-green-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-gray-400">Processando lyrics...</p>
              </div>
            )}
            
            {syncedLyrics.length > 0 && (
              <div className="space-y-2">
                {syncedLyrics.map((line, index) => (
                  <div key={index} className="flex gap-3 p-2 rounded bg-gray-800/40">
                    <span className="text-green-400 font-mono text-sm min-w-[60px]">{line.time}</span>
                    <span className="text-white text-sm">{line.text}</span>
                  </div>
                ))}
              </div>
            )}
            
            {!isProcessing && syncedLyrics.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-4">🎤</div>
                <p>Digite o nome de uma música para buscar lyrics sincronizadas</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-1/2">
          <div className="bg-gray-800/60 p-3 border-b border-gray-600">
            <h4 className="text-white font-medium">📄 Formato LRC</h4>
          </div>
          
          <div className="p-4 h-full">
            <textarea 
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="[00:15.50] Lyrics sincronizadas aparecerão aqui..."
              className="w-full h-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white font-mono text-sm resize-none"
            />
            
            {lyrics && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  💾 Salvar LRC
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600">
                  📤 Exportar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}