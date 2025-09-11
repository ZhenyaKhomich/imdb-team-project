import type { ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-range',
  imports: [],
  templateUrl: './range.component.html',
  styleUrl: './range.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent {
  public minPlaceholder = input('');
  public maxValueStart = input('');
  public minValueStart = input('');
  public maxPlaceholder = input('');
  public min = input(0);
  public max = input(Infinity);
  public step = input(1);
  public minValue = output<string>();
  public maxValue = output<string>();

  public minInput = viewChild<ElementRef<HTMLInputElement>>('minInput');
  public maxInput = viewChild<ElementRef<HTMLInputElement>>('maxInput');

  public rangeReset(): void {
    const minElement = this.minInput();
    const maxElement = this.maxInput();
    if (minElement) {
      minElement.nativeElement.value = '';
    }
    if (maxElement) {
      maxElement.nativeElement.value = '';
    }
  }

  public change(value: string, type: string): void {
    const minElement = this.minInput();
    const maxElement = this.maxInput();

    if (type === 'maxValue' && maxElement) {
      maxElement.nativeElement.value = maxElement.nativeElement.value.replace(
        /[^0-9]/g,
        ''
      );

      this.maxValue.emit(maxElement.nativeElement.value);
    }

    if (type === 'minValue' && minElement) {
      minElement.nativeElement.value = minElement.nativeElement.value.replace(
        /[^0-9]/g,
        ''
      );

      this.minValue.emit(minElement.nativeElement.value);
    }
  }
}
