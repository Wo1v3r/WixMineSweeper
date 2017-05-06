import { Injectable } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';
import { Game } from '../shared/game';

@Injectable()
export class GameService {
  game:Game;
  width:number = 15;
  height:number = 15;
  mines:number = 10;


  constructor() { 
    this.createNewGame();
  }

  createNewGame():void{
    this.game = new Game(this.width,this.height,this.mines);
    console.log("new game created");
  }
  resetGame(width:number,height:number,mines:number):void{
    this.width = width, this.height=height, this.mines = mines;
    this.createNewGame();
  }
  getGame():Game{
    return this.game;
  }

}
