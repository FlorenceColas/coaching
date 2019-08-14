import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of, empty } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { TrySignin, AuthActionTypes, SigninSuccess, SigninError } from '../actions/auth.actions';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  @Effect()
  trySignin$ = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TrySignin),
    map( (action: TrySignin) => action.payload),
    switchMap( (user: User) => 
      this.authService.signIn({ username: user.username, password: user.password })
    ),
    switchMap( () => {
      this.router.navigate(['/home']);
      return empty();
    }),
    catchError ( (err: any) => of(new SigninError(err.error[0])) )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
