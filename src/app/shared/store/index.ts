import { ActionReducerMap } from '@ngrx/store';
import * as routerReducer from '@ngrx/router-store';

import * as authReducer from './reducers/auth.reducer';
import * as weekReducer from './reducers/week.reducer';
import { RouterStateUrl } from './helpers/router.helper';

export interface State {
  auth: authReducer.AuthState,
  week: weekReducer.WeekState,
  router: routerReducer.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.authReducer,
  week: weekReducer.weekReducer,
  router: routerReducer.routerReducer
};
