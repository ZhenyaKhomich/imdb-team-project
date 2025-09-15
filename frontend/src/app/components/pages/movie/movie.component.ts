import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  public route = inject(ActivatedRoute);
  public id = signal(this.route.snapshot.paramMap.get('id'));
}
