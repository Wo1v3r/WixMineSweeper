import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { GameService } from '../services/game.service';

import { BoardComponent } from './board.component';

import { Cell } from '../shared/cell';

import {
  MdChipsModule
} from '@angular/material';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [
        MdChipsModule
      ],
      providers: [GameService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create Board Component', () => {
    expect(component).toBeTruthy();
  });

  it("Should Load a Board from the Game Service with the correct values (ASYNC)",
    inject([GameService], (gameService: GameService) => {
      component.loadBoard(5, 5, 5);
      setTimeout(() => expect(component.boardReady).toBeTruthy(), 1000); // (If fails, need to try to set a longer timeout)
    }));



  it("Should show 'Game Over' if continuing to click when game is over.",
    inject([GameService], (gameService: GameService) => {
      gameService.loseGame();
      gameService.steps = 5;
      expect(component.cellClicked(new Cell(false, 0, 0)
        , new MouseEvent(''))).toMatch('gameOver');
      expect(gameService.steps).toEqual(5); //Steps shouldn't change


    }));

  // it("Should win the game if last mine was flagged.",
  //   inject([GameService], (gameService: GameService) => {
  //     gameService.minesFlagged = 0;
  //     gameService.mines = 1;

  //     let mouseEvent = new MouseEvent('shiftKey');
  //     expect(component.cellClicked(new Cell(true,0,0)
  //       ,mouseEvent)).toMatch('gameWon');

  //   }));

  it("Should lose game if mine was clicked.",
    inject([GameService], (gameService: GameService) => {
      gameService.steps = 5;
      expect(component.cellClicked(new Cell(true, 0, 0)
        , new MouseEvent(''))).toMatch('gameLost');
      expect(gameService.steps).toEqual(6); //Steps should increment
    }));

  it("Should do nothing if a shown cell was clicked.",
    inject([GameService], (gameService: GameService) => {
      let cell = new Cell(true, 0, 0);
      gameService.steps = 5;
      cell.show = true;
      expect(component.cellClicked(cell
        , new MouseEvent(''))).toMatch('cellShown');
      expect(gameService.steps).toEqual(5); //Steps shouldn't change

    }));

  //Expanding is covered in GameService test suite
  it("Should show & expand cells if non mine cell was clicked.",
    inject([GameService], (gameService: GameService) => {
      gameService.steps = 5;
      expect(component.cellClicked(new Cell(false, 0, 0)
        , new MouseEvent(''))).toMatch('showingAndExpanding');
      expect(gameService.steps).toEqual(6); //Steps should be incremented
    }));



  it("Should return whether game is over (Win or Lose)",
    inject([GameService], (gameService: GameService) => {

      gameService.won = true;
      expect(component.gameOver()).toBeTruthy();

      gameService.won = !(gameService.lost = true);
      expect(component.gameOver()).toBeTruthy();

      gameService.lost = gameService.won = false;
      expect(component.gameOver()).toBeFalsy();


    }));

  it("Should return number of used flags",
    inject([GameService], (gameService: GameService) => {
      gameService.flagsUsed = 5;
      expect(component.getUsedFlags()).toEqual(5);
    }));

  it("Should return number of flags that can be used",
    inject([GameService], (gameService: GameService) => {
      gameService.flags = 5;
      expect(component.getMaxFlags()).toEqual(5);
    }));

  it("Should return current amount of steps",
    inject([GameService], (gameService: GameService) => {
      gameService.steps = 5;
      expect(component.getSteps()).toEqual(5);
    }));
});
