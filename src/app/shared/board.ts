import { Cell } from './cell'

export class Board {
    cells: Cell[][];
    width: number;
    height: number;
    cellsFlattened: Cell[];

    constructor(width: number, height: number, minesLocations: number[][]) {
        this.width = width;
        this.height = height;
        this.createCells();
        this.addMines(minesLocations);
    }

    createCells(): void {
        this.cells = [];
        for (var i = 0; i < this.height; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.width; j++)
                this.cells[i][j] = new Cell(false, i, j);



        }
        this.cellsFlattened = [];
        this.cellsFlattened = this.cellsFlattened.concat.apply([], this.cells);
    }

    addMines(minesLocations: number[][]) {
        minesLocations.forEach(mine => {
            this.cells[mine[0]][mine[1]].mine = true;
            this.setProximity(mine[0], mine[1]);
        });
    }

    setProximity(row: number, column: number): void {

        for (var i = Math.max(row - 1, 0); i < Math.min(this.height, row + 2); i++)
            for (var j = Math.max(column - 1, 0); j < Math.min(this.width, column + 2); j++)
                this.cells[i][j].proximity++;
    }
}



