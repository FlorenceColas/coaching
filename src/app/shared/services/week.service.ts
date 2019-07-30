import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WeekActivities } from '../models/week-activities.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  private uri = 'http://localhost:4200/assets/week-activities.json';

  constructor(private http: HttpClient) {}

  getWeekActivities(weekNumber: number): Observable<WeekActivities> {
    return this.http.get<WeekActivities>('http://localhost:4200/assets/week-activities' + weekNumber + '.json');
  }
}
