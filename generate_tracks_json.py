import os
import json

def generate_tracks_json():
    midi_dir = 'midi'
    tracks = []
    
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
                'url': f'midi/{filename}',
                'name': name,
                'artist': artist
            })
    
    # Write to tracks.json
    with open('tracks.json', 'w', encoding='utf-8') as f:
        json.dump(tracks, f, indent=2, ensure_ascii=False)
    
    print(f"Generated tracks.json with {len(tracks)} tracks")

if __name__ == '__main__':
    generate_tracks_json()
