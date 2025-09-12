import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { RequestsEnum } from '../enums/requests.enum';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.imdbapi.dev/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('GET', () => {
    service.getTitles().subscribe();

    const request = httpMock.expectOne(baseUrl + RequestsEnum.TITLES);
    // const request = httpMock.expectOne(environment.api + RequestsEnum.TITLES);
    expect(request.request.method).toBe('GET');
    expect(request.request.params.keys().length).toBe(0);

    request.flush({});
  });

  it('query', () => {
    service.getTitles({ type: 'MOVIE', year: 2024 }).subscribe();

    const request = httpMock.expectOne(
      (r) =>
        r.url === baseUrl + RequestsEnum.TITLES &&
        r.params.get('type') === 'MOVIE' &&
        r.params.get('year') === '2024'
    );
    // const request = httpMock.expectOne(
    //   (r) =>
    //     r.url === environment.api + RequestsEnum.TITLES &&
    //     r.params.get('type') === 'MOVIE' &&
    //     r.params.get('year') === '2024'
    // );

    expect(request).toBeTruthy();
    expect(request.request.method).toBe('GET');

    request.flush({});
  });

  it('array query', () => {
    service.getTitles({ types: ['MOVIE', 'TV_SERIES'] }).subscribe();

    const request = httpMock.expectOne((r) => {
      const types = r.params.getAll('types');
      return (
        r.url === baseUrl + RequestsEnum.TITLES &&
        types !== null &&
        types.includes('MOVIE') &&
        types.includes('TV_SERIES')
      );
      // return (
      //   r.url === environment.api + RequestsEnum.TITLES &&
      //   types !== null &&
      //   types.includes('MOVIE') &&
      //   types.includes('TV_SERIES')
      // );
    });

    expect(request).toBeTruthy();
    expect(request.request.method).toBe('GET');

    request.flush({});
  });
});
