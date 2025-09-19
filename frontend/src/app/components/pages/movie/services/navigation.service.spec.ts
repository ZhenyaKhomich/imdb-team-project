import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    service = new NavigationService();
  });

  it('add new section', () => {
    const element = document.createElement('section');
    service.registerSection('id1', 'Title 1', element);

    expect(service.sections().length).toBe(1);
    expect(service.sections()[0]).toEqual({
      id: 'id1',
      title: 'Title 1',
      active: false,
    });
  });

  it('not duplicate', () => {
    const element = document.createElement('section');
    service.registerSection('id1', 'Title 1', element);
    service.registerSection('id1', 'Title 1', element);

    expect(service.sections().length).toBe(1);
  });

  it('active', () => {
    const element1 = document.createElement('section');
    const element2 = document.createElement('section');
    service.registerSection('id1', 'Title 1', element1);
    service.registerSection('id2', 'Title 2', element2);

    service.setActiveSection('id2');

    expect(service.activeSectionId()).toBe('id2');
    expect(service.sections().find((s) => s.id === 'id2')?.active).toBeTrue();
    expect(service.sections().find((s) => s.id === 'id1')?.active).toBeFalse();
  });

  it('delete', () => {
    const element = document.createElement('section');
    service.registerSection('id1', 'Title 1', element);

    service.unregisterSection('id1');

    expect(service.sections().length).toBe(0);
  });

  it('scrollToSection', () => {
    const element = document.createElement('section');
    spyOn(element, 'getBoundingClientRect').and.returnValue({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    service.registerSection('id1', 'Title 1', element);

    service.scrollToSection('id1');

    expect(service.activeSectionId()).toBe('id1');
  });

  it('initScrollTracking', () => {
    const addSpy = spyOn(window, 'addEventListener');
    service.initScrollTracking(true);

    expect(addSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function), {
      passive: true,
    });
    expect(service.activeSectionId()).toBe('section1');
  });

  it('updateActiveSectionOnScroll', () => {
    const element1 = document.createElement('section');
    const element2 = document.createElement('section');

    spyOn(element1, 'getBoundingClientRect').and.returnValue({
      top: 200,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    spyOn(element2, 'getBoundingClientRect').and.returnValue({
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    service.registerSection('id1', 'Title 1', element1);
    service.registerSection('id2', 'Title 2', element2);

    service['updateActiveSectionOnScroll']();

    expect(service.activeSectionId()).toBe('id2');
  });
});
