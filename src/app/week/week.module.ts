import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/modules/shared.module';
import { WeekComponent } from './week.component';
import { WeekService } from '../shared/services/week.service';

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [WeekService]
})
export class WeekModule { }
