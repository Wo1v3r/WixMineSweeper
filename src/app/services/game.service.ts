import { Injectable } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';
import { BoardComponent } from '../board/board.component';

@Injectable()
export class GameService {
  mines: number;
  flags: number;
  won: boolean = false;
  lost: boolean = false;
  flagsUsed: number = 0;
  minesFlagged: number = 0;
  minesLocations: number[][];
  steps: number = 0;
  board: Board;
  boardComp: BoardComponent;
  ////
  difficulty: string = "robot";
  ///

  constructor() {
  }

  createNewGame(width: number, height: number, mines: number, boardComp?: BoardComponent) {
    if (boardComp != undefined) this.boardComp = boardComp;

    this.lost = this.won = false;
    this.mines = mines;
    this.minesFlagged = 0;
    this.steps = 0;
    this.flagsUsed = 0;
    this.flags = Math.round(mines*this.determineDifficulty());
    this.createMines(width, height);
    this.board = new Board(width, height, this.minesLocations);
  }




  createMines(width: number, height: number): void {
    this.minesLocations = [];
    for (var i = 0; i < this.mines; i++) {
      do {
        var randRow: number = Math.floor(Math.random() * height);
        var randCol: number = Math.floor(Math.random() * width);
      } while (this.minesLocations.find(mine => mine[0] == randRow && mine[1] == randCol));
      this.minesLocations[i] = [];
      this.minesLocations[i][0] = randRow;
      this.minesLocations[i][1] = randCol;

    }
  }



  toggleSuperMan(): void {

    this.boardComp.supermanMode = !this.boardComp.supermanMode;
  }

  toggleFlag(cell: Cell) {
    if (cell.show) {
      alert("You can't add a flag to that cell!");
      return false;
    }

    if (cell.flag) {
      cell.flag = false;
      this.flagsUsed--;
      if (cell.mine) this.minesFlagged--;
      return true;
    }

    if (!cell.show && this.flagsUsed < this.flags) {
      cell.flag = true;
      this.flagsUsed++;

      if (cell.mine) this.minesFlagged++;
      if (this.mines == this.minesFlagged) this.won = true;
      return true;
    }

    alert("You don't have any flags left :( ");
    return false;
  }


  expandZeroProximity(zeroCell: Cell): void {

    let zerosQueue: Cell[] = [zeroCell];
    while (zerosQueue.length !== 0) {
      let currentCell = zerosQueue.pop();

      for (var i = Math.max(currentCell.row - 1, 0); i < Math.min(this.board.height, currentCell.row + 2); i++)
        for (var j = Math.max(currentCell.column - 1, 0); j < Math.min(this.board.width, currentCell.column + 2); j++) {
          let cell = this.board.cells[i][j];
          if (cell.flag || cell.show) continue;
          cell.showCell();
          if (cell.proximity === 0) zerosQueue.push(cell);
        }
    }

  }


  winGame(): void {
    this.won = true;
    alert("You won! :)");
  }

  loseGame(): void {
    this.lost = true;
    alert("You Lost... :(");
  }

  resetGame(width: number, height: number, mines: number): void {
    try {
      this.boardComp.loadBoard(width, height, mines);
    }
    catch (err) { console.log(err) }
  }

  determineDifficulty() {
    switch (this.difficulty) {
      case 'cowboy':
        return 1.01;
      case 'robot':
        return 1.05;
      case 'unicorn':
        return 1.1;
      default:
        return 1;
    }
  }
}
