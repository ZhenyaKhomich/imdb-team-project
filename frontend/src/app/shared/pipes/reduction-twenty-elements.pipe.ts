import {Pipe} from '@angular/core';
import type {PipeTransform} from '@angular/core';
import type {ActorsDataType} from '../types/actors-data.type';
import type {TitlesDataType} from '../types/movies-response.type';

@Pipe({
  name: 'reductionTwentyElements',
  standalone: true,
})
export class ReductionTwentyElementsPipe implements PipeTransform {

  public transform(value: TitlesDataType | ActorsDataType): TitlesDataType| ActorsDataType | null {
    if (value && 'names' in value) {
      const elements: ActorsDataType = value;
      elements.names = elements.names.slice(0, 20);
      return elements;

    } else if (value && 'titles' in value) {
      const elements: TitlesDataType = value;
      if(elements.titles) {
        elements.titles = elements.titles.slice(0, 20);
        return elements;
      }
    }

    return null;
  }
}
