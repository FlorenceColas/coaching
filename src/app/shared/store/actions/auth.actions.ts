import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  TRY_SIGNIN             = '[ User ] - Try signin',
  SIGNIN_SUCCESS         = '[ User ] - Signin success',
  SIGNIN_ERROR           = '[ User ] - Signin error',
  TRY_FETCH_CURRENT_USER = '[ User ] - Try fetch user',
  SET_CURRENT_USER       = '[ User ] - Set current user', 
  TRY_REFRESH_TOKEN      = '[ User ] - Try refresh token'
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TRY_SIGNIN
  constructor(public payload: { username: string, password: string }) {}
}

export class SigninSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS
  constructor(public payload: string) {}
}

export class SigninError implements Action {
  readonly type = AuthActionTypes.SIGNIN_ERROR
  constructor(public payload: any) {}
}

export class TryFetchCurrentUser implements Action {
  readonly type = AuthActionTypes.TRY_FETCH_CURRENT_USER
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER
  constructor(public payload: User) {}
}

export class TryRefreskToken implements Action {
  readonly type = AuthActionTypes.TRY_REFRESH_TOKEN
}

export type AuthActions = TrySignin |
                          SigninSuccess |
                          SigninError |
                          TryFetchCurrentUser |
                          SetCurrentUser |
                          TryRefreskToken;
