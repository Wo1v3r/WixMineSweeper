import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/game';
import { Cell } from '../shared/cell';

import { GameService } from '../services/game.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  game: Game;
  widthForNextGame: number = 10;
  heightForNextGame: number = 10;
  minesForNextGame: number = 5;
  currentBoardDimensions: {};
  currentCellDimensions: {};
  widthRatio: number;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.game = this.gameService.getGame();
    this.widthRatio = 80 / this.game.board.width;
    this.updateBoardDimensions();
    this.updateCellDimensions();
  }


  updateBoardDimensions(): void {
    this.currentBoardDimensions = {
      'grid-template-columns': 'repeat(' + this.game.board.width + ',' + this.widthRatio + 'vw)',
      'grid-template-rows': 'repeat(' + this.game.board.height + ',' + this.widthRatio + 'vw)'
    }
    //+ 80 / this.game.board.width + 
  }

  updateCellDimensions(): void {
    this.currentCellDimensions = {
      'width': this.widthRatio + 'vw',
      'height': this.widthRatio + 'vw',
      'font-size': this.widthRatio*0.5 + 'vw'
    }
  }


  cellClicked(cell: Cell, $event: MouseEvent): void {
    console.log($event);
    //If shift is held, toggling the flag if possible
    if ($event.shiftKey) {
      this.game.toggleFlag(cell);
      //Win can accure only here
      if (this.game.won) this.winGame();
      return;
    }
    //Protecting the player if the cell is flagged
    if (cell.flag) return;

    this.game.steps++;

    if (cell.mine) {
      this.game.lost = true;
      alert("Game Over");
      this.gameService.resetGame(this.widthForNextGame, this.heightForNextGame, this.minesForNextGame);
      // this.game = this.gameService.getGame();
      return;
    }
    if (cell.proximity == 0) {
      this.game.expandZeroProximity(cell);
    }

    cell.show = true;


  }

  winGame(): void {
    console.log("Good Job!");
  }
}
