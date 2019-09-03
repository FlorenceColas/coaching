import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() activityDetail: Activity;
  public form: FormGroup;
  public types: Type[];
  public saveButtonDisabled: boolean = true;
  public displaySwimHelp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    if (this.activityDetail.typeId == 1) {
      this.displaySwimHelp = true;
    } else {
      this.displaySwimHelp = false;
    }
    
    this.form = this.fb.group({
      activityType: [this.activityDetail.typeId],
      category: [this.activityDetail.categoryId],
      activityDay: [this.activityDetail.activityDay],
      plannedContent: [this.activityDetail.plannedContent],
      plannedDistance: [this.activityDetail.plannedDistance],
      plannedTime: [this.activityDetail.plannedTime],
    });

    this.form.statusChanges.subscribe( (event) => {
      if (this.form.dirty) {
        this.saveButtonDisabled = false;
      }
    });

    switch (this.activityDetail.categoryId) {
      case 'swim':
        this.types = [
          {value: '2', viewValue: 'Lake'},
          {value: '1', viewValue: 'Pool'},
          {value: '3', viewValue: 'See'}
        ];
        break;
      case 'bike':
        this.types = [
          {value: '4', viewValue: 'Hometrainer'},
          {value: '5', viewValue: 'Road'},
        ];
        break;
      case 'run':
        this.types = [
          {value: '7', viewValue: 'Street'},
          {value: '6', viewValue: 'Track'},
        ];
        break;
    }
  }

  public helpSwim(): void {

  }

  public onChangeType(event): void {
    if (event == 1) {
      this.displaySwimHelp = true;
    } else {
      this.displaySwimHelp = false;
    }
  }

  public save() {
    this.activityDetail.planned = 1;
    this.activityDetail.athleteUserId = 1;

    console.log(this.activityDetail);
    console.log(this.form.value);
    if (this.activityDetail.id) {
      this.activityService.updateActivity(this.form.value);
    } else {
      this.activityService.createActivity(this.form.value);
    }
  }

  public remove() {
    this.activityService.removeActivity(this.activityDetail.id);
  }
}
