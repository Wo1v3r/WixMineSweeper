import { Cell } from './cell'

export class Board {
    cellsFlattened: Cell[];
    cells: Cell[][];
    width: number = 10;
    height: number = 10;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        
        this.cells = [];
        for (var i = 0; i < height; i++) {
            this.cells[i] = [];
            for (var j = 0; j < width; j++) {
                this.cells[i][j] = new Cell(false);

            }
        }
        
        console.log(this.cells);
        //For display purposes
        this.cellsFlattened = [].concat.apply([],this.cells);
        console.log(this.cellsFlattened);

    }

}