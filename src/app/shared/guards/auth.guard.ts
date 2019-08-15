import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { State } from '../store';
import { isLoggedinSelector } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private store: Store<State>
  ) {}

  getFromStore(): Observable<boolean> {
    return this.store.pipe(select(isLoggedinSelector));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getFromStore().pipe(
      switchMap((isLoggedin: boolean) => {
        if (isLoggedin) {
          return of(true);
        } else {
          this.router.navigate(['/signin']);
          return of(false);
        }
      })
    );
  }
}
