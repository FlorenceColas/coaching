import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { LayoutModule } from '../../shared/modules/layout.module';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    LayoutModule,    
    ProfileRoutingModule,
  ],
  providers: [UserService]
})
export class ProfileModule { }
