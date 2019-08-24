import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WeekComponent } from './week.component';

const WEEK_ROUTE: Route[] = [
  { path: '', component: WeekComponent, pathMatch: 'full' },
  { path: ':athlete/:week/:year', component: WeekComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(WEEK_ROUTE) ],
    exports: [ RouterModule ]
})
export class WeekRoutingModule {}