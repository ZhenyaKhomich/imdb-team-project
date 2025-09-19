import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {SliderIdEnum} from '../../../shared/enums/slider-id.enum';
import {SliderComponent} from '../../../shared/components/slider/slider.component';
import {RouterLink} from '@angular/router';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {SignalService} from '../../../shared/services/signal.service';
import type {TitlesDataType} from '../../../shared/types/movies-response.type';

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
export class FooterComponent {
  public signalService = inject(SignalService);
  public movies: TitlesDataType = {
    titles: [
      // {
      //   "id": "tt0209144",
      //   "type": "movie",
      //   "primaryTitle": "Memento",
      //   "primaryImage": {
      //     "url": "https://m.media-amazon.com/images/M/MV5BYmQ3MjliNjAtNWFiZS00YWI1LTlmZTktMzBiNDE1NjRhZjU0XkEyXkFqcGc@._V1_.jpg",
      //   },
      //   "startYear": 2000,
      //   "runtimeSeconds": 6780,
      //   "genres": [
      //     "Drama",
      //     "Mystery",
      //     "Thriller"
      //   ],
      //   "rating": {
      //     "aggregateRating": 8.4,
      //     "voteCount": 1398215
      //   },
      //   "plot": "A former insurance investigator who now suffers from anterograde amnesia uses notes and tattoos to hunt down his wife's murderer."
      // },
      // {
      //   "id": "tt0210945",
      //   "type": "movie",
      //   "primaryTitle": "Remember the Titans",
      //   "primaryImage": {
      //     "url": "https://m.media-amazon.com/images/M/MV5BZWY0NzgxMWQtMjM4NC00MjRiLWE0YjctYTFiNjA2NTNkZGY1XkEyXkFqcGc@._V1_.jpg",
      //   },
      //   "startYear": 2000,
      //   "runtimeSeconds": 6780,
      //   "genres": [
      //     "Biography",
      //     "Comedy",
      //     "Drama",
      //     "Sport"
      //   ],
      //   "rating": {
      //     "aggregateRating": 7.8,
      //     "voteCount": 243399
      //   },
      //   "plot": "In 1971, Virginia high-school football was everything to the people of Alexandria, but when the school board was forced to integrate an all-Black school with an all-white one, the foundation of football's tradition was put to the test."
      // },
      // {
      //   "id": "tt0212671",
      //   "type": "tvSeries",
      //   "primaryTitle": "Malcolm in the Middle",
      //   "primaryImage": {
      //     "url": "https://m.media-amazon.com/images/M/MV5BY2M0Y2M4YTQtZDdjMC00MDZiLWI1OGEtZDdjZjBiZDE4ODU3XkEyXkFqcGc@._V1_.jpg",
      //   },
      //   "startYear": 2000,
      //   "runtimeSeconds": 1320,
      //   "genres": [
      //     "Comedy",
      //     "Family"
      //   ],
      //   "rating": {
      //     "aggregateRating": 8.2,
      //     "voteCount": 151682
      //   },
      //   "plot": "A gifted young teen tries to survive life with his dimwitted, dysfunctional family."
      // },
      {
        "id": "tt0208092",
        "type": "movie",
        "primaryTitle": "Snatch",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BYzk5NjJkMTQtN2IyNC00YWM5LTlhZmMtNGI3MWNhMTU1YTc4XkEyXkFqcGc@._V1_.jpg",
        },
        "startYear": 2000,
        "runtimeSeconds": 6120,
        "genres": [
          "Comedy",
          "Crime"
        ],
        "rating": {
          "aggregateRating": 8.2,
          "voteCount": 956373
        },
        "plot": "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond."
      },
      {
        "id": "tt0264235",
        "type": "tvSeries",
        "primaryTitle": "Curb Your Enthusiasm",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BZmFiZDY2ZDItZDliOC00Y2JhLTliMWYtODkzMTA0YmIwZDA3XkEyXkFqcGc@._V1_.jpg",
        },
        "startYear": 2000,
        "runtimeSeconds": 1800,
        "genres": [
          "Comedy"
        ],
        "rating": {
          "aggregateRating": 8.8,
          "voteCount": 159902
        },
        "plot": "Larry David stars as an over-the-top version of himself in this comedy series that shows how seemingly trivial details of day-to-day life can precipitate a catastrophic chain of events."
      },
      {
        "id": "tt0144084",
        "type": "movie",
        "primaryTitle": "American Psycho",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_.jpg",
        },
        "startYear": 2000,
        "runtimeSeconds": 6120,
        "genres": [
          "Crime",
          "Drama",
          "Horror"
        ],
        "rating": {
          "aggregateRating": 7.6,
          "voteCount": 798193
        },
        "plot": "A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies."
      },
      {
        "id": "tt0175142",
        "type": "movie",
        "primaryTitle": "Scary Movie",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BZGRmMGRhOWMtOTk3Ni00OTRjLTkyYTAtYzA1M2IzMGE3NGRkXkEyXkFqcGc@._V1_.jpg",
        },
        "startYear": 2000,
        "runtimeSeconds": 5280,
        "genres": [
          "Comedy"
        ],
        "rating": {
          "aggregateRating": 6.3,
          "voteCount": 308686
        },
        "plot": "A year after disposing of the body of a man they accidentally killed, a group of dumb teenagers are stalked by a bumbling serial killer."
      },
    ]
  }

  protected readonly SliderIdEnum = SliderIdEnum;
  protected readonly AppRoutesEnum = AppRoutesEnum;
}
