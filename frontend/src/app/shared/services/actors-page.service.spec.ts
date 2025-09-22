import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActorsPageService } from './actors-page.service';
import { environment } from '../../../environments/environment';
import { RequestsEnum } from '../enums/requests.enum';

describe('ActorsPageService', () => {
  let service: ActorsPageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActorsPageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ActorsPageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('create', () => {
    expect(service).toBeTruthy();
  });

  it('getActors', () => {
    service.getActors().subscribe();

    const request = httpMock.expectOne(
      environment.baseUrl + RequestsEnum.ALL_ACTORS
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.params.keys().length).toBe(0);

    request.flush({ names: [], nextPageToken: '' });
  });

  it('getActors', () => {
    service.getActors({ page: '2', filter: 'popular' }).subscribe();

    const request = httpMock.expectOne(
      (r) => r.url === environment.baseUrl + RequestsEnum.ALL_ACTORS
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('filter')).toBe('popular');

    request.flush({ names: [], nextPageToken: '' });
  });

  it('getActor correct URL', () => {
    const id = '123';
    service.getActor(id).subscribe();

    const request = httpMock.expectOne(
      environment.baseUrl + RequestsEnum.ACTOR + '/' + id
    );
    expect(request.request.method).toBe('GET');

    request.flush({ id, displayName: 'Test Actor' });
  });
});
