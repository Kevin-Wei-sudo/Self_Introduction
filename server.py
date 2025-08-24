#!/usr/bin/env python3
"""
Personal Resume Website Server
Simple Python HTTP server to serve the static HTML resume website.
Compatible with macOS and optimized for local development.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import signal
import threading
import time

# Configuration
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with better MIME type support."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()
    
    def guess_type(self, path):
        """Better MIME type guessing."""
        # Custom MIME types
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        
        # Fall back to parent implementation
        return super().guess_type(path)
    
    def log_message(self, format, *args):
        """Custom logging format."""
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def check_files():
    """Check if all required files exist."""
    required_files = ['index.html', 'styles.css', 'script.js']
    missing_files = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Missing files: {', '.join(missing_files)}")
        print("Please make sure all website files are in the current directory.")
        return False
    
    print("✅ All required files found.")
    return True

def find_available_port(start_port=8000, max_attempts=10):
    """Find an available port starting from start_port."""
    for i in range(max_attempts):
        try:
            port = start_port + i
            with socketserver.TCPServer((HOST, port), CustomHTTPRequestHandler):
                return port
        except OSError:
            continue
    
    raise OSError(f"Could not find available port in range {start_port}-{start_port + max_attempts}")

def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully."""
    print("\n\n🛑 Server shutting down...")
    print("Thank you for viewing the resume website!")
    sys.exit(0)

def open_browser_delayed(url, delay=1.5):
    """Open browser after a delay to ensure server is ready."""
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print(f"🌐 Opened browser at {url}")
    except Exception as e:
        print(f"⚠️  Could not auto-open browser: {e}")
        print(f"   Please manually visit: {url}")

def print_startup_info(port):
    """Print startup information and instructions."""
    url = f"http://{HOST}:{port}"
    
    print("\n" + "="*60)
    print("🚀 Personal Resume Website Server Started!")
    print("="*60)
    print(f"📍 Local URL:    {url}")
    print(f"📁 Serving from: {os.getcwd()}")
    print(f"🖥️  Platform:     {sys.platform}")
    print("="*60)
    print("\n📖 Instructions:")
    print("   • The website will open automatically in your default browser")
    print("   • Press Ctrl+C to stop the server")
    print("   • Edit HTML/CSS/JS files and refresh browser to see changes")
    print("\n🎯 Website Features:")
    print("   • Responsive design (mobile-friendly)")
    print("   • Smooth scrolling navigation")
    print("   • Interactive skill bars")
    print("   • Professional layout optimized for LLM engineer roles")
    print("\n" + "="*60)

def main():
    """Main server function."""
    # Handle Ctrl+C gracefully
    signal.signal(signal.SIGINT, signal_handler)
    
    print("🔍 Checking website files...")
    if not check_files():
        sys.exit(1)
    
    try:
        # Find available port
        port = find_available_port(PORT)
        url = f"http://{HOST}:{port}"
        
        # Print startup information
        print_startup_info(port)
        
        # Start browser in background thread
        browser_thread = threading.Thread(
            target=open_browser_delayed, 
            args=(url,),
            daemon=True
        )
        browser_thread.start()
        
        # Start server
        with socketserver.TCPServer((HOST, port), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is already in use.")
            print("   Try closing other applications or use a different port.")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        signal_handler(signal.SIGINT, None)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()