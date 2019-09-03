import { ActionReducerMap } from '@ngrx/store';
import * as routerReducer from '@ngrx/router-store';

import * as authReducer from './reducers/auth.reducer';
import * as weekReducer from './reducers/week.reducer';
import * as athleteReducer from './reducers/athlete.reducer';
import { RouterStateUrl } from './helpers/router.helper';

export interface State {
  athletes: athleteReducer.AthleteState,
  auth: authReducer.AuthState,
  week: weekReducer.WeekState,
  router: routerReducer.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  athletes: athleteReducer.athleteReducer,
  auth: authReducer.authReducer,
  week: weekReducer.weekReducer,
  router: routerReducer.routerReducer
};
