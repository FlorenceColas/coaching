import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { WeekActivities } from './week-activities.model';
import { WeekService } from './week.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  public weekActivities: WeekActivities;
  public weekNumber: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private weekService: WeekService,
    @Inject(LOCALE_ID) protected localeId: string
  ) { }
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("id")) {
        this.weekNumber = params.get("id");
      } else {
        this.weekNumber = formatDate(
          new Date().getTime(), 
          'ww', 
          this.localeId
        );
      }
    });

    this.weekService.weekActivities.subscribe( (weekActivities: WeekActivities) => {
      this.weekActivities = weekActivities;
    });

    this.weekService.getWeekActivities(this.weekNumber);
  }

  navigateToWeek(weekNumber: string) {
    this.weekService.getWeekActivities(weekNumber);
    this.router.navigate(['week', weekNumber]);
  }
}
