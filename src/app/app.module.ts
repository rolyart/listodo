import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';

import {
  MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatSelectModule,
  MatCheckboxModule,MatChipsModule, MatButtonToggleModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticealertComponent } from './noticealert/noticealert.component';


import { DatePipe } from '@angular/common';
import { TodolistComponent } from './todolist/todolist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoticealertComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule,MatInputModule, MatButtonModule,MatListModule,MatSelectModule,
    MatCheckboxModule, MatChipsModule, MatButtonToggleModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
