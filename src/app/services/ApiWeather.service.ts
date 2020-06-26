import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private Url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  private apiKey = `&appid=7ced29ef9b7eb7411a5a0b9cbd6dca58`;

  constructor(private httpClient:HttpClient) { } //Se inyecta el http en el constuctor

  public GetWeather(NombreCiudad:string){
    return this.httpClient.get(`${this.Url}${NombreCiudad}${this.apiKey}`);
  }
}

/**
 * Services
 * Es cualquier servicio, que sirve cuando dos o mas componentes utilizan un servicio similar
 * y manda la informacion a todos los componentes que necesitan el servicio.
 * Para crear un servicio es con el siguiente codigo 
 * ng g s services/Nombre del Servicio
 * Inyecciones se utilizan en el constructor, para consumir los recursos que necesitan
 */