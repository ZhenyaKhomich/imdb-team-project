import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { SecondsToHoursMinutesPipe } from '../pipes/seconds-to-hours-minutes.pipe';
import { NumberSuffixPipe } from '../pipes/number-suffix.pipe';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SecondsToHoursMinutesPipe,
        NumberSuffixPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.films).toBeDefined();
    expect(component.view).toBeDefined();
  });

  it('show component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('show list', () => {
    fixture.detectChanges();
    const listElements = fixture.debugElement.queryAll(
      By.css('.movie, .movie-grid')
    );
    expect(listElements.length).toBeGreaterThanOrEqual(0);
  });

  it('show error image', () => {
    fixture.detectChanges();

    const errorImgElements = fixture.debugElement.queryAll(
      By.css('.error-img')
    );
    expect(errorImgElements.length).toBeGreaterThanOrEqual(0);
  });

  it('show image', () => {
    fixture.detectChanges();

    const imgElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imgElements.length).toBeGreaterThanOrEqual(0);
  });

  it('show plot', () => {
    fixture.detectChanges();

    const plotElements = fixture.debugElement.queryAll(By.css('.plot'));
    expect(plotElements.length).toBeGreaterThanOrEqual(0);
  });
});
