import { User } from '../../models/user.model';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  user: User;
  token: string;
  isLoggedin: boolean;
  error: string;
};

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoggedin: false,
  error: null
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoggedin: true,
        error: null
      }
  }
  return state;
};
