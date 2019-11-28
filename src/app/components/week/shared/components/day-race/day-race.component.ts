import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { Athlete } from 'src/app/shared/store/reducers/athlete.reducer';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { currentAthleteSelector } from 'src/app/shared/store/selectors/athlete.selectors';

export interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-day-race',
  templateUrl: './day-race.component.html',
  styleUrls: ['./day-race.component.css']
})
export class DayRaceComponent implements OnInit, OnDestroy {
  @Input() activityDetail: Activity;
  public types: Type[] = [
    {value: '10', viewValue: 'Triathlon'},
    {value: '15', viewValue: 'Half Ironman'},
    {value: '16', viewValue: 'Ironman'},
    {value: '11', viewValue: 'Running'},
    {value: '14', viewValue: '10km'},
    {value: '12', viewValue: 'Half-marathon'},
    {value: '13', viewValue: 'Marathon'},
  ];
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
    this.form = this.fb.group({
      activityType: [this.activityDetail.typeId],
      plannedDistance: [this.activityDetail.plannedDistance],
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
      planned_distance: this.form.get('plannedDistance').value,
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
