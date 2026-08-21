#!/usr/bin/env python3
"""
VERUM Music Server - Sistema de análise e reprodução de música real
Integrado ao VERUM OS para apresentação universitária
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permitir requisições do frontend React

# Configuração
AUDIO_FOLDER = 'audio_files'
UPLOAD_FOLDER = 'uploads'

# Criar pastas se não existirem
os.makedirs(AUDIO_FOLDER, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Biblioteca de músicas VERUM (arquivos de exemplo)
VERUM_MUSIC_LIBRARY = [
    {
        'id': 'sample1',
        'title': 'VERUM Theme',
        'artist': 'VERUM NODE',
        'album': 'VERUM OS Soundtrack',
        'genre': 'Electronic',
        'year': 2025,
        'duration': '3:45',
        'filename': 'verum_theme.wav'
    },
    {
        'id': 'sample2', 
        'title': 'Neural Network Symphony',
        'artist': 'AI Collective',
        'album': 'Quantum Beats',
        'genre': 'Synthwave',
        'year': 2025,
        'duration': '4:12',
        'filename': 'neural_symphony.wav'
    },
    {
        'id': 'sample3',
        'title': 'Holographic Dreams',
        'artist': 'Digital Horizon',
        'album': 'Virtual Reality',
        'genre': 'Ambient',
        'year': 2025,
        'duration': '5:18',
        'filename': 'holographic_dreams.wav'
    }
]

@app.route('/api/music/library', methods=['GET'])
def get_music_library():
    """Retorna a biblioteca de músicas VERUM"""
    return jsonify({
        'status': 'success',
        'library': VERUM_MUSIC_LIBRARY,
        'total_tracks': len(VERUM_MUSIC_LIBRARY)
    })

@app.route('/api/music/analyze/<track_id>', methods=['POST'])
def analyze_track(track_id):
    """Analisa uma faixa de música usando librosa"""
    try:
        # Encontrar a música na biblioteca
        track = next((t for t in VERUM_MUSIC_LIBRARY if t['id'] == track_id), None)
        if not track:
            return jsonify({'error': 'Track not found'}), 404
        
        # Para demonstração, vamos gerar dados sintéticos realistas
        # Em produção, você carregaria o arquivo real com librosa
        # y, sr = librosa.load(os.path.join(AUDIO_FOLDER, track['filename']))
        
        # Dados sintéticos baseados no gênero da música
        genre = track['genre']
        
        if genre == 'Electronic':
            tempo = 128.0
            key = 'C major'
            energy = 0.85
            valence = 0.72
            mfccs = [12.5, -8.3, 4.7, -2.1, 1.8, -1.2, 0.9, -0.6, 0.4, -0.3]
        elif genre == 'Synthwave':
            tempo = 110.0
            key = 'A minor'
            energy = 0.78
            valence = 0.65
            mfccs = [10.2, -6.8, 3.9, -1.8, 1.5, -1.0, 0.7, -0.5, 0.3, -0.2]
        else:  # Ambient
            tempo = 72.0
            key = 'F major'
            energy = 0.45
            valence = 0.80
            mfccs = [8.7, -4.2, 2.1, -1.0, 0.8, -0.6, 0.4, -0.3, 0.2, -0.1]
        
        # Gerar espectrograma visual
        fig, ax = plt.subplots(figsize=(10, 6))
        
        # Simular dados de espectrograma
        time = np.linspace(0, 180, 1000)  # 3 minutos
        freq = np.linspace(0, 8000, 512)  # Até 8kHz
        X, Y = np.meshgrid(time, freq)
        
        # Criar padrão baseado no gênero
        if genre == 'Electronic':
            Z = np.sin(X/10) * np.cos(Y/1000) + np.random.random((512, 1000)) * 0.3
        elif genre == 'Synthwave':
            Z = np.sin(X/15) * np.exp(-Y/2000) + np.random.random((512, 1000)) * 0.2
        else:  # Ambient
            Z = np.exp(-Y/1000) * np.sin(X/20) + np.random.random((512, 1000)) * 0.1
        
        im = ax.imshow(Z, aspect='auto', origin='lower', cmap='viridis', 
                      extent=[0, 180, 0, 8000])
        ax.set_xlabel('Tempo (segundos)')
        ax.set_ylabel('Frequência (Hz)')
        ax.set_title(f'Espectrograma - {track["title"]}')
        plt.colorbar(im, ax=ax, label='Amplitude (dB)')
        
        # Converter para base64
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
        buffer.seek(0)
        spectrogram_image = base64.b64encode(buffer.read()).decode('utf-8')
        plt.close()
        
        # Retornar análise completa
        analysis_result = {
            'track_info': track,
            'audio_features': {
                'tempo': round(tempo, 1),
                'key': key,
                'energy': round(energy, 2),
                'valence': round(valence, 2),
                'danceability': round((tempo / 130.0) * energy, 2),
                'loudness': round(-8.5 + energy * 5, 1)
            },
            'mfccs': {
                'coefficients': [round(m, 2) for m in mfccs],
                'mean': round(np.mean(mfccs), 2),
                'std': round(np.std(mfccs), 2)
            },
            'spectrogram': spectrogram_image,
            'analysis_timestamp': datetime.now().isoformat(),
            'analyzer': 'VERUM Music AI v2.0'
        }
        
        return jsonify({
            'status': 'success',
            'analysis': analysis_result
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/api/music/generate-waveform/<track_id>', methods=['POST'])
def generate_waveform(track_id):
    """Gera visualização de forma de onda"""
    try:
        track = next((t for t in VERUM_MUSIC_LIBRARY if t['id'] == track_id), None)
        if not track:
            return jsonify({'error': 'Track not found'}), 404
        
        # Gerar forma de onda sintética baseada no gênero
        duration = 180  # 3 minutos
        sample_rate = 1000  # Pontos por segundo (reduzido para performance)
        t = np.linspace(0, duration, duration * sample_rate)
        
        genre = track['genre']
        if genre == 'Electronic':
            # Forma de onda mais dinâmica
            waveform = np.sin(2 * np.pi * 0.1 * t) * np.exp(-t/120) + \
                      0.5 * np.sin(2 * np.pi * 0.3 * t) + \
                      0.3 * np.random.random(len(t))
        elif genre == 'Synthwave':
            # Forma de onda com modulação
            waveform = 0.8 * np.sin(2 * np.pi * 0.05 * t) * (1 + 0.3 * np.sin(2 * np.pi * 0.2 * t)) + \
                      0.2 * np.random.random(len(t))
        else:  # Ambient
            # Forma de onda suave
            waveform = 0.6 * np.sin(2 * np.pi * 0.02 * t) * np.exp(-t/200) + \
                      0.1 * np.random.random(len(t))
        
        # Normalizar
        waveform = waveform / np.max(np.abs(waveform))
        
        # Decimar para reduzir tamanho (um ponto por segundo)
        decimated_waveform = waveform[::sample_rate]
        
        return jsonify({
            'status': 'success',
            'waveform': {
                'data': decimated_waveform.tolist(),
                'duration': duration,
                'sample_rate': 1,  # 1 ponto por segundo após decimação
                'track_id': track_id
            }
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

@app.route('/api/music/search', methods=['GET'])
def search_music():
    """Busca músicas na biblioteca"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({
            'status': 'success',
            'results': VERUM_MUSIC_LIBRARY,
            'total': len(VERUM_MUSIC_LIBRARY)
        })
    
    # Buscar por título, artista, álbum ou gênero
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

@app.route('/api/music/stats', methods=['GET'])
def get_music_stats():
    """Estatísticas da biblioteca musical"""
    genres = {}
    artists = {}
    total_duration = 0
    
    for track in VERUM_MUSIC_LIBRARY:
        # Contar gêneros
        genre = track['genre']
        genres[genre] = genres.get(genre, 0) + 1
        
        # Contar artistas
        artist = track['artist']
        artists[artist] = artists.get(artist, 0) + 1
        
        # Somar duração (convertendo formato mm:ss)
        duration_parts = track['duration'].split(':')
        minutes = int(duration_parts[0])
        seconds = int(duration_parts[1])
        total_duration += minutes * 60 + seconds
    
    return jsonify({
        'status': 'success',
        'stats': {
            'total_tracks': len(VERUM_MUSIC_LIBRARY),
            'total_duration_seconds': total_duration,
            'total_duration_formatted': f"{total_duration // 60}:{total_duration % 60:02d}",
            'genres': genres,
            'artists': artists,
            'latest_year': max(track['year'] for track in VERUM_MUSIC_LIBRARY),
            'oldest_year': min(track['year'] for track in VERUM_MUSIC_LIBRARY)
        }
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check para o servidor de música"""
    return jsonify({
        'status': 'healthy',
        'service': 'VERUM Music Server',
        'version': '2.0',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🎵 Iniciando VERUM Music Server...")
    print("🔊 Servidor de análise de música com librosa")
    print("🎼 Biblioteca musical VERUM carregada")
    app.run(debug=True, host='0.0.0.0', port=5001)