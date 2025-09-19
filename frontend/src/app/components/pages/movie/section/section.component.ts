import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  public id = input.required<string>();
  public title = input.required<string>();

  private navService = inject(NavigationService);
  private elementRef = inject(ElementRef);

  constructor() {
    effect((onCleanup) => {
      const element = this.elementRef.nativeElement;
      const id = this.id();
      const title = this.title();

      if (id && title && element) {
        this.navService.registerSection(id, title, element);
      }

      onCleanup(() => this.navService.unregisterSection(this.id()));
    });
  }
}
