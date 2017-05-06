import { Board } from './board';
import { Cell } from './cell';

export class Game {
    won: boolean = false;
    lost: boolean = false;
    superMod: boolean = false;
    flagsUsed: number = 0;
    minesFlagged: number = 0;
    steps: number = 0;

    board: Board;
    flags: number;
    mines: number;

    constructor(width: number, height: number, mines: number) {
        this.board = new Board(width, height);
        this.mines = mines;
        this.flags = mines + 1;
        this.addMines();
        this.setProximity();
    }

    addMines(): void {
        console.log(this.mines);
        for (var i = 0; i < this.mines; i++) {
            do {
                var randRow: number = Math.floor(Math.random() * this.board.height);
                var randCol: number = Math.floor(Math.random() * this.board.width);
            } while (this.board.cells[randRow][randCol].mine);
            this.board.cells[randRow][randCol].mine = true;
            this.board.cells[randRow][randCol].proximity = '';

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
        if (cell.show) {
            alert("You can't add a flag to that cell!");
            return;
        }

        if (cell.flag) {
            cell.flag = false;
            this.flagsUsed--;
            if (cell.mine) this.minesFlagged--;

        }
        else if (!cell.show && this.flagsUsed < this.flags) {
            cell.flag = true;
            this.flagsUsed++;

            if (cell.mine) this.minesFlagged++;
            if (this.mines == this.minesFlagged) this.won = true;

        }
        else alert("You don't have any flags left :( ");
    }




    // expandZeroProximity(zeroCell:Cell):void {
    //     ///Iterative attempt;

        
    // }
    expandZeroProximity(zeroCell: Cell): void {
        //Recursion Guard

        if (zeroCell.show || !zeroCell.flag && zeroCell.proximity !== 0) return;
        zeroCell.showCell();
        let row = zeroCell.row , column = zeroCell.column;

        //Checking along the axises for adjecent zeros , checking proximity to lower stack overhead
        if (row > 0) {
            var cellTop = this.board.cells[row - 1][column];

            this.expandZeroProximity(cellTop);

            cellTop.showCell();

            if (column > 0) {
                var cellTopLeft = this.board.cells[row - 1][column - 1];

                this.expandZeroProximity(cellTopLeft);

                cellTopLeft.showCell(); //Showing top left
            }

        }

        if (row < this.board.height - 1) {
            var cellBottom = this.board.cells[row + 1][column];

            this.expandZeroProximity(cellBottom);

            cellBottom.showCell();

            if (column < this.board.width - 1) {
                var cellBottomRight = this.board.cells[row + 1][column + 1];
                this.expandZeroProximity(cellBottomRight);
                cellBottomRight.showCell();; //Showing bottom right

            }

        }
        if (column > 0) {
            var cellLeft = this.board.cells[row][column - 1];
            this.expandZeroProximity(cellLeft);

            cellLeft.showCell();

            if (row < this.board.height - 1) {
                var cellBottomLeft = this.board.cells[row + 1][column - 1];
                this.expandZeroProximity(cellBottomLeft);
                cellBottomLeft.showCell();; //Showing bottom left


            }



        }
        if (column < this.board.width - 1) {
            var cellRight = this.board.cells[row][column + 1];
            this.expandZeroProximity(cellRight);

            cellRight.showCell();


            if (row > 0) {
                var cellTopRight = this.board.cells[row - 1][column + 1];
                this.expandZeroProximity(cellTopRight);
                cellTopRight.showCell(); //Showing top right
            }
        }

    }

}



