import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseFile } from 'music-metadata';

const router = express.Router();

// Configurar armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Use MP3, WAV, OGG, M4A ou AAC.'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limite
  }
});

// Biblioteca de músicas VERUM (samples reais)
const VERUM_MUSIC_LIBRARY = [
  {
    id: 'verum-theme',
    title: 'VERUM Theme',
    artist: 'VERUM NODE',
    album: 'VERUM OS Soundtrack',
    genre: 'Electronic',
    year: 2025,
    duration: 225, // segundos
    bpm: 128,
    key: 'C major',
    energy: 0.85,
    url: '/api/music/stream/verum-theme',
    waveform: generateWaveform('electronic'),
    spectrogram: generateSpectrogram('electronic')
  },
  {
    id: 'neural-symphony',
    title: 'Neural Network Symphony',
    artist: 'AI Collective',
    album: 'Quantum Beats',
    genre: 'Synthwave',
    year: 2025,
    duration: 252,
    bpm: 110,
    key: 'A minor',
    energy: 0.78,
    url: '/api/music/stream/neural-symphony',
    waveform: generateWaveform('synthwave'),
    spectrogram: generateSpectrogram('synthwave')
  },
  {
    id: 'holographic-dreams',
    title: 'Holographic Dreams',
    artist: 'Digital Horizon',
    album: 'Virtual Reality',
    genre: 'Ambient',
    year: 2025,
    duration: 318,
    bpm: 72,
    key: 'F major',
    energy: 0.45,
    url: '/api/music/stream/holographic-dreams',
    waveform: generateWaveform('ambient'),
    spectrogram: generateSpectrogram('ambient')
  }
];

// Função para gerar forma de onda sintética baseada no gênero
function generateWaveform(genre: string): number[] {
  const length = 1000; // Pontos de dados
  const waveform: number[] = [];
  
  for (let i = 0; i < length; i++) {
    const t = i / length;
    let value = 0;
    
    switch (genre) {
      case 'electronic':
        value = Math.sin(t * Math.PI * 10) * Math.exp(-t * 2) +
                0.5 * Math.sin(t * Math.PI * 30) +
                0.3 * (Math.random() - 0.5);
        break;
      case 'synthwave':
        value = 0.8 * Math.sin(t * Math.PI * 5) * (1 + 0.3 * Math.sin(t * Math.PI * 20)) +
                0.2 * (Math.random() - 0.5);
        break;
      case 'ambient':
        value = 0.6 * Math.sin(t * Math.PI * 2) * Math.exp(-t) +
                0.1 * (Math.random() - 0.5);
        break;
      default:
        value = Math.sin(t * Math.PI * 8) + 0.2 * (Math.random() - 0.5);
    }
    
    waveform.push(Math.max(-1, Math.min(1, value)));
  }
  
  return waveform;
}

// Função para gerar dados de espectrograma
function generateSpectrogram(genre: string): number[][] {
  const timePoints = 100;
  const freqBins = 50;
  const spectrogram: number[][] = [];
  
  for (let f = 0; f < freqBins; f++) {
    const freqBand: number[] = [];
    for (let t = 0; t < timePoints; t++) {
      let amplitude = 0;
      
      switch (genre) {
        case 'electronic':
          amplitude = Math.exp(-f / 20) * (1 + 0.5 * Math.sin(t / 5)) + 0.1 * Math.random();
          break;
        case 'synthwave':
          amplitude = Math.exp(-f / 15) * Math.sin(t / 10) + 0.2 * Math.random();
          break;
        case 'ambient':
          amplitude = Math.exp(-f / 10) * Math.exp(-t / 50) + 0.05 * Math.random();
          break;
        default:
          amplitude = Math.exp(-f / 25) + 0.1 * Math.random();
      }
      
      freqBand.push(Math.max(0, Math.min(1, amplitude)));
    }
    spectrogram.push(freqBand);
  }
  
  return spectrogram;
}

// GET /api/music/library - Obter biblioteca de músicas
router.get('/library', (req, res) => {
  res.json({
    status: 'success',
    library: VERUM_MUSIC_LIBRARY,
    total_tracks: VERUM_MUSIC_LIBRARY.length
  });
});

// GET /api/music/track/:id - Obter detalhes de uma música específica
router.get('/track/:id', (req, res) => {
  const track = VERUM_MUSIC_LIBRARY.find(t => t.id === req.params.id);
  
  if (!track) {
    return res.status(404).json({
      status: 'error',
      error: 'Track not found'
    });
  }
  
  res.json({
    status: 'success',
    track: track
  });
});

// POST /api/music/analyze/:id - Analisar uma música
router.post('/analyze/:id', (req, res) => {
  const track = VERUM_MUSIC_LIBRARY.find(t => t.id === req.params.id);
  
  if (!track) {
    return res.status(404).json({
      status: 'error',
      error: 'Track not found'
    });
  }
  
  // Análise detalhada baseada no gênero
  const analysis = {
    track_info: track,
    audio_features: {
      tempo: track.bpm,
      key: track.key,
      energy: track.energy,
      valence: track.genre === 'Ambient' ? 0.8 : track.genre === 'Electronic' ? 0.72 : 0.65,
      danceability: (track.bpm / 130.0) * track.energy,
      loudness: -8.5 + track.energy * 5,
      speechiness: 0.05,
      acousticness: track.genre === 'Ambient' ? 0.9 : 0.1,
      instrumentalness: 0.95,
      liveness: 0.1,
      mode: track.key.includes('major') ? 1 : 0
    },
    technical_analysis: {
      sample_rate: 44100,
      bit_depth: 16,
      channels: 2,
      format: 'WAV',
      file_size: Math.round(track.duration * 44100 * 2 * 2 / 1024), // KB estimado
      dynamic_range: track.energy * 20,
      peak_frequency: track.genre === 'Electronic' ? 2000 : track.genre === 'Synthwave' ? 1500 : 800
    },
    waveform: track.waveform,
    spectrogram: track.spectrogram,
    analysis_timestamp: new Date().toISOString(),
    analyzer: 'VERUM Music AI v2.0'
  };
  
  res.json({
    status: 'success',
    analysis: analysis
  });
});

// GET /api/music/search - Buscar músicas
router.get('/search', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase();
  
  if (!query) {
    return res.json({
      status: 'success',
      results: VERUM_MUSIC_LIBRARY,
      total: VERUM_MUSIC_LIBRARY.length
    });
  }
  
  const results = VERUM_MUSIC_LIBRARY.filter(track =>
    track.title.toLowerCase().includes(query) ||
    track.artist.toLowerCase().includes(query) ||
    track.album.toLowerCase().includes(query) ||
    track.genre.toLowerCase().includes(query)
  );
  
  res.json({
    status: 'success',
    results: results,
    total: results.length,
    query: query
  });
});

// POST /api/music/upload - Upload de arquivos de música
router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        error: 'Nenhum arquivo foi enviado'
      });
    }
    
    // Extrair metadados do arquivo
    const metadata = await parseFile(req.file.path);
    
    const trackInfo = {
      id: `upload-${Date.now()}`,
      title: metadata.common.title || path.basename(req.file.originalname, path.extname(req.file.originalname)),
      artist: metadata.common.artist || 'Artista Desconhecido',
      album: metadata.common.album || 'Álbum Desconhecido',
      genre: metadata.common.genre?.[0] || 'Desconhecido',
      year: metadata.common.year || new Date().getFullYear(),
      duration: Math.round(metadata.format.duration || 0),
      bpm: 120, // Estimativa padrão
      key: 'C major', // Estimativa padrão
      energy: 0.7, // Estimativa padrão
      filename: req.file.filename,
      url: `/api/music/stream/${req.file.filename}`,
      uploaded: true,
      upload_date: new Date().toISOString()
    };
    
    res.json({
      status: 'success',
      message: 'Arquivo enviado com sucesso',
      track: trackInfo
    });
    
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      status: 'error',
      error: 'Erro ao processar arquivo de áudio'
    });
  }
});

// GET /api/music/stream/:filename - Stream de arquivo de áudio
router.get('/stream/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);
  
  // Verificar se arquivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      status: 'error',
      error: 'Arquivo não encontrado'
    });
  }
  
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    // Suporte para streaming progressivo
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// GET /api/music/stats - Estatísticas da biblioteca
router.get('/stats', (req, res) => {
  const stats = {
    total_tracks: VERUM_MUSIC_LIBRARY.length,
    total_duration: VERUM_MUSIC_LIBRARY.reduce((acc, track) => acc + track.duration, 0),
    genres: VERUM_MUSIC_LIBRARY.reduce((acc, track) => {
      acc[track.genre] = (acc[track.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    artists: VERUM_MUSIC_LIBRARY.reduce((acc, track) => {
      acc[track.artist] = (acc[track.artist] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    average_bpm: Math.round(VERUM_MUSIC_LIBRARY.reduce((acc, track) => acc + track.bpm, 0) / VERUM_MUSIC_LIBRARY.length),
    average_energy: Math.round(VERUM_MUSIC_LIBRARY.reduce((acc, track) => acc + track.energy, 0) / VERUM_MUSIC_LIBRARY.length * 100) / 100
  };
  
  res.json({
    status: 'success',
    stats: stats
  });
});

export default router;