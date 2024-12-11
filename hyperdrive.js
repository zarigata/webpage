class HyperdriveBackground {
    constructor() {
        this.canvas = document.createElement('pre');
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; margin: 0; background: black; color: cyan; font-family: monospace; overflow: hidden; z-index: -1;';
        document.body.appendChild(this.canvas);
        
        this.width = Math.floor(window.innerWidth / 8);
        this.height = Math.floor(window.innerHeight / 16);
        this.stars = [];
        this.ships = [];
        this.shipDesigns = [
            '>--|==>', 
            '>==>',
            '<==|--<',
            '<=<'
        ];
        
        this.initStars();
        this.animate = this.animate.bind(this);
        this.addRandomShip = this.addRandomShip.bind(this);
        
        window.addEventListener('resize', () => {
            this.width = Math.floor(window.innerWidth / 8);
            this.height = Math.floor(window.innerHeight / 16);
            this.initStars();
        });
        
        setInterval(this.addRandomShip, 5000);
        requestAnimationFrame(this.animate);
    }
    
    initStars() {
        this.stars = [];
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                speed: 0.5 + Math.random() * 2,
                char: ['*', '.', '+', '·'][Math.floor(Math.random() * 4)]
            });
        }
    }
    
    addRandomShip() {
        if (Math.random() > 0.7) {
            const design = this.shipDesigns[Math.floor(Math.random() * this.shipDesigns.length)];
            const isLeftToRight = design.startsWith('>');
            
            this.ships.push({
                x: isLeftToRight ? -design.length : this.width,
                y: Math.random() * this.height,
                speed: 1 + Math.random() * 3,
                design: design,
                direction: isLeftToRight ? 1 : -1
            });
        }
    }
    
    animate() {
        let screen = Array(this.height).fill().map(() => Array(this.width).fill(' '));
        
        // Update and draw stars
        for (let star of this.stars) {
            star.x += star.speed;
            if (star.x >= this.width) {
                star.x = 0;
                star.y = Math.random() * this.height;
            }
            
            const x = Math.floor(star.x);
            const y = Math.floor(star.y);
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                screen[y][x] = star.char;
            }
        }
        
        // Update and draw ships
        this.ships = this.ships.filter(ship => {
            ship.x += ship.speed * ship.direction;
            
            const x = Math.floor(ship.x);
            const y = Math.floor(ship.y);
            
            if (x < -ship.design.length || x > this.width) {
                return false;
            }
            
            for (let i = 0; i < ship.design.length; i++) {
                const drawX = x + i;
                if (drawX >= 0 && drawX < this.width && y >= 0 && y < this.height) {
                    screen[y][drawX] = ship.design[i];
                }
            }
            
            return true;
        });
        
        // Render the screen
        this.canvas.textContent = screen.map(row => row.join('')).join('\n');
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize the hyperdrive background
const hyperdrive = new HyperdriveBackground();
