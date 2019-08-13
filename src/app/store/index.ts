import { ActionReducerMap } from '@ngrx/store';
import * as weekReducer from '../week/week.reducer';

export interface State {
  weeks: weekReducer.WeekState,
}

export const reducers: ActionReducerMap<State> = {
  weeks: weekReducer.weekReducer
};
