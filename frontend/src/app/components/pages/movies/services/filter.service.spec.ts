import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterService } from './filter.service';
import type { Data } from '../types/types';

describe('FilterService', () => {
  let service: FilterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FilterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('initial signal', () => {
    expect(service.currentFilters()).toEqual({});
    expect(service.favoriteId()).toEqual([]);
    expect(service.rangeInputs()).toEqual({
      yearMin: '',
      yearMax: '',
      ratingMin: '',
      ratingMax: '',
      votesMin: '',
      votesMax: '',
    });
    expect(service.listGenres().length).toBe(22);
    expect(service.types().length).toBe(8);
    expect(service.sortBy().length).toBe(4);
    expect(service.sortOrder()).toEqual(['ASC', 'DESC']);
  });

  it('update types', () => {
    service.updateTypes('MOVIE', true);
    const updatedType = service.types().find((t) => t.value === 'MOVIE');
    expect(updatedType).toBeDefined();
    expect(updatedType!.status).toBeTrue();
  });

  it('update favorites', () => {
    service.toggleFavorite('test-id');
    expect(service.favoriteId()).toContain('test-id');

    service.toggleFavorite('test-id');
    expect(service.favoriteId()).not.toContain('test-id');
  });

  it('update range inputs', () => {
    service.updateRangeInputs('yearMin', '2000');
    expect(service.rangeInputs().yearMin).toBe('2000');
  });

  it('reset filters', () => {
    service.updateTypes('MOVIE', true);
    service.updateGenres('Action', true);
    service.updateRangeInputs('yearMin', '1990');

    service.reset();

    expect(service.types().every((t) => !t.status)).toBeTrue();
    expect(service.listGenres().every((g) => !g.status)).toBeTrue();
    expect(service.rangeInputs()).toEqual({
      yearMin: '',
      yearMax: '',
      ratingMin: '',
      ratingMax: '',
      votesMin: '',
      votesMax: '',
    });
  });
  it('request', () => {
    const mockResponse: Data = {};
    const testParameters = { genre: 'Action', year: 2020 };

    service.getTitles(testParameters).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const request = httpTestingController.expectOne(
      'https://api.imdbapi.dev/titles?genre=Action&year=2020'
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('query array', () => {
    const mockResponse: Data = {};
    const testParameters = { genre: ['Action', 'Drama'] };

    service.getTitles(testParameters).subscribe();

    const request = httpTestingController.expectOne((request_) => {
      if (!request_.params) return false;
      const genreParameters = request_.params.getAll('genre') || [];
      return (
        request_.url === 'https://api.imdbapi.dev/titles' &&
        genreParameters.includes('Action') &&
        genreParameters.includes('Drama')
      );
    });
    request.flush(mockResponse);
  });

  it('check currentFilters', () => {
    service.updateTypes('MOVIE', true);
    service.updateGenres('Action', true);

    expect(service.currentFilters()).toEqual({});
  });

  it('check getTitles', () => {
    const mockResponse: Data = {};

    service.getTitles().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const request = httpTestingController.expectOne(
      'https://api.imdbapi.dev/titles'
    );
    expect(request.request.params.keys().length).toBe(0);
    request.flush(mockResponse);
  });
});
