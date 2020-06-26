import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { from }  from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { ClimaFiltrado, Clima } from 'src/app/Interfaces/clima.interface';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() climaFiltrado:ClimaFiltrado;
  private Url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=7ced29ef9b7eb7411a5a0b9cbd6dca58`;
  private ArrayWeather:Array<ClimaFiltrado> = []; 
  public LinkArrwoLeft:string = `./../../../assets/IMG/back.png`; 
  public currentweather:any = {};
 
  constructor(private httpClient: HttpClient, private router:Router, 
    private ActivateRoute:ActivatedRoute) { 
    const clima = this.ActivateRoute.snapshot.paramMap.get("nombreciudad");
    console.log(`${this.Url}${clima}${this.apiKey}`);
    this.currentweather = this.httpClient.get(`${this.Url}${clima}${this.apiKey}`).pipe(
        
      map((clima:Clima) =>{
        console.log(clima);
        
        const climaFiltado = {
              namecity: clima.name,
              currentytWeather: clima.weather[0].main,
              temperature: clima.main.temp,
              humidity: clima.main.humidity,
              wind: clima.wind.speed,
        };
        return climaFiltado;
      })
    ).subscribe((climaFiltado) => {
      this.currentweather = climaFiltado;
      console.log(this.currentweather); 
    })
  }
  

  ngOnInit(): void {
    // this.GetCurrentWeather(this.ArrayWeather);
  }

  GetCurrentWeather(clima){
   from(clima).pipe(
      concatMap((NombreClima) =>
      this.httpClient.get(`${this.Url}${NombreClima}${this.apiKey}`)
      .pipe(

        map((clima:Clima) =>{
          console.log(clima);
          const climaFiltado:ClimaFiltrado = {
                namecity: clima.name,
                CurrentytWeather: clima.weather[0].main,
                Temperature: clima.main.temp,
                MaxTemperature: clima.main.temp_max,
                MinTemperature: clima.main.temp_min,
                Imagen: clima.weather[0].icon,
          };
          return climaFiltado;
        })
      ))
   ).subscribe((climaFiltrado:ClimaFiltrado) => {
     this.ArrayWeather.push(climaFiltrado);
     console.log(this.ArrayWeather); 
   })
  }

  public IrHome(){
    this.router.navigate([""]);
  }
}
