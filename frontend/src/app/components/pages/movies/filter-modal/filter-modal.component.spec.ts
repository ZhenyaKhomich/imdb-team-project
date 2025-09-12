import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterModalComponent } from './filter-modal.component';
import type { FilterChoose, RangeTypes } from '../../../../shared/types/movies';

interface MockDialogData {
  listGenres: Omit<FilterChoose, 'name'>[];
  types: FilterChoose[];
  rangeInputs: RangeTypes;
  reset: jasmine.Spy;
  choseGenres: jasmine.Spy;
  choseTypes: jasmine.Spy;
  updateRangeInput: jasmine.Spy;
}

describe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;
  let mockDialogReference: jasmine.SpyObj<MatDialogRef<FilterModalComponent>>;
  let mockDialogData: MockDialogData;

  const mockGenres: Omit<FilterChoose, 'name'>[] = [
    { value: 'Action', status: false },
    { value: 'Comedy', status: true },
  ];

  const mockTitleTypes: FilterChoose[] = [
    { name: 'Movie', value: 'MOVIE', status: false },
    { name: 'Series', value: 'TV_SERIES', status: true },
  ];

  const mockRangeInputs: RangeTypes = {
    yearMin: '2000',
    yearMax: '2020',
    ratingMin: '5.0',
    ratingMax: '9.0',
    votesMin: '1000',
    votesMax: '1000000',
  };

  beforeEach(async () => {
    mockDialogReference = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDialogData = {
      listGenres: mockGenres,
      types: mockTitleTypes,
      rangeInputs: mockRangeInputs,
      reset: jasmine.createSpy('reset'),
      choseGenres: jasmine.createSpy('choseGenres'),
      choseTypes: jasmine.createSpy('choseTypes'),
      updateRangeInput: jasmine.createSpy('updateRangeInput'),
    };

    await TestBed.configureTestingModule({
      imports: [
        FilterModalComponent,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: mockDialogReference },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initialization', () => {
    expect(component.data).toEqual(mockDialogData);
    expect(component.dialogReference).toEqual(mockDialogReference);
  });

  it('show title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('h2[mat-dialog-title]')
    );
    expect(titleElement.nativeElement.textContent).toContain('Filters');
  });

  it('show FilterPanelComponent', () => {
    const filterPanelElement = fixture.debugElement.query(
      By.css('app-filter-panel')
    );
    expect(filterPanelElement).toBeTruthy();
  });

  it('correct properties FilterPanelComponent', () => {
    const filterPanelElement = fixture.debugElement.query(
      By.css('app-filter-panel')
    );
    const filterPanelComponent = filterPanelElement.componentInstance;

    expect(filterPanelComponent.genres()).toEqual(mockDialogData.listGenres);
    expect(filterPanelComponent.titleTypes()).toEqual(mockDialogData.types);
    expect(filterPanelComponent.rangeInputs()).toEqual(
      mockDialogData.rangeInputs
    );
    expect(filterPanelComponent.modal()).toBe(true);
  });

  it('call cancel()', () => {
    component.cancel();
    expect(mockDialogReference.close).toHaveBeenCalled();
  });
  it('call event from FilterPanelComponent', () => {
    const filterPanelElement = fixture.debugElement.query(
      By.css('app-filter-panel')
    );
    const filterPanelComponent = filterPanelElement.componentInstance;

    filterPanelComponent.choseGenres.emit(['Action', 'Comedy']);
    filterPanelComponent.choseTypes.emit(['MOVIE']);
    filterPanelComponent.choseYearMin.emit('2005');
    filterPanelComponent.choseYearMax.emit('2015');
    filterPanelComponent.choseRatingMin.emit('6.0');
    filterPanelComponent.choseRatingMax.emit('8.5');
    filterPanelComponent.choseVotesMin.emit('5000');
    filterPanelComponent.choseVotesMax.emit('500000');

    expect(mockDialogData.choseGenres).toHaveBeenCalledWith([
      'Action',
      'Comedy',
    ]);
    expect(mockDialogData.choseTypes).toHaveBeenCalledWith(['MOVIE']);
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'yearMin',
      '2005'
    );
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'yearMax',
      '2015'
    );
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'ratingMin',
      '6.0'
    );
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'ratingMax',
      '8.5'
    );
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'votesMin',
      '5000'
    );
    expect(mockDialogData.updateRangeInput).toHaveBeenCalledWith(
      'votesMax',
      '500000'
    );
  });
});

describe('FilterModalComponent integration test', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;
  let mockDialogReference: jasmine.SpyObj<MatDialogRef<FilterModalComponent>>;
  let mockDialogData: MockDialogData;

  beforeEach(async () => {
    mockDialogReference = jasmine.createSpyObj('MatDialogRef', ['close']);

    mockDialogData = {
      listGenres: [],
      types: [],
      rangeInputs: {
        yearMin: '',
        yearMax: '',
        ratingMin: '',
        ratingMax: '',
        votesMin: '',
        votesMax: '',
      },
      reset: jasmine.createSpy('reset'),
      choseGenres: jasmine.createSpy('choseGenres'),
      choseTypes: jasmine.createSpy('choseTypes'),
      updateRangeInput: jasmine.createSpy('updateRangeInput'),
    };

    await TestBed.configureTestingModule({
      imports: [
        FilterModalComponent,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: mockDialogReference },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('call cancel()', () => {
    const cancelSpy = spyOn(component, 'cancel');
    const cancelButton = fixture.debugElement.query(
      By.css('button:last-child')
    );

    cancelButton.nativeElement.click();
    fixture.detectChanges();

    expect(cancelSpy).toHaveBeenCalled();
  });

  it('call reset()', () => {
    const resetSpy = spyOn(component, 'reset');
    const resetButton = fixture.debugElement.query(
      By.css('button:first-child')
    );

    resetButton.nativeElement.click();
    fixture.detectChanges();

    expect(resetSpy).toHaveBeenCalled();
  });
});
