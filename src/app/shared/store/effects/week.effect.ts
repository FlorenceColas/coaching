import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from "rxjs";
import * as moment from 'moment';

import { WeekService, ServiceResult } from '../../../components/week/week.service';
import { WeekActionTypes, FetchWeekActivities, SetWeekActivities } from "../actions/week.actions";
import { switchMap, map, catchError } from 'rxjs/operators';
import { Activity } from "../reducers/week.reducer";

@Injectable()
export class WeekEffets {
  constructor(
    private actions$: Actions,
    private weekService: WeekService
  ) {}

  @Effect()
  fetchWeekActivities$ = this.actions$.pipe(
    ofType<FetchWeekActivities>(WeekActionTypes.FETCH_WEEK_ACTIVITIES),
    switchMap( (action: FetchWeekActivities) => this.weekService.fetchActivities(action.payload.week, action.payload.year)),
    map( (serviceResult: ServiceResult) => {
      let newActivities: { day: {day: number, date: number }, activities: Activity[] }[] = new Array;
      const selectedDate = moment().weekday(1).year(parseInt(serviceResult.year)).week(parseInt(serviceResult.week));

      for (let i = 1; i <= 7; i++) { 
        let values: Activity[] = new Array;
        if (serviceResult.activities != undefined) {
          values = serviceResult.activities.filter( (value: Activity) => value.dayOfWeek == i);
        }
        const weekStart = selectedDate.clone().add(i-1, 'days').format('x');
        newActivities.push({ day: { day: i, date: parseInt(weekStart) }, activities: values});
      }

      return new SetWeekActivities(newActivities) 
    }),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );
}
