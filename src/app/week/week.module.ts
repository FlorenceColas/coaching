import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { WeekComponent } from './week.component';
import { WeekService } from './week.service';

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    SharedModule,
  ],
  providers: [WeekService]
})
export class WeekModule { }
