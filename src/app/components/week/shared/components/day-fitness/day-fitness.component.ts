import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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

}
