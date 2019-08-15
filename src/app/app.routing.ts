import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';

const APP_ROUTE: Route[] = [
  { path: '', component: HomepageComponent},
  { path: 'signin', component: SigninComponent },
  { 
    path: 'profile', 
    canActivate: [AuthGuard], 
    loadChildren: './components/profile/profile.module#ProfileModule' 
  },
  { 
    path: 'week', 
    canActivate: [AuthGuard], 
    loadChildren: './components/week/week.module#WeekModule' 
  },
  { 
    path: 'logout', 
    canActivate: [AuthGuard], 
    redirectTo: 'signin' 
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTE) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}