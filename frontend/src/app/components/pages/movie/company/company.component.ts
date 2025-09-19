import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import type { CompanyCredit } from '../../../../shared/types/movies-response.type';

@Component({
  selector: 'app-company',
  imports: [UpperCasePipe],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent {
  public data = input<CompanyCredit[]>([]);
}
