import {Pipe} from '@angular/core';
import type {PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'changeUrlPicture'
})
export class ChangeUrlPicturePipe implements PipeTransform {

  public transform(value: string | undefined): string {
    if (value) {
      if (!value.endsWith('.jpg')) {
        return value;
      }

      const lastIndex = value.lastIndexOf('.jpg');

      return value.slice(0, lastIndex) + 'QL75_UX100_CR0,1,100,125_' + value.slice(lastIndex);
    } else {
      return '';
    }
  }
}
