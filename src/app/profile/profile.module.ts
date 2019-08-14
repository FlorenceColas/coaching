import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { LayoutModule } from '../shared/modules/layout.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    FormsModule,
    LayoutModule,
  ],
  providers: []
})
export class ProfileModule { }
