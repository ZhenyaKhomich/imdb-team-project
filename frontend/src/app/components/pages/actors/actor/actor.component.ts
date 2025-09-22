import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Name } from '../../../../shared/types/actors-page';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-actor',
  imports: [MatIconModule, NgOptimizedImage],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorComponent {
  public names = input<Name[]>([]);
  public view = input<string>('grid');

  public detail(id: string): void {
    console.log(id);
  }
}
