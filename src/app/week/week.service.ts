import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WeekActivities } from './week-activities.model';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  public weekActivities = new BehaviorSubject<WeekActivities>(null);

  constructor(private http: HttpClient) {}

  getWeekActivities(weekNumber: number): void {
    this.http.get<WeekActivities>('http://localhost:4200/assets/week-activities' + weekNumber + '.json').subscribe( 
      (weekActivities: WeekActivities) => {
        this.weekActivities.next(weekActivities);
      }
    );
  }
}
