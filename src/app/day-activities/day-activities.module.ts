import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { DayActivitiesComponent } from './day-activities.component';
import { DayActivitiesService } from './day-activities.service';

@NgModule({
  declarations: [
    DayActivitiesComponent
  ],
  imports: [
    SharedModule,
  ],
  providers: [DayActivitiesService]
})
export class DayActivitiesModule { }
