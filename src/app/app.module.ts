import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

// require for locale usage
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthGuard} from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from './shared/modules/shared.module';
import { WeekModule } from './week/week.module';
import { WeekRoutingModule } from './week/week.routing';
import { HeaderComponent } from './shared/components/header/header.component';
import { DayActivitiesComponent } from './day-activities/day-activities.component';
import { Globals } from './global';
import { reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    DayActivitiesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    WeekModule,
    WeekRoutingModule,
  ],
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
      useValue: 'fr-FR'
    },
    Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
