import { NgModule } from '@angular/core';

import { WeekComponent } from './week.component';
import { WeekService } from './week.service';
import { LayoutModule } from 'src/app/shared/modules/layout.module';

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    LayoutModule
  ],
  providers: [WeekService]
})
export class WeekModule { }
