import { Component, OnInit, Input } from '@angular/core';
import { ClimaFiltrado } from "./../../Interfaces/clima.interface";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cards-weather',
  templateUrl: './cards-weather.component.html',
  styleUrls: ['./cards-weather.component.css']
})

export class CardsWeatherComponent implements OnInit {

  @Input() climaFiltradoRecibido: ClimaFiltrado; 
  @Input() mostrarBoton:boolean = false;

  public ShowButton:boolean = false; 

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.ShowButton = this.mostrarBoton;
    console.log(this.ShowButton);
    
  }

  public AgregarCiudad(){
    const ArrayWeather = this.GetLocalStorage();

    /*comparar una funcion para ver si tiene valores o no, si tiene valores, imprime las ciudades,
    si no, no imprime ninguna ciudad */
    if(this.ChecarNoRepetidos(ArrayWeather) == 0){
      ArrayWeather.push(this.climaFiltradoRecibido.namecity);
      localStorage.setItem('Climas', JSON.stringify(ArrayWeather));
    }else{
      Swal.fire({
        title:'Ciudad Repetida',
        icon: 'warning',
        text:'La ciudad elegida, ya fue anteriormente seleccionada'
      })
    }
  }

  public GetLocalStorage(){
    const ArrayWeather = JSON.parse(localStorage.getItem('Climas'));
    if(ArrayWeather == null){
      return [];
    }else{
      return ArrayWeather;
    }
  }

  public IrDetalles(){
    const Ciudad = this.climaFiltradoRecibido.namecity;
    if(!this.mostrarBoton){
      this.router.navigate(["details", Ciudad]);
    }
  }

  //recibe los valores
  private ChecarNoRepetidos(Arrayweather:Array<string>):number{
    const Ciudades:Array<any> = Arrayweather.filter((clima) => clima ==
    this.climaFiltradoRecibido.namecity);
    return Ciudades.length;
  }
  //filter se basa y busca una condicion y existe retorna un arreglo nuevo
}
