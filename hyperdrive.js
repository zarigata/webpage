```javascript
class HyperdriveBackground {
    constructor() {
        this.canvas = document.createElement('pre');
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; margin: 0; background: black; color: #00ff00; font-family: "Courier New", monospace; overflow: hidden; z-index: -1; pointer-events: none; white-space: pre;';
        document.body.appendChild(this.canvas);
        
        // Character dimensions (approximate for monospace)
        this.charWidth = 9.6;
        this.charHeight = 18;
        
        this.resize();
        this.stars = [];
        this.ships = [];
        // Simple, retro ASCII ships
        this.shipDesigns = [
            '>-=>', 
            '>=>',
            '<=<',
            '<=--',
            '[-]',
            '<*>',
            '(=>'
        ];
        
        this.initStars();
        this.animate = this.animate.bind(this);
        this.addRandomShip = this.addRandomShip.bind(this);
        
        window.addEventListener('resize', () => {
            this.resize();
            this.initStars();
        });
        
        setInterval(this.addRandomShip, 2000);
        requestAnimationFrame(this.animate);
    }

    resize() {
        this.width = Math.ceil(window.innerWidth / this.charWidth) + 2;
        this.height = Math.ceil(window.innerHeight / this.charHeight) + 2;
    }
    
    initStars() {
        this.stars = [];
        const starCount = Math.floor((this.width * this.height) * 0.02); 
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: 0.2 + Math.random() * 1.0,
                baseChar: ['.', '·', '`'][Math.floor(Math.random() * 3)],
char: '.'
            });
        }
    }

addRandomShip() {
    if (Math.random() > 0.5) {
        const design = this.shipDesigns[Math.floor(Math.random() * this.shipDesigns.length)];
        const isLeftToRight = Math.random() > 0.5;

        let finalDesign = design;
        if (!isLeftToRight) {
            finalDesign = design.split('').reverse().join('')
                .replace(/>/g, 'TEMP').replace(/</g, '>').replace(/TEMP/g, '<')
                .replace(/\)/g, 'TEMP').replace(/\(/g, ')').replace(/TEMP/g, '(')
                .replace(/\]/g, 'TEMP').replace(/\[/g, ']').replace(/TEMP/g, '[');
        }

        this.ships.push({
            x: isLeftToRight ? -finalDesign.length : this.width,
            y: Math.floor(Math.random() * this.height),
            speed: 1.0 + Math.random() * 2.0,
            design: finalDesign,
            direction: isLeftToRight ? 1 : -1,
            color: '#00ff00' // Consistent retro green
        });
    }
}

getAudioData() {
    if (window.musicPlayer && window.musicPlayer.analyser && window.musicPlayer.isPlaying) {
        const dataArray = new Uint8Array(window.musicPlayer.analyser.frequencyBinCount);
        window.musicPlayer.analyser.getByteFrequencyData(dataArray);

        let bassSum = 0;
        const bassRange = 10;
        for (let i = 0; i < bassRange; i++) {
            bassSum += dataArray[i];
        }
        const bassAvg = bassSum / bassRange;

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
    // Subtle shake
    const shakeIntensity = audioData.bass * 1.5;
    const sizeIntensity = audioData.volume;

    let screen = Array(this.height).fill().map(() => Array(this.width).fill(' '));

    for (let star of this.stars) {
        star.x += star.speed + (audioData.bass * 1.0);
        if (star.x >= this.width) {
            star.x = 0;
            star.y = Math.random() * this.height;
        }

        let renderX = star.x + (Math.random() - 0.5) * shakeIntensity;
        let renderY = star.y + (Math.random() - 0.5) * shakeIntensity;

        const x = Math.floor(renderX);
        const y = Math.floor(renderY);

        // Retro character scaling
        if (sizeIntensity > 0.8) star.char = '+';
        else if (sizeIntensity > 0.6) star.char = '*';
        else if (sizeIntensity > 0.4) star.char = '.';
        else star.char = star.baseChar;

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            screen[y][x] = star.char;
        }
    }

    this.ships = this.ships.filter(ship => {
        ship.x += (ship.speed + audioData.bass) * ship.direction;

        const x = Math.floor(ship.x);
        const y = Math.floor(ship.y);

        if (x < -ship.design.length - 5 || x > this.width + 5) {
            return false;
        }

        for (let i = 0; i < ship.design.length; i++) {
            const drawX = x + i;
            const shakeY = Math.floor(y + (Math.random() - 0.5) * shakeIntensity);

            if (drawX >= 0 && drawX < this.width && shakeY >= 0 && shakeY < this.height) {
                screen[shakeY][drawX] = ship.design[i];
            }
        }

        return true;
    });

    this.canvas.textContent = screen.map(row => row.join('')).join('\n');

    // Subtle brightness pulse instead of color shift
    if (audioData.bass > 0.6) {
        this.canvas.style.textShadow = '0 0 4px #00ff00';
    } else {
        this.canvas.style.textShadow = 'none';
    }

    requestAnimationFrame(this.animate);
}
}

const hyperdrive = new HyperdriveBackground();
```
