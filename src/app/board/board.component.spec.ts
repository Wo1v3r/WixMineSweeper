import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from '../services/game.service';

import { BoardComponent } from './board.component';
import {
  MdChipsModule
} from '@angular/material';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [ 
        MdChipsModule
      ],
      providers: [ GameService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
