import {
  Component,
  ChangeDetectionStrategy,
  signal,
  output,
  viewChildren,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RangeComponent } from '../range/range.component';
import { ChooseComponent } from '../choose/choose.component';
import type { FilterChoose, RangeTypes } from '../../../../shared/types/movies';

@Component({
  selector: 'app-filter-panel',
  imports: [MatIconModule, RangeComponent, ChooseComponent],
  standalone: true,
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  public modal = input(false);
  public genres = input<Omit<FilterChoose, 'name'>[]>([]);
  public titleTypes = input<FilterChoose[]>([]);
  public rangeInputs = input<RangeTypes>({
    yearMin: '',
    yearMax: '',
    ratingMin: '',
    ratingMax: '',
    votesMin: '',
    votesMax: '',
  });
  public genresSort = signal<string[]>([]);
  public typesSort = signal<string[]>([]);
  public choseTypes = output<string[]>();
  public choseGenres = output<string[]>();
  public choseRatingMin = output<string>();
  public choseRatingMax = output<string>();
  public choseVotesMin = output<string>();
  public choseVotesMax = output<string>();
  public choseYearMin = output<string>();
  public choseYearMax = output<string>();
  public resetClick = output();

  private chooses = viewChildren(ChooseComponent);
  private ranges = viewChildren(RangeComponent);

  public chooseGenres(trigger: boolean, name: string): void {
    if (trigger) {
      this.genresSort.update((genres) => [...genres, name]);
    } else {
      this.genresSort.update((genres) =>
        genres.filter((genre) => genre !== name)
      );
    }

    this.choseGenres.emit(this.genresSort());
  }

  public chooseTypes(trigger: boolean, name: string): void {
    if (trigger) {
      this.typesSort.update((types) => [...types, name]);
    } else {
      this.typesSort.update((types) => types.filter((type) => type !== name));
    }

    this.choseTypes.emit(this.typesSort());
  }

  public reset(): void {
    this.chooses().forEach((choose) => choose.chooseReset());
    this.ranges().forEach((range) => range.rangeReset());
    this.genresSort.set([]);
    this.typesSort.set([]);
    this.resetClick.emit();
  }
}
