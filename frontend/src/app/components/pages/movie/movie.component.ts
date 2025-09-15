import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './services/navigation.service';
import { SectionComponent } from './section/section.component';

@Component({
  selector: 'app-movie',
  imports: [NavigationComponent, SectionComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  public route = inject(ActivatedRoute);
  public id = signal(this.route.snapshot.paramMap.get('id'));
  public title = 'Angular Site with Side Navigation';

  private navService = inject(NavigationService);

  constructor() {
    this.navService.initScrollTracking();
  }
}
