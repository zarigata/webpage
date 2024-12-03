# Zarigata Profile Website

A cyberpunk-themed personal website with an interactive music player and dynamic visual elements.

## Setup for GitHub Pages

1. Run the track generator script before deploying:
   ```bash
   python generate_tracks_json.py
   ```
   This will create `tracks.json` with your music track information.

2. Make sure your repository has this structure:
   ```
   your-repo/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── tracks.json
   ├── midi/
   │   └── (your mp3 files)
   └── README.md
   ```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select your main branch
   - Save

4. Your site will be available at: `https://[your-username].github.io/[repo-name]/`

## Adding New Music

1. Add new MP3 files to the `midi` directory
2. Run `python generate_tracks_json.py` to update tracks.json
3. Commit and push your changes
4. GitHub Pages will automatically update

## Local Development

1. Run a local server:
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser
