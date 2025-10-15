import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActorComponent } from './actor.component';
import { ActorsPageService } from '../../../shared/services/actors-page.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Component, input } from '@angular/core';

@Component({ selector: 'app-overview', template: '' })
class MockOverviewComponent {
  public img = input<string>('');
  public name = input<string>('');
  public birthName = input<string>('');
  public birthDate = input<string>('');
  public deadDate = input<string>('');
  public biography = input<string>('');
  public professions = input<string>('');
  public birthLocation = input<string>('');
  public height = input<number>(0);
}

@Component({ selector: 'app-images', template: '' })
class MockImagesComponent {
  public images = input<string[]>([]);
  public prev = jasmine.createSpy('prev');
  public next = jasmine.createSpy('next');
}

@Component({ selector: 'app-filmography', template: '' })
class MockFilmographyComponent {
  public films = input([]);
}

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let titleService: Title;

  const mockActor = {
    displayName: 'John Doe',
    primaryProfessions: ['actor', 'director'],
    biography: 'Some bio',
    heightCm: 180,
    birthName: 'Jonathan Doe',
    birthDate: { day: 1, month: 1, year: 1990 },
    deathDate: { day: 1, month: 1, year: 2050 },
    primaryImage: { url: 'http://test.com/img.jpg' },
    birthLocation: 'Minsk',
  };

  const mockImages = {
    images: [
      { url: 'http://test.com/img1.jpg' },
      { url: 'http://test.com/img2.jpg' },
    ],
  };

  const mockFilms = {
    credits: [{ title: { id: 'tt123', primaryTitle: 'Movie 1' } }],
  };

  const actorServiceStub = {
    getActor: jasmine.createSpy().and.returnValue(of(mockActor)),
    getImages: jasmine.createSpy().and.returnValue(of(mockImages)),
    getFilms: jasmine.createSpy().and.returnValue(of(mockFilms)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActorComponent,
        MockOverviewComponent,
        MockImagesComponent,
        MockFilmographyComponent,
      ],

      providers: [
        { provide: ActorsPageService, useValue: actorServiceStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '123']]) } },
        },
        Title,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('Title', () => {
    expect(titleService.getTitle()).toBe('John Doe');
  });
});
