import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import type {OnInit} from '@angular/core';
import {CarouselModule} from 'ngx-owl-carousel-o';
import type {OwlOptions} from 'ngx-owl-carousel-o';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import type {ActorDataType, ActorsDataType} from '../../types/actors-data.type';
import type {AllTitlesDataType, TitleDataType} from '../../types/all-titles-data.type';
import {SliderIdEnum} from '../../enums/slider-id.enum';
import {WINDOW} from '../../injection-tokens/window.token';
import {SignalService} from '../../services/signal.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CarouselModule,
    MatIconModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  @Input() public elementsSlider: ActorsDataType | AllTitlesDataType | null = null;
  @Input() public id!: string;
  public actorsList: ActorDataType[] = [];
  public moviesList: TitleDataType[] = [];
  public itemsInSlider = 0;
  public todayData = new Date(Date.now());
  public year = this.todayData.getFullYear();
  public signalService = inject(SignalService);
  public sliderConfig: OwlOptions = {
    loop: true,
    responsiveRefreshRate: 50000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 15,
    stagePadding: 0,
    startPosition: 0,
    center: false,
    dots: false,
    navSpeed: 700,
    nav: false,
    navText: ['<', '>'],
    items: 1,
  };
  protected readonly Math = Math;
  protected readonly Number = Number;
  protected readonly SliderIdEnum = SliderIdEnum;
  private window = inject(WINDOW);
  private width = this.window.innerWidth;


  @HostListener('window:resize')
  public onResize(): void {
    this.width = this.window.innerWidth;
    this.changeWidth(this.width);
  }

  public ngOnInit(): void {
    if (this.elementsSlider && 'names' in this.elementsSlider) {
      this.actorsList = this.elementsSlider.names;
    } else if (this.elementsSlider && 'titles' in this.elementsSlider) {
      this.moviesList = this.elementsSlider.titles;
    }

    this.changeWidth(this.width);
  }

  private changeWidth(width: number): void {
    if(width >= 1250) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 5;
        this.itemsInSlider = 5;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 6;
        this.itemsInSlider = 6;
      }

    }
    if(width < 1240 && width >= 1000) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 5;
        this.itemsInSlider = 5;
      }
      this.signalService.refreshSlider.set(true);
      setTimeout(()=> {
        this.signalService.refreshSlider.set(false);
      }, 10)
    }

    if(width < 1000 && width >= 900) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      }
    }

    if(width < 900 && width >= 800) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      }
    }

    if(width < 800 && width >= 690) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      }
    }

    if(width < 700 && width >= 600) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      }
    }

    if(width < 600 && width >= 450) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
      }
    }

    if(width < 450) {
      if (this.id === SliderIdEnum.movies) {
        this.sliderConfig.items = 1;
        this.itemsInSlider = 1;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 1;
        this.itemsInSlider = 1;
      }
    }

    this.signalService.refreshSlider.set(true);
    setTimeout(()=> {
      this.signalService.refreshSlider.set(false);
    }, 10)
  }
}
