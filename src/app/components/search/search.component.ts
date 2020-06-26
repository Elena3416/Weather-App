import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, switchMap, map, tap } from "rxjs/operators";
import { Clima, ClimaFiltrado } from "./../../Interfaces/clima.interface";
import { Router } from "@angular/router";
import { WeatherService } from "src/app/services/ApiWeather.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('InputCiudad') inputciudad: ElementRef;

  public MostrarTarjeta: boolean = false;
  public FilterWeather: ClimaFiltrado;
  public ImagenRegresar:string = `./../../../assets/IMG/return.png`;
  public ImagenBuscar:string = `./../../../assets/IMG/search.png`;

  constructor(private router:Router, private AWService:WeatherService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.GetCurrentWeather();
  }

  public GetCurrentWeather() {
    fromEvent(this.inputciudad.nativeElement, 'keyup')
      .pipe(
        tap(() => this.MostrarTarjeta = false),
        debounceTime(1500),
        pluck('target', 'value'),
        switchMap((
          NombreCiudad:string) =>
          this.AWService.GetWeather(NombreCiudad)
            .pipe(
              map((clima: Clima) => {
                return {
                  namecity: clima.name,
                  CurrentytWeather: clima.weather[0].main,
                  Temperature: clima.main.temp,
                  MaxTemperature: clima.main.temp_max,
                  MinTemperature: clima.main.temp_min,
                  Imagen: clima.weather[0].icon,
                }
              })
            )
        )
      ).subscribe((objetofiltrado: ClimaFiltrado) => {
        this.FilterWeather = objetofiltrado,
          this.MostrarTarjeta = true;
      },
        () => {
         Swal.fire({
           icon:'error',
           title: 'Hubo un error',
           text: 'El nombre de la ciudad no existe',
          }) 
          this.GetCurrentWeather();
        });
  }

  public IrHome(){
    this.router.navigate(['']);
  }
}
