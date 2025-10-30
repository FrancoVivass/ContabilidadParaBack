#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
FastBooks Robles - Servidor de Desarrollo Local
Instituto Paula Robles - 2025

Este script inicia un servidor HTTP local para visualizar el sitio web.
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

# Configuración
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def log_message(self, format, *args):
        # Personalizar mensajes de log
        print(f"[FastBooks] {self.address_string()} - {format % args}")

def main():
    print("=" * 70)
    print("  FASTBOOKS ROBLES - SERVIDOR DE DESARROLLO")
    print("  Instituto Paula Robles - Sistema Contable")
    print("=" * 70)
    print()
    print(f"📁 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    print()
    
    # Cambiar al directorio del script
    os.chdir(DIRECTORY)
    
    # Crear el servidor
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"✅ Servidor iniciado correctamente")
        print(f"🔗 URL: {url}")
        print()
        print("📝 Instrucciones:")
        print(f"   - Abre tu navegador en: {url}")
        print(f"   - Presiona Ctrl+C para detener el servidor")
        print()
        print("🚀 Abriendo navegador automáticamente...")
        print()
        
        # Abrir el navegador automáticamente
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"⚠️  No se pudo abrir el navegador automáticamente: {e}")
            print(f"   Por favor, abre manualmente: {url}")
        
        print("=" * 70)
        print("Servidor ejecutándose... (Ctrl+C para detener)")
        print("=" * 70)
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print()
            print("=" * 70)
            print("🛑 Servidor detenido por el usuario")
            print("=" * 70)
            print()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print()
        print("❌ Error al iniciar el servidor:")
        print(f"   {e}")
        print()
        print("💡 Solución alternativa:")
        print(f"   Ejecuta en la terminal: python -m http.server {PORT}")
        print()
        input("Presiona Enter para cerrar...")
