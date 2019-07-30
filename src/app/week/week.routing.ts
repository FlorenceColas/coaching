import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WeekComponent } from './week.component';

const WEEK_ROUTE: Route[] = [
  { path: 'week', component: WeekComponent, pathMatch: 'full' },
  { path: 'week/:id', component: WeekComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(WEEK_ROUTE) ],
    exports: [ RouterModule ]
})
export class WeekRoutingModule {}