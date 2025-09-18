import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {NgForOf} from '@angular/common';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {RouterLink} from '@angular/router';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';
import {SignalService} from '../../../shared/services/signal.service';
import {WatchlistService} from '../../../shared/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [
    MatIconModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistComponent implements OnInit{
  public signalService = inject(SignalService);
  public movies: TitlesDataType = {...this.signalService.watchlistData()};
  public watchlistService = inject(WatchlistService);
  public watchlist$ = effect(() => {
    this.movies = {...this.signalService.watchlistData()};
    this.cdr.detectChanges();
  });
  protected readonly Math = Math;
  protected readonly Number = Number;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.watchlistService.getMovies();
  }
}
