import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeekState, Activity } from '../reducers/week.reducer';
import { of } from 'rxjs';

export const weekSelector = createFeatureSelector('week');
export const currentWeekSelector = createSelector(
  weekSelector,
  (weekState: WeekState) => {
    if (weekState) {
      return weekState.currentWeek;
    } else {
      return null;
    }
  }
);
export const currentWeekNumberSelector = createSelector(
  weekSelector,
  (weekState: WeekState) => {
    if (weekState) {
      return weekState.currentWeek.week;
    } else {
      return null;
    }
  }
);
export const currentWeekYearSelector = createSelector(
  weekSelector,
  (weekState: WeekState) => {
    if (weekState) {
      return weekState.currentWeek.year;
    } else {
      return null;
    }
  }
);
export const weekDetailsSelector = createSelector(
  weekSelector,
  (weekState: WeekState) => {
    if (weekState) {
      return weekState.week;
    } else {
      return null;
    }
  }
);
export const weekDaysSelector = createSelector(
  weekSelector,
  (weekState: WeekState) => {
    if (weekState) {
      return weekState.days;
    } else {
      return null;
    }
  }
);
export const getDayById = (index: number) => createSelector(weekDaysSelector, (allItems) => {
  if (allItems) {
    return allItems[index];
  } else {
    return null;
  }
});
