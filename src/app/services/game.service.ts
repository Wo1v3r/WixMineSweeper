import { Injectable } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';
import { Game } from '../shared/game';

@Injectable()
export class GameService {
  game:Game;
  width:number = 5;
  height:number = 5;


  constructor() { 
    this.createNewGame();
  }

  createNewGame():void{
    this.game = new Game(this.width,this.height);
  }
  resetGame(width:number,height:number):void{
    this.width = width, this.height=height;
    this.createNewGame();
  }
  getGame():Game{
    return this.game;
  }

}
