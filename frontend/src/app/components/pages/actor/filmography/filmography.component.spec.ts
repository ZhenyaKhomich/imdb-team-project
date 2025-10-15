import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FilmographyComponent } from './filmography.component';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';
import { By } from '@angular/platform-browser';

describe('FilmographyComponent', () => {
  let fixture: ComponentFixture<FilmographyComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        FilmographyComponent,
        NgOptimizedImage,
        MatIconModule,
        NumberSuffixPipe,
      ],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmographyComponent);
  });

  function setFilms(films: unknown[]): void {
    fixture.componentRef.setInput('films', films);
    fixture.detectChanges();
  }

  it('render', () => {
    setFilms([
      {
        title: {
          id: 'tt123',
          primaryTitle: 'Test Movie',
          primaryImage: { url: 'http://test.com/poster.jpg' },
          type: 'movie',
          rating: { aggregateRating: 7.5, voteCount: 1000 },
          startYear: 2020,
        },
        category: 'actor',
        characters: ['John Doe'],
      },
    ]);

    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.textContent).toContain('Test Movie');
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
  });

  it('no poster', () => {
    setFilms([{ title: { id: 'tt456', primaryTitle: 'No Poster Movie' } }]);

    const errorImg = fixture.debugElement.query(
      By.css('.error-img')
    ).nativeElement;
    expect(errorImg.textContent).toContain('no poster');
  });

  it('detail', () => {
    setFilms([
      {
        title: {
          id: 'tt789',
          primaryTitle: 'Clickable Movie',
          primaryImage: { url: 'http://x.jpg' },
        },
      },
    ]);

    const clickable = fixture.debugElement.query(By.css('.click-detail'));
    clickable.triggerEventHandler('click', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies', 'tt789']);
  });

  it('stars', () => {
    setFilms([
      {
        title: {
          id: 'tt999',
          primaryTitle: 'Rated Movie',
          primaryImage: { url: 'http://x.jpg' },
          rating: { aggregateRating: 8.3, voteCount: 500 },
        },
      },
    ]);

    const stars = fixture.debugElement.queryAll(By.css('.icon-star'));
    expect(stars.length).toBeGreaterThan(0);
  });

  it('characters', () => {
    setFilms([
      {
        title: {
          id: 'tt111',
          primaryTitle: 'Character Movie',
          primaryImage: { url: 'http://x.jpg' },
        },
        characters: ['Hero', 'Villain'],
      },
    ]);

    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Hero, Villain');
  });
});
