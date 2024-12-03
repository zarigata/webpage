from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import json
import os
from urllib.parse import unquote

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/list-tracks':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            # Get all MP3 files from the midi directory
            midi_dir = 'midi'
            tracks = []
            
            try:
                for filename in os.listdir(midi_dir):
                    if filename.lower().endswith('.mp3'):
                        # Parse artist and name from filename
                        name = filename.replace('.mp3', '')
                        artist = 'Unknown'
                        
                        # Try to extract artist if format is "Artist - Track"
                        if ' - ' in name:
                            parts = name.split(' - ', 1)
                            artist = parts[0].strip()
                            name = parts[1].strip()
                            
                            # Remove common suffixes
                            name = name.replace('(Keygen Song)', '').replace('[HQ]', '').strip()
                        
                        tracks.append({
                            'url': f'/midi/{filename}',
                            'name': name,
                            'artist': artist
                        })
                
                self.wfile.write(json.dumps(tracks).encode())
            except Exception as e:
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            return super().do_GET()

port = 8000
print(f"Starting server on port {port}...")
httpd = HTTPServer(('localhost', port), CORSRequestHandler)
print(f"Server running at http://localhost:{port}/")
print("Press Ctrl+C to stop the server.")
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
    httpd.server_close()
    sys.exit(0)
