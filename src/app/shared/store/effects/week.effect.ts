import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty, of } from "rxjs";
import * as moment from 'moment';

import { WeekService, ServiceResult } from '../../../components/week/week.service';
import { WeekActionTypes, FetchWeekActivities, SetWeekActivities } from "../actions/week.actions";
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Activity } from "../reducers/week.reducer";
import { Store, select } from '@ngrx/store';
import { State } from '..';
import { currentAthleteSelector } from '../selectors/athlete.selectors';

@Injectable()
export class WeekEffects {
  constructor(
    private actions$: Actions,
    private weekService: WeekService,
    private store: Store<State>
  ) {}

  @Effect()
  fetchWeekActivities$ = this.actions$.pipe(
    ofType<FetchWeekActivities>(WeekActionTypes.FETCH_WEEK_ACTIVITIES),
    withLatestFrom(this.store.pipe(select(currentAthleteSelector))),
    switchMap( ([action, athlete]) => this.weekService.fetchActivities(action.payload.week, action.payload.year, athlete) ),
    switchMap( (serviceResult: ServiceResult, index) => {
      let newActivities: { day: {day: number, date: number }, activities: Activity[] }[] = new Array;
      const selectedDate = moment().weekday(1).year(parseInt(serviceResult.year)).week(parseInt(serviceResult.week)).hour(1).minute(0).second(0).millisecond(0);
 
      for (let i = 1; i <= 7; i++) {
        let values: Activity[] = new Array;
        if (serviceResult.activities != undefined) {
          values = serviceResult.activities.filter( (value: Activity) => value.dayOfWeek == i);
        }
        
        const weekStart = selectedDate.clone().add(i-1, 'days').format('x');
        const categories: string[] = [
          'off',
          'swim',
          'bike',
          'run',
          'fitness',
          'race'
        ];
        let newDayActities: Activity[] = new Array;
 
        if (values.length > 0) {
          categories.forEach( (cat: string) => {
            let act:Activity[] = values.filter( (value: Activity) => value.categoryId === cat);
            if (act.length === 0) {
              act.push(this.initActivity(parseInt(weekStart), cat, i))
            }
            newDayActities = newDayActities.concat(act);
          });
        } else {
          categories.forEach( (cat: string) => {
            newDayActities.push(this.initActivity(parseInt(weekStart), cat, i))
          });
        }
 
        newActivities.push({ day: { day: i, date: parseInt(weekStart) }, activities: newDayActities});
      }
      return of(new SetWeekActivities(newActivities));
    }),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );

  private initActivity(date: number, category: string, dayOfWeek: number): Activity {
    return {
      'id': null,
      'athleteUserId': null,
      'categoryId': category,
      'typeId': null,
      'activityDay': date,
      'dayOfWeek': dayOfWeek,
      'planned': 0,
      'plannedContent': null,
      'plannedDistance': null,
      'plannedTime': null,
      'realisedContent': null,
      'realisedDistance': null,
      'realisedTime': null,
      'state': null
    }
  }
}
