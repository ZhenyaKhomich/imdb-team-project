import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {SliderIdEnum} from '../../../shared/enums/slider-id.enum';
import {SliderComponent} from '../../../shared/components/slider/slider.component';
import {AllTitlesDataType} from '../../../shared/types/all-titles-data.type';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIconModule,
    SliderComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly SliderIdEnum = SliderIdEnum;
  public movies: AllTitlesDataType = {
    titles: [
      {
        "id": "tt12001534",
        "type": "movie",
        "primaryTitle": "First",
        "originalTitle": "The Thursday Murder Club",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BYmQ4NWVjN2EtN2U3NC00YzZhLWIzYmMtNjQ0ZjNiN2MzNDI0XkEyXkFqcGc@._V1_.jpg",
          "width": 1500,
          "height": 2222
        },
        "startYear": 2025,
        "runtimeSeconds": 7080,
        "genres": [
          "Comedy",
          "Crime",
          "Mystery",
          "Thriller"
        ],
        "rating": {
          "aggregateRating": 6.6,
          "voteCount": 24660
        },
        "plot": "Four irrepressible retirees spend their time solving cold case murders for fun, but their casual sleuthing takes a thrilling turn when they find themselves with a real whodunit on their hands."
      },
      {
        "id": "tt33043892",
        "type": "tvSeries",
        "primaryTitle": "Dexter: Resurrection",
        "originalTitle": "Dexter: Resurrection",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BMzgxNzUwZTctMzliNi00MDUwLWE4YzctNjgwMDE2OWQwNzMxXkEyXkFqcGc@._V1_.jpg",
          "width": 2700,
          "height": 4000
        },
        "startYear": 2025,
        "runtimeSeconds": 3000,
        "genres": [
          "Crime",
          "Drama",
          "Thriller"
        ],
        "rating": {
          "aggregateRating": 9.2,
          "voteCount": 57589
        },
        "plot": "Dexter Morgan awakens from a coma and sets out for New York City, determined to find Harrison and make things right. But when Miami Metro's Angel Batista arrives with questions, Dexter realizes his past is catching up to him fast."
      },
      {
        "id": "tt13623632",
        "type": "tvSeries",
        "primaryTitle": "Alien: Earth",
        "originalTitle": "Alien: Earth",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BOGIyNGRiNzgtOWQxZC00YzJmLThlZTYtYTMyMDk0YWZjMTk5XkEyXkFqcGc@._V1_.jpg",
          "width": 675,
          "height": 1000
        },
        "startYear": 2025,
        "runtimeSeconds": 3300,
        "genres": [
          "Horror",
          "Sci-Fi",
          "Thriller"
        ],
        "rating": {
          "aggregateRating": 7.6,
          "voteCount": 30344
        },
        "plot": "When a mysterious space vessel crash-lands on Earth, a young woman and a ragtag group of tactical soldiers make a fateful discovery that puts them face-to-face with the planet's greatest threat."
      },
      {
        "id": "tt26581740",
        "type": "movie",
        "primaryTitle": "Weapons",
        "originalTitle": "Weapons",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BNTBhNWJjZWItYzY3NS00M2NkLThmOWYtYTlmNzBmN2UxZWFjXkEyXkFqcGc@._V1_.jpg",
          "width": 1638,
          "height": 2048
        },
        "startYear": 2025,
        "runtimeSeconds": 7680,
        "genres": [
          "Horror",
          "Mystery"
        ],
        "rating": {
          "aggregateRating": 7.8,
          "voteCount": 94031
        },
        "plot": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance."
      },
      {
        "id": "tt20969586",
        "type": "movie",
        "primaryTitle": "Thunderbolts*",
        "originalTitle": "Thunderbolts*",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BYWE2NmNmYTItZGY0ZC00MmY2LTk1NDAtMGUyMGEzMjcxNWM0XkEyXkFqcGc@._V1_.jpg",
          "width": 2000,
          "height": 2818
        },
        "startYear": 2025,
        "runtimeSeconds": 7620,
        "genres": [
          "Action",
          "Adventure",
          "Crime",
          "Drama",
          "Fantasy",
          "Sci-Fi"
        ],
        "rating": {
          "aggregateRating": 7.2,
          "voteCount": 197636
        },
        "plot": "After finding themselves ensnared in a death trap, an unconventional team of antiheroes must go on a dangerous mission that will force them to confront the darkest corners of their pasts."
      },
      {
        "id": "tt13443470",
        "type": "tvMiniSeries",
        "primaryTitle": "Wednesday",
        "originalTitle": "Wednesday",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BMDE1NjNmZjgtZTg0OC00NjkxLWEzYzItMDNkMTc3YjgxZWQyXkEyXkFqcGc@._V1_.jpg",
          "width": 1500,
          "height": 2222
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
          "aggregateRating": 8,
          "voteCount": 447120
        },
        "plot": "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents."
      },
      {
        "id": "tt26576161",
        "type": "tvSeries",
        "primaryTitle": "Last",
        "originalTitle": "The Terminal List: Dark Wolf",
        "primaryImage": {
          "url": "https://m.media-amazon.com/images/M/MV5BNGVlNmU2YmItOTE1Mi00NjhlLWE0ODMtNDVjMjY0OTUyOWY2XkEyXkFqcGc@._V1_.jpg",
          "width": 2000,
          "height": 3000
        },
        "startYear": 2025,
        "runtimeSeconds": 3600,
        "genres": [
          "Action",
          "Drama",
          "Thriller"
        ],
        "rating": {
          "aggregateRating": 8,
          "voteCount": 3005
        },
        "plot": "Before joining THE TERMINAL LIST, Navy SEAL Ben Edwards works CIA black ops. As he delves deeper into moral gray areas, he struggles between light and dark impulses - two wolves fighting within him."
      },
    ]
  }
}
