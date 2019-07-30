import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ActivityComponent } from './activity/activity.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ContactModule } from './contact/contact.module';
import { ContactRoutingModule } from './contact/contact.routing';
import { MaterialModule } from './material.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile.routing';
import { SharedModule } from './shared/modules/shared.module';
import { WeekModule } from './week/week.module';
import { WeekRoutingModule } from './week/week.routing';

@NgModule({
  declarations: [
    ActivityComponent,
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ContactModule,
    ContactRoutingModule,
    HttpClientModule,
    MaterialModule,
    ProfileModule,
    ProfileRoutingModule,
    SharedModule,
    WeekModule,
    WeekRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
