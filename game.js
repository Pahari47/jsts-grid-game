
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
}