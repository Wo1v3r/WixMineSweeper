import { Board } from './board';
import { Cell } from './cell';

export class Game {
    won: boolean = false;
    superMod: boolean = false;
    flagsUsed: number = 0;
    minesFlagged: number = 0;
    steps: number = 0;

    board: Board;
    flags: number;
    mines: number;

    constructor(width: number, height: number) {
        this.board = new Board(width, height);
        this.mines = Math.floor(height * width * 0.15) | 1;
        this.flags = Math.floor(height * width * 0.20) | 2;
        this.addMines();
        this.setProximity();
    }

    addMines(): void {
        console.log(this.mines);
        for (var i = 0; i < this.mines; i++) {
            do {
                var randRow: number = Math.floor(Math.random() * this.board.width);
                var randCol: number = Math.floor(Math.random() * this.board.height);
            } while (this.board.cells[randRow][randCol].mine);
            this.board.cells[randRow][randCol].mine = true;
            this.board.cells[randRow][randCol].proximity = 'X';

        }
    }

    setProximity(): void {
        for (var i = 0; i < this.board.height; i++) {
            for (var j = 0; j < this.board.width; j++) {
                let cell = this.board.cells[i][j];
                if (cell.mine) continue;
                for (var k = Math.max(i - 1, 0); k < Math.min(this.board.height, i + 2); k++)
                    for (var w = Math.max(j - 1, 0); w < Math.min(this.board.width, j + 2); w++)
                        if (this.board.cells[k][w].mine) cell.proximity++;

            }
        }
    }

    toggleFlag(cell: Cell) {
        if (cell.flag) {
            cell.flag = false;
            this.flagsUsed--;
            if (cell.mine) this.minesFlagged--;

        }
        else if (this.flagsUsed < this.flags) {
            cell.flag = true;
            this.flagsUsed++;

            if (cell.mine) this.minesFlagged++;
            if (this.mines == this.minesFlagged) this.won = true;

        }
    }
    expandZeroProximity(zeroCell: Cell): void {
        //Recursion Guard

        if (zeroCell == undefined || zeroCell.proximity !== 0) return;
        zeroCell.show = true;
        var index = this.board.cellsFlattened.indexOf(zeroCell);
        //Transferring from flattened index to 2D indicies
        const row = Math.floor(index / this.board.height), column = Math.floor(index % this.board.width);

        console.log(row, column);
        //Checking along the axises for adjecent zeros , checking proximity to lower stack overhead
        if (row > 0) {
            var cellTop = this.board.cells[row - 1][column];

            if (!cellTop.show && cellTop.proximity === 0)
                this.expandZeroProximity(cellTop);

            cellTop.show = true;

            if (column > 0) {
                var cellTopLeft = this.board.cells[row - 1][column - 1];

                if (!cellTopLeft.show && cellTopLeft.proximity === 0)
                    this.expandZeroProximity(cellTopLeft);

                cellTopLeft.show = true; //Showing top left
            }

        }

        if (row < this.board.height - 1) {
            var cellBottom = this.board.cells[row + 1][column];

            if (!cellBottom.show && cellBottom.proximity === 0)
                this.expandZeroProximity(cellBottom);

            cellBottom.show = true;

            if (column < this.board.width - 1) {
                var cellBottomRight = this.board.cells[row + 1][column + 1];
                if (!cellBottomRight.show && cellBottomRight.proximity === 0)
                    this.expandZeroProximity(cellBottomRight);
                cellBottomRight.show = true; //Showing bottom right

            }

        }
        if (column > 0) {
            var cellLeft = this.board.cells[row][column - 1];
            if (!cellLeft.show && cellLeft.proximity === 0)
                this.expandZeroProximity(cellLeft);

            cellLeft.show = true;

            if (row < this.board.height - 1) {
                var cellBottomLeft = this.board.cells[row + 1][column - 1];
                if (!cellBottomLeft.show && cellBottomLeft.proximity === 0)
                    this.expandZeroProximity(cellBottomLeft);
                cellBottomLeft.show = true; //Showing bottom left


            }



        }
        if (column < this.board.width - 1) {
            var cellRight = this.board.cells[row][column + 1];
            if (!cellRight.show && cellRight.proximity === 0)
                this.expandZeroProximity(cellRight);

            cellRight.show = true;


            if (row > 0) {
                var cellTopRight = this.board.cells[row - 1][column + 1];
                if (!cellTopRight.show && cellTopRight.proximity === 0)
                    this.expandZeroProximity(cellTopRight);
                cellTopRight.show = true; //Showing top right
            }
        }

    }

}



