import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Input
} from '@angular/core';
import type {OnInit, OnChanges, SimpleChanges,} from '@angular/core';
import {CarouselModule} from 'ngx-owl-carousel-o';
import type {OwlOptions} from 'ngx-owl-carousel-o';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import type {ActorDataType, ActorsDataType} from '../../types/actors-data.type';
import {SliderIdEnum} from '../../enums/slider-id.enum';
import {WINDOW} from '../../injection-tokens/window.token';
import {SignalService} from '../../services/signal.service';
import type {FilmDataType, TitlesDataType} from '../../types/movies-response.type';
import {WatchlistService} from '../../services/watchlist.service';
import {ChangeUrlPicturePipe} from '../../pipes/change-url-picture.pipe';
import {Router, RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../enums/app-router.enum';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CarouselModule,
    MatIconModule,
    NgForOf,
    NgIf,
    ChangeUrlPicturePipe,
    RouterLink,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() public elementsSlider: ActorsDataType | TitlesDataType | null = null;
  @Input() public id!: string;
  @Input() public key!: number | undefined;
  public actorsList: ActorDataType[] = [];
  public moviesList: FilmDataType[] | undefined = [];
  public itemsInSlider = 0;
  public todayData = new Date(Date.now());
  public year = this.todayData.getFullYear();
  public signalService = inject(SignalService);
  public watchlistService = inject(WatchlistService);
  public moviesService = inject(MoviesService);
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
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private window = inject(WINDOW);
  private router = inject(Router);
  private width = this.window.innerWidth;

  @HostListener('window:resize')
  public onResize(): void {
    this.width = this.window.innerWidth;
    this.changeWidth(this.width);
  }

  public ngOnInit(): void {
    if (this.elementsSlider && 'names' in this.elementsSlider) {
      this.actorsList = this.elementsSlider.names;
      this.sliderConfig.loop = !(this.actorsList && this.actorsList.length < 6);
    } else if (this.elementsSlider && 'titles' in this.elementsSlider) {
      this.moviesList = this.elementsSlider.titles;
      this.sliderConfig.loop = !(this.moviesList && this.moviesList?.length < 5);
    }

    this.changeWidth(this.width);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['key'] ) {
    this.moviesList = this.signalService.recentlyViewedVideos()?.titles;
    }
  }

  public trackBySliderId(index: number, movie: FilmDataType): string {
    return movie.id;
  }

  public deleteMovie(id: string): void {
    this.watchlistService.deleteMovie(id);
  }

  public openTrailerList(id: string): void {
    this.moviesService.getTrailer(id).subscribe(
      (data) => {
        if(data.videos && data.videos.length > 0){
          this.signalService.trailerVideos.set(data);
          this.router.navigate([AppRoutesEnum.TRAILER, id])
        }
      }
    )
  }

  private changeWidth(width: number): void {
    if(width >= 1250) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 5;
        this.itemsInSlider = 5;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 6;
        this.itemsInSlider = 6;
      }

    }
    if(width < 1240 && width >= 1000) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
        this.sliderConfig.loop = !(this.moviesList && this.moviesList?.length < 4);
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 5;
        this.itemsInSlider = 5;
        this.sliderConfig.loop = !(this.actorsList && this.actorsList.length < 5);
      }
      this.signalService.refreshSlider.set(true);
      setTimeout(()=> {
        this.signalService.refreshSlider.set(false);
      }, 10)
    }

    if(width < 1000 && width >= 900) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
        this.sliderConfig.loop = !(this.actorsList && this.actorsList.length < 4);
      }
    }

    if(width < 900 && width >= 800) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
        this.sliderConfig.loop = !(this.moviesList && this.moviesList?.length < 3);
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 4;
        this.itemsInSlider = 4;
      }
    }

    if(width < 800 && width >= 690) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
        this.sliderConfig.loop = !(this.actorsList && this.actorsList.length < 3);
      }
    }

    if(width < 700 && width >= 600) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
        this.sliderConfig.loop = !(this.moviesList && this.moviesList?.length < 2);
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 3;
        this.itemsInSlider = 3;
      }
    }

    if(width < 600 && width >= 450) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 2;
        this.itemsInSlider = 2;
        this.sliderConfig.loop = !(this.actorsList && this.actorsList.length < 2);
      }
    }

    if(width < 450) {
      if (this.id === SliderIdEnum.movies || this.id === SliderIdEnum.watchlist) {
        this.sliderConfig.items = 1;
        this.itemsInSlider = 1;
      } else if (this.id === SliderIdEnum.birthdays_actors || this.id === SliderIdEnum.popular_actors) {
        this.sliderConfig.items = 1;
        this.itemsInSlider = 1;
      }
    }

    if(this.id == 'watchlist') {
      this.signalService.refreshSliderWatchList.set(false);
      setTimeout(()=> {
        this.signalService.refreshSliderWatchList.set(true);
      }, 5)
    } else {
      this.signalService.refreshSlider.set(true);
      setTimeout(()=> {
        this.signalService.refreshSlider.set(false);
      }, 5)
    }
  }
}
