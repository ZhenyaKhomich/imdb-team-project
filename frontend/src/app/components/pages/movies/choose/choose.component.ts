import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-choose',
  imports: [],
  templateUrl: './choose.component.html',
  styleUrl: './choose.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseComponent {
  public state = input<boolean>(false);
  public chooseChanged = output<boolean>();
  public choose = signal(false);

  constructor() {
    effect(() => {
      this.choose.set(this.state());
    });
  }

  public chooseClick(): void {
    this.choose.update((choose) => !choose);
    this.chooseChanged.emit(this.choose());
  }

  public chooseReset(): void {
    this.choose.set(false);
  }
}
