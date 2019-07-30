import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const APP_ROUTE: Route[] = [
  { path: '', redirectTo: 'week', pathMatch: 'full' },
  { path: 'logout', redirectTo: 'week' },
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}