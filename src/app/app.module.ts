import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardDetailComponent } from './components/item-card/item-card-detail/item-card-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";

import { HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemCardComponent,
    ItemCardDetailComponent,
    FilterComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpClientModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
