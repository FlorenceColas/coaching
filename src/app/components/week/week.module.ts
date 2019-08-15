import { NgModule } from '@angular/core';

import { WeekComponent } from './week.component';
import { WeekService } from './week.service';
import { LayoutModule } from 'src/app/shared/modules/layout.module';
import { WeekRoutingModule } from './week.routing';

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    LayoutModule,
    WeekRoutingModule,
  ],
  providers: [WeekService]
})
export class WeekModule { }
