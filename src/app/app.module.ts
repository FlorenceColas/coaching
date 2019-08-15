// native
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './shared/store';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './shared/store/effects/auth.effect';

// components
import { AppComponent } from './app.component';

// routing
import { AppRoutingModule } from './app.routing';

// modules
import { CoreModule } from './shared/modules/core.module';
import { WeekModule } from './components/week/week.module';
import { ProfileModule } from './components/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'coaching',
      logOnly: environment.production
    }),
    AppRoutingModule,
    ProfileModule,
    WeekModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
