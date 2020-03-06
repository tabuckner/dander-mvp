import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { CardStackComponent } from './card-stack/card-stack.component';
import { HttpClientModule } from '@angular/common/http';

export const MAT_MODULES = [
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardStackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...MAT_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
