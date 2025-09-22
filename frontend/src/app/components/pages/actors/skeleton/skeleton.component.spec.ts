import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.view()).toBe('grid');
    expect(component.count().length).toBe(20);
  });

  it('grid view', () => {
    const gridElement = fixture.debugElement.query(By.css('.grid'));
    expect(gridElement).toBeTruthy();

    const movieGridElements = fixture.debugElement.queryAll(
      By.css('.movie-grid')
    );
    expect(movieGridElements.length).toBe(20);
  });

  it('correct elements', () => {
    fixture.detectChanges();

    const movieGridElements = fixture.debugElement.queryAll(
      By.css('.movie-grid')
    );
    expect(movieGridElements.length).toBe(20);
  });

  it('grid view', () => {
    const skeletonImageElements = fixture.debugElement.queryAll(
      By.css('.skeleton.image-movie')
    );
    expect(skeletonImageElements.length).toBe(20);

    const skeletonTitleElements = fixture.debugElement.queryAll(
      By.css('.skeleton.title')
    );
    expect(skeletonTitleElements.length).toBe(20);

    const skeletonTimeElements = fixture.debugElement.queryAll(
      By.css('.skeleton.time')
    );
    expect(skeletonTimeElements.length).toBe(20);

    const skeletonRatingElements = fixture.debugElement.queryAll(
      By.css('.skeleton.rating')
    );
    expect(skeletonRatingElements.length).toBe(20);

    const skeletonGenresElements = fixture.debugElement.queryAll(
      By.css('.skeleton.genres')
    );
    expect(skeletonGenresElements.length).toBe(20);
  });
});
