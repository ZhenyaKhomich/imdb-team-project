import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChooseComponent } from './choose.component';

describe('ChooseComponent', () => {
  let component: ChooseComponent;
  let fixture: ComponentFixture<ChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize', () => {
    expect(component.choose()).toBe(false);
  });

  it('choose initialized', () => {
    expect(component.choose()).toBe(false);
  });

  it('toggle choose value on chooseClick()', () => {
    const emitSpy = spyOn(component.chooseChanged, 'emit');

    component.chooseClick();
    fixture.detectChanges();

    expect(component.choose()).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(true);

    component.chooseClick();
    fixture.detectChanges();

    expect(component.choose()).toBe(false);
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('reset choose value on chooseReset()', () => {
    component.choose.set(true);
    fixture.detectChanges();

    expect(component.choose()).toBe(true);

    component.chooseReset();
    fixture.detectChanges();

    expect(component.choose()).toBe(false);
  });

  it('update button class', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList.contains('active')).toBe(false);

    component.choose.set(true);
    fixture.detectChanges();

    expect(button.classList.contains('active')).toBe(true);
  });

  it('call chooseClick()', () => {
    const button = fixture.nativeElement.querySelector('button');
    const chooseClickSpy = spyOn(component, 'chooseClick');

    button.click();
    fixture.detectChanges();

    expect(chooseClickSpy).toHaveBeenCalled();
  });

  it('render ng-content', () => {
    fixture.nativeElement.innerHTML = `
      <app-choose>
        <span>Test Content</span>
      </app-choose>
    `;

    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement).toBeTruthy();
    expect(spanElement.textContent).toContain('Test Content');
  });
});
