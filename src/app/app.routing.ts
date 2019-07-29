import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WeekComponent } from './week/week.component';

const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'week', pathMatch: 'full' },
  { path: 'week/:week_number', component: WeekComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}