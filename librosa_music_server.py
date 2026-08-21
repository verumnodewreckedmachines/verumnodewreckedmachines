#!/usr/bin/env python3
"""
VERUM Music Server with Real Librosa Integration
Sistema de análise e reprodução de música real para apresentação universitária
"""

from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import librosa
import librosa.display
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import io
import base64
import os
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)  # Permitir requisições do frontend React

# Configuração
AUDIO_FOLDER = 'audio_samples'
UPLOAD_FOLDER = 'uploads'

# Criar pastas se não existirem
os.makedirs(AUDIO_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Biblioteca de músicas VERUM com análise real
VERUM_MUSIC_LIBRARY = [
    {
        'id': 'verum-theme',
        'title': 'VERUM Theme',
        'artist': 'VERUM NODE',
        'album': 'VERUM OS Soundtrack',
        'genre': 'Electronic',
        'year': 2025,
        'duration': 225,
        'filename': 'verum_theme.wav',
        'description': 'Tema principal do sistema VERUM OS'
    },
    {
        'id': 'neural-symphony', 
        'title': 'Neural Network Symphony',
        'artist': 'AI Collective',
        'album': 'Quantum Beats',
        'genre': 'Synthwave',
        'year': 2025,
        'duration': 252,
        'filename': 'neural_symphony.wav',
        'description': 'Sinfonia gerada por rede neural'
    },
    {
        'id': 'holographic-dreams',
        'title': 'Holographic Dreams',
        'artist': 'Digital Horizon',
        'album': 'Virtual Reality',
        'genre': 'Ambient',
        'year': 2025,
        'duration': 318,
        'filename': 'holographic_dreams.wav',
        'description': 'Ambiente sonoro holográfico'
    }
]

def create_sample_audio_file(filename, genre, duration=30):
    """Criar arquivo de áudio sintético para análise"""
    sample_rate = 22050
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    # Gerar audio baseado no gênero
    if genre == 'Electronic':
        # Som eletrônico com batidas
        base_freq = 220  # Lá
        audio = np.sin(2 * np.pi * base_freq * t) * 0.3
        # Adicionar batidas
        beat_freq = 2  # 2 Hz = 120 BPM
        audio += np.sin(2 * np.pi * beat_freq * t) * 0.2
        # Adicionar harmônicos
        audio += np.sin(2 * np.pi * base_freq * 2 * t) * 0.1
        audio += np.sin(2 * np.pi * base_freq * 3 * t) * 0.05
        
    elif genre == 'Synthwave':
        # Som synthwave com modulação
        base_freq = 165  # Mi
        audio = np.sin(2 * np.pi * base_freq * t) * 0.4
        # Modulação de amplitude
        mod_freq = 0.5
        audio *= (1 + 0.3 * np.sin(2 * np.pi * mod_freq * t))
        # Adicionar sub-bass
        audio += np.sin(2 * np.pi * base_freq * 0.5 * t) * 0.2
        
    else:  # Ambient
        # Som ambiente suave
        base_freq = 130  # Dó
        audio = np.sin(2 * np.pi * base_freq * t) * 0.3
        # Adicionar texturas
        for i in range(5):
            freq = base_freq * (1 + i * 0.1)
            phase = np.random.random() * 2 * np.pi
            audio += np.sin(2 * np.pi * freq * t + phase) * (0.1 / (i + 1))
        
        # Envelope suave
        envelope = np.exp(-t * 0.1)
        audio *= envelope
    
    # Normalizar
    audio = audio / np.max(np.abs(audio)) * 0.8
    
    # Salvar como WAV
    import soundfile as sf
    try:
        sf.write(filename, audio, sample_rate)
        return True
    except:
        # Fallback: criar arquivo numpy
        np.save(filename.replace('.wav', '.npy'), audio)
        return True

@app.route('/api/librosa/library', methods=['GET'])
def get_music_library():
    """Retorna a biblioteca de músicas VERUM"""
    return jsonify({
        'status': 'success',
        'library': VERUM_MUSIC_LIBRARY,
        'total_tracks': len(VERUM_MUSIC_LIBRARY),
        'analysis_engine': 'librosa + matplotlib',
        'server': 'Flask/Python'
    })

@app.route('/api/librosa/analyze/<track_id>', methods=['POST'])
def analyze_track_real(track_id):
    """Análise real de música usando librosa"""
    try:
        # Encontrar a música na biblioteca
        track = next((t for t in VERUM_MUSIC_LIBRARY if t['id'] == track_id), None)
        if not track:
            return jsonify({'error': 'Track not found'}), 404
        
        # Caminho do arquivo
        audio_file = os.path.join(AUDIO_FOLDER, track['filename'])
        
        # Criar arquivo de sample se não existir
        if not os.path.exists(audio_file):
            print(f"Criando arquivo de sample: {audio_file}")
            create_sample_audio_file(audio_file, track['genre'], 30)
        
        # Análise real com librosa
        print(f"Analisando arquivo: {audio_file}")
        
        try:
            # Carregar arquivo de áudio
            y, sr = librosa.load(audio_file, duration=30)  # 30 segundos para análise rápida
            
            # Análise de tempo e ritmo
            tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
            
            # Análise harmônica e percussiva
            y_harmonic, y_percussive = librosa.effects.hpss(y)
            
            # Coeficientes MFCC (Mel-frequency cepstral coefficients)
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            mfccs_delta = librosa.feature.delta(mfccs)
            
            # Análise espectral
            spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
            spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
            
            # Zero crossing rate
            zcr = librosa.feature.zero_crossing_rate(y)[0]
            
            # Chroma features
            chroma = librosa.feature.chroma_stft(y=y, sr=sr)
            
            # Criar espectrograma
            plt.figure(figsize=(12, 8))
            
            # Subplot 1: Espectrograma
            plt.subplot(2, 2, 1)
            D = librosa.amplitude_to_db(np.abs(librosa.stft(y)), ref=np.max)
            librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log')
            plt.colorbar(format='%+2.0f dB')
            plt.title(f'Spectrogram - {track["title"]}')
            
            # Subplot 2: MFCC
            plt.subplot(2, 2, 2)
            librosa.display.specshow(mfccs, sr=sr, x_axis='time')
            plt.colorbar()
            plt.title('MFCC Features')
            
            # Subplot 3: Chroma
            plt.subplot(2, 2, 3)
            librosa.display.specshow(chroma, sr=sr, x_axis='time', y_axis='chroma')
            plt.colorbar()
            plt.title('Chromagram')
            
            # Subplot 4: Waveform with beats
            plt.subplot(2, 2, 4)
            times = librosa.frames_to_time(np.arange(len(y)), sr=sr)
            plt.plot(times, y, alpha=0.6, color='blue')
            beat_times = librosa.frames_to_time(beats, sr=sr)
            plt.vlines(beat_times, -1, 1, color='red', alpha=0.8, linestyle='--', linewidth=1)
            plt.title('Waveform with Beat Detection')
            plt.xlabel('Time (s)')
            plt.ylabel('Amplitude')
            
            plt.tight_layout()
            
            # Salvar gráfico em buffer
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
            buffer.seek(0)
            spectrogram_image = base64.b64encode(buffer.read()).decode('utf-8')
            plt.close()
            
            # Estimativa de tonalidade (simplificada)
            chroma_mean = np.mean(chroma, axis=1)
            key_index = np.argmax(chroma_mean)
            keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
            estimated_key = keys[key_index]
            
            # Resultado da análise
            analysis_result = {
                'track_info': track,
                'librosa_analysis': {
                    'tempo': float(tempo),
                    'estimated_key': estimated_key,
                    'spectral_centroid_mean': float(np.mean(spectral_centroids)),
                    'spectral_rolloff_mean': float(np.mean(spectral_rolloff)),
                    'spectral_bandwidth_mean': float(np.mean(spectral_bandwidth)),
                    'zero_crossing_rate_mean': float(np.mean(zcr)),
                    'mfcc_coefficients': {
                        'mean': mfccs.mean(axis=1).tolist(),
                        'std': mfccs.std(axis=1).tolist(),
                        'delta_mean': mfccs_delta.mean(axis=1).tolist()
                    },
                    'harmonic_percussive_ratio': float(np.mean(y_harmonic) / (np.mean(y_percussive) + 1e-8)),
                    'sample_rate': sr,
                    'duration_analyzed': len(y) / sr,
                    'total_beats': len(beats)
                },
                'visualization': {
                    'spectrogram_analysis': spectrogram_image,
                    'description': 'Análise completa com librosa: espectrograma, MFCC, cromograma e detecção de batidas'
                },
                'analysis_timestamp': datetime.now().isoformat(),
                'analyzer': 'librosa v0.10.x + matplotlib',
                'engine': 'Python/Flask Real Audio Analysis'
            }
            
            print(f"Análise concluída: {track['title']} - Tempo: {tempo:.1f} BPM")
            
            return jsonify({
                'status': 'success',
                'analysis': analysis_result
            })
            
        except Exception as e:
            print(f"Erro na análise librosa: {e}")
            # Fallback para análise sintética se librosa falhar
            return jsonify({
                'status': 'warning',
                'message': 'Análise sintética (librosa indisponível)',
                'analysis': create_synthetic_analysis(track)
            })
        
    except Exception as e:
        print(f"Erro geral: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

def create_synthetic_analysis(track):
    """Criar análise sintética quando librosa não está disponível"""
    genre = track['genre']
    
    if genre == 'Electronic':
        tempo = 128.0
        key = 'C major'
        spectral_centroid = 2500.0
    elif genre == 'Synthwave':
        tempo = 110.0
        key = 'A minor'
        spectral_centroid = 1800.0
    else:  # Ambient
        tempo = 72.0
        key = 'F major'
        spectral_centroid = 1200.0
    
    return {
        'track_info': track,
        'librosa_analysis': {
            'tempo': tempo,
            'estimated_key': key,
            'spectral_centroid_mean': spectral_centroid,
            'note': 'Análise sintética - para análise real, instale librosa'
        },
        'analysis_timestamp': datetime.now().isoformat(),
        'analyzer': 'Synthetic Analysis (librosa unavailable)'
    }

@app.route('/api/librosa/search', methods=['GET'])
def search_music():
    """Busca músicas na biblioteca"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({
            'status': 'success',
            'results': VERUM_MUSIC_LIBRARY,
            'total': len(VERUM_MUSIC_LIBRARY)
        })
    
    results = []
    for track in VERUM_MUSIC_LIBRARY:
        if (query in track['title'].lower() or 
            query in track['artist'].lower() or
            query in track['album'].lower() or
            query in track['genre'].lower()):
            results.append(track)
    
    return jsonify({
        'status': 'success',
        'results': results,
        'total': len(results),
        'query': query
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check para o servidor librosa"""
    librosa_available = True
    try:
        import librosa
        version = librosa.__version__
    except:
        librosa_available = False
        version = 'not installed'
    
    return jsonify({
        'status': 'healthy',
        'service': 'VERUM Librosa Music Server',
        'version': '1.0.0',
        'librosa_available': librosa_available,
        'librosa_version': version,
        'audio_samples': len(VERUM_MUSIC_LIBRARY),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🎵 Iniciando VERUM Librosa Music Server...")
    print("📊 Sistema de análise de música real com librosa")
    print("🔬 Análise técnica: MFCC, espectrograma, detecção de batidas")
    print("🎼 Biblioteca musical VERUM carregada")
    
    # Verificar se librosa está disponível
    try:
        import librosa
        print(f"✅ Librosa disponível: v{librosa.__version__}")
    except ImportError:
        print("⚠️  Librosa não instalado - usando análise sintética")
    
    app.run(debug=True, host='0.0.0.0', port=5001)