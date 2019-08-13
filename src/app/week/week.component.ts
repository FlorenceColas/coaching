import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { WeekActivities } from './week-activities.model';
import { WeekService } from './week.service';
import { WeekTools } from './week.tools';
import { Globals } from '../global';

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
    private globals: Globals
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("id")) {
        this.weekNumber = params.get("id");
      } else {
        this.weekNumber = this.globals.currentWeek;
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
