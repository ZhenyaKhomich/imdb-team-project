import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public navService = inject(NavigationService);

  public sections = this.navService.sections;
  public activeSectionId = this.navService.activeSectionId;

  public navigateTo(sectionId: string): void {
    this.navService.scrollToSection(sectionId);
  }
}
