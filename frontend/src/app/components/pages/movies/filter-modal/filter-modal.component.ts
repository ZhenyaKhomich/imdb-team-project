import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import type { FilterChoose } from '../types/types';

@Component({
  selector: 'app-filter-modal',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    FilterPanelComponent,
  ],
  standalone: true,
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent {
  public data = inject(MAT_DIALOG_DATA);
  public dialogReference = inject(MatDialogRef<FilterModalComponent>);
  public genres = input<Omit<FilterChoose, 'name'>[]>([]);
  public titleTypes = input<FilterChoose[]>([]);

  private chooses = viewChild(FilterPanelComponent);

  public cancel(): void {
    this.dialogReference.close();
  }

  public reset(): void {
    this.data.reset();
    this.chooses()?.reset();
  }
}
