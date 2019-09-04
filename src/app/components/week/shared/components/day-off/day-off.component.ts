import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';

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
      offActive: [off],
      category: [this.activityDetail.categoryId],
      activityDay: [this.activityDetail.activityDay],
      id: [this.activityDetail.id],
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
    };

    this.activityService.createActivity(data);
  }

  public remove() {
    this.activityService.removeActivity(this.activityDetail.id);
  }
}
