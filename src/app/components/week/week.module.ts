import { NgModule } from '@angular/core';

import { WeekComponent } from './week.component';
import { WeekService } from './week.service';
import { LayoutModule } from 'src/app/shared/modules/layout.module';
import { WeekRoutingModule } from './week.routing';
import { DayDialogComponent } from '../day-dialog/day-dialog.component';
import { DayComponent } from '../day/day.component';

@NgModule({
  declarations: [
    WeekComponent,
    DayDialogComponent,
    DayComponent
  ],
  imports: [
    LayoutModule,
    WeekRoutingModule,
  ],
  providers: [WeekService],
  entryComponents: [DayDialogComponent]
})
export class WeekModule { }
