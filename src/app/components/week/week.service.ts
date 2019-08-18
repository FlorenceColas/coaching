import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from 'src/app/shared/store/reducers/week.reducer';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  private uri: string = 'http://coaching-back.localhost';

  constructor(private http: HttpClient) {}

  public fetchActivities(week: string, year: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.uri + '/api/rest/v1/week-activities/week?year=' + year);
  }
}
