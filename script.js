// Discord copy functionality
function copyDiscord() {
    const discordTag = "Zarigata";
    navigator.clipboard.writeText(discordTag);
    
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Glitch effect on hover
const glitchText = document.querySelector('.glitch');
glitchText.addEventListener('mouseover', function() {
    this.style.animation = 'glitch 100ms infinite';
    this.style.textShadow = `
        0 0 20px var(--primary-color),
        0 0 40px var(--primary-color),
        0 0 80px var(--primary-color),
        0 0 160px var(--secondary-color)
    `;
});

glitchText.addEventListener('mouseout', function() {
    this.style.animation = 'textGlow 2s ease-in-out infinite alternate';
    this.style.textShadow = '';
});

// Digital cursor effect with matrix-like trails
const cursor = document.querySelector('.cursor');
const maxTrails = 20;
const trails = [];
let mouseX = 0;
let mouseY = 0;

// Create the main cursor as an asterisk
cursor.innerHTML = '*';
cursor.style.fontSize = '24px';
cursor.style.fontWeight = 'bold';
cursor.style.color = '#00ff00';
cursor.style.textShadow = '0 0 10px #00ff00';

// Create digital trails with matrix-like characters
const matrixChars = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.color = '#00ff00';
    trail.style.fontSize = '16px';
    trail.style.fontFamily = 'monospace';
    trail.style.textShadow = '0 0 5px #00ff00';
    document.body.appendChild(trail);
    trails.push({
        element: trail,
        x: 0,
        y: 0,
        alpha: 0,
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)]
    });
}

// Update cursor and trail positions with digital rain effect
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = (mouseX - 12) + 'px';
    cursor.style.top = (mouseY - 12) + 'px';

    // Update trail positions with digital rain effect
    trails.forEach((trail, index) => {
        setTimeout(() => {
            // Change character randomly
            if (Math.random() > 0.9) {
                trail.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            
            trail.x = mouseX + (Math.random() - 0.5) * 50;
            trail.y = mouseY + index * 20;
            trail.alpha = 1 - (index / maxTrails);
            
            trail.element.textContent = trail.char;
            trail.element.style.left = (trail.x - 8) + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = trail.alpha;
        }, index * 50);
    });
});

// Random glitch effect for the image
const glitchImage = document.querySelector('.glitch-image');
setInterval(() => {
    if (Math.random() > 0.7) {
        const glitchDuration = 100 + Math.random() * 200;
        const xOffset = (Math.random() - 0.5) * 10;
        const yOffset = (Math.random() - 0.5) * 10;
        const scaleOffset = 0.95 + Math.random() * 0.1;
        const rotation = (Math.random() - 0.5) * 5;
        
        glitchImage.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scaleOffset}) rotate(${rotation}deg)`;
        glitchImage.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`;
        
        setTimeout(() => {
            glitchImage.style.transform = '';
            glitchImage.style.filter = '';
        }, glitchDuration);
    }
}, 200);

// Hide cursor when leaving the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    trails.forEach(trail => {
        trail.element.style.display = 'none';
    });
});

// Show cursor when entering the window
document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
    trails.forEach(trail => {
        trail.element.style.display = 'block';
    });
});

// ASCII art display
const asciiArt = `
▒███████▒ ▄▄▄       ██▀███   ██▓  ▄████  ▄▄▄     ▄▄▄█████▓ ▄▄▄      
▒ ▒ ▒ ▄▀░▒████▄    ▓██ ▒ ██▒▓██▒ ██▒ ▀█▒▒████▄   ▓  ██▒ ▓▒▒████▄    
░ ▒ ▄▀▒░ ▒██  ▀█▄  ▓██ ░▄█ ▒▒██▒▒██░▄▄▄░▒██  ▀█▄ ▒ ▓██░ ▒░▒██  ▀█▄  
  ▄▀▒   ░░██▄▄▄▄██ ▒██▀▀█▄  ░██░░▓█  ██▓░██▄▄▄▄██░ ▓██▓ ░ ░██▄▄▄▄██ 
▒███████▒ ▓█   ▓██▒░██▓ ▒██▒░██░░▒▓███▀▒ ▓█   ▓██▒ ▒██▒ ░  ▓█   ▓██▒
░▒▒ ▓░▒░▒ ▒▒   ▓▒█░░ ▒▓ ░▒▓░░▓   ░▒   ▒  ▒▒   ▓▒█░ ▒ ░░    ▒▒   ▓▒█░
░░▒ ▒ ░ ▒  ▒   ▒▒ ░  ░▒ ░ ▒░ ▒ ░  ░   ░   ▒   ▒▒ ░   ░      ▒   ▒▒ ░
░ ░ ░ ░ ░  ░   ▒     ░░   ░  ▒ ░░ ░   ░   ░   ▒    ░        ░   ▒   
  ░ ░          ░  ░   ░      ░        ░       ░  ░               ░  ░
░                                                                     
`;

// Loading messages with shorter delays
const loadingMessages = [
    "INITIALIZING SYSTEM...",
    "ACCESSING MAINFRAME...",
    "BYPASSING SECURITY...",
    "DECRYPTING DATA...",
    "INJECTING PAYLOAD...",
    "ESTABLISHING CONNECTION...",
    "ACCESS GRANTED"
];

const typeDelay = 20; // Faster typing speed
const messageDelay = 500; // Shorter delay between messages

// Modified loading sequence
async function startLoadingSequence() {
    const terminal = document.querySelector('.terminal-content');
    const asciiContainer = document.createElement('pre');
    asciiContainer.className = 'ascii-art';
    asciiContainer.textContent = asciiArt;
    terminal.insertBefore(asciiContainer, terminal.firstChild);

    // Add glitch effect to ASCII art
    setInterval(() => {
        asciiContainer.style.transform = Math.random() > 0.95 ? 
            `translate(${Math.random() * 5}px, ${Math.random() * 5}px)` : 'none';
    }, 50);

    const progress = document.querySelector('.progress');
    const typingText = document.querySelector('.typing-text');

    for (let i = 0; i < loadingMessages.length; i++) {
        typingText.textContent = '';
        await typeMessage(loadingMessages[i]);
        progress.style.width = `${((i + 1) / loadingMessages.length) * 100}%`;
        await new Promise(resolve => setTimeout(resolve, messageDelay));
    }

    // Show jumpscare
    setTimeout(showJumpscare, 500);
}

// Function to type a message
async function typeMessage(message) {
    const typingText = document.querySelector('.typing-text');
    for (let i = 0; i < message.length; i++) {
        typingText.textContent += message[i];
        await new Promise(resolve => setTimeout(resolve, typeDelay));
    }
}

// Show jumpscare function
function showJumpscare() {
    const loadingScreen = document.getElementById('loading-screen');
    const jumpscare = document.querySelector('.jumpscare');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.style.display = 'none';
    jumpscare.classList.add('active');
    
    // Play glitch sound only if user has interacted
    document.addEventListener('click', function playSound() {
        const glitchSound = new Audio('data:audio/wav;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
        glitchSound.play();
        document.removeEventListener('click', playSound);
    }, { once: true });

    // Hide jumpscare and show main content after animation
    setTimeout(() => {
        jumpscare.classList.remove('active');
        mainContent.classList.remove('hidden');
        document.body.classList.add('loaded');
        
        // Initialize scroller after showing main content
        new ScrollingText();
    }, 500);
}

// Start loading sequence when page loads
document.addEventListener('DOMContentLoaded', () => {
    startLoadingSequence();
});

// Scrolling text functionality
class ScrollingText {
    constructor() {
        this.scrollText = document.querySelector('.scroll-text');
        this.sentences = [
            "you cant cok 6milions pizzas in only 2 ovens in a period of 1 year",
            "真のチャドだけが参加する",
            "Die Regierung belügt Sie",
            "新冠病毒是個謊言，而你卻允許",
            "Initializing neural network",
            "Matrix connection established",
            "不法移民は役に立たない、文化的豊かさはグローバリストの嘘",
            "Bypassing security measures",
            "Der österreichische Maler war eine Warnung, und wir haben nicht zugehört, es wird wieder passieren",
            "Cyber realm activated"
        ];
        this.currentIndex = 0;
        this.letterColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
        console.log('ScrollingText initialized', this.scrollText);
        this.startScrolling();
    }

    createFloatingLetters(text) {
        console.log('Creating floating letters for:', text);
        return text.split('').map(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'floating-letter';
            if ('zarigat'.includes(letter.toLowerCase())) {
                span.classList.add('highlight');
            }
            span.style.animationDelay = `${Math.random() * 2}s`;
            return span;
        });
    }

    async displaySentence(sentence) {
        console.log('Displaying sentence:', sentence);
        this.scrollText.innerHTML = '';
        const letters = this.createFloatingLetters(sentence);
        letters.forEach(letter => this.scrollText.appendChild(letter));

        const duration = sentence.length * 200;
        this.scrollText.style.animation = 'none';
        this.scrollText.offsetHeight;
        this.scrollText.style.animation = `slide-text ${duration}ms linear`;

        const eLetters = this.scrollText.querySelectorAll('.highlight');
        console.log('Found e letters:', eLetters.length);

        const colorInterval = setInterval(() => {
            eLetters.forEach(letter => {
                letter.style.color = this.letterColors[Math.floor(Math.random() * this.letterColors.length)];
            });
        }, 500);

        await new Promise(resolve => setTimeout(resolve, duration));
        clearInterval(colorInterval);
    }

    async startScrolling() {
        console.log('Starting scroll with sentences:', this.sentences);
        while (true) {
            for (let sentence of this.sentences) {
                await this.displaySentence(sentence);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}

// Logo Easter Egg
class MiniTerminal {
    constructor() {
        this.terminal = document.getElementById('mini-terminal');
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.clickCount = 0;
        this.commands = {
            'help': () => this.showHelp(),
            'clear': () => this.clear(),
            'ls': () => this.listFiles(),
            'echo': (args) => this.echo(args),
            'whoami': () => this.print('root'),
            'exit': () => this.hide(),
            'duke': () => {
                // Save current music state
                const wasPlaying = this.isPlaying;
                if (wasPlaying) {
                    this.togglePlay();
                }
                
                // Add loading effect
                const terminal = document.querySelector('.terminal');
                terminal.innerHTML += '<div class="command-output" style="color: #0ff">Initializing Doom Engine...</div>';
                terminal.innerHTML += '<div class="command-output" style="color: #0ff">Prepare for demon slaying...</div>';
                terminal.innerHTML += '<div class="command-output" style="color: #ff0">RIP AND TEAR!</div>';
                
                // Redirect to Doom page
                setTimeout(() => {
                    window.location.href = 'duke/index.html';
                }, 2000);
                return;
            },
            'crazy': () => {
                this.print('INITIATING CHAOS MODE!');
                this.print('PREPARE FOR 3 MINUTES OF MADNESS!');
                
                // Add crazy effects class to body
                document.body.classList.add('crazy-mode');
                
                // Make elements go crazy
                const elements = document.querySelectorAll('button, a, img, .terminal, h1, p');
                const animations = [];
                
                elements.forEach(el => {
                    el.style.transition = 'all 0.5s';
                    const animation = setInterval(() => {
                        const x = Math.random() * (window.innerWidth - el.offsetWidth);
                        const y = Math.random() * (window.innerHeight - el.offsetHeight);
                        const rotation = Math.random() * 360;
                        const scale = 0.5 + Math.random();
                        el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                        el.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                    }, 1000);
                    animations.push(animation);
                });

                // Add fire effect
                const fire = document.createElement('div');
                fire.className = 'fire-overlay';
                document.body.appendChild(fire);

                // Crazy text effect
                const texts = document.querySelectorAll('p, h1, h2, h3, button');
                texts.forEach(text => {
                    text.style.animation = 'crazyText 0.1s infinite';
                });

                // Play crazy sound
                const audio = new Audio('https://www.myinstants.com/media/sounds/epic-sax-guy-loop.mp3');
                audio.loop = true;
                audio.play();

                // Countdown display
                const countdown = document.createElement('div');
                countdown.style.position = 'fixed';
                countdown.style.top = '20px';
                countdown.style.right = '20px';
                countdown.style.fontSize = '24px';
                countdown.style.color = '#ff0';
                countdown.style.textShadow = '0 0 10px #f00';
                countdown.style.zIndex = '9999';
                document.body.appendChild(countdown);

                let timeLeft = 180; // 3 minutes in seconds
                const countdownInterval = setInterval(() => {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    countdown.textContent = `CHAOS MODE: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                    timeLeft--;

                    if (timeLeft < 0) {
                        clearInterval(countdownInterval);
                    }
                }, 1000);

                // Return to normal after 3 minutes and refresh
                setTimeout(() => {
                    // Clear all intervals
                    animations.forEach(interval => clearInterval(interval));
                    clearInterval(countdownInterval);
                    
                    // Remove effects
                    document.body.classList.remove('crazy-mode');
                    fire.remove();
                    countdown.remove();
                    elements.forEach(el => {
                        el.style.transform = '';
                        el.style.filter = '';
                        el.style.transition = '';
                    });
                    texts.forEach(text => {
                        text.style.animation = '';
                    });
                    audio.pause();
                    
                    this.print('Chaos mode deactivating...');
                    this.print('Preparing for system reboot...');
                    
                    // Add a short delay before refresh
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }, 180000); // 3 minutes = 180000 milliseconds
            },
            'nes': () => {
                this.print('Launching SNES Emulator...');
                this.print('Loading game library...');
                
                setTimeout(() => {
                    window.location.href = 'snes/index.html';
                }, 1500);
            }
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim().toLowerCase();
                this.input.value = '';
                
                // Execute the command
                this.executeCommand(command);
            }
        });

        // Logo click handler
        const logo = document.querySelector('.profile-card img');
        if (logo) {
            logo.addEventListener('click', () => this.handleLogoClick());
        }
    }

    handleLogoClick() {
        this.clickCount++;
        
        // Play beep sound
        const beep = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA==');
        beep.play();

        if (this.clickCount === 8) {
            // Add glitch effect to screen
            document.body.classList.add('screen-glitch');
            setTimeout(() => {
                document.body.classList.remove('screen-glitch');
                this.show();
            }, 300);
            this.clickCount = 0;
        }
    }

    show() {
        this.terminal.classList.remove('hidden');
        this.input.focus();
        this.print('ZarigataOS v1.0.0');
        this.print('Type "help" for available commands');
    }

    hide() {
        this.terminal.classList.add('hidden');
    }

    print(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    clear() {
        this.output.innerHTML = '';
    }

    showHelp() {
        this.print('Available commands:');
        this.print('  help    - Show this help message');
        this.print('  clear   - Clear the terminal');
        this.print('  ls      - List files');
        this.print('  echo    - Print text');
        this.print('  whoami  - Show current user');
        this.print('  exit    - Close terminal');
        this.print('  duke    - Play Duke Nukem 3D');
        this.print('  (CRAZY) - Enable chaos mode');
        this.print('  nes     - Play SNES Emulator');
    }

    listFiles() {
        this.print('index.html');
        this.print('style.css');
        this.print('script.js');
        this.print('ascii-art.txt');
    }

    echo(args) {
        this.print(args.join(' '));
    }

    executeCommand(commandLine) {
        const [cmd, ...args] = commandLine.split(' ');
        this.print(`root@zarigata:~$ ${commandLine}`);
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else if (cmd) {
            this.print(`Command not found: ${cmd}`);
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MiniTerminal();
});

// Music Player and UV Meter
class MusicPlayer {
    constructor() {
        this.tracks = [];
        
        // Initialize UI Elements
        this.initializeUIElements();
        
        // Create audio element
        this.audio = new Audio();
        this.audio.crossOrigin = "anonymous";
        this.audio.volume = 0.5;
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.audioContextInitialized = false;

        // Initialize
        this.setupDraggable();
        this.setupControls();
        
        // Load tracks and start player
        this.loadTrackList().then(() => {
            this.shuffleTracks();
            this.loadTrack(this.currentTrackIndex);
        });
    }

    initializeUIElements() {
        // Get DOM elements
        this.playerWindow = document.getElementById('uv-meter');
        this.canvas = document.getElementById('uv-canvas');
        this.canvasCtx = this.canvas.getContext('2d');
        this.trackNameElement = document.getElementById('track-name');
        this.playPauseBtn = document.getElementById('play-pause');
        this.prevBtn = document.getElementById('prev-track');
        this.nextBtn = document.getElementById('next-track');
        this.volumeSlider = document.getElementById('volume-slider');
        this.minimizeBtn = document.getElementById('minimize-player');
        this.closeBtn = document.getElementById('close-player');

        // Set initial canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        // Window controls
        this.closeBtn.addEventListener('click', () => {
            this.playerWindow.style.display = 'none';
            if (this.isPlaying) {
                this.togglePlay();
            }
        });

        this.minimizeBtn.addEventListener('click', () => {
            const container = this.playerWindow.querySelector('.uv-container');
            const controls = this.playerWindow.querySelector('.music-controls');
            if (container.style.display === 'none') {
                container.style.display = '';
                controls.style.display = '';
                this.playerWindow.style.height = '';
            } else {
                container.style.display = 'none';
                controls.style.display = 'none';
                this.playerWindow.style.height = 'auto';
            }
        });
    }

    async loadTrackList() {
        try {
            // First try loading from tracks.json
            const response = await fetch('tracks.json');
            if (!response.ok) {
                throw new Error('Failed to fetch track list');
            }
            
            this.tracks = await response.json();
            console.log(`Loaded ${this.tracks.length} tracks`);
            
            // Update current track index
            this.currentTrackIndex = Math.floor(Math.random() * this.tracks.length);
            
        } catch (error) {
            console.error('Error loading track list:', error);
            // Fallback to a default track if loading fails
            this.tracks = [{
                url: 'midi/ACME - Mental Delivrance (Keygen Song) [HQ].mp3',
                name: 'Mental Delivrance',
                artist: 'ACME'
            }];
        }
    }

    loadTrack(index) {
        try {
            this.currentTrackIndex = index;
            const track = this.tracks[index];
            
            console.log('Loading track:', track.url);
            
            // Update UI first
            this.trackNameElement.textContent = `${track.artist} - ${track.name}`;
            
            // Store current playing state
            const wasPlaying = this.isPlaying;
            
            // Load new track
            this.audio.src = track.url;
            this.audio.load();
            
            // If we were playing before, start playing the new track
            if (wasPlaying) {
                this.audio.play()
                    .then(() => {
                        this.isPlaying = true;
                        this.playPauseBtn.textContent = '⏸';
                    })
                    .catch(error => {
                        console.error('Error playing next track:', error);
                        this.nextTrack(); // Try next track if current fails
                    });
            }
        } catch (error) {
            console.error('Error loading track:', error);
            this.nextTrack();
        }
    }

    async togglePlay() {
        try {
            // Initialize audio context on first play
            if (!this.audioContextInitialized) {
                await this.initializeAudioContext();
            }

            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            if (this.isPlaying) {
                this.audio.pause();
                this.playPauseBtn.textContent = '▶';
                this.isPlaying = false;
            } else {
                const playPromise = this.audio.play();
                if (playPromise !== undefined) {
                    try {
                        await playPromise;
                        this.playPauseBtn.textContent = '⏸';
                        this.isPlaying = true;
                    } catch (error) {
                        console.error("Playback failed:", error);
                        this.nextTrack();
                    }
                }
            }
        } catch (error) {
            console.error('Toggle play error:', error);
        }
    }

    async initializeAudioContext() {
        if (this.audioContextInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            // Connect audio nodes
            this.source = this.audioContext.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            
            // Start UV meter animation
            this.setupUVMeter();
            
            this.audioContextInitialized = true;
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
        }
    }

    prevTrack() {
        const newIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(newIndex);
    }

    nextTrack() {
        const newIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.loadTrack(newIndex);
    }

    setupControls() {
        // Play/Pause
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous Track
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        
        // Next Track
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Volume Control
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value / 100;
        });
        
        // Track ended
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        // Audio error handling
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e.target.error);
            this.nextTrack();
        });

        // Debug listeners
        this.audio.addEventListener('playing', () => console.log('Audio started playing'));
        this.audio.addEventListener('pause', () => console.log('Audio paused'));
        this.audio.addEventListener('waiting', () => console.log('Audio waiting for data'));
        this.audio.addEventListener('canplay', () => console.log('Audio can start playing'));
    }

    setupUVMeter() {
        let lastTime = Date.now();
        let peakValues = new Array(32).fill(0);
        let peakDecay = 2;
        
        const drawMeter = () => {
            requestAnimationFrame(drawMeter);
            
            const width = this.canvas.width;
            const height = this.canvas.height;
            const barWidth = width / 32;
            const now = Date.now();
            const deltaTime = now - lastTime;
            lastTime = now;
            
            this.analyser.getByteFrequencyData(this.dataArray);
            
            // Clear canvas with a slight fade effect
            this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.canvasCtx.fillRect(0, 0, width, height);
            
            // Create multiple gradients for different effects
            const mainGradient = this.canvasCtx.createLinearGradient(0, height, 0, 0);
            mainGradient.addColorStop(0, '#ff0000');
            mainGradient.addColorStop(0.5, '#ffff00');
            mainGradient.addColorStop(1, '#00ff00');
            
            const peakGradient = this.canvasCtx.createLinearGradient(0, height, 0, 0);
            peakGradient.addColorStop(0, '#ff4444');
            peakGradient.addColorStop(0.5, '#ffff44');
            peakGradient.addColorStop(1, '#44ff44');
            
            // Draw frequency bars and peaks
            for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
                const value = this.dataArray[i];
                const barHeight = (value / 255) * height;
                
                // Update peak values
                if (barHeight > peakValues[i]) {
                    peakValues[i] = barHeight;
                } else {
                    peakValues[i] = Math.max(0, peakValues[i] - peakDecay);
                }
                
                // Draw main bar with glow effect
                this.canvasCtx.fillStyle = mainGradient;
                this.canvasCtx.shadowBlur = 15;
                this.canvasCtx.shadowColor = `hsl(${(i * 360 / 32) % 360}, 100%, 50%)`;
                this.canvasCtx.fillRect(
                    i * barWidth,
                    height - barHeight,
                    barWidth - 1,
                    barHeight
                );
                
                // Draw peak marker
                this.canvasCtx.fillStyle = peakGradient;
                this.canvasCtx.shadowBlur = 10;
                this.canvasCtx.fillRect(
                    i * barWidth,
                    height - peakValues[i] - 2,
                    barWidth - 1,
                    4
                );
            }
            
            // Reset shadow effect
            this.canvasCtx.shadowBlur = 0;
            
            // Add scan line effect
            const scanLinePos = (Date.now() % 1000) / 1000 * height;
            const scanGradient = this.canvasCtx.createLinearGradient(0, scanLinePos - 5, 0, scanLinePos + 5);
            scanGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            scanGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
            scanGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.canvasCtx.fillStyle = scanGradient;
            this.canvasCtx.fillRect(0, scanLinePos - 5, width, 10);
            
            // Add grid effect
            this.canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            this.canvasCtx.lineWidth = 1;
            
            // Vertical grid lines
            for (let i = 0; i < width; i += barWidth * 2) {
                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(i, 0);
                this.canvasCtx.lineTo(i, height);
                this.canvasCtx.stroke();
            }
            
            // Horizontal grid lines
            for (let i = 0; i < height; i += height / 8) {
                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(0, i);
                this.canvasCtx.lineTo(width, i);
                this.canvasCtx.stroke();
            }
        };
        
        drawMeter();
    }

    shuffleTracks() {
        for (let i = this.tracks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
        }
    }

    setupDraggable() {
        const titleBar = this.playerWindow.querySelector('.title-bar');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        const dragStart = (e) => {
            if (e.target === titleBar || e.target.parentElement === titleBar) {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                isDragging = true;
            }
        };

        const dragEnd = () => {
            isDragging = false;
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                
                this.playerWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        };

        titleBar.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
