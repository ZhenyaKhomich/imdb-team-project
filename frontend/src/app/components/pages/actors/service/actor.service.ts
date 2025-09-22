import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  public currentPage = signal(1);
  public nextToken = signal('');
  public prevToken = signal('');
  public lastPage = signal(false);
}
