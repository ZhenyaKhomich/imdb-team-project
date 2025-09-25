import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
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
});
