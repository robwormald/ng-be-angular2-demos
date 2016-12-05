import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SquareBoxComponent } from './square-box/square-box.component';
import { Nvd3ChartComponent } from './nvd3-chart/nvd3-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SquareBoxComponent,
    Nvd3ChartComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
