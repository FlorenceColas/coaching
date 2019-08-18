import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthInterceptor } from '../../shared/interceptors/auth.interceptor';
import { AuthGuard} from '../../shared/guards/auth.guard';
import { AuthService } from '../../shared/services/auth.service';
import { HomepageComponent } from '../../components/homepage/homepage.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SigninComponent } from '../../components/signin/signin.component';
import { LayoutModule } from './layout.module';
import { UserService } from '../../shared/services/user.service';
 
const COMPONENTS = [
  HeaderComponent,
  HomepageComponent,
  SigninComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    LayoutModule,
  ],
  exports: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
    { 
      provide: LOCALE_ID, 
      useValue: 'en_GB'
    },
    UserService
  ]
})
export class CoreModule { }
