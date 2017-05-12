import { Component, OnInit } from '@angular/core';
import { Cell } from '../shared/cell';
import { Board } from '../shared/board';

import { GameService } from '../services/game.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.css',
    './cells.styles/cells.style.cowboy.css',
    './cells.styles/cells.style.unicorn.css',
    './cells.styles/cells.style.robot.css']
})
export class BoardComponent implements OnInit {
  currentBoardDimensions: {};
  currentCellDimensions: {};
  widthRatio: number = 1.5;
  supermanMode: boolean = false;
  cells: Cell[] = [];
  boardReady: boolean;
  cellTheme: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.loadBoard(50, 50, 500);
  }

  loadBoard(width: number, height: number, mines: number): void {
    this.boardReady = false;
    this.supermanMode = false;

    let loadPromise = new Promise((resolve, reject) => {
      this.gameService.createNewGame(width, height, mines, this);
      resolve();
    }).catch((err) => console.log(err));

    loadPromise.then(() => {
      this.cells = this.gameService.board.cellsFlattened;
      this.widthRatio = 99 / this.gameService.board.width;

      this.updateCellDimensions();
      this.updateBoardDimensions();
      this.updateCellTheme();

      this.boardReady = true;
    });

  }

  //Interaction //

  //The return values on cellClicked are for Karma Test suite

  cellClicked(cell: Cell, $event: MouseEvent): string {

    if (this.gameOver()) {
      alert("The game is over, Please start a new game :)");
      return 'gameOver';

    }
    if (cell.show) return 'cellShown';

    if ($event.shiftKey) {
      this.gameService.toggleFlag(cell);

      //Win can occure only here
      if (this.gameService.won) {
        this.gameService.winGame();
        return 'gameWon';

      }
      return 'flagToggled';
    }

    //Protecting the player if the cell is flagged
    if (cell.flag) return 'flagFlagged';

    //From here, a Step was taken
    this.gameService.steps++;

    if (cell.mine) {
      this.gameService.loseGame();
      return 'gameLost';
    }

    if (cell.proximity === 0) this.gameService.expandZeroProximity(cell);
    else cell.showCell();

    return 'showingAndExpanding';
  }


  //Service Adapter

  gameOver(): boolean {
    return this.gameService.lost || this.gameService.won;
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


  //Display \ Themeing

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

  updateCellTheme(): void {
    this.cellTheme = this.gameService.difficulty;
    console.log(this.cellTheme);
  }
  ///
}
