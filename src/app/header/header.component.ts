import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameService : GameService) { }

  ngOnInit() {
  }


  newGame():void{
    this.gameService.createNewGame();
  }
}
