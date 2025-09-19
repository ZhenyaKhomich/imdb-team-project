import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject} from '@angular/core';
import type {OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MoviesService} from '../../../shared/services/movies.service';
import type {TrailerDataType} from '../../../shared/types/trailer-data.type';
import {NgForOf} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import type {SafeResourceUrl} from '@angular/platform-browser';
import {SignalService} from '../../../shared/services/signal.service';
import {TruncatePipe} from '../../../shared/pipes/truncate.pipe';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';

@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './trailer.component.html',
  styleUrl: './trailer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrailerComponent implements OnInit {
  public trailerData$ = effect(() => {
    console.log('сработал эффект', this.signalService.trailerVideos())
    this.trailerData = this.signalService.trailerVideos();
    this.cdr.detectChanges();
  })

  public trailerData: TrailerDataType | null = null;
  protected readonly AppRoutesEnum = AppRoutesEnum;
  private activatedRoute = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  private signalService = inject(SignalService);

  public ngOnInit(): void {
    this.trailerData = this.signalService.trailerVideos();
    const idMovie = this.activatedRoute.snapshot.paramMap.get('id');
    if (idMovie) {
      this.moviesService.getTrailer(idMovie).subscribe(
        (data) => {
          this.trailerData = data;
          this.cdr.markForCheck();
        }
      )
    }
  }

  public getUrl(id: string): SafeResourceUrl{
    const url = `https://www.imdb.com/video/imdb/${id}/imdb/embed?quality=low`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
