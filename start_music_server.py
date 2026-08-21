#!/usr/bin/env python3
"""
Script para iniciar o servidor de música VERUM em background
"""

import subprocess
import sys
import time
import requests
import os

def start_music_server():
    """Inicia o servidor de música Flask"""
    print("🎵 Iniciando VERUM Music Server...")
    
    # Instalar dependências se necessário
    try:
        import librosa
        import flask
        import matplotlib
        print("✅ Dependências Python já instaladas")
    except ImportError:
        print("📦 Instalando dependências Python...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", 
                             "librosa", "flask", "flask-cors", "matplotlib", "scipy", "numpy"])
    
    # Iniciar servidor em background
    env = os.environ.copy()
    env['PYTHONPATH'] = '.'
    
    process = subprocess.Popen([
        sys.executable, "server/music_server.py"
    ], env=env)
    
    # Aguardar servidor ficar online
    print("⏳ Aguardando servidor inicializar...")
    for i in range(30):  # 30 tentativas
        try:
            response = requests.get("http://localhost:5001/health", timeout=2)
            if response.status_code == 200:
                print("✅ VERUM Music Server online!")
                print("🔗 Endpoint: http://localhost:5001")
                print("🎼 API de música funcional")
                return process
        except:
            time.sleep(1)
    
    print("❌ Falha ao iniciar servidor de música")
    return None

if __name__ == "__main__":
    process = start_music_server()
    if process:
        try:
            process.wait()
        except KeyboardInterrupt:
            print("\n🛑 Parando servidor de música...")
            process.terminate()