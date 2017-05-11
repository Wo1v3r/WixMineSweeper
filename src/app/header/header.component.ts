import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  width: number = 5;
  mines: number = 5;
  height: number = 5;
  showMenu: boolean = false;

  constructor(private gameService: GameService) {}

  toggleNewGameMenu():void{
    this.showMenu = !this.showMenu;
  }


  newGame(): void {
    if (this.width > 0 && this.width <= 300 && this.height > 0 && this.height <= 300 && this.mines < this.getMaxMines())
          this.gameService.resetGame(this.width,this.height,this.mines);
  }

  toggleSuperMan():void{
    this.gameService.toggleSuperMan();
  }

  getMaxMines():number{
    return this.width*this.height;
  }

}
