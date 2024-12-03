import os
import requests
from pathlib import Path

def download_file(url, filename):
    print(f"Downloading {filename}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def main():
    # Create js-doom directory
    Path('js-doom').mkdir(exist_ok=True)
    
    # Direct URLs to the js-doom files from the repository
    js_doom_files = {
        'js-doom.js': 'https://raw.githubusercontent.com/DaniHRE/jsdoom/main/public/js-doom.js',
        'js-doom.wasm': 'https://raw.githubusercontent.com/DaniHRE/jsdoom/main/public/js-doom.wasm',
        'doom1.wad': 'https://raw.githubusercontent.com/DaniHRE/jsdoom/main/public/doom1.wad'
    }
    
    # Download each file
    for filename, url in js_doom_files.items():
        target_path = f"js-doom/{filename}"
        download_file(url, target_path)
    
    print("All resources downloaded successfully!")

if __name__ == "__main__":
    main()
