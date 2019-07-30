import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

const PROFILE_ROUTE: Route[] = [
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(PROFILE_ROUTE) ],
    exports: [ RouterModule ]
})
export class ProfileRoutingModule {}