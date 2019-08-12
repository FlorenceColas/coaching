import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    FormsModule,
    SharedModule
  ],
  providers: []
})
export class ContactModule { }
