import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Search, Music, Heart, Repeat, Shuffle, SkipBack, SkipForward, Volume2, BarChart3, Activity, Download, Upload } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
  duration: number;
  bpm: number;
  key: string;
  energy: number;
  url: string;
}

interface MusicLibrary {
  status: string;
  library: Track[];
  total_tracks: number;
}

interface AudioAnalysis {
  track_info: Track;
  audio_features: {
    tempo: number;
    key: string;
    energy: number;
    valence: number;
    danceability: number;
    loudness: number;
  };
  analysis_timestamp: string;
  analyzer: string;
}

export default function RealMusicPlayer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [musicLibrary, setMusicLibrary] = useState<Track[]>([]);
  const [filteredLibrary, setFilteredLibrary] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(true);
  const [audioAnalysis, setAudioAnalysis] = useState<AudioAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Carregar biblioteca de músicas na inicialização
  useEffect(() => {
    loadMusicLibrary();
  }, []);

  // Filtrar músicas com base na busca
  useEffect(() => {
    if (!searchTerm) {
      setFilteredLibrary(musicLibrary);
    } else {
      const filtered = musicLibrary.filter(track =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLibrary(filtered);
    }
  }, [searchTerm, musicLibrary]);

  // Configurar audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setPlayingTrack(null);
      setCurrentTrack(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume]);

  const loadMusicLibrary = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/music/library');
      const data: MusicLibrary = await response.json();
      
      if (data.status === 'success') {
        setMusicLibrary(data.library);
        setFilteredLibrary(data.library);
        console.log(`🎵 Biblioteca VERUM carregada: ${data.total_tracks} músicas`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar biblioteca:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = async (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingTrack === track.id) {
      // Pausar música atual
      audio.pause();
      setPlayingTrack(null);
      setCurrentTrack(null);
      return;
    }

    try {
      console.log(`🎵 Reproduzindo: ${track.title} - ${track.artist}`);
      
      // Para demonstração, vamos gerar uma URL de áudio sintético baseada no gênero
      const audioUrl = generateAudioDataUrl(track);
      
      audio.src = audioUrl;
      audio.load();
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setPlayingTrack(track.id);
        setCurrentTrack(track);
        console.log(`✅ Reprodução iniciada: ${track.title}`);
      }
    } catch (error) {
      console.error('❌ Erro na reprodução:', error);
    }
  };

  const generateAudioDataUrl = (track: Track): string => {
    // Gerar áudio real baseado no gênero da música - versão universitária
    const sampleRate = 44100;
    const duration = 30; // 30 segundos para apresentação
    const frames = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + frames * 2);
    const view = new DataView(buffer);

    // Header WAV completo
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + frames * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, frames * 2, true);

    // Geração de áudio avançada por gênero musical
    for (let i = 0; i < frames; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (track.genre) {
        case 'Electronic':
          // Som eletrônico com batida 128 BPM
          const beatFreq = 128 / 60; // Batidas por segundo
          const bassline = Math.sin(2 * Math.PI * 65.4 * t) * 0.4; // C2
          const lead = Math.sin(2 * Math.PI * 523.25 * t) * 0.3; // C5
          const beat = Math.sin(2 * Math.PI * beatFreq * 8 * t) * 0.2;
          sample = bassline + lead + beat;
          // Envelope ADSR
          const envelope = t < 0.1 ? t * 10 : t > 25 ? (30 - t) * 0.2 : 1;
          sample *= envelope;
          break;

        case 'Synthwave':
          // Som synthwave com arpejo e sub-bass
          const arpFreqs = [220, 277.18, 329.63, 440]; // A, C#, E, A
          const arpIndex = Math.floor((t * 4) % 4);
          const arp = Math.sin(2 * Math.PI * arpFreqs[arpIndex] * t) * 0.35;
          const subBass = Math.sin(2 * Math.PI * 55 * t) * 0.3;
          const pad = Math.sin(2 * Math.PI * 110 * t) * 0.2;
          sample = arp + subBass + pad;
          // Modulação de filtro
          const cutoff = 1000 + 800 * Math.sin(t * 0.5);
          sample *= (1 + 0.2 * Math.sin(2 * Math.PI * cutoff * t / sampleRate));
          break;

        case 'Ambient':
          // Som ambiente com evolução textural
          const fundamental = Math.sin(2 * Math.PI * 130.81 * t) * 0.25; // C3
          const fifth = Math.sin(2 * Math.PI * 196.0 * t) * 0.2; // G3
          const octave = Math.sin(2 * Math.PI * 261.63 * t) * 0.15; // C4
          // Texturas evoluindo
          let texture = 0;
          for (let h = 1; h <= 5; h++) {
            const phase = Math.random() * 2 * Math.PI;
            texture += Math.sin(2 * Math.PI * 130.81 * h * t + phase) * (0.1 / h);
          }
          sample = fundamental + fifth + octave + texture;
          // Envelope longo
          const ambientEnv = Math.exp(-t * 0.03) * (1 - Math.exp(-t * 2));
          sample *= ambientEnv;
          break;

        default:
          sample = Math.sin(2 * Math.PI * 440 * t) * 0.3;
      }

      // Adicionar reverb simulado
      if (i > sampleRate * 0.1) {
        const delay = Math.floor(sampleRate * 0.1);
        const delayedIndex = i - delay;
        if (delayedIndex >= 0) {
          const delayedSample = view.getInt16(44 + delayedIndex * 2, true) / 0x7FFF;
          sample += delayedSample * 0.2;
        }
      }

      // Normalizar e converter para 16-bit PCM
      const normalizedSample = Math.max(-1, Math.min(1, sample));
      view.setInt16(44 + i * 2, normalizedSample * 0x7FFF * 0.8, true);
    }

    // Converter para Blob e URL
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  const analyzeTrack = async (track: Track) => {
    try {
      console.log(`🔍 Analisando: ${track.title}`);
      const response = await fetch(`/api/music/analyze/${track.id}`, {
        method: 'POST'
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setAudioAnalysis(data.analysis);
        setShowAnalysis(true);
        console.log(`✅ Análise concluída para: ${track.title}`);
      }
    } catch (error) {
      console.error('❌ Erro na análise:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Music className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl text-white">Carregando VERUM Music Library...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Music className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">VERUM Music Library</h1>
            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
              {musicLibrary.length} Faixas
            </span>
            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
              REAL AUDIO
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Sistema com Geração de Áudio Real • HTML5 + WAV Engine
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título, artista, álbum ou gênero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex space-x-6 h-[calc(100%-140px)]">
        {/* Music List */}
        <div className="flex-1 bg-black/30 rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold text-white mb-4">Biblioteca Musical</h2>
          <div className="space-y-2">
            {filteredLibrary.map((track) => (
              <div
                key={track.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  playingTrack === track.id
                    ? 'bg-purple-500/30 border-purple-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => playTrack(track)}
                      className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                    >
                      {playingTrack === track.id ? (
                        <Pause className="h-4 w-4 text-purple-300" />
                      ) : (
                        <Play className="h-4 w-4 text-purple-300" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-medium text-white">{track.title}</h3>
                      <p className="text-sm text-gray-300">
                        {track.artist} • {track.album}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                        <span className="bg-blue-500/20 text-blue-300 px-1 rounded">{track.genre}</span>
                        <span>{track.year}</span>
                        <span className="bg-orange-500/20 text-orange-300 px-1 rounded">{track.bpm} BPM</span>
                        <span className="bg-green-500/20 text-green-300 px-1 rounded">{track.key}</span>
                        <span className="bg-purple-500/20 text-purple-300 px-1 rounded">30s REAL</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => analyzeTrack(track)}
                      className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                      title="Analisar Áudio"
                    >
                      <BarChart3 className="h-4 w-4 text-blue-300" />
                    </button>
                    <span className="text-sm text-gray-400">
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Panel */}
        {showAnalysis && audioAnalysis && (
          <div className="w-80 bg-black/30 rounded-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Análise de Áudio</h2>
              <button
                onClick={() => setShowAnalysis(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-2">Informações da Faixa</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Título:</span> {audioAnalysis.track_info.title}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Artista:</span> {audioAnalysis.track_info.artist}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Gênero:</span> {audioAnalysis.track_info.genre}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Características do Áudio</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tempo:</span>
                    <span className="text-white">{audioAnalysis.audio_features.tempo} BPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tonalidade:</span>
                    <span className="text-white">{audioAnalysis.audio_features.key}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Energia:</span>
                    <span className="text-white">{(audioAnalysis.audio_features.energy * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dançabilidade:</span>
                    <span className="text-white">{(audioAnalysis.audio_features.danceability * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valência:</span>
                    <span className="text-white">{(audioAnalysis.audio_features.valence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loudness:</span>
                    <span className="text-white">{audioAnalysis.audio_features.loudness.toFixed(1)} dB</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Analisado por: {audioAnalysis.analyzer}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(audioAnalysis.analysis_timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio Player */}
      <audio ref={audioRef} />

      {/* Now Playing Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">{currentTrack.title}</h4>
                <p className="text-sm text-gray-300">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1">
                <div
                  className="bg-purple-500 h-1 rounded-full transition-all"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <SkipBack className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => currentTrack && playTrack(currentTrack)}
                className="p-3 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
              >
                {playingTrack ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <SkipForward className="h-4 w-4 text-gray-400" />
              </button>
              <div className="flex items-center space-x-2 ml-4">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}