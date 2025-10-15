import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, NgOptimizedImage],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  public img = input<string>('');
  public name = input<string>('');
  public birthName = input<string>('');
  public birthLocation = input<string>('');
  public birthDate = input<string>('');
  public deadDate = input<string>('');
  public height = input<number>(0);
  public biography = input<string>('');
  public professions = input<string>('');
}
