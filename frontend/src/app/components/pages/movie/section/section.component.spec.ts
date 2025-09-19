import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';
import { NavigationService } from '../services/navigation.service';
import { ElementRef } from '@angular/core';

describe('SectionComponent', () => {
  let fixture: ComponentFixture<SectionComponent>;
  let navServiceMock: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    navServiceMock = jasmine.createSpyObj<NavigationService>(
      'NavigationService',
      ['registerSection', 'unregisterSection']
    );

    await TestBed.configureTestingModule({
      imports: [SectionComponent],
      providers: [
        { provide: NavigationService, useValue: navServiceMock },
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('section')),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);

    fixture.componentRef.setInput('id', 'test-id');
    fixture.componentRef.setInput('title', 'Test Title');

    fixture.detectChanges();
  });

  it('registerSection', () => {
    expect(navServiceMock.registerSection).toHaveBeenCalledWith(
      'test-id',
      'Test Title',
      jasmine.any(HTMLElement)
    );
  });

  it('unregisterSection', () => {
    fixture.destroy();
    expect(navServiceMock.unregisterSection).toHaveBeenCalledWith('test-id');
  });
});
