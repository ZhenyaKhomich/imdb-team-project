import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActorsPageService } from '../../../shared/services/actors-page.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { OverviewComponent } from './overview/overview.component';
import { MatIconModule } from '@angular/material/icon';
import { ImagesComponent } from './images/images.component';
import { FilmographyComponent } from "./filmography/filmography.component";

@Component({
  selector: 'app-actor',
  imports: [OverviewComponent, MatIconModule, ImagesComponent, FilmographyComponent],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorComponent {
  public route = inject(ActivatedRoute);
  public id = signal(this.route.snapshot.paramMap.get('id'));
  public actor = inject(ActorsPageService);
  public title = inject(Title);
  public currentUrl = window.location.pathname;
  public isPrevImageActive = signal(false);
  public isNextImageActive = signal(true);
  public isPrevVideoActive = signal(false);
  public isNextVideoActive = signal(true);

  public images = viewChild(ImagesComponent);

  public data = toSignal(this.actor.getActor(this.id() || ''), {
    initialValue: null,
  });

  public dataImage = toSignal(this.actor.getImages(this.id() || ''), {
    initialValue: null,
  });

  public dataFilms = toSignal(this.actor.getFilms(this.id() || ''), {
    initialValue: null,
  });

  public urlImages = computed(() => {
    const currentData = this.dataImage();
    if (
      currentData &&
      'images' in currentData &&
      Array.isArray(currentData.images)
    ) {
      return (
        currentData.images.map((element: { url: string }) => element.url) || []
      );
    }
    return [];
  });

  public films = computed(() => {
    const currentData = this.dataFilms();
    if (
      currentData &&
      'credits' in currentData &&
      Array.isArray(currentData.credits)
    ) {
      return currentData.credits || [];
    }
    return [];
  });

  public name = computed(() => {
    const currentData = this.data();
    if (currentData && 'displayName' in currentData) {
      return currentData.displayName || '';
    }
    return '';
  });

  public professions = computed(() => {
    const currentData = this.data();
    if (currentData && 'primaryProfessions' in currentData) {
      return (currentData.primaryProfessions || [])
        .map((element) => element[0].toLocaleUpperCase() + element.slice(1))
        .join(', ');
    }
    return '';
  });

  public biography = computed(() => {
    const currentData = this.data();
    if (currentData && 'biography' in currentData) {
      return currentData.biography || '';
    }
    return '';
  });

  public height = computed(() => {
    const currentData = this.data();
    if (currentData && 'heightCm' in currentData) {
      return currentData.heightCm || 0;
    }
    return 0;
  });

  public birthName = computed(() => {
    const currentData = this.data();
    if (currentData && 'birthName' in currentData) {
      return currentData.birthName || '';
    }
    return '';
  });

  public birthDate = computed(() => {
    const currentData = this.data();
    if (
      currentData &&
      'birthDate' in currentData &&
      currentData.birthDate &&
      'day' in currentData.birthDate &&
      'month' in currentData.birthDate &&
      'year' in currentData.birthDate
    ) {
      const birthDate = currentData.birthDate;
      return `${birthDate['day']?.toString().padStart(2, '0')}.${birthDate[
        'month'
      ]
        ?.toString()
        .padStart(2, '0')}.${birthDate['year']}`;
    }
    return '';
  });

  public deathDate = computed(() => {
    const currentData = this.data();
    if (
      currentData &&
      'deathDate' in currentData &&
      currentData.deathDate &&
      'day' in currentData.deathDate &&
      'month' in currentData.deathDate &&
      'year' in currentData.deathDate
    ) {
      const deathDate = currentData.deathDate;
      return `${deathDate['day']?.toString().padStart(2, '0')}.${deathDate[
        'month'
      ]
        ?.toString()
        .padStart(2, '0')}.${deathDate['year']}`;
    }
    return '';
  });

  public img = computed(() => {
    const currentData = this.data();
    if (currentData && 'primaryImage' in currentData) {
      return currentData.primaryImage?.url || '';
    }
    return '';
  });

  public birthLocation = computed(() => {
    const currentData = this.data();
    if (currentData && 'birthLocation' in currentData) {
      return currentData.birthLocation || '';
    }
    return '';
  });

  constructor() {
    effect(() => {
      const currentData = this.data();
      if (currentData && 'displayName' in currentData) {
        this.title.setTitle(currentData.displayName || 'Actor not found');
      } else {
        this.title.setTitle('Actor not found');
      }
    });
  }

  public imagePrev(): void {
    if (this.images()) {
      this.images()?.prev();
    }
  }

  public imageNext(): void {
    if (this.images()) {
      this.images()?.next();
    }
  }
}
