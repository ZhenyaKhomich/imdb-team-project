import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {Router, RouterLink} from '@angular/router';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';
import {SignalService} from '../../../shared/services/signal.service';
import {WatchlistService} from '../../../shared/services/watchlist.service';
import {ChangeUrlPicturePipe} from "../../../shared/pipes/change-url-picture.pipe";
import {MoviesService} from '../../../shared/services/movies.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
    imports: [
        MatIconModule,
        RouterLink,
        ChangeUrlPicturePipe
    ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistComponent implements OnInit{
  public signalService = inject(SignalService);
  public movies: TitlesDataType = {...this.signalService.watchlistData()};
  public watchlistService = inject(WatchlistService);
  public moviesService = inject(MoviesService);
  public watchlist$ = effect(() => {
    this.movies = {...this.signalService.watchlistData()};
    this.cdr.detectChanges();
  });
  protected readonly Math = Math;
  protected readonly Number = Number;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public ngOnInit(): void {
    this.watchlistService.getMovies();
  }

  public openTrailerList(id: string): void {
    this.moviesService.getTrailer(id).subscribe(
      (data) => {
        if(data.videos.length > 0){
          this.signalService.trailerVideos.set(data);
          this.router.navigate([AppRoutesEnum.TRAILER, id])
        }
      }
    )
  }
}
