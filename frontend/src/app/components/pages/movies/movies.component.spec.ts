import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { MoviesComponent } from './movies.component';
import { FilterService } from './services/filter.service';
import { NumberSuffixPipe } from '../../../shared/pipes/number-suffix.pipe';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { MinutesToHoursPipe } from '../../../shared/pipes/minutes-to-hours.pipe';
import type { FilmDataType } from '../../../shared/types/movies-response.type';
import type { MoviesService } from '../../../shared/services/movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockFilterService: jasmine.SpyObj<FilterService>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;

  const mockFilms: FilmDataType [] = [
    {
      id: '1',
      type: 'movie',
      primaryTitle: 'Test Film 1',
      startYear: 2020,
      runtimeSeconds: 3660,
      rating: {
        aggregateRating: 8.5,
        voteCount: 1000,
      },
      genres: ['Action', 'Adventure'],
      plot: 'Test plot 1',
      primaryImage: {
        url: 'test1.jpg',
      },
    },
  ];

  const mockData = {
    titles: mockFilms,
    totalCount: 100,
    nextPageToken: 'next-token',
  };

  beforeEach(async () => {
    mockBreakpointObserver = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    mockBreakpointObserver.observe.and.returnValue(
      of({ matches: false, breakpoints: {} })
    );

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    mockFilterService = jasmine.createSpyObj('FilterService', [
      'listGenres',
      'types',
      'rangeInputs',
      'updateGenres',
      'updateTypes',
      'reset',
      'updateRangeInputs',
      'sortBy',
    ]);
    mockFilterService.listGenres.and.returnValue([]);
    mockFilterService.types.and.returnValue([]);
    mockFilterService.rangeInputs.and.returnValue({
      yearMin: '',
      yearMax: '',
      ratingMin: '',
      ratingMax: '',
      votesMin: '',
      votesMax: '',
    });
    mockFilterService.sortBy.and.returnValue([]);

    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getTitles']);
    mockMoviesService.getTitles.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: MatDialog, useValue: mockDialog },
        { provide: FilterService, useValue: mockFilterService },
        { provide: 'MoviesService', useValue: mockMoviesService },
        MinutesToHoursPipe,
        NumberSuffixPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.currentPage()).toBe(1);
    expect(component.selectedValue()).toBe('');
    expect(component.desc()).toBe(false);
    expect(component.loading()).toBe(false);
    expect(component.view()).toBe('detail');
    expect(component.totalPage()).toBe(0);
    expect(component.lastPage()).toBe(false);
  });

  it('firstPage', () => {
    expect(component.firstPage()).toBe(true);

    component.currentPage.set(2);
    expect(component.firstPage()).toBe(false);
  });

  it('finishCurrentPage', () => {
    component.totalPage.set(100);
    expect(component.finishCurrentPage()).toBe(50);

    component.currentPage.set(2);
    expect(component.finishCurrentPage()).toBe(100);

    component.totalPage.set(30);
    expect(component.finishCurrentPage()).toBe(30);
  });

  it('startCurrentPage', () => {
    expect(component.startCurrentPage()).toBe(1);

    component.currentPage.set(2);
    expect(component.startCurrentPage()).toBe(51);
  });

  it('selectedValue', () => {
    const querySpy = spyOn(component.query, 'update');

    component.changeSelect('SORT_BY_POPULARITY');

    expect(component.selectedValue()).toBe('SORT_BY_POPULARITY');
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();
  });

  it('modal', () => {
    component.openFilterModal();

    expect(mockDialog.open).toHaveBeenCalledWith(FilterModalComponent, {
      width: '90%',
      maxWidth: '800px',
      data: jasmine.any(Object),
    });
  });

  it('changeView', () => {
    component.changeView('grid');
    expect(component.view()).toBe('grid');

    component.changeView('compact');
    expect(component.view()).toBe('compact');

    component.changeView('detail');
    expect(component.view()).toBe('detail');
  });

  it('choseGenres', () => {
    const querySpy = spyOn(component.query, 'update');

    component.choseGenres(['Action', 'Comedy']);

    expect(mockFilterService.updateGenres).toHaveBeenCalled();
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();
  });

  it('choseTypes', () => {
    const querySpy = spyOn(component.query, 'update');

    component.choseTypes(['MOVIE', 'TV_SERIES']);

    expect(mockFilterService.updateTypes).toHaveBeenCalled();
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();
  });

  it('reset', () => {
    const querySpy = spyOn(component.query, 'set');

    component.reset();

    expect(mockFilterService.reset).toHaveBeenCalled();
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalledWith({});
  });

  it('updateRangeInput', () => {
    const querySpy = spyOn(component.query, 'update');

    component.updateRangeInput('yearMin', '2000');
    expect(mockFilterService.updateRangeInputs).toHaveBeenCalledWith(
      'yearMin',
      '2000'
    );
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();

    component.updateRangeInput('ratingMax', '9.0');
    expect(querySpy).toHaveBeenCalled();
  });

  it('sortOrder', () => {
    const querySpy = spyOn(component.query, 'update');

    component.sortOrder();

    expect(component.desc()).toBe(true);
    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();
  });

  it('nextPage', () => {
    component.nextPageToken.set('next-token');
    const querySpy = spyOn(component.query, 'update');

    component.nextPage();

    expect(component.currentPage()).toBe(2);
    expect(querySpy).toHaveBeenCalled();
  });

  it('prevPage', () => {
    component.currentPage.set(2);
    component.prevPageToken.set('prev-token');
    const querySpy = spyOn(component.query, 'update');

    component.prevPage();

    expect(component.currentPage()).toBe(1);
    expect(querySpy).toHaveBeenCalled();
  });

  it('show error', fakeAsync(() => {
    mockMoviesService.getTitles.and.returnValue(
      throwError(() => new Error('Test error'))
    );

    component.query.set({ genre: 'Action' });
    tick(500);

    expect(component.loading()).toBe(false);
  }));

  it('isMobile', () => {
    const sidebar = fixture.debugElement.query(By.css('.sidebar'));
    expect(sidebar).toBeTruthy();
  });

  it('skeleton', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.css('app-skeleton'));
    expect(skeleton).toBeTruthy();
  });

  it('show list', () => {
    component.loading.set(false);
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('app-list'));
    expect(list).toBeTruthy();
  });
});
