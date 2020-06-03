import { Pipe, PipeTransform, Input } from '@angular/core';

@Pipe({
  name: 'cambiarImagenClima'
})
export class CambiarImagenClimaPipe implements PipeTransform {

  @Input()climatipo:string = "";
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
