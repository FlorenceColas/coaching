import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, exhaustMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { of, empty, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import { TrySignin, AuthActionTypes, SigninSuccess, SigninError, TryRefreskToken, Logout, TryFetchCurrentUser, SetCurrentUser, SetToken } from '../actions/auth.actions';
import { State } from '..';
import { tokenSelector } from '../selectors/auth.selectors';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { TryFetchAthletes } from '../actions/athlete.actions';

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
    map( (action) => action.payload ),
    tap( (token: string) => {
      localStorage.setItem('jwt', token);
      if (!this.subscription) {
        this.subscription = this.authService.initTimer().subscribe();
      }
    } ),
    withLatestFrom(this.store, (action, state) => {
      let w = state.week.currentWeek.week;
      let y = state.week.currentWeek.year;
      this.router.navigate(['/week', w, y]);
    })
  );

  @Effect()
  tryFetchCurrentUser$ = this.actions$.pipe(
    ofType<TryFetchCurrentUser>(AuthActionTypes.TRY_FETCH_CURRENT_USER),
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap( () => this.userService.getCurrentUser()),
    switchMap( (user: User, index: number) => [
      new SetCurrentUser(user),
      new TryFetchAthletes(),
    ]),
    catchError( () => {
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
          switchMap( (newToken: string) => [
            new SetToken(newToken),
          ]),
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
    map( (action: TrySignin) => action.payload ),
    exhaustMap( (credentials: { username: string, password: string }) => 
      this.authService.signIn(credentials).pipe(
        switchMap( (token: string) => [
          new SigninSuccess(token),
          new TryFetchCurrentUser(),
        ]), 
        catchError( (err: any) => of(new SigninError(err)) )
      )
    )
  );

}
