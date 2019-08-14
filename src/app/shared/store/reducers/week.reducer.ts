import { Action } from '@ngrx/store';
import { Week } from '../../../components/week/week-activities.model';

export interface WeekState {
  datas: Week[],
}

export function weekReducer(
    state: WeekState,
    action: Action
): WeekState {
    return state;
}
