import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { Film } from '../types/types';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-list',
  imports: [
    NgOptimizedImage,
    MatIconModule,
    MinutesToHoursPipe,
    NumberSuffixPipe,
    TruncatePipe,
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
