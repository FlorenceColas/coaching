import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/modules/shared.module';
import { DayContainerComponent } from './day-container.component';
import { DayRoutingModule } from './day.routing';

@NgModule({
  declarations: [
    DayContainerComponent
  ],
  imports: [
    DayRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class DayModule { }
