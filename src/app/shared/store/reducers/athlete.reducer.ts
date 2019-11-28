import { AthleteActions, AthleteActionTypes } from '../actions/athlete.actions';

export interface Athlete {
  id: number,
  name: string;
}

export interface AthleteState {
  athletes: Athlete[];
  current: Athlete;
}

export const initialAthleteState: AthleteState = {
  athletes: null,
  current: null
}

export function athleteReducer(
  state: AthleteState = initialAthleteState,
  action: AthleteActions
): AthleteState {
  switch (action.type) {
    case AthleteActionTypes.SET_ATHLETES:
      return {
        ...state,
        athletes: action.payload
      }
    case AthleteActionTypes.SET_CURRENT_ATHLETE:
      return {
        ...state,
        current: action.payload
      }
  }

return state;
}
