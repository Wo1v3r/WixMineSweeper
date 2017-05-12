import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';
import { BoardComponent } from '../board/board.component'
import { Board } from '../shared/board';
import { Cell } from '../shared/cell';


describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
    });
  });

  it('should inject the game service successfuly', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it("Should create mines in different locations",
    inject([GameService], (service: GameService) => {
      service.mines = 50;
      service.createMines(10, 10);

      let minesLocationsDupes = [];

      while (service.minesLocations.length !== 0) {
        var location = service.minesLocations.pop();
        var index = minesLocationsDupes.lastIndexOf((val) => val == location);
        expect(index).toEqual(-1);
      }
    }));

  it("Should put a flag when cell is not shown and have flags",
    inject([GameService], (service: GameService) => {
      service.board = new Board(2, 2, []);
      service.flags = 1;
      service.flagsUsed = 0;

      expect(service.board.cellsFlattened[0].flag).toBeFalsy();
      service.toggleFlag(service.board.cellsFlattened[0]);
      expect(service.board.cellsFlattened[0].flag).toBeTruthy();
      expect(service.flagsUsed).toEqual(1);
    }));

  it("Should remove flag when cell has a flag",
    inject([GameService], (service: GameService) => {
      service.board = new Board(2, 2, []);
      service.flagsUsed = 1;
      service.board.cellsFlattened[0].flag = true;

      expect(service.board.cellsFlattened[0].flag).toBeTruthy();
      service.toggleFlag(service.board.cellsFlattened[0]);
      expect(service.board.cellsFlattened[0].flag).toBeFalsy();
    }));

  it("Should not put on a flag when cell is shown ",
    inject([GameService], (service: GameService) => {
      service.board = new Board(2, 2, []);
      var cell = new Cell(false, 0, 0);
      cell.showCell();
      service.board.cells[0][0] = cell;

      service.flags = 1;
      service.flagsUsed = 0;
      //Cell is shown:
      expect(service.toggleFlag(cell)).toBeFalsy();

    }));

  it("Should not put on a flag when no flags available ",
    inject([GameService], (service: GameService) => {
      service.board = new Board(2, 2, []);
      var cell = new Cell(false, 0, 0);

      service.board.cells[0][0] = cell;
      service.flags = service.flagsUsed = 5;

      //Cell is not shown, but not enough flags:

      expect(service.toggleFlag(cell)).toBeFalsy();
    }));
  //TODO DEBUG

  it("Should expand all cells (No mines on board)",
    inject([GameService], (service: GameService) => {

      let board = new Board(10, 10, []);
      service.board = board;

      board.cellsFlattened.forEach((cell) => { expect(cell.proximity).toEqual(0) });

      service.expandZeroProximity(board.cells[0][0]);

      board.cellsFlattened.forEach((cell) => expect(cell.show).toBeTruthy());
    }));


  it("Should Create a game successfuly: All Fields should be initialized correctly to begin the game",
    inject([GameService], (service: GameService) => {
      let boardComp: BoardComponent = new BoardComponent(service);

      service.createNewGame(4, 4, 4, boardComp);

      expect(service.mines).toEqual(4);
      expect(service.flagsUsed).toEqual(0);
      expect(service.flags).toEqual(4);
      expect(service.minesFlagged).toEqual(0);
      expect(service.lost).toBeFalsy();
      expect(service.won).toBeFalsy();
      expect(service.board.height).toEqual(4);
      expect(service.board.width).toEqual(4);

    }));

  it("Should not reset a game if no game was loaded before",
    inject([GameService], (service: GameService) => {
      service.resetGame(10, 10, 10);
      expect(service.board).toBeUndefined();
    }));


  it("Should reset a game if a game was loaded before",
    inject([GameService], (service: GameService) => {

      let boardComp: BoardComponent = new BoardComponent(service);

      service.createNewGame(10, 10, 10, boardComp);
      expect(service.board.height).toEqual(10);
      expect(service.board.width).toEqual(10);
      expect(service.mines).toEqual(10);

      service.resetGame(5, 5, 5);
      expect(service.board.height).toEqual(5);
      expect(service.board.width).toEqual(5);
      expect(service.mines).toEqual(5);

    }));

  it("Game should be lost when a mine is shown",
    inject([GameService], (service: GameService) => {
      service.createNewGame(1, 1, 1);

    }))

  it("Should determine difficulty correctly",
    inject([GameService],(service: GameService) =>{
        service.difficulty = 'cowboy';
        expect(service.determineDifficulty()).toEqual(1.01);

        service.difficulty = 'robot';
        expect(service.determineDifficulty()).toEqual(1.05);

        service.difficulty = 'unicorn';
        expect(service.determineDifficulty()).toEqual(1.1);

        service.difficulty = 'BAD VALUE';
        expect(service.determineDifficulty()).toEqual(1);
    }));
});
