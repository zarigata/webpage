class SNESEmulator {
    constructor() {
        this.nes = new jsnes.NES({
            onFrame: this.onFrame.bind(this),
            onAudioSample: this.onAudioSample.bind(this)
        });

        this.canvas = document.createElement('canvas');
        this.canvas.width = 256;
        this.canvas.height = 240;
        document.getElementById('emulator').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData(256, 240);

        this.gameSelect = document.getElementById('game-select');
        this.gameSelect.addEventListener('change', this.loadSelectedGame.bind(this));

        this.setupAudio();
        this.setupControls();
        this.loadGameList();
    }

    onFrame(frameBuffer) {
        for (let i = 0; i < frameBuffer.length; i++) {
            this.imageData.data[i * 4 + 0] = (frameBuffer[i] >> 16) & 0xFF;
            this.imageData.data[i * 4 + 1] = (frameBuffer[i] >> 8) & 0xFF;
            this.imageData.data[i * 4 + 2] = frameBuffer[i] & 0xFF;
            this.imageData.data[i * 4 + 3] = 0xFF;
        }
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    setupAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.scriptProcessor = this.audioContext.createScriptProcessor(1024, 0, 2);
        this.scriptProcessor.onaudioprocess = this.onAudioProcess.bind(this);
        this.scriptProcessor.connect(this.audioContext.destination);
    }

    onAudioSample(left, right) {
        this.audioBuffer.push(left);
        this.audioBuffer.push(right);
    }

    onAudioProcess(e) {
        const leftBuffer = e.outputBuffer.getChannelData(0);
        const rightBuffer = e.outputBuffer.getChannelData(1);
        
        for (let i = 0; i < leftBuffer.length; i++) {
            leftBuffer[i] = this.audioBuffer[i * 2] || 0;
            rightBuffer[i] = this.audioBuffer[i * 2 + 1] || 0;
        }
        
        this.audioBuffer = this.audioBuffer.slice(leftBuffer.length * 2);
    }

    setupControls() {
        const keyMap = {
            'ArrowUp': jsnes.Controller.BUTTON_UP,
            'ArrowDown': jsnes.Controller.BUTTON_DOWN,
            'ArrowLeft': jsnes.Controller.BUTTON_LEFT,
            'ArrowRight': jsnes.Controller.BUTTON_RIGHT,
            'x': jsnes.Controller.BUTTON_A,
            'z': jsnes.Controller.BUTTON_B,
            'Enter': jsnes.Controller.BUTTON_START,
            'Shift': jsnes.Controller.BUTTON_SELECT,
        };

        document.addEventListener('keydown', (e) => {
            if (keyMap[e.key]) {
                this.nes.buttonDown(1, keyMap[e.key]);
            }
        });

        document.addEventListener('keyup', (e) => {
            if (keyMap[e.key]) {
                this.nes.buttonUp(1, keyMap[e.key]);
            }
        });
    }

    async loadGameList() {
        // In a real implementation, this would scan a directory of ROM files
        // For now, we'll use a placeholder list
        const games = [
            { name: 'Super Mario World', file: 'mario.nes' },
            { name: 'The Legend of Zelda', file: 'zelda.nes' }
        ];

        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game.file;
            option.textContent = game.name;
            this.gameSelect.appendChild(option);
        });
    }

    async loadSelectedGame() {
        const gameFile = this.gameSelect.value;
        if (!gameFile) return;

        try {
            const response = await fetch(`roms/${gameFile}`);
            const arrayBuffer = await response.arrayBuffer();
            const romData = new Uint8Array(arrayBuffer);
            this.nes.loadROM(romData);
            this.start();
        } catch (error) {
            console.error('Error loading ROM:', error);
        }
    }

    start() {
        this.audioBuffer = [];
        this.running = true;
        this.frame();
    }

    frame() {
        if (this.running) {
            this.nes.frame();
            requestAnimationFrame(() => this.frame());
        }
    }
}

// Initialize emulator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SNESEmulator();
});
