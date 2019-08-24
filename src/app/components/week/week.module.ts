import { NgModule } from '@angular/core';

import { WeekComponent } from './week.component';
import { WeekService } from './week.service';
import { LayoutModule } from 'src/app/shared/modules/layout.module';
import { WeekRoutingModule } from './week.routing';
import { DayDialogComponent } from './shared/components/day-dialog/day-dialog.component';
import { DayComponent } from './shared/components/day/day.component';
import { DayOffComponent } from './shared/components/day-off/day-off.component';
import { DayRaceComponent } from './shared/components/day-race/day-race.component';
import { DayFitnessComponent } from './shared/components/day-fitness/day-fitness.component';

@NgModule({
  declarations: [
    WeekComponent,
    DayDialogComponent,
    DayComponent,
    DayOffComponent,
    DayRaceComponent,
    DayFitnessComponent
  ],
  imports: [
    LayoutModule,
    WeekRoutingModule,
  ],
  providers: [WeekService],
  entryComponents: [DayDialogComponent]
})
export class WeekModule { }
