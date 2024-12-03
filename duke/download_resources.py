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
    # Create js-dos directory
    Path('js-dos').mkdir(exist_ok=True)
    
    # Download js-dos from CDN
    js_dos_files = {
        'js-dos.js': 'https://js-dos.com/cdn/v7/current/js-dos.js',
        'wdosbox.js': 'https://js-dos.com/cdn/v7/current/wdosbox.js',
        'wdosbox.wasm': 'https://js-dos.com/cdn/v7/current/wdosbox.wasm'
    }
    
    # Download each file
    for filename, url in js_dos_files.items():
        target_path = f"js-dos/{filename}"
        download_file(url, target_path)
    
    print("All resources downloaded successfully!")

if __name__ == "__main__":
    main()
