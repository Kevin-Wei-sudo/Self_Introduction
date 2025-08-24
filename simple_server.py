#!/usr/bin/env python3
"""
Simple Resume Website Server
A minimal HTTP server to serve the static HTML resume website.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8000
HOST = 'localhost'

def open_browser_delayed(url, delay=2):
    """Open browser after a delay."""
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print(f"🌐 Opened browser at {url}")
    except Exception as e:
        print(f"⚠️  Could not auto-open browser: {e}")

def find_available_port(start_port=8000):
    """Find an available port."""
    for port in range(start_port, start_port + 10):
        try:
            with socketserver.TCPServer((HOST, port), http.server.SimpleHTTPRequestHandler) as test:
                return port
        except OSError:
            continue
    return start_port

def main():
    """Main function."""
    # Check if HTML file exists
    if not os.path.exists('index.html'):
        print("❌ index.html not found in current directory")
        sys.exit(1)
    
    # Find available port
    port = find_available_port(PORT)
    url = f"http://{HOST}:{port}"
    
    print("="*60)
    print("🚀 Personal Resume Website Server")
    print("="*60)
    print(f"📍 URL: {url}")
    print(f"📁 Directory: {os.getcwd()}")
    print("📖 Press Ctrl+C to stop")
    print("="*60)
    
    # Start browser in background
    browser_thread = threading.Thread(target=open_browser_delayed, args=(url,))
    browser_thread.daemon = True
    browser_thread.start()
    
    # Start server
    try:
        with socketserver.TCPServer((HOST, port), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully on port {port}")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped. Thanks for viewing!")
    except Exception as e:
        print(f"❌ Server error: {e}")

if __name__ == "__main__":
    main()