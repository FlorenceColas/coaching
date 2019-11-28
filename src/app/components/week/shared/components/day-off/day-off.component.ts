import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Subscription } from 'rxjs';
import { Athlete } from 'src/app/shared/store/reducers/athlete.reducer';
import { currentAthleteSelector } from 'src/app/shared/store/selectors/athlete.selectors';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/shared/store';

@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.css']
})
export class DayOffComponent implements OnInit, OnDestroy {
  @Input() activityDetail: Activity;
  public form: FormGroup;
  public saveButtonDisabled: boolean = true;
  private subscription: Subscription;
  public currentAthlete: Athlete;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private store: Store<State>
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

    this.subscription = this.store.pipe(select(currentAthleteSelector)).subscribe( (athlete: Athlete) => {
      this.currentAthlete = athlete;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public save() {
    const data = {
      activity_date: this.activityDetail.activityDay,
      athletes_users_id: this.currentAthlete.id,
      categories_id: this.activityDetail.categoryId, 
      planned: 1, 
    };

    this.activityService.createActivity(data);
  }

  public remove() {
    this.activityService.removeActivity(this.activityDetail.id);
  }
}
