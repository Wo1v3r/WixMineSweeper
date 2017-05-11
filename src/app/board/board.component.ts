import { Component, OnInit } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';

import { GameService } from '../services/game.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  widthForNextGame: number;
  heightForNextGame: number;
  minesForNextGame: number;
  currentBoardDimensions: {};
  currentCellDimensions: {};
  widthRatio: number = 1.5;
  supermanMode: boolean = false;
  cells: Cell[] = [];
  boardReady: boolean = false;
  promise: any;
  constructor(private gameService: GameService) {


  }

  ngOnInit() {
    this.loadBoard(50, 50, 50);
  }



  loadBoard(width: number, height: number, mines: number): void {
    this.promise = new Promise((resolve, reject) => {
      this.gameService.createNewGame(width, height, mines);
      resolve();
    }).catch((err) => console.log(err));
    this.promise.then(() => {
      this.cells = this.gameService.cellsFlattened;
      this.widthRatio = 99 / this.gameService.width;
      this.updateCellDimensions();
      this.updateBoardDimensions();
      this.boardReady = true;
    });

  }


  updateBoardDimensions(): void {
    this.currentBoardDimensions = {
      'grid-template-columns': 'repeat(' + this.gameService.width + ',' + this.widthRatio + 'vw)',
      'grid-template-rows': 'repeat(' + this.gameService.height + ',' + this.widthRatio + 'vw)'
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


  cellClicked(cell: Cell, $event: MouseEvent): void {
    console.log($event);
    //If shift is held, toggling the flag if possible
    if ($event.shiftKey) {
      this.gameService.toggleFlag(cell);
      //Win can accure only here
      if (this.gameService.won) this.winGame();
      return;
    }
    //Protecting the player if the cell is flagged
    if (cell.flag) return;

    this.gameService.steps++;

    if (cell.mine) {
      this.gameService.lost = true;
      alert("Game Over");
      this.gameService.resetGame(this.widthForNextGame, this.heightForNextGame, this.minesForNextGame);
      // this.game = this.gameService.getGame();
      return;
    }


    if (cell.proximity == 0) {
      this.gameService.expandZeroProximity(cell);
    }

    cell.show = true;


  }

  winGame(): void {
    console.log("Good Job!");
  }


  superman(): void {
    this.supermanMode = !this.supermanMode;
  }

  gameOver(): boolean {
    return this.gameService.lost;
  }
}
