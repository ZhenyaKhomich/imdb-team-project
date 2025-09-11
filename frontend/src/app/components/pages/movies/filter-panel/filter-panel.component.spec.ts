import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FilterPanelComponent } from './filter-panel.component';
import { MatIconModule } from '@angular/material/icon';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanelComponent, MatIconModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.genres()).toBeDefined();
    expect(component.titleTypes()).toBeDefined();
  });

  it('show title and icon filter', () => {
    const titleElement = fixture.debugElement.query(By.css('h3'));
    expect(titleElement.nativeElement.textContent).toContain('Filters');

    const iconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconElement).toBeTruthy();
  });

  it('show filter category', () => {
    const categoryElements = fixture.debugElement.queryAll(
      By.css('.filter-category')
    );
    expect(categoryElements.length).toBe(4);

    const categoryTitles = categoryElements.map((element) =>
      element.query(By.css('h4')).nativeElement.textContent.trim()
    );
    expect(categoryTitles).toContain('Genres');
    expect(categoryTitles).toContain('Title type');
    expect(categoryTitles).toContain('Release year');
    expect(categoryTitles).toContain('IMDb rating');
  });

  it('show button reset', () => {
    const resetButton = fixture.debugElement.query(By.css('.button'));
    expect(resetButton.nativeElement.textContent).toContain('Reset');
  });

  it('interaction with genres', () => {
    component.chooseGenres(true, 'Action');
    expect(component.genresSort()).toContain('Action');

    component.chooseGenres(false, 'Action');
    expect(component.genresSort()).not.toContain('Action');
  });

  it('call choseGenres', () => {
    const emitSpy = spyOn(component.choseGenres, 'emit');

    component.chooseGenres(true, 'Action');
    expect(emitSpy).toHaveBeenCalledWith(['Action']);

    component.chooseGenres(true, 'Comedy');
    expect(emitSpy).toHaveBeenCalledWith(['Action', 'Comedy']);
  });

  it('interaction with types', () => {
    component.chooseTypes(true, 'MOVIE');
    expect(component.typesSort()).toContain('MOVIE');

    component.chooseTypes(false, 'MOVIE');
    expect(component.typesSort()).not.toContain('MOVIE');
  });

  it('call choseTypes', () => {
    const emitSpy = spyOn(component.choseTypes, 'emit');

    component.chooseTypes(true, 'MOVIE');
    expect(emitSpy).toHaveBeenCalledWith(['MOVIE']);

    component.chooseTypes(true, 'TV_SERIES');
    expect(emitSpy).toHaveBeenCalledWith(['MOVIE', 'TV_SERIES']);
  });

  it('call output input', () => {
    const yearMinSpy = spyOn(component.choseYearMin, 'emit');
    const yearMaxSpy = spyOn(component.choseYearMax, 'emit');
    const ratingMinSpy = spyOn(component.choseRatingMin, 'emit');
    const ratingMaxSpy = spyOn(component.choseRatingMax, 'emit');
    const votesMinSpy = spyOn(component.choseVotesMin, 'emit');
    const votesMaxSpy = spyOn(component.choseVotesMax, 'emit');

    component.choseYearMin.emit('2005');
    component.choseYearMax.emit('2015');
    component.choseRatingMin.emit('6.0');
    component.choseRatingMax.emit('8.5');
    component.choseVotesMin.emit('5000');
    component.choseVotesMax.emit('500000');

    expect(yearMinSpy).toHaveBeenCalledWith('2005');
    expect(yearMaxSpy).toHaveBeenCalledWith('2015');
    expect(ratingMinSpy).toHaveBeenCalledWith('6.0');
    expect(ratingMaxSpy).toHaveBeenCalledWith('8.5');
    expect(votesMinSpy).toHaveBeenCalledWith('5000');
    expect(votesMaxSpy).toHaveBeenCalledWith('500000');
  });

  it('call reset', () => {
    component.genresSort.set(['Action', 'Comedy']);
    component.typesSort.set(['MOVIE', 'TV_SERIES']);

    const resetSpy = spyOn(component.resetClick, 'emit');

    component.reset();

    expect(component.genresSort()).toEqual([]);
    expect(component.typesSort()).toEqual([]);

    expect(resetSpy).toHaveBeenCalled();
  });

  it('modal', () => {
    expect(fixture.debugElement.classes['modal']).toBeFalsy();
    expect(fixture.debugElement.classes['modal']).toBeFalsy();
  });
  it('show correct input', () => {
    const rangeElements = fixture.debugElement.queryAll(By.css('app-range'));
    expect(rangeElements.length).toBe(3);
  });
});
