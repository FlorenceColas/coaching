import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/modules/material.module';
import { SharedModule } from '../shared/modules/shared.module';
import { WeekComponent } from './week.component';
import { WeekService } from './week.service';

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    //FormsModule,
    //MaterialModule,
    //ReactiveFormsModule,
    SharedModule,
    //RouterModule,
  ],
  providers: [WeekService]
})
export class WeekModule { }
