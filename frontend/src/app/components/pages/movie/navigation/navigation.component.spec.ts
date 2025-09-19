import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from '../services/navigation.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let navServiceMock: jasmine.SpyObj<NavigationService>;

  const mockSections = [
    { id: 'home', title: 'Home', active: false },
    { id: 'about', title: 'About', active: true },
    { id: 'contact', title: 'Contact', active: false },
  ];

  beforeEach(async () => {
    navServiceMock = jasmine.createSpyObj<NavigationService>(
      'NavigationService',
      ['scrollToSection'],
      {
        sections: signal(mockSections),
        activeSectionId: signal('about'),
      }
    );

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [{ provide: NavigationService, useValue: navServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
  });

  it('render list', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Home');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('About');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('Contact');
  });

  it('active', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[1].nativeElement.classList).toContain('active');
    expect(buttons[0].nativeElement.classList).not.toContain('active');
  });

  it('scrollToSection', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[2].triggerEventHandler('click');
    expect(navServiceMock.scrollToSection).toHaveBeenCalledWith('contact');
  });
});
