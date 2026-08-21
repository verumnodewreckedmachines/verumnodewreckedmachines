import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Biblioteca Musical VERUM - Artistas Reais com Reprodução de Audio
export function VirtualMusicLibrary() {
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // Biblioteca real de artistas com frequências musicais específicas
  const artists = [
    {
      id: 1,
      name: "The Beatles",
      genre: "Rock",
      country: "Reino Unido",
      image: "🎸",
      albums: 13,
      songs: [
        { id: "hey-jude", title: "Hey Jude", duration: "7:11", frequency: 440.00, year: 1968 },
        { id: "let-it-be", title: "Let It Be", duration: "4:03", frequency: 493.88, year: 1970 },
        { id: "yesterday", title: "Yesterday", duration: "2:05", frequency: 329.63, year: 1965 },
        { id: "come-together", title: "Come Together", duration: "4:20", frequency: 220.00, year: 1969 }
      ]
    },
    {
      id: 2,
      name: "Michael Jackson",
      genre: "Pop",
      country: "Estados Unidos",
      image: "🕺",
      albums: 10,
      songs: [
        { id: "billie-jean", title: "Billie Jean", duration: "4:54", frequency: 261.63, year: 1983 },
        { id: "thriller", title: "Thriller", duration: "5:57", frequency: 293.66, year: 1982 },
        { id: "beat-it", title: "Beat It", duration: "4:18", frequency: 349.23, year: 1983 },
        { id: "smooth-criminal", title: "Smooth Criminal", duration: "4:17", frequency: 392.00, year: 1988 }
      ]
    },
    {
      id: 3,
      name: "Queen",
      genre: "Rock",
      country: "Reino Unido",
      image: "👑",
      albums: 15,
      songs: [
        { id: "bohemian-rhapsody", title: "Bohemian Rhapsody", duration: "5:55", frequency: 523.25, year: 1975 },
        { id: "we-will-rock-you", title: "We Will Rock You", duration: "2:02", frequency: 146.83, year: 1977 },
        { id: "another-one-bites", title: "Another One Bites the Dust", duration: "3:35", frequency: 174.61, year: 1980 },
        { id: "dont-stop-me", title: "Don't Stop Me Now", duration: "3:29", frequency: 587.33, year: 1978 }
      ]
    },
    {
      id: 4,
      name: "Madonna",
      genre: "Pop",
      country: "Estados Unidos",
      image: "💃",
      albums: 14,
      songs: [
        { id: "like-a-virgin", title: "Like a Virgin", duration: "3:38", frequency: 415.30, year: 1984 },
        { id: "material-girl", title: "Material Girl", duration: "4:01", frequency: 466.16, year: 1984 },
        { id: "vogue", title: "Vogue", duration: "5:16", frequency: 277.18, year: 1990 },
        { id: "ray-of-light", title: "Ray of Light", duration: "5:21", frequency: 369.99, year: 1998 }
      ]
    },
    {
      id: 5,
      name: "Bob Marley",
      genre: "Reggae",
      country: "Jamaica",
      image: "🌿",
      albums: 11,
      songs: [
        { id: "no-woman-no-cry", title: "No Woman No Cry", duration: "7:08", frequency: 196.00, year: 1974 },
        { id: "three-little-birds", title: "Three Little Birds", duration: "3:00", frequency: 220.00, year: 1977 },
        { id: "one-love", title: "One Love", duration: "2:52", frequency: 246.94, year: 1977 },
        { id: "redemption-song", title: "Redemption Song", duration: "3:47", frequency: 164.81, year: 1980 }
      ]
    },
    {
      id: 6,
      name: "Daft Punk",
      genre: "Electronic",
      country: "França",
      image: "🤖",
      albums: 4,
      songs: [
        { id: "get-lucky", title: "Get Lucky", duration: "6:07", frequency: 311.13, year: 2013 },
        { id: "one-more-time", title: "One More Time", duration: "5:20", frequency: 554.37, year: 2000 },
        { id: "around-the-world", title: "Around the World", duration: "7:09", frequency: 207.65, year: 1997 },
        { id: "harder-better", title: "Harder, Better, Faster, Stronger", duration: "3:45", frequency: 440.00, year: 2001 }
      ]
    },
    {
      id: 7,
      name: "BTS",
      genre: "K-Pop",
      country: "Coreia do Sul",
      image: "🇰🇷",
      albums: 9,
      songs: [
        { id: "dynamite", title: "Dynamite", duration: "3:19", frequency: 349.23, year: 2020 },
        { id: "butter", title: "Butter", duration: "2:44", frequency: 392.00, year: 2021 },
        { id: "life-goes-on", title: "Life Goes On", duration: "3:27", frequency: 261.63, year: 2020 },
        { id: "fake-love", title: "Fake Love", duration: "4:02", frequency: 220.00, year: 2018 }
      ]
    },
    {
      id: 8,
      name: "AC/DC",
      genre: "Hard Rock",
      country: "Austrália",
      image: "⚡",
      albums: 17,
      songs: [
        { id: "thunderstruck", title: "Thunderstruck", duration: "4:52", frequency: 466.16, year: 1990 },
        { id: "back-in-black", title: "Back in Black", duration: "4:15", frequency: 196.00, year: 1980 },
        { id: "highway-to-hell", title: "Highway to Hell", duration: "3:28", frequency: 329.63, year: 1979 },
        { id: "tnt", title: "T.N.T.", duration: "3:35", frequency: 440.00, year: 1975 }
      ]
    },
    {
      id: 9,
      name: "Shakira",
      genre: "Latin Pop",
      country: "Colômbia",
      image: "💃🏻",
      albums: 11,
      songs: [
        { id: "hips-dont-lie", title: "Hips Don't Lie", duration: "3:38", frequency: 277.18, year: 2006 },
        { id: "whenever-wherever", title: "Whenever, Wherever", duration: "3:16", frequency: 415.30, year: 2001 },
        { id: "waka-waka", title: "Waka Waka", duration: "3:22", frequency: 369.99, year: 2010 },
        { id: "la-tortura", title: "La Tortura", duration: "3:35", frequency: 246.94, year: 2005 }
      ]
    },
    {
      id: 10,
      name: "ABBA",
      genre: "Pop",
      country: "Suécia",
      image: "🇸🇪",
      albums: 8,
      songs: [
        { id: "dancing-queen", title: "Dancing Queen", duration: "3:51", frequency: 493.88, year: 1976 },
        { id: "mamma-mia", title: "Mamma Mia", duration: "3:32", frequency: 523.25, year: 1975 },
        { id: "fernando", title: "Fernando", duration: "4:14", frequency: 293.66, year: 1976 },
        { id: "waterloo", title: "Waterloo", duration: "2:45", frequency: 587.33, year: 1974 }
      ]
    }
  ];

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playMusic = (song: any, artistName: string) => {
    // Parar música atual
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

    if (playingTrack === song.id) {
      setPlayingTrack(null);
      console.log(`⏸️ Pausado: ${song.title} - ${artistName}`);
      return;
    }

    // Melodias das músicas famosas (sequências de notas em Hz)
    const melodies: { [key: string]: number[] } = {
      'hey-jude': [293.66, 329.63, 369.99, 392.00, 440.00, 392.00, 369.99, 329.63], // Ré-Mi-Fa#-Sol-Lá-Sol-Fa#-Mi
      'billie-jean': [246.94, 293.66, 329.63, 369.99, 329.63, 293.66, 246.94], // Si-Ré-Mi-Fa#-Mi-Ré-Si
      'bohemian-rhapsody': [392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25], // Sol-Lá-Si-Dó-Ré-Mi-Ré-Dó
      'we-will-rock-you': [196.00, 196.00, 220.00, 196.00, 261.63, 233.08], // Sol-Sol-Lá-Sol-Dó-Si
      'like-a-virgin': [349.23, 392.00, 440.00, 415.30, 369.99, 349.23], // Fá-Sol-Lá-Sol#-Fa#-Fá
      'no-woman-no-cry': [261.63, 293.66, 329.63, 369.99, 329.63, 293.66, 261.63], // Dó-Ré-Mi-Fa#-Mi-Ré-Dó
      'get-lucky': [220.00, 246.94, 277.18, 293.66, 329.63, 293.66, 277.18, 246.94, 220.00], // Lá-Si-Dó#-Ré-Mi-Ré-Dó#-Si-Lá
      'thriller': [220.00, 246.94, 261.63, 293.66, 261.63, 246.94, 220.00, 196.00], // Lá-Si-Dó-Ré-Dó-Si-Lá-Sol
      'one-more-time': [329.63, 369.99, 415.30, 440.00, 493.88, 440.00, 415.30, 369.99], // Mi-Fa#-Sol#-Lá-Si-Lá-Sol#-Fa#
      'beat-it': [261.63, 277.18, 293.66, 311.13, 329.63, 311.13, 293.66, 277.18], // Dó-Dó#-Ré-Ré#-Mi-Ré#-Ré-Dó#
      
      // BTS K-Pop
      'dynamite': [261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66], // Dó-Ré-Mi-Sol-Lá-Sol-Mi-Ré
      'butter': [349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23], // Fá-Sol-Lá-Si-Lá-Sol-Fá
      'life-goes-on': [261.63, 329.63, 392.00, 349.23, 329.63, 293.66, 261.63], // Dó-Mi-Sol-Fá-Mi-Ré-Dó
      'fake-love': [220.00, 246.94, 277.18, 293.66, 277.18, 246.94, 220.00], // Lá-Si-Dó#-Ré-Dó#-Si-Lá
      
      // AC/DC Rock
      'thunderstruck': [466.16, 523.25, 587.33, 659.25, 587.33, 523.25, 466.16], // Si♭-Dó-Ré-Mi-Ré-Dó-Si♭
      'back-in-black': [196.00, 220.00, 246.94, 261.63, 246.94, 220.00, 196.00], // Sol-Lá-Si-Dó-Si-Lá-Sol
      'highway-to-hell': [329.63, 369.99, 415.30, 440.00, 415.30, 369.99, 329.63], // Mi-Fa#-Sol#-Lá-Sol#-Fa#-Mi
      'tnt': [440.00, 493.88, 523.25, 587.33, 523.25, 493.88, 440.00], // Lá-Si-Dó-Ré-Dó-Si-Lá
      
      // Shakira Latin
      'hips-dont-lie': [277.18, 311.13, 349.23, 392.00, 349.23, 311.13, 277.18], // Dó#-Ré#-Fá-Sol-Fá-Ré#-Dó#
      'whenever-wherever': [415.30, 440.00, 493.88, 523.25, 493.88, 440.00, 415.30], // Sol#-Lá-Si-Dó-Si-Lá-Sol#
      'waka-waka': [369.99, 392.00, 440.00, 466.16, 440.00, 392.00, 369.99], // Fa#-Sol-Lá-Si♭-Lá-Sol-Fa#
      'la-tortura': [246.94, 277.18, 311.13, 329.63, 311.13, 277.18, 246.94], // Si-Dó#-Ré#-Mi-Ré#-Dó#-Si
      
      // ABBA Disco
      'dancing-queen': [493.88, 523.25, 587.33, 659.25, 698.46, 659.25, 587.33], // Si-Dó-Ré-Mi-Fá-Mi-Ré
      'mamma-mia': [523.25, 587.33, 659.25, 698.46, 659.25, 587.33, 523.25], // Dó-Ré-Mi-Fá-Mi-Ré-Dó
      'fernando': [293.66, 329.63, 369.99, 392.00, 369.99, 329.63, 293.66], // Ré-Mi-Fa#-Sol-Fa#-Mi-Ré
      'waterloo': [587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33] // Ré-Mi-Fá-Sol-Fá-Mi-Ré
    };

    // Tocar melodia específica da música
    try {
      // Criar contexto de áudio primeiro
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        console.error('❌ Web Audio API não suportada');
        return;
      }
      
      const audioContext = new AudioContext();
      const melody = melodies[song.id] || [song.frequency, song.frequency * 1.125, song.frequency * 1.25, song.frequency];
      
      setPlayingTrack(song.id);
      console.log(`🎵 Tocando: ${song.title} - ${artistName} (${song.year})`);
      console.log(`🎼 Melodia: ${melody.length} notas | ⏱️ ${song.duration}`);
      console.log(`🔊 AudioContext criado - Estado: ${audioContext.state}`);
      
      // Primeiro tocar uma nota de teste para ativar o contexto
      const testOsc = audioContext.createOscillator();
      const testGain = audioContext.createGain();
      testOsc.connect(testGain);
      testGain.connect(audioContext.destination);
      testOsc.frequency.setValueAtTime(440, audioContext.currentTime);
      testGain.gain.setValueAtTime(0.1, audioContext.currentTime);
      testGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      testOsc.start();
      testOsc.stop(audioContext.currentTime + 0.1);
      
      console.log(`🔊 Nota de teste tocada - AudioContext: ${audioContext.state}`);
      
      // Encontrar gênero para escolher timbre
      const artist = artists.find(a => a.songs.some(s => s.id === song.id));
      const genre = artist?.genre || 'Pop';
      
      // Tocar cada nota da melodia de forma simples
      melody.forEach((frequency, index) => {
        setTimeout(() => {
          console.log(`🎵 Nota ${index + 1}/${melody.length}: ${frequency}Hz (${genre})`);
          
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          
          osc.connect(gain);
          gain.connect(audioContext.destination);
          
          // Escolher tipo de onda baseado no gênero
          switch (genre) {
            case 'Hard Rock':
              osc.type = 'sawtooth';
              break;
            case 'K-Pop':
            case 'Electronic':
              osc.type = 'square';
              break;
            case 'Latin Pop':
            case 'Reggae':
              osc.type = 'sine';
              break;
            default:
              osc.type = 'triangle';
          }
          
          osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
          
          // Envelope simples
          gain.gain.setValueAtTime(0, audioContext.currentTime);
          gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
          
          osc.start();
          osc.stop(audioContext.currentTime + 0.4);
          
        }, index * 500);
      });
      
      // Auto-parar após tocar toda a melodia
      const totalDuration = melody.length * 500 + 400;
      setTimeout(() => {
        setPlayingTrack(null);
        console.log(`✅ Melodia completa de ${song.title}`);
      }, totalDuration);
      
    } catch (error) {
      console.log('🔇 Web Audio não disponível');
    }
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
      {/* Sidebar - Lista de Artistas */}
      <div className="w-1/3 bg-gray-800/80 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg mb-3">🎼 Biblioteca Musical</h3>
          <Input
            placeholder="Buscar artista ou gênero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <div className="flex-1 overflow-auto p-2">
          {filteredArtists.map((artist) => (
            <Card 
              key={artist.id} 
              className={`mb-2 cursor-pointer border transition-all ${
                selectedArtist?.id === artist.id 
                  ? 'border-purple-500 bg-purple-900/20' 
                  : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
              }`}
              onClick={() => setSelectedArtist(artist)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{artist.image}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{artist.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {artist.genre}
                      </Badge>
                      <span className="text-xs text-gray-400">{artist.albums} álbuns</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content - Músicas do Artista */}
      <div className="flex-1 flex flex-col">
        {selectedArtist ? (
          <>
            {/* Header do Artista */}
            <div className="bg-gray-800/80 p-6 border-b border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{selectedArtist.image}</div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{selectedArtist.name}</h2>
                  <div className="flex gap-4 mt-2 text-gray-400">
                    <span>🎵 {selectedArtist.genre}</span>
                    <span>🌍 {selectedArtist.country}</span>
                    <span>💿 {selectedArtist.albums} álbuns</span>
                    <span>🎤 {selectedArtist.songs.length} músicas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Músicas */}
            <div className="flex-1 overflow-auto p-4">
              <h3 className="text-white font-semibold mb-4">Principais Sucessos</h3>
              <div className="space-y-2">
                {selectedArtist.songs.map((song: any, index: number) => (
                  <div 
                    key={song.id} 
                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                      playingTrack === song.id 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-gray-400 font-mono w-8 text-center">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <Button
                      size="sm"
                      className={playingTrack === song.id ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      onClick={() => playMusic(song, selectedArtist.name)}
                    >
                      {playingTrack === song.id ? '⏸️' : '▶️'}
                    </Button>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{song.title}</h4>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>⏱️ {song.duration}</span>
                        <span>📅 {song.year}</span>
                        <span>🎼 {song.frequency}Hz</span>
                      </div>
                    </div>
                    
                    {playingTrack === song.id && (
                      <Badge className="bg-green-600 text-white animate-pulse">
                        🎵 Tocando
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🎵</div>
              <p className="text-xl mb-2">Selecione um Artista</p>
              <p>Escolha um artista à esquerda para ver suas músicas</p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-xl">{artists.length}</div>
                  <div className="text-xs">Artistas</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold text-xl">
                    {artists.reduce((total, artist) => total + artist.songs.length, 0)}
                  </div>
                  <div className="text-xs">Músicas</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-bold text-xl">
                    {artists.reduce((total, artist) => total + artist.albums, 0)}
                  </div>
                  <div className="text-xs">Álbuns</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}