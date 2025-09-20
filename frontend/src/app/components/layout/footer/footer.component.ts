import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {SliderIdEnum} from '../../../shared/enums/slider-id.enum';
import {SliderComponent} from '../../../shared/components/slider/slider.component';
import {RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {SignalService} from '../../../shared/services/signal.service';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';
import {MoviesService} from '../../../shared/services/movies.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIconModule,
    SliderComponent,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public update = true;
  public movies: TitlesDataType = {titles:[]};
  public signalService = inject(SignalService);
  protected readonly SliderIdEnum = SliderIdEnum;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);
  private movies$ = effect(() => {
      this.movies = this.signalService.recentlyViewedVideos();
      this.cdr.markForCheck();
  })

 public ngOnInit(): void {
    this.moviesService.getRecentlyViewed().subscribe(
      (data): void => {
        this.signalService.recentlyViewedVideos.set({
          ...data,
          titles: data.titles?.reverse()
        });
        this.cdr.markForCheck();
      }
    )
  }

  public clearRecentlyViewed(): void {
    this.moviesService.deleteRecentlyViewed().subscribe(
      (data): void => {
        if(!data.error) {
          this.signalService.recentlyViewedVideos.set({titles:[]});
        }
      }
    )

  }
}
