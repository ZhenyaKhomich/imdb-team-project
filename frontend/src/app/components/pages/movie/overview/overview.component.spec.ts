import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<OverviewComponent>;
  let component: OverviewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
  });

  it('render', () => {
    fixture.componentRef.setInput('title', 'Inception');
    fixture.componentRef.setInput('type', 'Movie');
    fixture.componentRef.setInput('year', 2010);

    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Inception');

    const infoElement = fixture.debugElement.query(
      By.css('.info')
    ).nativeElement;
    expect(infoElement.textContent).toContain('Movie');
    expect(infoElement.textContent).toContain('2010');
  });

  it('fullStars', () => {
    expect(component.fullStars(7.3).length).toBe(7);
    expect(component.fullStars(0).length).toBe(0);
  });

  it('isPathStar', () => {
    expect(component.isPathStar(7.5)).toBeTrue();
    expect(component.isPathStar(8)).toBeFalse();
  });

  it('pathStar', () => {
    expect(component.pathStar(7.5)).toBe(50);
    expect(component.pathStar(8)).toBe(0);
  });

  it('emptyStars', () => {
    expect(component.emptyStars(7).length).toBe(3);
    expect(component.emptyStars(7.5).length).toBe(2);
    expect(component.emptyStars(10).length).toBe(0);
  });

  it('urlTriller', () => {
    fixture.componentRef.setInput('trillers', [{ id: 'abc123' }]);
    expect(component.urlTriller()).toBe(
      'https://www.imdb.com/video/imdb/abc123/imdb/embed'
    );

    fixture.componentRef.setInput('trillers', []);
    expect(component.urlTriller()).toBe('');
  });

  it('favoriteId', () => {
    spyOn(component.favoriteId, 'emit');

    fixture.detectChanges();

    const bookmark = fixture.debugElement.query(By.css('.bookmark'));
    bookmark.triggerEventHandler('click');

    expect(component.favoriteId.emit).toHaveBeenCalled();
  });
});
