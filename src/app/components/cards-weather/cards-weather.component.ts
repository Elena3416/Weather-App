import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from "./../../Interfaces/clima.interface";

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})

export class CardsWeatherComponent implements OnInit {

  @Input() climaFiltradoRecibido: ClimaFiltrado; 

  constructor() { }

  ngOnInit(): void {}

  public AgregarCiudad(){
    const ArrayWeather = this.GetLocalStorage();
    ArrayWeather.push(this.climaFiltradoRecibido.namecity);
    localStorage.setItem('Climas', JSON.stringify(ArrayWeather));
  }

  public GetLocalStorage(){
    const ArrayWeather = JSON.parse(localStorage.getItem('Climas'));
    if(ArrayWeather == null){
      return [];
    }else{
      return ArrayWeather;
    }
  }
}
