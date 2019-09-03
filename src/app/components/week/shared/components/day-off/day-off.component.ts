import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/shared/store';

@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.css']
})
export class DayOffComponent implements OnInit {
  @Input() activityDetail: Activity;
  public form: FormGroup;
  public saveButtonDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    let off: boolean = false;
    
    if (this.activityDetail.id) {
      off = true;
    }

    this.form = this.fb.group({
      activityType: [this.activityDetail.categoryId],
      offActive: [off],
    });

    this.form.statusChanges.subscribe( (event) => {
      if (this.form.dirty) {
        this.saveButtonDisabled = false;
      }
    });
  }

  public save() {
    this.activityDetail.planned = 1;
    this.activityDetail.athleteUserId = 1;

    this.activityService.createActivity(this.activityDetail);
  }

  public remove() {
    this.activityService.removeActivity(this.activityDetail.id);
  }
}
