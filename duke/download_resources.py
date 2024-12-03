import os
import requests
import zipfile
from pathlib import Path
import shutil

def download_file(url, filename):
    print(f"Downloading {filename}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def download_github_repo(repo_url, branch='main'):
    zip_url = f"{repo_url}/archive/refs/heads/{branch}.zip"
    zip_file = "repo.zip"
    
    print(f"Downloading repository {repo_url}...")
    download_file(zip_url, zip_file)
    
    # Extract the zip file
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall('.')
    
    # Remove the zip file
    os.remove(zip_file)
    
    # Get the extracted folder name
    extracted_dir = next(d for d in os.listdir('.') if d.startswith('jsdoom-'))
    
    # Move js-doom files to the correct location
    os.makedirs('js-doom', exist_ok=True)
    shutil.copy(f"{extracted_dir}/dist/js-doom.js", "js-doom/js-doom.js")
    shutil.copy(f"{extracted_dir}/dist/js-doom.wasm", "js-doom/js-doom.wasm")
    
    # Cleanup
    shutil.rmtree(extracted_dir)

def main():
    # Create directories
    Path('js-doom').mkdir(exist_ok=True)
    
    # Download js-doom from GitHub
    download_github_repo("https://github.com/DaniHRE/jsdoom")
    
    print("All resources downloaded successfully!")

if __name__ == "__main__":
    main()
