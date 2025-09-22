import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActorService } from './service/actor.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActorsPageService } from '../../../shared/services/actors-page.service';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ActorComponent } from './actor/actor.component';

@Component({
  selector: 'app-actors',
  imports: [MatIconModule, SkeletonComponent, ActorComponent],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorsComponent {
  public view = signal('compact');
  public loading = signal(false);
  public actor = inject(ActorService);
  public actorPageService = inject(ActorsPageService);

  public firstPage = computed(() => this.actor.currentPage() === 1);

  public query = signal<Record<string, string>>({});

  public data = toSignal(
    toObservable(this.query).pipe(
      debounceTime(500),
      switchMap((parameters: Record<string, string>) => {
        this.loading.set(true);
        return this.actorPageService.getActors(parameters);
      }),
      map((data) => {
        this.loading.set(false);

        if (!data.nextPageToken) {
          this.actor.lastPage.set(true);
          this.actor.nextToken.set('');
        } else {
          this.actor.lastPage.set(false);
          this.actor.nextToken.set(data.nextPageToken);
        }

        return data;
      }),
      catchError(() => {
        this.loading.set(false);
        return of({ names: [], nextPageToken: '' });
      })
    ),
    { initialValue: { names: [], nextPageToken: '' } }
  );

  public changeView(view: string): void {
    this.view.set(view);
  }

  public nextPage(): void {
    if (this.actor.nextToken()) {
      this.actor.currentPage.update((c) => c + 1);
      this.query.update((q) => ({
        ...q,
        pageToken: this.actor.nextToken(),
      }));
    }
  }

  public prevPage(): void {
    if (this.actor.currentPage() > 1) {
      this.actor.currentPage.update((c) => c - 1);
      this.query.update((q) => ({
        ...q,
        pageToken: this.actor.prevToken(),
      }));
    }
  }
}
