import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from "rxjs";

import { WeekService } from '../../../components/week/week.service';
import { State } from '..';
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
    map( (activities: Activity[]) => {
/*      console.log(activities);
      let newA: Activity[] = [];
      for (let activity in activities) {
        newA.push(activities[activity]);
      }

      console.log(newA);*/
      return new SetWeekActivities(activities) 
    }),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );
}
