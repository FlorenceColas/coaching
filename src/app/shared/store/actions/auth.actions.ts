import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  LOGOUT                 = '[ User ] - Logout',
  SET_CURRENT_USER       = '[ User ] - Set current user', 
  SET_TOKEN              = '[ User ] - Set token',
  SIGNIN_ERROR           = '[ User ] - Signin error',
  SIGNIN_SUCCESS         = '[ User ] - Signin success',
  TRY_FETCH_CURRENT_USER = '[ User ] - Try fetch user',
  TRY_REFRESH_TOKEN      = '[ User ] - Try refresh token',
  TRY_SIGNIN             = '[ User ] - Try signin',
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER
  constructor(public payload: User) {}
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SET_TOKEN
  constructor(public payload: string) {}
}

export class SigninError implements Action {
  readonly type = AuthActionTypes.SIGNIN_ERROR
  constructor(public payload: any) {}
}

export class SigninSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS
  constructor(public payload: string) {}
}

export class TryFetchCurrentUser implements Action {
  readonly type = AuthActionTypes.TRY_FETCH_CURRENT_USER
}

export class TryRefreskToken implements Action {
  readonly type = AuthActionTypes.TRY_REFRESH_TOKEN
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TRY_SIGNIN
  constructor(public payload: { username: string, password: string }) {}
}

export type AuthActions = Logout |
                          SetCurrentUser |
                          SetToken |
                          SigninError |
                          SigninSuccess |
                          TryFetchCurrentUser |
                          TryRefreskToken |
                          TrySignin;
