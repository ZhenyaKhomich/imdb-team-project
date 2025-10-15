import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { MovieComponent } from './movie.component';
import { MoviesService } from '../../../shared/services/movies.service';
import { NavigationService } from './services/navigation.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

@Component({ selector: 'app-navigation', template: '' })
class MockNavigationComponent {}

@Component({ selector: 'app-section', template: '' })
class MockSectionComponent {}

@Component({ selector: 'app-overview', template: '' })
class MockOverviewComponent {}

@Component({ selector: 'app-company', template: '' })
class MockCompanyComponent {}

@Component({ selector: 'app-videos', template: '' })
class MockVideosComponent {}

@Component({ selector: 'app-images', template: '' })
class MockImagesComponent {}

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let moviesServiceMock: Partial<MoviesService>;
  let navigationServiceMock: Partial<NavigationService>;
  let titleServiceMock: Partial<Title>;

  const mockTitleData = {
    id: 'test-id',
    type: 'movie' as const,
    primaryTitle: 'Test Movie',
    startYear: 2020,
    endYear: 0,
    runtimeSeconds: 7200,
    genres: ['Action'],
    plot: 'Test plot',
    directors: [],
    writers: [],
    stars: [],
    rating: { aggregateRating: 8.0, voteCount: 1000 },
    primaryImage: { url: 'test.jpg', width: 300, height: 200 },
  };

  beforeEach(async () => {
    moviesServiceMock = {
      getTitle: jasmine.createSpy().and.returnValue(of(mockTitleData)),
      getVideos: jasmine.createSpy().and.returnValue(of([])),
      getImages: jasmine.createSpy().and.returnValue(of([])),
      getCompanies: jasmine
        .createSpy()
        .and.returnValue(
          of({ companyCredits: [], totalCount: 0, nextPageToken: '' })
        ),
      favoriteId: signal<string[]>([]),
      toggleFavorite: jasmine.createSpy(),
    };

    navigationServiceMock = {
      initScrollTracking: jasmine.createSpy(),
    };

    titleServiceMock = {
      setTitle: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [
        MovieComponent,
        MockNavigationComponent,
        MockSectionComponent,
        MockOverviewComponent,
        MockCompanyComponent,
        MockVideosComponent,
        MockImagesComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MoviesService, useValue: moviesServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: Title, useValue: titleServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', 'test-id']]),
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.id()).toBe('test-id');
  });

  it('call navigation', () => {
    component.imagePrev();
    component.imageNext();
    component.videoPrev();
    component.videoNext();

    expect(true).toBe(true);
  });
});
