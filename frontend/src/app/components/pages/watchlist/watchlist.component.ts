import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {NgForOf} from '@angular/common';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {RouterLink} from '@angular/router';
import type {FilmDataType} from '../../../shared/types/movies-response.type';

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
export class WatchlistComponent {
  public movies: FilmDataType[] = [
    {
      "id": "tt13443470",
      "type": "tvSeries",
      "primaryTitle": "Wednesday",
      "primaryImage": {
        "url": "https://m.media-amazon.com/images/M/MV5BMDE1NjNmZjgtZTg0OC00NjkxLWEzYzItMDNkMTc3YjgxZWQyXkEyXkFqcGc@._V1_.jpg",
      },
      "startYear": 2022,
      "runtimeSeconds": 2700,
      "genres": [
        "Comedy",
        "Crime",
        "Fantasy",
        "Mystery"
      ],
      "rating": {
        "aggregateRating": 10,
        "voteCount": 458090
      },
      "plot": "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents."
    },
    // {
    //   "id": "tt26581740",
    //   "type": "movie",
    //   "primaryTitle": "Weapons",
    //   "originalTitle": "Weapons",
    //   "primaryImage": {
    //     "url": "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
    //     "width": 1638,
    //     "height": 2048
    //   },
    //   "startYear": 2025,
    //   "runtimeSeconds": 7680,
    //   "genres": [
    //     "Horror",
    //     "Mystery"
    //   ],
    //   "rating": {
    //     "aggregateRating": 7.6,
    //     "voteCount": 135340
    //   },
    //   "plot": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance."
    // },
    // {
    //   "id": "tt13443470",
    //   "type": "tvSeries",
    //   "primaryTitle": "Wednesday",
    //   "originalTitle": "Wednesday",
    //   "primaryImage": {
    //     "url": "https://m.media-amazon.com/images/M/MV5BMDE1NjNmZjgtZTg0OC00NjkxLWEzYzItMDNkMTc3YjgxZWQyXkEyXkFqcGc@._V1_.jpg",
    //     "width": 1500,
    //     "height": 2222
    //   },
    //   "startYear": 2022,
    //   "runtimeSeconds": 2700,
    //   "genres": [
    //     "Comedy",
    //     "Crime",
    //     "Fantasy",
    //     "Mystery"
    //   ],
    //   "rating": {
    //     "aggregateRating": 8,
    //     "voteCount": 458090
    //   },
    //   "plot": "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents."
    // },
    // {
    //   "id": "tt26581740",
    //   "type": "movie",
    //   "primaryTitle": "Weapons",
    //   "originalTitle": "Weapons",
    //   "primaryImage": {
    //     "url": "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
    //     "width": 1638,
    //     "height": 2048
    //   },
    //   "startYear": 2025,
    //   "runtimeSeconds": 7680,
    //   "genres": [
    //     "Horror",
    //     "Mystery"
    //   ],
    //   "rating": {
    //     "aggregateRating": 7.6,
    //     "voteCount": 135340
    //   },
    //   "plot": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance."
    // },
  ]

  // public movie = {
  //   "id": "tt26581740",
  //   "type": "movie",
  //   "primaryTitle": "Weapons",
  //   "originalTitle": "Weapons",
  //   "primaryImage": {
  //     "url": "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
  //     "width": 1638,
  //     "height": 2048
  //   },
  //   "startYear": 2025,
  //   "runtimeSeconds": 7680,
  //   "genres": [
  //     "Horror",
  //     "Mystery"
  //   ],
  //   "rating": {
  //     "aggregateRating": 7.6,
  //     "voteCount": 135340
  //   },
  //   "plot": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance."
  // }

  protected readonly Math = Math;
  protected readonly Number = Number;
  protected readonly AppRoutesEnum = AppRoutesEnum;
}
