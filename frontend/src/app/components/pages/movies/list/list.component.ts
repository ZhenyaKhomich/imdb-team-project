import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SecondsToHoursMinutesPipe } from '../pipes/seconds-to-hours-minutes.pipe';
import { NumberSuffixPipe } from '../pipes/number-suffix.pipe';
import type { Film } from '../types/types';

@Component({
  selector: 'app-list',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    SecondsToHoursMinutesPipe,
    NumberSuffixPipe,
  ],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  public view = input('grid');
  public favorite = input<string[]>([]);
  public films = input<Film[]>();
  public favoriteId = output<string>();
  public toggleFavorite(id: string): void {
    this.favoriteId.emit(id);
  }
}
