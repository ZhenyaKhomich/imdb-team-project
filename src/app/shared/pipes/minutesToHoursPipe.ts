import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
  standalone: true
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(value: number): string {
    if (!value && value !== 0) return '';

    const totalMinutes = Math.floor(value / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursStr = hours.toString();
    const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();

    return `${hoursStr}` + 'h.' + ':' + `${minutesStr}` + 'min.';
  }
}
