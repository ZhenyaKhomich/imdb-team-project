import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'numberSuffix',
})
export class NumberSuffixPipe implements PipeTransform {
  public transform(value: number | null | undefined, digits = 1): string {
    if (value == null) return '';
    if (value < 1000) return value.toString();

    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.floor(Math.log10(value) / 3);

    if (tier === 0) return value.toString();

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = value / scale;

    return scaled.toFixed(digits).replace(/\.0+$/, '') + suffix;
  }
}
