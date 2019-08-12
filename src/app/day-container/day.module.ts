import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { DayContainerComponent } from './day-container.component';
import { DayRoutingModule } from './day.routing';

@NgModule({
  declarations: [
    DayContainerComponent
  ],
  imports: [
    DayRoutingModule,
    SharedModule
  ],
  providers: []
})
export class DayModule { }
