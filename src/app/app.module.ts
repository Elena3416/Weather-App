import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { CardsWeatherComponent } from './components/cards-weather/cards-weather.component';

import { HttpClientModule } from "@angular/common/http";
import { KelvisCelsiusPipe } from './pipes/kelvis-celsius.pipe';
import { CambiarImagenClimaPipe } from './directives/cambiar-imagen-clima.pipe';
import { ConstruirUrlImagenPipe } from './pipes/construir-url-imagen.pipe';
import { HomeComponent } from './components/home/home.component';
import { appRouting } from "./app.routes";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardsWeatherComponent,
    KelvisCelsiusPipe,
    CambiarImagenClimaPipe,
    ConstruirUrlImagenPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRouting,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
