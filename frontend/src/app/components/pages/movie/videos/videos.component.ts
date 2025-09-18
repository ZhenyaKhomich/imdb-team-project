import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Video } from '../../../../shared/types/movies';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-videos',
  imports: [TruncatePipe, SafeUrlPipe],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent {
  public data = input<Video[]>([]);
}
