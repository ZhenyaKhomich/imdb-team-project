import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import type {FilmDataType} from '../../../../shared/types/movies-response.type';

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
  public films = input<FilmDataType[]>();
  public favoriteId = output<string>();
  public toggleFavorite(id: string): void {
    this.favoriteId.emit(id);
  }

  public isPathStar(rating: number): boolean {
    return Math.floor(rating) < rating;
  }

  public pathStar(rating: number): number {
    return (rating - Math.floor(rating)) * 100;
  }

  public fullStars(rating: number): number[] {
    return Array(Math.floor(rating))
      .fill(0)
      .map((_, i) => i);
  }

  public emptyStars(rating: number): number[] {
    if (rating - Math.floor(rating) === 0) {
      return 10 - rating > 0
        ? Array(10 - rating)
            .fill(0)
            .map((_, i) => i)
        : [];
    }
    return Array(10 - Math.ceil(rating))
      .fill(0)
      .map((_, i) => i);
  }
}
