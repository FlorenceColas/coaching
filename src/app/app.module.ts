import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthGuard} from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from './shared/modules/material.module';
import { SharedModule } from './shared/modules/shared.module';
import { WeekModule } from './week/week.module';
import { WeekRoutingModule } from './week/week.routing';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    WeekModule,
    WeekRoutingModule,
  ],
  providers: [
/*    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
    */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
