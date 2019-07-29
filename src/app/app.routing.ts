import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact/contact.component';
import { WeekComponent } from './week/week.component';
import { ProfileComponent } from './profile/profile.component';

const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'week', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', redirectTo: 'week' },
  { path: 'week', component: WeekComponent, pathMatch: 'full' },
  { path: 'week/:id', component: WeekComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}