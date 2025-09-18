import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, ViewChild} from '@angular/core';
import type {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {CarouselModule} from 'ngx-owl-carousel-o';
import type {OwlOptions} from 'ngx-owl-carousel-o';
import {LowerCasePipe, NgForOf, NgIf} from '@angular/common';
import {MinutesToHoursPipe} from '../../../shared/pipes/minutes-to-hours.pipe';
import type {CarouselComponent} from 'ngx-owl-carousel-o';
import {SliderComponent} from '../../../shared/components/slider/slider.component';
import type {ActorsDataType} from '../../../shared/types/actors-data.type';
import {SliderIdEnum} from '../../../shared/enums/slider-id.enum';
import {SignalService} from '../../../shared/services/signal.service';
import {ActorsService} from '../../../shared/services/actors.service';
import {ReductionTwentyElementsPipe} from '../../../shared/pipes/reduction-twenty-elements.pipe';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';
import {MoviesService} from '../../../shared/services/movies.service';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';
import {SortMoviesYearPipe} from '../../../shared/pipes/sort-movies-year.pipe.pipe';
import {WatchlistService} from '../../../shared/services/watchlist.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIconModule,
    CarouselModule,
    NgForOf,
    MinutesToHoursPipe,
    ReductionTwentyElementsPipe,
    SliderComponent,
    LowerCasePipe,
    LoaderComponent,
    SortMoviesYearPipe,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class MainComponent implements OnInit {
  @ViewChild('carouseMovies') public carouseMovies!: CarouselComponent
  public currentElementMainSlider = 0;
  public signalService = inject(SignalService);
  // public watchlist: TitlesDataType = {titles: []};
  public movies: TitlesDataType | null = null;
  public moviesTopRating: TitlesDataType | null = null;
  public moviesTopYears: TitlesDataType = {titles: []};
  public birthdaysActors: ActorsDataType | null = null;
  public popularActors: ActorsDataType | null = null;
  public mainSliderLength = 0;
  public indexFollowingSlides: number[] = [];
  public watchListService = inject(WatchlistService);
  public updateSlider = false;
  public watchlistService = inject(WatchlistService);

  public watchlist$ = effect(() => {
    this.signalService.changeWatchlist.set(false);
    setTimeout(()=> {
      this.signalService.changeWatchlist.set(true);
    },1)
  });

  public customMovies: OwlOptions = {
    loop: true,
    responsiveRefreshRate: 50000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 1240,
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
  private actorsService = inject(ActorsService);
  private moviesService = inject(MoviesService);
  private localStorageService = inject(LocalStorageService);
  private today = new Date();
  private cdr = inject(ChangeDetectorRef);


  public ngOnInit(): void {
    this.updateFollowingSlides(this.currentElementMainSlider);

    this.moviesService.getTitles().subscribe(
      (data) => {
        this.movies = data;
        if (this.movies.titles) {
          this.mainSliderLength = this.movies.titles.length;
        }
        this.updateFollowingSlides(this.currentElementMainSlider);
      }
    )

    this.actorsService.getAllActors(1).subscribe(
      (data) => {
        this.popularActors = data;
      }
    )

    this.moviesService.getTitles({
      minAggregateRating: 10
    }).subscribe(
      (data) => {
        this.moviesTopRating = data;
      }
    )

    this.watchlistService.getMovies();

    this.loadAllPages(2022);

    if (this.localStorageService.getActors() && this.localStorageService.getData() === `${this.today.getDate()}.${this.today.getMonth() + 1}`) {
      this.birthdaysActors = JSON.parse(localStorage.getItem('actors')!);
    } else {
      this.actorsService.getAllActors(25).subscribe(
        (date) => {
          this.birthdaysActors = date;
          this.birthdaysActors.names = this.birthdaysActors.names.filter((actor) => {
            return (actor?.birthDate && actor?.birthDate?.month === this.today.getMonth() + 1) &&
              (actor?.birthDate && actor?.birthDate?.day === this.today.getDate())
          })
          this.localStorageService.setActors(this.birthdaysActors, `${this.today.getDate()}.${this.today.getMonth() + 1}`)
        }
      )
      this.cdr.detectChanges();
    }
  }

  public updateFollowingSlides(currentIndex: number): void {
    this.indexFollowingSlides = [];
    for (let i = 1; i <= 3; i++) {
      if (this.mainSliderLength) {
        const nextIndex = (currentIndex + i) % this.mainSliderLength;
        this.indexFollowingSlides.push(nextIndex);
      }
    }
  }

  public mainSlideNext(): void {
    this.carouseMovies.next();
    if (this.mainSliderLength && this.currentElementMainSlider !== this.mainSliderLength - 1) {
      this.currentElementMainSlider += 1;
    } else {
      this.currentElementMainSlider = 0;
    }
    this.updateFollowingSlides(this.currentElementMainSlider);
  }

  public mainSlidePrev(): void {
    this.carouseMovies.prev();
    if (this.currentElementMainSlider !== 0) {
      this.currentElementMainSlider -= 1;
    } else if (this.mainSliderLength) {
      this.currentElementMainSlider = this.mainSliderLength - 1;
    }
    this.updateFollowingSlides(this.currentElementMainSlider);
  }

  private loadAllPages(year: number, pageToken?: string): void {
    this.moviesService.getTitles({
      minAggregateRating: 10,
      startYear: year,
      pageToken: pageToken ? pageToken : '',
    }).subscribe((data) => {
      if (data.titles?.length && this.moviesTopYears && this.moviesTopYears.titles) {
        this.moviesTopYears.titles.push(...data.titles);
      }

      if (data.nextPageToken && this.moviesTopYears && this.moviesTopYears.titles && this.moviesTopYears.titles.length < 200) {
        this.loadAllPages(year, data.nextPageToken);
      } else {
        this.cdr.detectChanges();
      }
    });
  }
}

