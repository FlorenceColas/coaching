import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';

const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'week', loadChildren: './week/week.module#WeekModule' },
//  { path: 'day', loadChildren: './day-container/day.module#DayModule'},
  { path: 'logout', redirectTo: 'home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}