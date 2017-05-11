import { Injectable } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';
import { BoardComponent } from '../board/board.component';

@Injectable()
export class GameService {
  width: number;
  height: number;
  mines: number;
  flags: number;
  won: boolean = false;
  lost: boolean = false;
  superMod: boolean = false;
  flagsUsed: number = 0;
  minesFlagged: number = 0;
  minesLocations: number[][];
  steps: number = 0;
  board: Board;
  cellsFlattened: Cell[] = [];

  constructor() {
  }

  createNewGame(width: number, height: number, mines: number) {
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.flags = mines + 1;
    this.createMines();
    this.board = new Board(width, height, this.minesLocations);
    this.cellsFlattened = this.board.cellsFlattened;
  }




  createMines(): void {
    this.minesLocations = [];
    for (var i = 0; i < this.mines; i++) {
      do {
        var randRow: number = Math.floor(Math.random() * this.height);
        var randCol: number = Math.floor(Math.random() * this.width);
      } while (this.minesLocations.find(mine => mine[0] == randRow && mine[1] == randCol));
      this.minesLocations[i] = [];
      this.minesLocations[i][0] = randRow;
      this.minesLocations[i][1] = randCol;

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


  expandZeroProximity(zeroCell: Cell): void {

    let zerosQueue: Cell[] = [zeroCell];

    while (zerosQueue.length !== 0) {
      let currentCell = zerosQueue.pop();

      for (var i = Math.max(currentCell.row - 1, 0); i < Math.min(this.height, currentCell.row + 2); i++)
        for (var j = Math.max(currentCell.column - 1, 0); j < Math.min(this.width, currentCell.column + 2); j++) {
          let cell = this.board.cells[i][j];
          if (cell.flag || cell.show) continue;
          cell.showCell();
          if (cell.proximity === 0) zerosQueue.push(cell);
        }
    }

  }
  resetGame(width: number, height: number, mines: number): void {
    this.width = width, this.height = height, this.mines = mines;
  }


}
