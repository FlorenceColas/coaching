import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { WeekModule } from './components/week/week.module';
import { WeekRoutingModule } from './components/week/week.routing';
import { reducers } from './store';
import { CoreModule } from './shared/modules/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    StoreModule.forRoot(reducers),

    AppRoutingModule,
    WeekModule,
    WeekRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
