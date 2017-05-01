import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Imports from Material 2 all go here for tree-shaking for AOT

import {
  MdToolbarModule,
  MdButtonModule,
  MdInputModule,
  MdGridListModule,

} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdGridListModule,



  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdGridListModule,




  ],
  declarations: []
})
export class MinesweeperMatModule { }
