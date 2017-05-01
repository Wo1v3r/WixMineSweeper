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

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.game = this.gameService.getGame();
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


    cell.show = true;
    this.game.steps++;

    if (cell.mine) {
      console.log("Game Over");
      // this.gameService.resetGame(this.widthForNextGame,this.heightForNextGame) ; 
      return;
    }
    
    if (cell.proximity == 0) {
      this.game.expandZeroProximity(cell);
    }

  }

  winGame(): void {
    console.log("Good Job!");
  }
}
