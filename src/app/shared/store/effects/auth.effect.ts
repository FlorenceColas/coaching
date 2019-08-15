import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of, empty, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { TrySignin, AuthActionTypes, SigninSuccess, SigninError, TryRefreskToken } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  trySignin$ = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TRY_SIGNIN),
    map( (action: TrySignin) => action.payload),
    exhaustMap( (credentials: { username: string, password: string }) => 
      this.authService.signIn(credentials).pipe(
        map( (token: string) => new SigninSuccess(token) ),
        catchError( (err: any) => of(new SigninError(err)) )
      )
    )
  );

  @Effect({ dispatch: false })
  signinSuccess$ = this.actions$.pipe(
    ofType<SigninSuccess>(AuthActionTypes.SIGNIN_SUCCESS),
    map( (action: SigninSuccess) => action.payload),
    tap( (token: string) => {
      localStorage.setItem('jwt', token);
      if (!this.subscription) {
        this.subscription = this.authService.initTimer().subscribe();
        this.router.navigate(['/home']);
      }
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType<TryRefreskToken>(AuthActionTypes.TRY_REFRESH_TOKEN),
    switchMap( () => this.authService.refreshToken().pipe(
      map( (token: string) => new SigninSuccess(token)),
      catchError( () => {
        localStorage.removeItem('jwt');
        return empty();
      })
    ))
  );
}
