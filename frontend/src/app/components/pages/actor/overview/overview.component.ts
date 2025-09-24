import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import { MatIconModule } from '@angular/material/icon';
import { NumberSuffixPipe } from '../../../../shared/pipes/number-suffix.pipe';
import { NgOptimizedImage } from '@angular/common';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import type {
  BirthDate,
  DeathDate,
} from '../../../../shared/types/actors-page';

@Component({
  selector: 'app-overview',
  imports: [
    MinutesToHoursPipe,
    MatIconModule,
    NumberSuffixPipe,
    NgOptimizedImage,
    SafeUrlPipe,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  public img = input<string>('');
  public name = input<string>('');
  public birthName = input<string>('');
  public birthDate = input<BirthDate>({});
  public deadDate = input<DeathDate>({});
  public height = input<number>(0);
  public biography = input<string>('');
  public professions = input<string[]>([]);
}
