import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  private loadingOn() {
    this.loadingSubject.next(true);
  }

  private loadingOff() {
    this.loadingSubject.next(false);
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): void {
    of(null)
        .pipe(
            tap(() => this.loadingOn()),
            concatMap(() => obs$),
            finalize(() => this.loadingOff())
        ).subscribe();
  }
}
