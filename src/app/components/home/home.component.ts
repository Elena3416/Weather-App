import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Clima, ClimaFiltrado } from "./../../Interfaces/clima.interface"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private Url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=7ced29ef9b7eb7411a5a0b9cbd6dca58`;
  public ArrayClimaFiltrado: Array<ClimaFiltrado> = [];
  public loading:boolean = true;

  constructor(private router:Router, private http:HttpClient) { 
    this.GetLocalStorage();
  }

  ngOnInit(): void {
  }

  public IrAgregar(){
    this.router.navigate(['search']);
  }

  public GetLocalStorage(){
    const climas = JSON.parse(localStorage.getItem('Climas'));
    if(climas !== null){
      this.GetWeather(climas);
    }  
  }

  public GetWeather(climas:Array<string>){

    from(climas).pipe(
      /*** ConcactMap*/
      concatMap((NombreClima) => 
      this.http.get(`${this.Url}${NombreClima}${this.apiKey}`).pipe
      (
        /**Map */
        map((clima:Clima) => {
          console.log(clima);
              const climaFiltrado:ClimaFiltrado = {
                namecity: clima.name,
                CurrentytWeather: clima.weather[0].main,
                Temperature: clima.main.temp,
                MaxTemperature: clima.main.temp_max,
                MinTemperature: clima.main.temp_min,
                Imagen: clima.weather[0].icon,
          };
          return climaFiltrado;
        })
        /**Map */
      ))

      /***ContactMap */
    ).subscribe((climafiltrado:ClimaFiltrado) => {
        this.ArrayClimaFiltrado.push(climafiltrado);

        if(this.ArrayClimaFiltrado.length == climas.length ){
          this.loading = false;
        }
      });
  }
}
