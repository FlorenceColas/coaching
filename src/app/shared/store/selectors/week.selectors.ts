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
export const weekDaysListSelector = createSelector(
  weekDaysSelector, 
  (dayState: {
    day: {
      day: number,
      date: number,
    }
    activities: Activity[]
  }[]) => {
    enum Categories {
      'off',
      'swim',
      'bike',
      'run',
      'fitness',
      'race'
    };

    let list: { name: string, status: number, planned: number}[] = new Array;
    const nb = Object.values(Categories).length / 2;

    if (dayState) {
      dayState.forEach(element => {
        element.activities
      });

      Object.values(Categories).forEach( (value, index) => {
        if (index < nb) {
          list.push({ name: value, status: 0, planned: 0 });
        }
      });
      console.log(list);
      return list;
    } else {
      Object.keys(Categories).forEach(element => {
        list.push({ name: element, status: 0, planned: 0 });
      });
      console.log(list);
      return list;
    }
  }
);
