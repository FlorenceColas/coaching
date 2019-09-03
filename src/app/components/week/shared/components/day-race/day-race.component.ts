import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { State } from 'src/app/shared/store';
import { Store } from '@ngrx/store';
import { FetchWeekActivities } from 'src/app/shared/store/actions/week.actions';
import * as moment from 'moment';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-day-race',
  templateUrl: './day-race.component.html',
  styleUrls: ['./day-race.component.css']
})
export class DayRaceComponent implements OnInit {
  @Input() activityDetail: Activity;
  public types: Type[] = [
    {value: '10', viewValue: 'Triathlon'},
    {value: '11', viewValue: 'Running'},
    {value: '14', viewValue: '10km'},
    {value: '12', viewValue: 'Half-marathon'},
    {value: '13', viewValue: 'Marathon'},
  ];
  public form: FormGroup;
  public saveButtonDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      activityType: [this.activityDetail.typeId],
      plannedDistance: [this.activityDetail.plannedDistance],
    });

    this.form.statusChanges.subscribe( (event) => {
      if (this.form.dirty) {
        this.saveButtonDisabled = false;
      }
    });
  }
  
  public save() {
    if (this.activityDetail.id) {
      this.activityService.updateActivity(this.activityDetail);
    } else {
      if (this.form.get('offActive')) {
        this.activityService.createActivity(this.activityDetail);
      } else {
        this.activityService.removeActivity(this.activityDetail.id);
      }
    }

    const day: number = this.activityDetail.activityDay;
    const week: number = moment(day).isoWeek();
    const year: number = moment(day).year();
    this.store.dispatch(new FetchWeekActivities({ week: week.toString(), year: year.toString()}));
  }

}
