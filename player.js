let playerCounter = 0;

export default class Player {
    constructor(name) {
        this.name = name;
        this.x = null;
        this.y = null;
        this.isEliminated = false;
    }

    static create() {
        const name = String.fromCharCode(65 + playerCounter++);
        return new Player(name);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    moveToward(destX, destY) {
        if(this.isEliminated) return;

        const dx = destX - this.x;
        const dy = destY - this.y;

        this.x += Math.sign(dx);
        this.y += Math.sign(dy);
    }
}