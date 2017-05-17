import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  width: number = 12;
  height: number = 12;
  mines: number = 30;
  showMenu: boolean = false;
  selectedDifficulty: string;
  supermanActive: boolean = false;

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

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

  }
  //New Game Creation logic

  newGame(): void {
    this.showMenu = false;
    this.supermanActive = false;

    console.log("Start");


    if (this.width > 0 && this.width <= 300 && this.height > 0 && this.height <= 300 && this.mines <= this.getMaxMines()) {

      this.gameService.resetGame(this.width, this.height, this.mines);
      
    }

    else
      alert("Invalid values entered");

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
