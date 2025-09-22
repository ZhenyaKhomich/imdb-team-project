import type { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-images',
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesComponent implements AfterViewInit, OnDestroy {
  public images = input.required<string[]>();
  public isPrevActive = output<boolean>();
  public isNextActive = output<boolean>();

  public sliderContainer =
    viewChild<ElementRef<HTMLElement>>('sliderContainer');

  public currentIndex = signal(0);

  public itemsToShow = signal(1);

  public isPrevDisabled = computed(() => this.currentIndex() === 0);

  public isNextDisabled = computed(() => {
    const lastPossibleIndex = this.images().length - this.itemsToShow();
    return this.currentIndex() >= lastPossibleIndex;
  });

  private resizeObserver: ResizeObserver;

  constructor() {
    effect(() => {
      this.isPrevActive.emit(!this.isPrevDisabled());
    });

    effect(() => {
      this.isNextActive.emit(!this.isNextDisabled());
    });

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        this.calculateItemsToShow(containerWidth);
      }
    });
  }

  public ngAfterViewInit(): void {
    const container = this.sliderContainer()?.nativeElement;
    if (container) {
      this.resizeObserver.observe(container);
      this.calculateItemsToShow(container.getBoundingClientRect().width);
    }
  }

  public ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  public next(): void {
    if (!this.isNextDisabled()) {
      this.currentIndex.update((index) => index + 1);
    }
  }

  public prev(): void {
    if (!this.isPrevDisabled()) {
      this.currentIndex.update((index) => index - 1);
    }
  }

  public calculateTransform(): string {
    const itemWidth = 289;
    const offset = this.currentIndex() * itemWidth;
    return `translateX(-${offset}px)`;
  }

  private calculateItemsToShow(containerWidth: number): void {
    if (containerWidth >= 990) {
      this.itemsToShow.set(4);
    } else if (containerWidth >= 641) {
      this.itemsToShow.set(3);
    } else if (containerWidth >= 352) {
      this.itemsToShow.set(2);
    } else {
      this.itemsToShow.set(1);
    }

    const maxIndex = Math.max(0, this.images().length - this.itemsToShow());
    if (this.currentIndex() > maxIndex) {
      this.currentIndex.set(maxIndex);
    }
  }
}
