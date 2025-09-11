import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'secondsToHoursMinutes',
})
export class SecondsToHoursMinutesPipe implements PipeTransform {
  public transform(totalSeconds: number | null | undefined): string {
    if (!totalSeconds || totalSeconds < 0) {
      return '0m';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${minutes}m`;
  }
}
