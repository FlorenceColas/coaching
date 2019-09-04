import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-day-fitness',
  templateUrl: './day-fitness.component.html',
  styleUrls: ['./day-fitness.component.css']
})
export class DayFitnessComponent implements OnInit {
  @Input() activityDetail: Activity;
  public types: Type[] = [
    {value: '8', viewValue: 'Core & strength'},
    {value: '9', viewValue: 'Core & weight'},
  ];
  public form: FormGroup;
  public saveButtonDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      activityType: [this.activityDetail.typeId],
      plannedTime: [this.activityDetail.plannedTime],
    });

    this.form.statusChanges.subscribe( (event) => {
      if (this.form.dirty) {
        this.saveButtonDisabled = false;
      }
    });
  }

  public save() {
    const data = {
      activity_date: this.activityDetail.activityDay,
      athletes_users_id: 1,
      categories_id: this.activityDetail.categoryId, 
      planned: 1, 
      planned_time: this.form.get('plannedTime').value,
      types_id: this.form.get('activityType').value,
    };

    if (this.activityDetail.id) {
      this.activityService.updateActivity(this.activityDetail.id, data);
    } else {
      this.activityService.createActivity(data);
    }
  }

  public remove() {
    this.activityService.removeActivity(this.activityDetail.id);
  }
}
