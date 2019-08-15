import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { tokenSelector } from '../store/selectors/auth.selectors';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private token$: Observable<string>;

  constructor(
      private router: Router,
      private store: Store<State>
  ) {}

  getFromStore(): Observable<string> {
    return this.store.pipe(select(tokenSelector));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getFromStore().pipe(
      switchMap((token: string) => {
        if (token) {
          return of(true);
        } else {
          this.router.navigate(['/signin']);
          return of(false);
        }
      })
    );
  }
}





