import readline from "readline";

export default class Game {
    constructor(id, rows, cols) {
        this.id = id;
        this.rows = rows;
        this.cols = cols;
        this.players = [];
        this.turn = 0;
        this.isOver = false;
        this.destination = this.getRandomEmptySpot();
    }

    static gameCounter = 1;

    static create(rows, cols) {
        return new Game(this.gameCounter++, rows, cols);
    }

    getRandomEmptySpot() {
        let x, y;
        while (true) {
            x = Math.floor(Math.random() * this.rows);
            y = Math.floor(Math.random() * this.cols);
            
            if(!this.players.some(p => p.x === x && p.y === y)) {
                return [x, y];
            }
        }
    }

    addPlayer(player) {
        const [x, y] = this.getRandomEmptySpot();
        player.setPosition(x, y);
        this.players.push(player);
    }

    drawGrid() {
        const grid = Array.from({length: this.rows}, () => 
            Array(this.cols).fill("_")
        );

        for(const p of this.players) {
            if(!p.isEliminated) grid[p.x][p.y] = p.name;
        }

        const [dx, dy] = this.destination;
        grid[dx][dy] = "x";

        return grid.map(row => row.join(" ")).join("\n");
    }

    checkCollisions() {
        const posMap = new Map();

        for(const p of this.players) {
            if(p.isEliminated) continue;
            const key = `${p.x},${p.y}`;
            if(posMap.has(key)) {
                const other = posMap.get(key);
                p.isEliminated = true;
                other.isEliminated = true;
            } else {
                posMap.set(key, p);
            }
        }
    }

    checkWin() {
        for(const p of this.players) {
            if(!p.isEliminated && p.x === this.destination[0] && p.y === this.destination[1]) {
                console.log(`\n Player ${p.name} wins Game 0${this.id}!\n`);
                this.isOver = true;
                return true;
            }
        }
        return false;
    }

    async start() {
        console.log(`\n Game 0${this.id} Turn ${String(this.turn + 1).padStart(3, "0")}:\n`);
        console.log(this.drawGrid());

        const interval = setInterval(() => {
            if(this.isOver) {
                clearInterval(interval);
                return;
            }
            
            this.turn++;
            for(const p of this.players) {
                p.moveToward(...this.destination);
            }

            this.checkCollisions();

            console.log(`\nGame 0${this.id} Turn ${String(this.turn + 1).padStart(3, "0")}:\n`);
            console.log(this.drawGrid());

            if(this.checkWin()) {
                clearInterval(interval);
            }
        }, 5000);
    }
}