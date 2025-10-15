import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import type { Name } from '../../../../shared/types/actors-page';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import {Router} from '@angular/router';

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
  public router = inject(Router);


  public detail(id: string): void {
    this.router.navigate(['/actors', id]);
  }
}
