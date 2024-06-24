import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameComponent } from './game/game.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {AppMaterialModule} from "./app-material.module";
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./store/counter.reducer";
import {IMaskModule} from "angular-imask";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ScoreTableComponent} from "./score-table/score-table.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GameComponent,
    ScoreTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    IMaskModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ counter: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
