import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Subscription } from 'rxjs';
import { Athlete } from 'src/app/shared/store/reducers/athlete.reducer';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { currentAthleteSelector } from 'src/app/shared/store/selectors/athlete.selectors';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, OnDestroy {
  @Input() activityDetail: Activity;
  public form: FormGroup;
  public types: Type[];
  public saveButtonDisabled: boolean = true;
  public displaySwimHelp: boolean = false;
  private subscription: Subscription;
  public currentAthlete: Athlete;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private store: Store<State>
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
      id: [this.activityDetail.id],
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

    this.subscription = this.store.pipe(select(currentAthleteSelector)).subscribe( (athlete: Athlete) => {
      this.currentAthlete = athlete;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    const data = {
      activity_date: this.activityDetail.activityDay,
      athletes_users_id: this.currentAthlete.id,
      categories_id: this.activityDetail.categoryId, 
      planned: 1, 
      planned_content: this.form.get('plannedContent').value,
      planned_distance: this.form.get('plannedDistance').value,
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
