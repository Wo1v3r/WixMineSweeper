import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './services/game.service';
import {

  MdToolbarModule,
  MdInputModule,
  MdChipsModule,



} from '@angular/material';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        BoardComponent
      ],
      imports: [
        FormsModule,
        MdToolbarModule,
        MdInputModule,
        MdChipsModule
      ],
      providers: [GameService]
    }).compileComponents();
  }));

  it('Should create the App', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
