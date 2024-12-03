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
    
    # Download js-dos 6.22
    download_file(
        'https://js-dos.com/6.22/current/js-dos.js',
        'js-dos/js-dos.js'
    )
    
    print("All resources downloaded successfully!")

if __name__ == "__main__":
    main()
