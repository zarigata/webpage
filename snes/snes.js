class SNESEmulator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 256;
        this.canvas.height = 240;
        document.getElementById('emulator').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.imageData = this.ctx.createImageData(256, 240);

        this.gameSelect = document.getElementById('game-select');
        this.gameSelect.addEventListener('change', () => this.loadSelectedGame());

        this.audioEnabled = false;
        this.audioBuffer = [];
        this.setupAudio();
        this.loadGameList();
    }

    setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioEnabled = true;
            
            // Modern audio handling using AudioWorklet when possible
            if (this.audioContext.audioWorklet) {
                this.setupModernAudio();
            } else {
                this.setupLegacyAudio();
            }
        } catch (e) {
            console.warn('Audio initialization failed:', e);
            this.audioEnabled = false;
        }
    }

    async setupModernAudio() {
        try {
            await this.audioContext.audioWorklet.addModule('audio-processor.js');
            const node = new AudioWorkletNode(this.audioContext, 'snes-audio-processor');
            node.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('AudioWorklet setup failed, falling back to ScriptProcessor:', e);
            this.setupLegacyAudio();
        }
    }

    setupLegacyAudio() {
        if (!this.audioEnabled) return;
        
        const bufferSize = 2048;
        this.scriptProcessor = this.audioContext.createScriptProcessor(bufferSize, 0, 2);
        this.scriptProcessor.onaudioprocess = (e) => {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);
            
            for (let i = 0; i < bufferSize; i++) {
                if (this.audioBuffer.length > 0) {
                    outputL[i] = this.audioBuffer.shift() || 0;
                    outputR[i] = this.audioBuffer.shift() || 0;
                } else {
                    outputL[i] = 0;
                    outputR[i] = 0;
                }
            }
        };
        this.scriptProcessor.connect(this.audioContext.destination);
    }

    onAudioSample(left, right) {
        if (!this.audioEnabled) return;
        this.audioBuffer.push(left);
        this.audioBuffer.push(right);
        
        // Prevent buffer from growing too large
        while (this.audioBuffer.length > 4096) {
            this.audioBuffer.shift();
        }
    }

    loadGameList() {
        // Clear existing options
        while (this.gameSelect.firstChild) {
            this.gameSelect.removeChild(this.gameSelect.firstChild);
        }

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a game...';
        this.gameSelect.appendChild(defaultOption);

        // Add message about adding ROMs
        const messageOption = document.createElement('option');
        messageOption.value = '';
        messageOption.textContent = '(Add your ROM files to the roms directory)';
        messageOption.disabled = true;
        this.gameSelect.appendChild(messageOption);
    }

    async loadSelectedGame() {
        const gameFile = this.gameSelect.value;
        if (!gameFile) return;

        try {
            const response = await fetch(`roms/${gameFile}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const romData = new Uint8Array(arrayBuffer);
            
            // Basic ROM validation
            if (romData.length < 16 || romData[0] !== 0x4E || romData[1] !== 0x45 || romData[2] !== 0x53 || romData[3] !== 0x1A) {
                throw new Error('Not a valid NES ROM.');
            }

            this.startEmulation(romData);
        } catch (error) {
            console.error('Error loading ROM:', error);
            const errorMsg = document.createElement('div');
            errorMsg.textContent = `Error: ${error.message}. Please add ROM files to the roms directory.`;
            errorMsg.style.color = 'red';
            errorMsg.style.marginTop = '10px';
            document.getElementById('emulator').appendChild(errorMsg);
        }
    }

    startEmulation(romData) {
        // Clear any previous error messages
        const emulator = document.getElementById('emulator');
        Array.from(emulator.children).forEach(child => {
            if (child !== this.canvas) {
                emulator.removeChild(child);
            }
        });

        // Display a message about ROM support
        const message = document.createElement('div');
        message.textContent = 'ROM loaded successfully! Note: This is a demonstration. For full SNES emulation, please add your own ROM files.';
        message.style.marginTop = '10px';
        message.style.padding = '10px';
        message.style.backgroundColor = 'rgba(107, 70, 193, 0.2)';
        message.style.borderRadius = '5px';
        emulator.appendChild(message);
    }
}

// Initialize emulator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SNESEmulator();
});
