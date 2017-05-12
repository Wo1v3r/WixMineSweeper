import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game.service';
import { BoardComponent } from '../board/board.component';
import { HeaderComponent } from './header.component';
import {
  MdToolbarModule,
  MdInputModule
} from '@angular/material';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        FormsModule,
        MdToolbarModule,
        MdInputModule,
      ],
      providers: [GameService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the Header', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the correct maximum amount of mines possible for the next board' , () => {
    component.width = 10;
    component.height = 10;
    expect(component.getMaxMines()).toEqual(100);
  });

  it('Should toggle new game creation menu', () => {
    component.toggleNewGameMenu();
    expect(component.showMenu).toBeTruthy();

    component.toggleNewGameMenu();
    expect(component.showMenu).toBeFalsy();

  });

  it('Should toggle the superman mode'
  , inject([GameService], (gameService: GameService) => {

    //Changes the SuperManMode boolean on the board through the service
    let boardComp = new BoardComponent(gameService);
    boardComp.loadBoard(4, 4, 4);
    expect(boardComp.supermanMode).toBeFalsy();
    component.toggleSuperMan();
    expect(boardComp.supermanMode).toBeTruthy();
  }));



  ///Helper method to check board if board was created with the settings passed:
  var expectBoardEquals = function (gameService: GameService, settings: Number) {
    expect(gameService.board.height).toEqual(settings);
    expect(gameService.board.width).toEqual(settings);
    expect(gameService.mines).toEqual(settings);
  }
  

  it('Should create a new game'
  , inject([GameService], (gameService: GameService) => {

    let boardComp = new BoardComponent(gameService);
    gameService.createNewGame(4, 4, 4, boardComp);
    expectBoardEquals(gameService, 4);

    //New game created :  Values of board should be now 5 instead of 4
    component.height = component.width = component.mines = 5;
    component.newGame();
    expectBoardEquals(gameService, 5);

  }));

  it('Should not create a new game : invalid paramaters for game'
  , inject([GameService], (gameService: GameService) => {
    let boardComp = new BoardComponent(gameService);
    gameService.createNewGame(4, 4, 4, boardComp);

    expectBoardEquals(gameService, 4);

    //Negative number of mines\height\width
    component.height = component.width = component.mines = -1;
    component.newGame();
    expectBoardEquals(gameService, 4);

    //Over 300 Rows\Columns
    component.height = component.width = 301;
    component.mines = 1;
    component.newGame();
    expectBoardEquals(gameService, 4);

    //Over row*column mines
    component.height = component.width = 50;
    component.mines = 2501;
    component.newGame();
    expectBoardEquals(gameService, 4);
    
  }));

  it('Should not create a game if no board was provided to the gameService before'
  ,inject([GameService],(gameService:GameService)=>{
    
    component.newGame();
    expect(gameService.board).toBeUndefined();
  }));


  it('Should get/set difficulty correctly on the service'
  ,inject([GameService], (gameService:GameService)=>{
    component.setDifficulty('unicorn');
    expect(component.getDifficulty()).toMatch('unicorn');
  }));

});
