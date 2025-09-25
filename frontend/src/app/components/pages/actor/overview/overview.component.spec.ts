import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent, NgOptimizedImage, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
  });

  function setInputs(values: Record<string, unknown>): void {
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        fixture.componentRef.setInput(key, value);
      }
    });
    fixture.detectChanges();
  }

  it('render', () => {
    setInputs({ name: 'John Doe', professions: 'Actor, Director' });

    const title = fixture.debugElement.query(By.css('h2.title')).nativeElement;
    expect(title.textContent).toContain('John Doe');

    const profession = fixture.debugElement.query(
      By.css('.info')
    ).nativeElement;
    expect(profession.textContent).toContain('Actor, Director');
  });

  it('img', () => {
    setInputs({ img: 'http://test.com/photo.jpg', name: 'John Doe' });

    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.alt).toBe('John Doe');
  });

  it('no photo', () => {
    setInputs({ img: '' });

    const errorImg = fixture.debugElement.query(
      By.css('.error-img')
    ).nativeElement;
    expect(errorImg.textContent).toContain('no photo');
  });

  it('descriptions', () => {
    setInputs({
      birthLocation: 'Minsk, Belarus',
      birthDate: '1990-01-01',
      deadDate: '2050-01-01',
      birthName: 'Ivan Petrov',
      height: 180,
      biography: 'Some biography text',
    });

    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Minsk, Belarus');
    expect(text).toContain('1990-01-01');
    expect(text).toContain('2050-01-01');
    expect(text).toContain('Ivan Petrov');
    expect(text).toContain('180 cm');
    expect(text).toContain('Some biography text');
  });
});
