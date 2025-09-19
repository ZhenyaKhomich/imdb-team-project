import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import type { BreakpointState } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { FilterService } from './services/filter.service';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { ListComponent } from './list/list.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { MoviesService } from '../../../shared/services/movies.service';

@Component({
  selector: 'app-movies',
  imports: [
    MatButtonModule,
    MatIconModule,
    FilterPanelComponent,
    ListComponent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SkeletonComponent,
  ],
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
  public filterService = inject(FilterService);
  public moviesService = inject(MoviesService);
  public dialog = inject(MatDialog);

  public currentPage = signal(1);
  public prevPageToken = signal('');
  public nextPageToken = signal('');

  public readonly breakpointObserver = inject(BreakpointObserver);
  public readonly isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 900px)').pipe(
      map((result: BreakpointState) => {
        const size = result.matches;

        return size;
      })
    ),
    { initialValue: false }
  );
  public selectedValue = signal('');
  public desc = signal(false);
  public loading = signal(false);
  public view = signal('detail');
  public totalPage = signal(0);
  public firstPage = computed(() => this.currentPage() === 1);
  public lastPage = signal(false);
  public finishCurrentPage = computed(() => {
    if (this.currentPage() * 50 > this.totalPage()) {
      return this.totalPage();
    }
    if (this.totalPage() > 50) {
      return this.currentPage() * 50;
    }
    return this.totalPage();
  });
  public startCurrentPage = computed(() => {
    if (this.currentPage() === 1) {
      return this.currentPage();
    }
    return (this.currentPage() - 1) * 50 + 1;
  });
  public query = signal<Record<string, string | number | string[]>>({
    sortOrder: 'DESC',
  });

  public data = toSignal(
    toObservable(this.query).pipe(
      debounceTime(500),
      switchMap((parameters: Record<string, string | number | string[]>) => {
        this.loading.set(true);
        return this.moviesService.getTitles(parameters);
      }),
      map((data) => {
        this.loading.set(false);
        this.totalPage.set(data?.totalCount || 0);

        if (!data.nextPageToken) {
          this.lastPage.set(true);
          this.nextPageToken.set('');
        } else {
          this.lastPage.set(false);
          this.nextPageToken.set(data.nextPageToken);
        }

        return data;
      }),
      catchError(() => {
        this.loading.set(false);
        return of({ titles: [], totalCount: 0, nextPageToken: '' });
      })
    ),
    { initialValue: { titles: [], totalCount: 0, nextPageToken: '' } }
  );

  public changeSelect(value: string): void {
    this.selectedValue.set(value);
    this.currentPage.set(1);
    this.query.update((q) => ({ ...q, sortBy: value }));
  }

  public openFilterModal(): void {
    this.dialog.open(FilterModalComponent, {
      width: '90%',
      maxWidth: '800px',
      data: {
        listGenres: this.filterService.listGenres(),
        types: this.filterService.types(),
        rangeInputs: this.filterService.rangeInputs(),
        reset: () => this.reset(),
        choseGenres: (chose: string[]) => this.choseGenres(chose),
        choseTypes: (chose: string[]) => this.choseTypes(chose),
        updateRangeInput: (name: string, value: string) =>
          this.updateRangeInput(name, value),
      },
    });
  }

  public changeView(view: string): void {
    this.view.set(view);
  }

  public choseGenres(chose: string[]): void {
    this.filterService.updateGenres();
    chose.forEach((element) => {
      this.filterService.updateGenres(element, true);
    });
    this.query.update((q) => ({ ...q, pageToken: '', genres: chose }));
    this.currentPage.set(1);
  }

  public choseTypes(chose: string[]): void {
    this.filterService.updateTypes();
    chose.forEach((element) => {
      this.filterService.updateTypes(element, true);
    });
    this.query.update((q) => ({ ...q, pageToken: '', types: chose }));
    this.currentPage.set(1);
  }

  public reset(): void {
    this.filterService.reset();
    this.query.set({});
    this.currentPage.set(1);
  }

  public updateRangeInput(name: string, value: string): void {
    this.filterService.updateRangeInputs(name, value);

    if (name === 'yearMin') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        startYear: Math.ceil(Number(value)),
      }));
    } else if (name === 'yearMax') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        endYear: Math.ceil(Number(value)),
      }));
    } else if (name === 'ratingMin') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        minAggregateRating: Number(value),
      }));
    } else if (name === 'ratingMax') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        maxAggregateRating: Number(value),
      }));
    } else if (name === 'votesMin') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        minVoteCount: Math.ceil(Number(value)),
      }));
    } else if (name === 'votesMax') {
      this.query.update((q) => ({
        ...q,
        pageToken: '',
        maxVoteCount: Math.ceil(Number(value)),
      }));
    }
    this.currentPage.set(1);
  }

  public sortOrder(): void {
    this.desc.update((d) => !d);
    this.query.update((q) => ({
      ...q,
      pageToken: '',
      sortOrder: this.desc() ? 'ASC' : 'DESC',
    }));
    this.currentPage.set(1);
  }

  public nextPage(): void {
    if (this.nextPageToken()) {
      this.currentPage.update((c) => c + 1);
      this.query.update((q) => ({
        ...q,
        pageToken: this.nextPageToken(),
      }));
    }
  }

  public prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((c) => c - 1);
      this.query.update((q) => ({
        ...q,
        pageToken: this.prevPageToken(),
      }));
    }
  }
}
