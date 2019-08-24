import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/store/reducers/week.reducer';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.css']
})
export class DayOffComponent implements OnInit {
  @Input() activityDetail: Activity;
  public form: FormGroup;
  public saveButtonDisabled: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let off: boolean = false;
    
    if (this.activityDetail.id) {
      off = true;
    }

    this.form = this.fb.group({
      activityType: [this.activityDetail.typeId],
      offActive: [off],
    });

    this.form.statusChanges.subscribe( (event) => {
      if (this.form.dirty) {
        this.saveButtonDisabled = false;
      }
    });
  }
}
