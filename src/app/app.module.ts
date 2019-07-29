import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ActivityColorDirective } from './activity-color.directive';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeekComponent } from './week/week.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    ActivityColorDirective,
    AppComponent,
    HeaderComponent,
    WeekComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
