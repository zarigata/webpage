                            ,____
                            |    |
                   ,_______|    |
                   |            |
                   |            |
         /\       |     __     |
        /  \      |    /  \    |     
       /    \     |   |    |   |      ☠️  ENTER IF YOU DARE  ☠️
      /   _  \    |    \__/    |
     /   (_)  \   |            |
    /         \   |            |    
   /           \  |     _      |         💀  ABANDON HOPE  💀
  /      _      \ |    | |     |
 /      (_)      \|    |_|     |
/                 \            /
\__________________|\_________/

# Zarigata Profile Website

A cyberpunk-themed personal website with an interactive music player and dynamic visual elements.

## Automatic GitHub Pages Deployment

This repository is set up with GitHub Actions for automatic deployment:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically:
   - Generate tracks.json when you add/modify MP3 files
   - Deploy the site to GitHub Pages

## Adding New Music

1. Add new MP3 files to the `midi` directory
2. Commit and push to the `main` branch a
3. GitHub Actions will automatically:
   - Run generate_tracks_json.py
   - Update tracks.json
   - Deploy the changes

## Repository Structure
```
your-repo/
├── index.html
├── style.css
├── script.js
├── tracks.json
├── midi/
│   └── (your mp3 files)
├── .github/
│   └── workflows/
│       ├── update-tracks.yml
│       └── deploy-pages.yml
└── README.md
```

## Setup Instructions

1. Create a new GitHub repository
2. Push this code to the repository
3. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

4. Your site will be available at: `https://[your-username].github.io/[repo-name]/`

## Local Development

For local testing:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

███████╗ █████╗ ██████╗ ██╗ ██████╗  █████╗ ████████╗ █████╗ 
╚══███╔╝██╔══██╗██╔══██╗██║██╔════╝ ██╔══██╗╚══██╔══╝██╔══██╗
  ███╔╝ ███████║██████╔╝██║██║  ███╗███████║   ██║   ███████║
 ███╔╝  ██╔══██║██╔══██╗██║██║   ██║██╔══██║   ██║   ██╔══██║
███████╗██║  ██║██║  ██║██║╚██████╔╝██║  ██║   ██║   ██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
