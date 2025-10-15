import { computed, Injectable, signal } from '@angular/core';

export interface FilterOptions {
  category?: string;
  priceRange?: { min: number; max: number };
  inStock?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public currentFilters = computed(() => this.filtersSource());

  public rangeInputs = signal({
    yearMin: '',
    yearMax: '',
    ratingMin: '',
    ratingMax: '',
    votesMin: '',
    votesMax: '',
  });

  public listGenres = signal([
    { value: 'Adventure', status: false },
    { value: 'Action', status: false },
    { value: 'Animation', status: false },
    { value: 'Anime', status: false },
    { value: 'Comedy', status: false },
    { value: 'Crime', status: false },
    { value: 'Documentary', status: false },
    { value: 'Drama', status: false },
    { value: 'Family', status: false },
    { value: 'Fantasy', status: false },
    { value: 'Horror', status: false },
    { value: 'Lifestyle', status: false },
    { value: 'Music', status: false },
    { value: 'Musical', status: false },
    { value: 'Mystery', status: false },
    { value: 'Romance', status: false },
    { value: 'Sci-Fi', status: false },
    { value: 'Seasonal', status: false },
    { value: 'Short', status: false },
    { value: 'Sport', status: false },
    { value: 'Thriller', status: false },
    { value: 'Western', status: false },
  ]);

  public types = signal([
    { name: 'Movie', value: 'MOVIE', status: false },
    { name: 'Series', value: 'TV_SERIES', status: false },
    { name: 'Mini Series', value: 'TV_MINI_SERIES', status: false },
    { name: 'Special', value: 'TV_SPECIAL', status: false },
    { name: 'TV Movie', value: 'TV_MOVIE', status: false },
    { name: 'Short', value: 'SHORT', status: false },
    { name: 'Video', value: 'VIDEO', status: false },
    { name: 'Video Game', value: 'VIDEO_GAME', status: false },
  ]);

  public sortBy = signal([
    { name: 'Popularity', value: 'SORT_BY_POPULARITY' },
    { name: 'Rating', value: 'SORT_BY_USER_RATING' },
    { name: 'Rating Count', value: 'SORT_BY_USER_RATING_COUNT' },
    { name: 'Year', value: 'SORT_BY_YEAR' },
  ]);

  public sortOrder = signal(['ASC', 'DESC']);

  private filtersSource = signal<FilterOptions>({});

  public reset(): void {
    this.types.update((element) =>
      [...element].map((element) => ({ ...element, status: false }))
    );
    this.listGenres.update((element) =>
      [...element].map((element) => ({ ...element, status: false }))
    );
    this.rangeInputs.set({
      yearMin: '',
      yearMax: '',
      ratingMin: '',
      ratingMax: '',
      votesMin: '',
      votesMax: '',
    });
  }

  public updateTypes(name?: string, status?: boolean): void {
    if (name && status) {
      this.types.update((element) =>
        [...element].map((element) =>
          element.value === name ? { ...element, status } : element
        )
      );
    } else {
      this.types.update((element) =>
        [...element].map((element) => ({ ...element, status: false }))
      );
    }
  }

  public updateGenres(name?: string, status?: boolean): void {
    if (name && status) {
      this.listGenres.update((element) =>
        [...element].map((element) =>
          element.value === name ? { ...element, status } : element
        )
      );
    } else {
      this.listGenres.update((element) =>
        [...element].map((element) => ({ ...element, status: false }))
      );
    }
  }

  public updateRangeInputs(name: string, value: string): void {
    this.rangeInputs.update((element) => ({ ...element, [name]: value }));
  }
}
