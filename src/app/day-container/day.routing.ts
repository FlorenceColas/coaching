import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DayContainerComponent } from './day-container.component';

const DAY_ROUTE: Route[] = [
  { path: '', component: DayContainerComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(DAY_ROUTE) ],
    exports: [ RouterModule ]
})
export class DayRoutingModule {}