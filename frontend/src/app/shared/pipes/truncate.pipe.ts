import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  public transform(value: string | null | undefined, limit = 100): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '…' : value;
  }
}
