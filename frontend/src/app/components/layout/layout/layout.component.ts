import {ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import type {OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {SignalService} from '../../../shared/services/signal.service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  private localStorageService = inject(LocalStorageService);
  private signalService = inject(SignalService);

  public ngOnInit(): void {
    const accessToken = this.localStorageService.getAccessToken();
    this.signalService.isLogin.set(!!accessToken);
  }



}
