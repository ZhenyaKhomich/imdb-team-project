import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Name } from '../../../../shared/types/actors-page';

@Component({
  selector: 'app-actor',
  imports: [],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorComponent {
  public names = input<Name[]>([]);
  public view = input<string>('grid');
}
