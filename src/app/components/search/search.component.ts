import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map } from "rxjs/operators";
import { Clima, ClimaFiltrado } from "./../../Interfaces/clima.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit{

  @ViewChild('InputCiudad')inputciudad:ElementRef; 

  private Url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=7ced29ef9b7eb7411a5a0b9cbd6dca58`;
  public FilterWeather:ClimaFiltrado;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {}

  ngAfterViewInit():void{
    this.GetCurrentWeather();
  }

  public GetCurrentWeather(){
    fromEvent(this.inputciudad.nativeElement,'keyup')
    .pipe(
      debounceTime(1500),
      pluck('target', 'value'),
      switchMap((nomberCiudad) =>
      this.http.get(`${this.Url}${nomberCiudad}${this.apiKey}`)
      .pipe(
        map((clima:Clima) => {
          return{
            namecity: clima.name,
            CurrentytWeather: clima.weather[0].main,
            Temperature: clima.main.temp,
            MaxTemperature: clima.main.temp_max,
            MinTemperature: clima.main.temp_min,
          }
        })
      )
      )
     ).subscribe((objetofiltrado:ClimaFiltrado) => this.FilterWeather = objetofiltrado),
     () => this.GetCurrentWeather();
  }
}
