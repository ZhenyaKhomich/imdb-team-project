import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import type { Credit } from '../../../../shared/types/actors-page';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';

@Component({
  selector: 'app-filmography',
  imports: [NgOptimizedImage, MatIconModule, NumberSuffixPipe],
  templateUrl: './filmography.component.html',
  styleUrl: './filmography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmographyComponent {
  public films = input<Credit[]>([]);

  public router = inject(Router);

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

  public detail(id: string): void {
    this.router.navigate(['/movies', id]);
  }

  public characters(characters: string[]): string {
    return characters.join(', ');
  }
}
