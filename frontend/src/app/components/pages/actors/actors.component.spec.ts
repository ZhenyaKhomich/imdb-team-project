import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActorsComponent } from './actors.component';
import { ActorService } from './service/actor.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActorsPageService } from '../../../shared/services/actors-page.service';

describe('ActorsComponent', () => {
  let fixture: ComponentFixture<ActorsComponent>;
  let component: ActorsComponent;
  let actorService: ActorService;
  let actorsPageServiceMock: jasmine.SpyObj<ActorsPageService>;

  beforeEach(async () => {
    actorsPageServiceMock = jasmine.createSpyObj('ActorsPageService', [
      'getActors',
    ]);
    actorsPageServiceMock.getActors.and.returnValue(
      of({
        names: [
          {
            id: '1',
            displayName: 'Test Actor',
            primaryImage: { width: 100, height: 100 },
            meterRanking: { currentRank: 1, changeDirection: 'UP' },
          },
        ],
        nextPageToken: '',
      })
    );

    await TestBed.configureTestingModule({
      imports: [ActorsComponent],
      providers: [
        ActorService,
        { provide: ActorsPageService, useValue: actorsPageServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorsComponent);
    component = fixture.componentInstance;
    actorService = TestBed.inject(ActorService);
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('initial', () => {
    expect(component.view()).toBe('compact');
    const active = fixture.debugElement.query(By.css('.view.active'));
    expect(active.nativeElement.textContent).toContain('view_headline');
  });

  it('toggle', () => {
    const gridIcon = fixture.debugElement.queryAll(By.css('.view'))[1];
    gridIcon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.view()).toBe('grid');
    const active = fixture.debugElement.query(By.css('.view.active'));
    expect(active.nativeElement.textContent).toContain('view_comfy');
  });

  it('nextPage', () => {
    actorService.nextToken.set('token123');
    const previousPage = actorService.currentPage();

    component.nextPage();

    expect(actorService.currentPage()).toBe(previousPage + 1);
    expect(component.query()['pageToken']).toBe('token123');
  });

  it('prevPage', () => {
    actorService.currentPage.set(2);
    actorService.prevToken.set('prev123');

    component.prevPage();

    expect(actorService.currentPage()).toBe(1);
    expect(component.query()['pageToken']).toBe('prev123');
  });
});
