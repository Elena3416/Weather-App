import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvisCelsius'
})

export class KelvisCelsiusPipe implements PipeTransform {

  transform(value: number): string {

    let celsius = Math.floor(value - 273.15);
    
    return `${celsius}°`;
  }
}
