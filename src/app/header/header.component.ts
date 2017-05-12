import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  width: number = 50;
  height: number = 50;
  mines: number = 500;
  showMenu: boolean = false;
  selectedDifficulty: string;
  supermanActive: boolean;

  constructor(private gameService: GameService) { }

  toggleNewGameMenu(): void {
    //Resetting fields to current game settings
    if (this.gameService.board) {
      this.width = this.gameService.board.width;
      this.height = this.gameService.board.height;
      this.mines = this.gameService.mines;
    }
    this.showMenu = !this.showMenu;
  }

  //New Game Creation logic

  newGame(): void {
    if (this.width > 0 && this.width <= 300 && this.height > 0 && this.height <= 300 && this.mines <= this.getMaxMines()) {
      this.gameService.resetGame(this.width, this.height, this.mines);
      this.showMenu = false;
      this.supermanActive = false;
    }
    else {
      alert("Invalid values entered");
    }
  }

  getMaxMines(): number {
    return this.width * this.height;
  }

  //Game Service Adapter

  toggleSuperMan(): void {
    this.gameService.toggleSuperMan();
    this.supermanActive = !this.supermanActive;
  }

  getDifficulty(): string {
    return this.gameService.difficulty;
  }

  setDifficulty(difficulty: string): void {
    this.gameService.difficulty = difficulty;
  }

}
