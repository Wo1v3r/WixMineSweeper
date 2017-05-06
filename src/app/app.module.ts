import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MinesweeperMatModule } from './minesweeper-mat/minesweeper-mat.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';


import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MinesweeperMatModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
