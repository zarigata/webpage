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

        // Initialize audio state
        this.audioInitialized = false;
        this.audioBuffer = [];
        this.audioContext = null;
        this.scriptProcessor = null;

        // Initialize emulator state
        this.loadGameList();
        
        // Add a message about adding ROMs
        this.showInitialMessage();
    }

    showInitialMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="padding: 20px; background: rgba(107, 70, 193, 0.2); border-radius: 5px; margin-top: 20px;">
                <h3 style="margin-top: 0;">Welcome to SNES Emulator</h3>
                <p>To get started:</p>
                <ol>
                    <li>Create a 'roms' directory in the SNES folder</li>
                    <li>Add your ROM files to the directory</li>
                    <li>Select a game from the dropdown menu</li>
                </ol>
            </div>
        `;
        document.getElementById('emulator').appendChild(message);
    }

    initAudio() {
        if (this.audioInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a gain node to control volume
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = 0.5; // Set initial volume
            this.gainNode.connect(this.audioContext.destination);

            // Only create ScriptProcessor if needed
            if (!this.audioContext.audioWorklet) {
                console.log('AudioWorklet not supported, using ScriptProcessor');
                this.initScriptProcessor();
            }

            this.audioInitialized = true;
        } catch (e) {
            console.warn('Audio initialization failed:', e);
        }
    }

    initScriptProcessor() {
        if (!this.audioContext) return;

        const bufferSize = 2048;
        this.scriptProcessor = this.audioContext.createScriptProcessor(bufferSize, 0, 2);
        
        this.scriptProcessor.onaudioprocess = (e) => {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);
            
            // Fill output buffers with silence
            for (let i = 0; i < outputL.length; i++) {
                outputL[i] = 0;
                outputR[i] = 0;
            }
        };

        this.scriptProcessor.connect(this.gainNode);
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
            // Initialize audio on user interaction
            this.initAudio();

            const response = await fetch(`roms/${gameFile}`);
            if (!response.ok) {
                throw new Error(`Failed to load ROM file. Make sure to add ROM files to the 'roms' directory.`);
            }

            // Clear previous messages
            const emulator = document.getElementById('emulator');
            while (emulator.firstChild) {
                if (emulator.firstChild === this.canvas) {
                    emulator.firstChild.style.display = 'none';
                } else {
                    emulator.removeChild(emulator.firstChild);
                }
            }

            // Show loading message
            const message = document.createElement('div');
            message.style.padding = '20px';
            message.style.background = 'rgba(107, 70, 193, 0.2)';
            message.style.borderRadius = '5px';
            message.style.marginTop = '20px';
            message.textContent = 'ROM loaded successfully! Note: This is a demonstration interface. Add your ROM files to enable full emulation.';
            emulator.appendChild(message);

        } catch (error) {
            console.error('Error:', error);
            const errorMsg = document.createElement('div');
            errorMsg.style.color = '#ff4444';
            errorMsg.style.padding = '20px';
            errorMsg.style.background = 'rgba(255, 0, 0, 0.1)';
            errorMsg.style.borderRadius = '5px';
            errorMsg.style.marginTop = '20px';
            errorMsg.textContent = error.message;
            document.getElementById('emulator').appendChild(errorMsg);
        }
    }
}

// Initialize emulator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SNESEmulator();
});
