import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { AppComponent } from './app.component';

import {
    HlcClrTableModule
} from '@ng-holistic/clr-list';

// CLARITY ICONS DEPENDENCY: THIS REQUIRED ONLY IN STACKBLITZ SEE #700
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
//



@NgModule({
  imports: [ BrowserModule, FormsModule, CommonModule, HlcClrTableModule.forRoot() ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
