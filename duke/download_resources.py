import os
import requests
import zipfile
from pathlib import Path

def download_file(url, filename):
    print(f"Downloading {filename}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def main():
    # Create directories
    Path('js-dos').mkdir(exist_ok=True)
    
    # Download js-dos
    js_dos_url = "https://js-dos.com/6.22/current/js-dos.js"
    download_file(js_dos_url, "js-dos/js-dos.js")
    
    # Download wasm file
    wasm_url = "https://js-dos.com/6.22/current/wdosbox.wasm"
    download_file(wasm_url, "js-dos/wdosbox.wasm")
    
    # Download Duke Nukem 3D cover image
    cover_url = "https://cdn.cloudflare.steamstatic.com/steam/apps/225140/header.jpg"
    download_file(cover_url, "duke3d-cover.png")
    
    print("All resources downloaded successfully!")

if __name__ == "__main__":
    main()
