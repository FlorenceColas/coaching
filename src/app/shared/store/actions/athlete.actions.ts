import { Action } from '@ngrx/store';
import { Athlete } from '../reducers/athlete.reducer';

export enum AthleteActionTypes {
  FETCH_ATHLETES      = '[ athlete ] - fetch athletes',
  SET_ATHLETES        = '[ athlete ] - set athletes',
  SET_CURRENT_ATHLETE = '[ athlete ] - set current athlete',
}

export class FetchAthletes implements Action {
  readonly type = AthleteActionTypes.FETCH_ATHLETES
  constructor(public payload: number) {}
}

export class SetAthletes implements Action {
  readonly type = AthleteActionTypes.SET_ATHLETES
  constructor(public payload: Athlete[]) {}
}

export class SetCurrentAthlete implements Action {
  readonly type = AthleteActionTypes.SET_CURRENT_ATHLETE
  constructor(public payload: Athlete) {}
}

export type AthleteActions = FetchAthletes |
                             SetAthletes |
                             SetCurrentAthlete;
