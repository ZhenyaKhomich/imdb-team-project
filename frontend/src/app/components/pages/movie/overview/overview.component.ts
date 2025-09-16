import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import type { Director, Star, Writer } from '../../../../shared/types/movies';
import { MatIconModule } from '@angular/material/icon';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';
import { NgOptimizedImage } from '@angular/common';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-overview',
  imports: [
    MinutesToHoursPipe,
    MatIconModule,
    NumberSuffixPipe,
    NgOptimizedImage,
    SafeUrlPipe,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  public type = input<string>('');
  public img = input<string>('');
  public title = input<string>('');
  public year = input<number>(0);
  public endYear = input<number>(0);
  public time = input<number>(0);
  public genres = input<string[]>([]);
  public trillers = input<string[]>([]);
  public plot = input<string>('');
  public directors = input<Pick<Director, 'id' | 'displayName'>[]>([]);
  public writers = input<Pick<Writer, 'id' | 'displayName'>[]>([]);
  public stars = input<Pick<Star, 'id' | 'displayName'>[]>([]);
  public rating = input<number>(0);
  public vote = input<number>(0);
  public favorite = input<boolean>(false);
  public favoriteId = output();

  public urlTriller = computed(() => {
    const currentEmbedUrl = this.trillers();
    if (currentEmbedUrl.length > 0) {
      return `https://www.youtube.com/embed/${currentEmbedUrl[0]}?enablejsapi=1&modestbranding=1&rel=0&controls=1&showinfo=0&iv_load_policy=3&fs=0`;
    }
    return '';
  });

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
