import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { RequestsEnum } from '../enums/requests.enum';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('HTTP', () => {
    it('should GET titles without params', () => {
      service.getTitles().subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        (r) =>
          r.method === 'GET' &&
          r.url === `https://api.imdbapi.dev/${RequestsEnum.TITLES}` &&
          !r.params.keys().length
      );

      expect(request.request.method).toBe('GET');
      expect(request.request.params.keys().length).toBe(0);

      request.flush({});
    });

    it('GET titles', () => {
      const parameters = {
        query: 'inception',
        page: 2,
        genre: ['action', 'sci-fi'],
      };

      service.getTitles(parameters).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        `https://api.imdbapi.dev/${RequestsEnum.TITLES}?query=inception&page=2&genre=action&genre=sci-fi`
      );

      expect(request.request.method).toBe('GET');

      expect(request.request.params.get('query')).toBe('inception');
      expect(request.request.params.get('page')).toBe('2');
      const genres = request.request.params.getAll('genre');
      expect(genres).toEqual(['action', 'sci-fi']);

      request.flush({});
    });

    it('GET title', () => {
      const id = 'tt1375666';

      service.getTitle(id).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        `https://api.imdbapi.dev/${RequestsEnum.TITLES}/${id}`
      );
      expect(request.request.method).toBe('GET');
      request.flush({});
    });

    it('GET videos', () => {
      const id = 'tt1375666';

      service.getVideos(id).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        `https://api.imdbapi.dev/${RequestsEnum.TITLES}/${id}/videos`
      );
      expect(request.request.method).toBe('GET');
      request.flush({});
    });

    it('GET companies', () => {
      const id = 'tt1375666';

      service.getCompanies(id).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        `https://api.imdbapi.dev/${RequestsEnum.TITLES}/${id}/companyCredits`
      );
      expect(request.request.method).toBe('GET');
      request.flush({});
    });

    it('GET images', () => {
      const id = 'tt1375666';

      service.getImages(id).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const request = httpMock.expectOne(
        `https://api.imdbapi.dev/${RequestsEnum.TITLES}/${id}/images`
      );
      expect(request.request.method).toBe('GET');
      request.flush({});
    });
  });
});
