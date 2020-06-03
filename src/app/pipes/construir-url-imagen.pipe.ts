import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'construirUrlImagen'
})

export class ConstruirUrlImagenPipe implements PipeTransform {

  private urlImagen: string = 'http://openweathermap.org/img/wn/';
  private urlComplementaria = '@2x.png';

  transform(value: string): unknown {

    return `${this.urlImagen}${value}${this.urlComplementaria}`;
  }
}
