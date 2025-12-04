class HyperdriveBackground {
    constructor() {
        this.canvas = document.createElement('pre');
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; margin: 0; background: black; color: cyan; font-family: monospace; overflow: hidden; z-index: -1; pointer-events: none; white-space: pre;';
        document.body.appendChild(this.canvas);

        // Character dimensions (approximate for monospace)
        this.charWidth = 9.6;  // approximate width in px
        this.charHeight = 18;  // approximate height in px

        this.resize();
        this.stars = [];
        this.ships = [];
        this.shipDesigns = [
            '>--|==>',
            '>==>',
            '<==|--<',
            '<=<',
            '[-_-]',
            '<|*|>',
            '(=)=>'
        ];

        this.initStars();
        this.animate = this.animate.bind(this);
        this.addRandomShip = this.addRandomShip.bind(this);

        window.addEventListener('resize', () => {
            this.resize();
            this.initStars();
        });

        // More frequent ships
        setInterval(this.addRandomShip, 1000);
        requestAnimationFrame(this.animate);
    }

    resize() {
        // Calculate dimensions with a buffer to ensure full coverage
        this.width = Math.ceil(window.innerWidth / this.charWidth) + 2;
        this.height = Math.ceil(window.innerHeight / this.charHeight) + 2;
    }

    initStars() {
        this.stars = [];
        // Increase star density
        const starCount = Math.floor((this.width * this.height) * 0.02);
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: 0.2 + Math.random() * 1.5,
                baseChar: ['*', '.', '+', '·'][Math.floor(Math.random() * 4)],
                char: '.'
            });
        }
    }

    addRandomShip() {
        // Higher probability of spawn
        if (Math.random() > 0.4) {
            const design = this.shipDesigns[Math.floor(Math.random() * this.shipDesigns.length)];
            const isLeftToRight = Math.random() > 0.5;

            // If design has directionality (arrows), flip it if needed
            let finalDesign = design;
            if (!isLeftToRight) {
                // Simple reverse for now, could be better
                finalDesign = design.split('').reverse().join('')
                    .replace(/>/g, 'TEMP').replace(/</g, '>').replace(/TEMP/g, '<')
                    .replace(/\)/g, 'TEMP').replace(/\(/g, ')').replace(/TEMP/g, '(')
                    .replace(/\]/g, 'TEMP').replace(/\[/g, ']').replace(/TEMP/g, '[');
            }

            this.ships.push({
                x: isLeftToRight ? -finalDesign.length : this.width,
                y: Math.floor(Math.random() * this.height),
                speed: 0.5 + Math.random() * 2,
                design: finalDesign,
                direction: isLeftToRight ? 1 : -1,
                color: Math.random() > 0.8 ? '#ff00ff' : 'cyan' // Occasional different colored ships
            });
        }
    }

    getAudioData() {
        if (window.musicPlayer && window.musicPlayer.analyser && window.musicPlayer.isPlaying) {
            const dataArray = new Uint8Array(window.musicPlayer.analyser.frequencyBinCount);
            window.musicPlayer.analyser.getByteFrequencyData(dataArray);

            // Calculate average volume for bass (low frequencies)
            let bassSum = 0;
            const bassRange = 10; // First 10 bins
            for (let i = 0; i < bassRange; i++) {
                bassSum += dataArray[i];
            }
            const bassAvg = bassSum / bassRange;

            // Calculate overall volume
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const avg = sum / dataArray.length;

            return { bass: bassAvg / 255, volume: avg / 255 };
        }
        return { bass: 0, volume: 0 };
    }

    animate() {
        const audioData = this.getAudioData();
        const shakeIntensity = audioData.bass * 2; // Shake based on bass
        const sizeIntensity = audioData.volume;

        // Create screen buffer
        let screen = Array(this.height).fill().map(() => Array(this.width).fill(' '));

        // Update and draw stars
        for (let star of this.stars) {
            star.x += star.speed + (audioData.bass * 2); // Speed up with bass
            if (star.x >= this.width) {
                star.x = 0;
                star.y = Math.random() * this.height;
            }

            // Apply shake
            let renderX = star.x + (Math.random() - 0.5) * shakeIntensity;
            let renderY = star.y + (Math.random() - 0.5) * shakeIntensity;

            const x = Math.floor(renderX);
            const y = Math.floor(renderY);

            // Determine character based on audio intensity
            if (sizeIntensity > 0.8) star.char = '@';
            else if (sizeIntensity > 0.6) star.char = '#';
            else if (sizeIntensity > 0.4) star.char = 'O';
            else if (sizeIntensity > 0.2) star.char = '*';
            else star.char = star.baseChar;

            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                screen[y][x] = star.char;
            }
        }

        // Update and draw ships
        this.ships = this.ships.filter(ship => {
            ship.x += (ship.speed + audioData.bass) * ship.direction; // Ships also speed up

            const x = Math.floor(ship.x);
            const y = Math.floor(ship.y);

            if (x < -ship.design.length - 5 || x > this.width + 5) {
                return false;
            }

            for (let i = 0; i < ship.design.length; i++) {
                const drawX = x + i;
                // Apply shake to ships too
                const shakeY = Math.floor(y + (Math.random() - 0.5) * shakeIntensity);

                if (drawX >= 0 && drawX < this.width && shakeY >= 0 && shakeY < this.height) {
                    screen[shakeY][drawX] = ship.design[i];
                }
            }

            return true;
        });

        // Render the screen
        this.canvas.textContent = screen.map(row => row.join('')).join('\n');

        // Dynamic color based on intensity
        if (audioData.bass > 0.5) {
            const hue = (Date.now() / 20) % 360;
            this.canvas.style.color = `hsl(${hue}, 100%, 50%)`;
            this.canvas.style.textShadow = `0 0 5px hsl(${hue}, 100%, 50%)`;
        } else {
            this.canvas.style.color = 'cyan';
            this.canvas.style.textShadow = 'none';
        }

        requestAnimationFrame(this.animate);
    }
}

// Initialize the hyperdrive background
const hyperdrive = new HyperdriveBackground();

