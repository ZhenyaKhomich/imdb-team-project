import {Pipe} from '@angular/core';
import type {PipeTransform} from '@angular/core';
import type {TitlesDataType} from '../types/movies-response.type';

@Pipe({
  name: 'sortMoviesYearPipe',
  standalone: true,
})
export class SortMoviesYearPipe implements PipeTransform {

  public transform(value: TitlesDataType, factor: number): TitlesDataType {
    if (value && value.titles) {
      return {
        ...value,
        titles: value.titles.filter(movie => +movie.startYear === factor)
      };
    }
    return value;

  }

}
