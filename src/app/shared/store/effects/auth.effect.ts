import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, exhaustMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { of, empty, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { TrySignin, AuthActionTypes, SigninSuccess, SigninError, TryRefreskToken, Logout, TryFetchCurrentUser, SetCurrentUser } from '../actions/auth.actions';
import { Store, select } from '@ngrx/store';
import { State } from '..';
import { tokenSelector } from '../selectors/auth.selectors';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect({ dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGOUT),
    tap( () => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
      localStorage.removeItem('jwt');
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  signinSuccess$ = this.actions$.pipe(
    ofType<SigninSuccess>(AuthActionTypes.SIGNIN_SUCCESS),
    map( (action) => action.payload),
    tap( (token: string) => {
      localStorage.setItem('jwt', token);
      if (!this.subscription) {
        this.subscription = this.authService.initTimer().subscribe();
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  tryFetchCurrentUser$ = this.actions$.pipe(
    ofType<TryFetchCurrentUser>(AuthActionTypes.TRY_FETCH_CURRENT_USER),
    switchMap( () => this.userService.getCurrentUser()),
    map( (user: User) => new SetCurrentUser(user)),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType<TryRefreskToken>(AuthActionTypes.TRY_REFRESH_TOKEN),
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap( ([action, token]) => {
      if (token) {
        return this.authService.refreshToken().pipe(
          map( (newToken: string) => new SigninSuccess(newToken)),
          catchError( () => {
            localStorage.removeItem('jwt');
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            return empty();
          })
        )
      } else {
        return empty();
      }
    }
  ));

  @Effect()
  trySignin$ = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TRY_SIGNIN),
    map( (action: TrySignin) => action.payload),
    exhaustMap( (credentials: { username: string, password: string }) => 
      this.authService.signIn(credentials).pipe(
        map( (token: string) => new SigninSuccess(token) ),
        catchError( (err: any) => of(new SigninError(err.error)) )
      )
    )
  );

}
