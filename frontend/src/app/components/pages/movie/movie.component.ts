import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './services/navigation.service';
import { SectionComponent } from './section/section.component';
import { MoviesService } from '../../../shared/services/movies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-movie',
  imports: [NavigationComponent, SectionComponent, OverviewComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  public route = inject(ActivatedRoute);
  public id = signal(this.route.snapshot.paramMap.get('id'));
  public movie = inject(MoviesService);
  public title = inject(Title);
  public navService = inject(NavigationService);

  public data = toSignal(this.movie.getTitle(this.id() || ''), {
    initialValue: null,
  });

  public type = computed(() => {
    const currentData = this.data();
    if (currentData && 'type' in currentData) {
      return currentData.type[0].toUpperCase() + currentData.type.slice(1);
    }
    return '';
  });

  public titleMovie = computed(() => {
    const currentData = this.data();
    if (currentData && 'primaryTitle' in currentData) {
      return currentData.primaryTitle;
    }
    return '';
  });

  public year = computed(() => {
    const currentData = this.data();
    if (currentData && 'startYear' in currentData) {
      return currentData.startYear;
    }
    return 0;
  });

  public endYear = computed<number>(() => {
    const currentData = this.data();
    if (currentData && 'endYear' in currentData) {
      return currentData.endYear || 0;
    }
    return 0;
  });

  public time = computed<number>(() => {
    const currentData = this.data();
    if (currentData && 'runtimeSeconds' in currentData) {
      return currentData.runtimeSeconds || 0;
    }
    return 0;
  });

  public genres = computed(() => {
    const currentData = this.data();
    if (currentData && 'genres' in currentData) {
      return currentData.genres;
    }
    return [];
  });

  public plot = computed(() => {
    const currentData = this.data();
    if (currentData && 'plot' in currentData) {
      return currentData.plot;
    }
    return '';
  });

  public directors = computed(() => {
    const currentData = this.data();
    if (currentData && 'directors' in currentData) {
      return currentData.directors.map((element) => ({
        displayName: element.displayName,
        id: element.id,
      }));
    }
    return [];
  });

  public writers = computed(() => {
    const currentData = this.data();
    if (currentData && 'writers' in currentData) {
      return currentData.writers.map((element) => ({
        displayName: element.displayName,
        id: element.id,
      }));
    }
    return [];
  });

  public stars = computed(() => {
    const currentData = this.data();
    if (currentData && 'stars' in currentData) {
      return currentData.stars.map((element) => ({
        displayName: element.displayName,
        id: element.id,
      }));
    }
    return [];
  });

  public rating = computed(() => {
    const currentData = this.data();
    if (currentData && 'rating' in currentData) {
      return currentData.rating?.aggregateRating || 0;
    }
    return 0;
  });

  public vote = computed(() => {
    const currentData = this.data();
    if (currentData && 'rating' in currentData) {
      return currentData.rating?.voteCount || 0;
    }
    return 0;
  });

  public img = computed(() => {
    const currentData = this.data();
    if (currentData && 'primaryImage' in currentData) {
      return currentData.primaryImage?.url || '';
    }
    return '';
  });

  public backgroundUrl = computed(() => {
    const currentData = this.data();
    if (currentData && 'primaryImage' in currentData) {
      return currentData.primaryImage?.url
        ? `url(${currentData.primaryImage.url})`
        : '';
    }
    return '';
  });

  constructor() {
    this.navService.initScrollTracking();

    effect(() => {
      const currentData = this.data();
      if (currentData && 'primaryTitle' in currentData) {
        this.title.setTitle(currentData.primaryTitle || 'Movie not found');
      } else {
        this.title.setTitle('Movie not found');
      }
    });
  }
}
