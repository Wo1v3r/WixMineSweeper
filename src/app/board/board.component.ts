import { Component, OnInit } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';

import { GameService } from '../services/game.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css', './cells.style.css']
})
export class BoardComponent implements OnInit {
  currentBoardDimensions: {};
  currentCellDimensions: {};
  widthRatio: number = 1.5;
  supermanMode: boolean = false;
  cells: Cell[] = [];
  boardReady: boolean;
  promise: any;
  colorsOn: boolean = true;
  difficulty: string;
  constructor(private gameService: GameService) { }

  updateBoardDimensions(): void {
    this.currentBoardDimensions = {
      'grid-template-columns': 'repeat(' + this.gameService.board.width + ',' + this.widthRatio + 'vw)',
      'grid-template-rows': 'repeat(' + this.gameService.board.height + ',' + this.widthRatio + 'vw)'
    }
  }

  updateCellDimensions(): void {
    this.currentCellDimensions = {
      'width': this.widthRatio + 'vw',
      'height': this.widthRatio + 'vw',
      'font-size': this.widthRatio * 0.7 + 'vw',
      'text-color': "black"

    }
  }
  ngOnInit() {
    this.loadBoard(50, 50, 50);
  }



  loadBoard(width: number, height: number, mines: number): void {
    this.boardReady = false;
    this.supermanMode = false;
    this.promise = new Promise((resolve, reject) => {
      this.gameService.createNewGame(width, height, mines, this);
      resolve();
    }).catch((err) => console.log(err));
    this.promise.then(() => {
      this.cells = this.gameService.board.cellsFlattened;
      this.widthRatio = 99 / this.gameService.board.width;
      this.updateCellDimensions();
      this.updateBoardDimensions();
      this.boardReady = true;
    });

  }

  cellClicked(cell: Cell, $event: MouseEvent): void {
      //If game is over, nothing happens:
    if (this.gameOver()) {
      alert("The game is over, Please start a new game :)");
      return;

    }

    //If shift is held, toggling the flag if possible
    if ($event.shiftKey) {
      this.gameService.toggleFlag(cell);
      //Win can accure only here
      if (this.gameService.won) this.gameService.winGame();
      return;
    }
    //Protecting the player if the cell is flagged
    if (cell.flag) return;

    this.gameService.steps++;

    if (cell.mine) {
      this.gameService.loseGame();
      return;
    }


    // if (cell.proximity == 0) {
      this.gameService.expandZeroProximity(cell);
    // }

    // cell.show = true;


  }

  gameOver(): boolean {
    return this.gameService.lost;
  }



  getUsedFlags(): number {
    return this.gameService.flagsUsed;
  }

  getMaxFlags(): number {
    return this.gameService.flags;
  }

  getSteps(): number {
    return this.gameService.steps;
  }
}
