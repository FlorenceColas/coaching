import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  TrySignin           = '[ User ] - Try signin',
  SigninSuccess       = '[ User ] - Signin success',
  SigninError         = '[ User ] - Signin error',
  TryFetchCurrentUser = '[ User ] - Try fetch user',
  SetCurrentUser      = '[ User ] - Set current user', 
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TrySignin
  constructor(public payload: { email: string, password: string }) {}
}

export class SigninSuccess implements Action {
  readonly type = AuthActionTypes.SigninSuccess
  constructor(public payload: User) {}
}

export class SigninError implements Action {
  readonly type = AuthActionTypes.SigninError
  constructor(public payload: any) {}
}

export class TryFetchCurrentUser implements Action {
  readonly type = AuthActionTypes.TryFetchCurrentUser
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SetCurrentUser
  constructor(public payload: User) {}
}

export type AuthActions = TrySignin |
                          SigninSuccess |
                          SigninError |
                          TryFetchCurrentUser |
                          SetCurrentUser;
