import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './services/navigation.service';
import { SectionComponent } from './section/section.component';
import { MoviesService } from '../../../shared/services/movies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { OverviewComponent } from './overview/overview.component';
import { CompanyComponent } from './company/company.component';
import { VideosComponent } from './videos/videos.component';
import { MatIconModule } from '@angular/material/icon';
import { ImagesComponent } from './images/images.component';
import { SignalService } from '../../../shared/services/signal.service';
import { WatchlistService } from '../../../shared/services/watchlist.service';

@Component({
  selector: 'app-movie',
  imports: [
    NavigationComponent,
    MatIconModule,
    SectionComponent,
    OverviewComponent,
    CompanyComponent,
    VideosComponent,
    ImagesComponent,
  ],
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
  public loadingTitles = signal(false);
  public currentUrl = window.location.pathname;
  public isPrevImageActive = signal(false);
  public isNextImageActive = signal(true);
  public isPrevVideoActive = signal(false);
  public isNextVideoActive = signal(true);
  public signalService = inject(SignalService);
  public watchlistService = inject(WatchlistService);

  public images = viewChild(ImagesComponent);

  public videos = viewChild(VideosComponent);

  public data = toSignal(this.movie.getTitle(this.id() || ''), {
    initialValue: null,
  });

  public dataVideo = toSignal(this.movie.getVideos(this.id() || ''), {
    initialValue: null,
  });

  public dataImage = toSignal(this.movie.getImages(this.id() || ''), {
    initialValue: null,
  });

  public dataCompany = toSignal(this.movie.getCompanies(this.id() || ''), {
    initialValue: { companyCredits: [], totalCount: 0, nextPageToken: '' },
  });

  public type = computed(() => {
    const currentData = this.data();
    if (currentData && 'type' in currentData) {
      return currentData.type[0].toUpperCase() + currentData.type.slice(1);
    }
    return '';
  });

  public urlImages = computed(() => {
    const currentData = this.dataImage();
    if (
      currentData &&
      'images' in currentData &&
      Array.isArray(currentData.images)
    ) {
      return (
        currentData.images.map((element: { url: string }) => element.url) || []
      );
    }
    return [];
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

  public isFavorite = computed(() => {
    return this.movie.favoriteId().includes(this.id() || '');
  });

  constructor() {
    this.navService.initScrollTracking(true);

    effect((clearUp) => {
      const currentData = this.data();
      if (currentData && 'primaryTitle' in currentData) {
        this.title.setTitle(currentData.primaryTitle || 'Movie not found');
      } else {
        this.title.setTitle('Movie not found');
      }

      clearUp(() => this.navService.initScrollTracking(false));
    });
  }

  public favoriteId(state: boolean): void {
    if (!state) {
      this.watchlistService.deleteMovie(this.id() || '');
    } else {
      const currentData = this.data();
      if (currentData && 'primaryTitle' in currentData) {
        const movieData = {
          id: currentData.id,
          type: currentData.type,
          primaryTitle: currentData.primaryTitle,
          primaryImage: currentData.primaryImage,
          startYear: currentData.startYear,
          endYear: currentData.endYear,
          runtimeSeconds: currentData.runtimeSeconds || 0,
          genres: currentData.genres,
          rating: currentData.rating,
          plot: currentData.plot,
        };
        this.watchlistService.addMovie(movieData);
      }
    }
  }

  public imagePrev(): void {
    if (this.images()) {
      this.images()?.prev();
    }
  }

  public imageNext(): void {
    if (this.images()) {
      this.images()?.next();
    }
  }

  public videoPrev(): void {
    if (this.videos()) {
      this.videos()?.prev();
    }
  }

  public videoNext(): void {
    if (this.videos()) {
      this.videos()?.next();
    }
  }
}
