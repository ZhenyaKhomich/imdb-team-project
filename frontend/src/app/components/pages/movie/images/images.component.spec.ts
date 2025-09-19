import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
  let fixture: ComponentFixture<ImagesComponent>;
  let component: ImagesComponent;

  const mockImages = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('images', mockImages);
  });

  it('initial', () => {
    component['calculateItemsToShow'](1500);
    expect(component.itemsToShow()).toBe(3);

    component['calculateItemsToShow'](1000);
    expect(component.itemsToShow()).toBe(2);

    component['calculateItemsToShow'](800);
    expect(component.itemsToShow()).toBe(1);
  });

  it('calc transform', () => {
    component.currentIndex.set(0);
    expect(component.calculateTransform()).toBe('translateX(-0px)');

    component.currentIndex.set(2);
    expect(component.calculateTransform()).toBe('translateX(-578px)');
  });

  it('next()', () => {
    component.itemsToShow.set(3);
    component.currentIndex.set(0);
    component.next();
    expect(component.currentIndex()).toBe(1);
  });

  it('prev()', () => {
    component.currentIndex.set(2);
    component.prev();
    expect(component.currentIndex()).toBe(1);
  });

  it('isNextDisabled = true', () => {
    component.itemsToShow.set(5);
    component.currentIndex.set(0);
    expect(component.isNextDisabled()).toBeTrue();
    component.next();
    expect(component.currentIndex()).toBe(0);
  });

  it('isPrevDisabled = true', () => {
    component.currentIndex.set(0);
    expect(component.isPrevDisabled()).toBeTrue();
    component.prev();
    expect(component.currentIndex()).toBe(0);
  });

  it('itemsToShow', () => {
    component.currentIndex.set(4);
    fixture.componentRef.setInput('images', mockImages);
    component['calculateItemsToShow'](800);
    expect(component.currentIndex()).toBeLessThanOrEqual(
      mockImages.length - component.itemsToShow()
    );
  });
});
