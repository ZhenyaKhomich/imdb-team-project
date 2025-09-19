import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActorService } from './service/actor.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActorsPageService } from '../../../shared/services/actors-page.service';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-actors',
  imports: [],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorsComponent {
  public view = signal('');
  public loading = signal(false);
  public actor = inject(ActorService);
  public actorPageService = inject(ActorsPageService);

  public query = signal<Record<string, string>>({}); //pageToken

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
}
