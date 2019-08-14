import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './reducers/auth.reducer';
import * as weekReducer from './reducers/week.reducer';

export interface State {
  auth: authReducer.AuthState,
  weeks: weekReducer.WeekState
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.authReducer,
  weeks: weekReducer.weekReducer
};
