import { Action } from '@ngrx/store';
import { CurrentWeek, Activity, Week } from '../reducers/week.reducer';

export enum WeekActionTypes {
  FETCH_WEEK_ACTIVITIES = '[ week ] - fetch week activities',
  SET_CURRENT_WEEK      = '[ week ] - set current week',
  SET_WEEK_ACTIVITIES   = '[ week ] - set week acitvities',
  SET_WEEK_DETAILS      = '[ week ] - set week details',
}

export class FetchWeekActivities implements Action {
  readonly type = WeekActionTypes.FETCH_WEEK_ACTIVITIES
  constructor(public payload: { week: string, year: string }) {}
}

export class SetCurrentWeek implements Action {
  readonly type = WeekActionTypes.SET_CURRENT_WEEK
  constructor(public payload: CurrentWeek) {}
}

export class SetWeekActivities implements Action {
  readonly type = WeekActionTypes.SET_WEEK_ACTIVITIES
  constructor(public payload: { day: { day: number, date: number }, activities: Activity[] }[]) {}
}

export class SetWeekDetails implements Action {
  readonly type = WeekActionTypes.SET_WEEK_DETAILS
  constructor(public payload: Week) {}
}

export type WeekActions = FetchWeekActivities |
                          SetCurrentWeek |
                          SetWeekActivities |
                          SetWeekDetails;
