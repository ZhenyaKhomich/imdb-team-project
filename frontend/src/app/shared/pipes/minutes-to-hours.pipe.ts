import { Pipe} from '@angular/core';
import type {PipeTransform} from '@angular/core';

@Pipe({
  name: 'minutesToHours',
  standalone: true
})
export class MinutesToHoursPipe implements PipeTransform {

  public transform(value: number): string {
    if (!value && value !== 0) return '';

    const totalMinutes = Math.floor(value / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursString = hours.toString();
    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();

    return `${hoursString}` + 'h' + ':' + `${minutesString}` + 'min';
  }
}

