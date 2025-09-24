import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActorsPageService } from '../../../shared/services/actors-page.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-actor',
  imports: [],
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

  // public images = viewChild(ImagesComponent);

  // public videos = viewChild(VideosComponent);

  public data = toSignal(this.actor.getActor(this.id() || ''), {
    initialValue: null,
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

  // public imagePrev(): void {
  //   if (this.images()) {
  //     this.images()?.prev();
  //   }
  // }

  // public imageNext(): void {
  //   if (this.images()) {
  //     this.images()?.next();
  //   }
  // }

  // public videoPrev(): void {
  //   if (this.videos()) {
  //     this.videos()?.prev();
  //   }
  // }

  // public videoNext(): void {
  //   if (this.videos()) {
  //     this.videos()?.next();
  //   }
  // }
}
