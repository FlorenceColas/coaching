import { Injectable } from '@angular/core';
import { Activity, Week, CurrentWeek } from '../store/reducers/week.reducer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { FetchWeekActivities } from '../store/actions/week.actions';
import * as moment from 'moment';
import { currentWeekSelector } from '../store/selectors/week.selectors';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private uri: string = 'http://coaching-back.localhost';

  constructor(
    private http: HttpClient,
    private store: Store<State>
  ) { }

  public createActivity(formValues) {
    const obj = {
      activityDay: formValues.activityDay,
      athleteUserId: '1',
      categoryId: formValues.category,
      activityType: formValues.activityType,
      planned: '1',
      plannedContent: formValues.plannedContent,
      plannedDistance: formValues.plannedDistance,
      plannedTime: formValues.plannedTime,
    };
    const data = new HttpParams({ fromObject: obj });
    const options = {
      headers: new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8'),
    };

    this.http.post<Activity>(this.uri + '/api/rest/v1/activities', data, options).subscribe( 
      () => {
        const day: number = formValues.activityDay;
        const week: number = moment(day).isoWeek();
        const year: number = moment(day).year();
        this.store.dispatch(new FetchWeekActivities({ week: week.toString(), year: year.toString()}));
      },
      (err) => console.log(err)
    );
  }

  public removeActivity(id: number) {
    this.http.delete<any>(this.uri + '/api/rest/v1/activities/' + id).subscribe( 
      () => {
        let week$: CurrentWeek;
        const subscription = this.store.pipe(select(currentWeekSelector)).subscribe( (week: CurrentWeek) => {
          week$ = week;
        });
        this.store.dispatch(new FetchWeekActivities({ week: week$.week.toString(), year: week$.year.toString()}));
        subscription.unsubscribe();
       },
      (err) => console.log(err)
    );
  }

  public updateActivity(formValues) {
    const obj = {
      activityDay: formValues.activityDay,
      athleteUserId: '1',
      categoryId: formValues.category,
      activityType: formValues.activityType,
      planned: '1',
      plannedContent: formValues.plannedContent,
      plannedDistance: formValues.plannedDistance,
      plannedTime: formValues.plannedTime,
    };
//    const data = new HttpParams({ fromObject: obj });
    const options = {
      headers: new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
    };

    this.http.put<any>(this.uri + '/api/rest/v1/activities/' + formValues.id, obj, options).subscribe( 
      () => {
        const day: number = formValues.activityDay;
        const week: number = moment(day).isoWeek();
        const year: number = moment(day).year();
        this.store.dispatch(new FetchWeekActivities({ week: week.toString(), year: year.toString()}));
      },
      (err) => console.log(err)
    );  
  }
}
