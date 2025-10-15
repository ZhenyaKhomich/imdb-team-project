import { TestBed } from '@angular/core/testing';
import { ActorService } from './actor.service';

describe('ActorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActorService],
    });
    service = TestBed.inject(ActorService);
  });

  it('create', () => {
    expect(service).toBeTruthy();
  });

  it('initial', () => {
    expect(service.currentPage()).toBe(1);
    expect(service.nextToken()).toBe('');
    expect(service.prevToken()).toBe('');
    expect(service.lastPage()).toBe(false);
  });

  it('updata', () => {
    service.currentPage.set(5);
    service.nextToken.set('next123');
    service.prevToken.set('prev123');
    service.lastPage.set(true);

    expect(service.currentPage()).toBe(5);
    expect(service.nextToken()).toBe('next123');
    expect(service.prevToken()).toBe('prev123');
    expect(service.lastPage()).toBe(true);
  });
});
