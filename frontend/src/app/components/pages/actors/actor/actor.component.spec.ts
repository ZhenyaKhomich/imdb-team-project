import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActorComponent } from './actor.component';
import { By } from '@angular/platform-browser';
import type { Name } from '../../../../shared/types/actors-page';

describe('ActorComponent', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let component: ActorComponent;

  const mockNames: Name[] = [
    {
      id: '1',
      displayName: 'Actor One',
      primaryImage: { url: 'test.jpg', width: 100, height: 100 },
      meterRanking: { currentRank: 1, changeDirection: 'UP', difference: 2 },
      heightCm: 180,
      birthDate: { day: 1, month: 1, year: 1990 },
    },
    {
      id: '2',
      displayName: 'Actor Two',
      primaryImage: { url: 'test2.jpg', width: 100, height: 100 },
      meterRanking: { currentRank: 2, changeDirection: 'DOWN' },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
  });

  it('crate', () => {
    expect(component).toBeTruthy();
  });

  it('grid', () => {
    fixture.componentRef.setInput('names', mockNames);
    fixture.componentRef.setInput('view', 'grid');
    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.css('.grid'));
    expect(grid).toBeTruthy();

    const items = fixture.debugElement.queryAll(By.css('.movie-grid'));
    expect(items.length).toBe(2);

    expect(fixture.nativeElement.textContent).toContain('Actor One');
    expect(fixture.nativeElement.textContent).toContain('Actor Two');
  });

  it('compact', () => {
    fixture.componentRef.setInput('names', mockNames);
    fixture.componentRef.setInput('view', 'compact');
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.movie'));
    expect(items.length).toBe(2);

    expect(fixture.nativeElement.textContent).toContain('Actor One');
  });

  it('detail', () => {
    fixture.componentRef.setInput('names', mockNames);
    fixture.componentRef.setInput('view', 'grid');
    fixture.detectChanges();

    spyOn(component, 'detail');

    const nameElement = fixture.debugElement.query(By.css('h3.click-detail'));
    nameElement.triggerEventHandler('click', null);

    expect(component.detail).toHaveBeenCalledWith('1');
  });

  it('format date', () => {
    fixture.componentRef.setInput('names', [mockNames[0]]);
    fixture.componentRef.setInput('view', 'compact');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('01.01.1990');
  });
});
