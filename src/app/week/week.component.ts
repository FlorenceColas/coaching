import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { WeekActivities } from '../shared/models/week-activities.model';
import { WeekService } from '../shared/services/week.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  public weekActivities: WeekActivities
  public weekNumber: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private weekService: WeekService
  ) { }

  ngOnInit() {
    const now = new Date().getTime();

    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("id")) {
        this.weekNumber = parseInt(params.get("id"));
      } else {
        //get current week
        this.weekNumber = this.getWeek(now);
      }
    })

    this.weekService.getWeekActivities(this.weekNumber).subscribe( (weekAct: WeekActivities) => {
      this.weekActivities = weekAct;
    });
  }

  getWeek(d: number): number {
    let date = new Date(d);
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  navigateToWeek(weekNumber: number) {
    this.router.navigate(['week', weekNumber]);
  }
}
