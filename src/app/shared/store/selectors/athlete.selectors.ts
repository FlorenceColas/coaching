import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AthleteState } from '../reducers/athlete.reducer';

export const AthletesSelector = createFeatureSelector('athletes');
export const allAthletesSelector = createSelector(
  AthletesSelector,
  (athleteState: AthleteState) => {
    if (athleteState) {
      return athleteState.athletes;
    } else {
      return null;
    }
  }
);
export const currentAthleteSelector = createSelector(
  AthletesSelector,
  (athleteState: AthleteState) => {
    if (athleteState) {
      return athleteState.current;
    } else {
      return null;
    }
  }
);
export const isCurrentAthleteSelector = createSelector(
  AthletesSelector,
  (athleteState: AthleteState) => {
    if (athleteState) {
      return athleteState.isCurrentAthlete;
    } else {
      return false;
    }
  }
);
