import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import type {OnInit} from '@angular/core';
import {CarouselModule} from 'ngx-owl-carousel-o';
import type {OwlOptions} from 'ngx-owl-carousel-o';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import type {ActorDataType, ActorsDataType} from '../../types/actors-data.type';
import type {AllTitlesDataType, TitleDataType} from '../../types/all-titles-data.type';
import {SliderIdEnum} from '../../enums/slider-id.enum';

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
  public sliderConfig: OwlOptions = {
    loop: true,
    responsiveRefreshRate: 50000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 25,
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

  public ngOnInit(): void {
    if (this.elementsSlider && 'names' in this.elementsSlider) {
      this.actorsList = this.elementsSlider.names;
    } else if (this.elementsSlider && 'titles' in this.elementsSlider) {
      this.moviesList = this.elementsSlider.titles;
    }

    if(this.id === SliderIdEnum.movies) {
      this.sliderConfig.items = 5;
      this.itemsInSlider = 5;
    } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
      this.sliderConfig.items = 6;
      this.itemsInSlider = 6;
    }

    if((this.actorsList.length > 0 && this.actorsList.length < 5) || (this.moviesList.length > 0 && this.moviesList.length < 6) ) {
      this.sliderConfig.loop = false;
      this.sliderConfig.autoWidth = true;
    } else {
      this.sliderConfig.loop = true;
      this.sliderConfig.autoWidth = false;
    }
  }
}
