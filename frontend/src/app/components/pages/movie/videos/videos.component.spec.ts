import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { VideosComponent } from './videos.component';
import type { Video } from '../../../../shared/types/movies';

describe('VideosComponent', () => {
  let fixture: ComponentFixture<VideosComponent>;
  let component: VideosComponent;

  const mockVideos: Video[] = [
    {
      id: 'v1',
      name: 'Video 1',
      type: 'trailer',
      primaryImage: { url: 'image1.jpg', width: 300, height: 200 },
      description: 'Description 1',
      width: 1920,
      height: 1080,
      runtimeSeconds: 120,
    },
    {
      id: 'v2',
      name: 'Video 2',
      type: 'trailer',
      primaryImage: { url: 'image2.jpg', width: 300, height: 200 },
      description: 'Description 2',
      width: 1920,
      height: 1080,
      runtimeSeconds: 150,
    },
    {
      id: 'v3',
      name: 'Video 3',
      type: 'trailer',
      primaryImage: { url: 'image3.jpg', width: 300, height: 200 },
      description: 'Description 3',
      width: 1920,
      height: 1080,
      runtimeSeconds: 180,
    },
    {
      id: 'v4',
      name: 'Video 4',
      type: 'trailer',
      primaryImage: { url: 'image4.jpg', width: 300, height: 200 },
      description: 'Description 4',
      width: 1920,
      height: 1080,
      runtimeSeconds: 200,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', mockVideos);
  });

  it('calc transform', () => {
    component.currentIndex.set(0);
    expect(component.calculateTransform()).toBe('translateX(-0px)');

    component.currentIndex.set(2);
    expect(component.calculateTransform()).toBe('translateX(-810px)');
  });

  it('next()', () => {
    component.itemsToShow.set(2);
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
    component.itemsToShow.set(4);
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

  it('calculateItemsToShow', () => {
    component['calculateItemsToShow'](1300);
    expect(component.itemsToShow()).toBe(3);

    component['calculateItemsToShow'](800);
    expect(component.itemsToShow()).toBe(2);

    component['calculateItemsToShow'](300);
    expect(component.itemsToShow()).toBe(1);
  });

  it('maxIndex', () => {
    component.currentIndex.set(5);
    fixture.componentRef.setInput('data', mockVideos);

    component['calculateItemsToShow'](800);
    expect(component.currentIndex()).toBeLessThanOrEqual(
      mockVideos.length - component.itemsToShow()
    );
  });
});
