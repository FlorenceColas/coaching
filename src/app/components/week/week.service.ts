import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { Athlete } from 'src/app/shared/store/reducers/athlete.reducer';

export interface ServiceResult {
  week: string,
  year: string,
  activities: Activity[]
}

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  private uri: string = 'http://coaching-back.localhost';

  constructor(private http: HttpClient) {}

  public fetchActivities(week: string, year: string, athlete: Athlete): Observable<ServiceResult> {
    return this.http.get<ServiceResult>(this.uri + '/api/rest/v1/activities/' + week + '/' + year + '/' + athlete.id);
  }
}
