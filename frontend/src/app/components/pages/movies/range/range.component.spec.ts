import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.minPlaceholder()).toBe('');
    expect(component.maxPlaceholder()).toBe('');
    expect(component.minValueStart()).toBe('');
    expect(component.maxValueStart()).toBe('');
    expect(component.min()).toBe(0);
    expect(component.max()).toBe(Infinity);
    expect(component.step()).toBe(1);
  });

  it('show input value', () => {
    fixture.detectChanges();

    const minInput = fixture.debugElement.query(
      By.css('input[type="number"]:first-child')
    );
    const maxInput = fixture.debugElement.query(
      By.css('input[type="number"]:last-child')
    );

    expect(minInput).toBeTruthy();
    expect(maxInput).toBeTruthy();
    expect(minInput.nativeElement.type).toBe('number');
    expect(maxInput.nativeElement.type).toBe('number');
  });

  it('change', () => {
    const minValueSpy = spyOn(component.minValue, 'emit');
    const maxValueSpy = spyOn(component.maxValue, 'emit');
    fixture.detectChanges();

    const minInput = fixture.debugElement.query(
      By.css('input[type="number"]:first-child')
    );
    const maxInput = fixture.debugElement.query(
      By.css('input[type="number"]:last-child')
    );

    minInput.nativeElement.value = '20';
    minInput.triggerEventHandler('change', { target: minInput.nativeElement });
    fixture.detectChanges();

    expect(minValueSpy).toHaveBeenCalledWith('20');

    maxInput.nativeElement.value = '150';
    maxInput.triggerEventHandler('change', { target: maxInput.nativeElement });
    fixture.detectChanges();

    expect(maxValueSpy).toHaveBeenCalledWith('150');
  });

  it('call rangeReset', () => {
    fixture.detectChanges();

    const minInput = fixture.debugElement.query(
      By.css('input[type="number"]:first-child')
    );
    const maxInput = fixture.debugElement.query(
      By.css('input[type="number"]:last-child')
    );

    minInput.nativeElement.value = '20';
    maxInput.nativeElement.value = '150';
    fixture.detectChanges();

    component.rangeReset();
    fixture.detectChanges();

    expect(minInput.nativeElement.value).toBe('');
    expect(maxInput.nativeElement.value).toBe('');
  });
});
