import zipfile
import io
import urllib.request
import sys

def inspect_zip(url):
    print(f"Inspecting {url}...")
    try:
        with urllib.request.urlopen(url) as response:
            data = response.read()
            with zipfile.ZipFile(io.BytesIO(data)) as z:
                print("Files found:")
                for info in z.infolist():
                    if info.filename.lower().endswith('doom.exe'):
                        print(f"  {info.filename}")
                    elif info.is_dir():
                         print(f"  DIR: {info.filename}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_zip("https://js-dos.com/cdn/upload/DOOM-@evilution.zip")
