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
}