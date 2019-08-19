import { WeekActions, WeekActionTypes } from '../actions/week.actions';

export interface CurrentWeek {
  week: string,
  year: string,
}

export interface Week {
  nextWeek: {
    week: string,
    year: string
  },
  number: string,
  previousWeek: {
    week: string,
    year: string
  },
  rangeFrom: string,
  rangeTo: string,
  year: string,
}

export interface Activity {
  id: number,
  athleteUserId: number,
  categoryId: string,
  typeId: number,
  activityDay: number,
  dayOfWeek: number,
  plannedContent: string,
  plannedDistance: number,
  plannedTime: number,
  realisedContent: string,
  realisedDistance: number,
  realisedTime: number,
  state: number
}

export interface WeekState {
  week: Week,
  days: {
    day: {
      day: number,
      date: number,
    }
    activities: Activity[]
  }[],
  currentWeek: CurrentWeek
}

export const initialWeekState: WeekState = {
  week: null,
  days: null,
  currentWeek: null
}

export function weekReducer(
    state: WeekState = initialWeekState,
    action: WeekActions
): WeekState {
  switch (action.type) {
    case WeekActionTypes.SET_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.payload
      }
    case WeekActionTypes.SET_WEEK_ACTIVITIES:
      return {
        ...state,
        days: action.payload
      }
    case WeekActionTypes.SET_WEEK_DETAILS:
      return {
        ...state,
        week: action.payload
      }
  }
  
  return state;
}
