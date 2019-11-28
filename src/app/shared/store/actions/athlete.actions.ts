import { Action } from '@ngrx/store';
import { Athlete } from '../reducers/athlete.reducer';

export enum AthleteActionTypes {
  SET_ATHLETES            = '[ athlete ] - set athletes',
  SET_CURRENT_ATHLETE     = '[ athlete ] - set current athlete',
  TRY_FETCH_ATHLETES      = '[ athlete ] - try fetch athletes',
  TRY_SET_CURRENT_ATHLETE = '[ athlete ] - try set current athlete',
}

export class TryFetchAthletes implements Action {
  readonly type = AthleteActionTypes.TRY_FETCH_ATHLETES
}

export class SetAthletes implements Action {
  readonly type = AthleteActionTypes.SET_ATHLETES
  constructor(public payload: Athlete[]) {}
}

export class SetCurrentAthlete implements Action {
  readonly type = AthleteActionTypes.SET_CURRENT_ATHLETE
  constructor(public payload: Athlete) {}
}

export class TrySetCurrentAthlete implements Action {
  readonly type = AthleteActionTypes.TRY_SET_CURRENT_ATHLETE
  constructor(public payload: number) {}
}

export type AthleteActions = TryFetchAthletes |
                             SetAthletes |
                             SetCurrentAthlete |
                             TrySetCurrentAthlete;
