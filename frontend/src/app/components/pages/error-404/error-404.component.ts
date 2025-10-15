import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AppRoutesEnum} from '../../../shared/enums/app-router.enum';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error404Component {

  protected readonly AppRoutesEnum = AppRoutesEnum;
}
