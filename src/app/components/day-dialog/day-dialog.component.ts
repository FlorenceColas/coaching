import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { Observable } from 'rxjs';
import { weekDaysSelector, getDayById } from 'src/app/shared/store/selectors/week.selectors';

export interface DayActivities {
  day: {
    day: number;
    date: number;
  }
  activities: Activity[]
};

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent implements OnInit {
  public dayIndex: number;
  public form: FormGroup;
  public dayActivities$: Observable<DayActivities>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>
  ) {
    this.dayIndex = data.dayIndex;
  } 

  ngOnInit() {
    this.form = this.fb.group({
      dayIndex: [this.dayIndex, []],
    });

    this.dayActivities$ = this.store.select(getDayById(this.dayIndex));
  }

}
