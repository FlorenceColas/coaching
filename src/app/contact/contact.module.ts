import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/modules/shared.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class ContactModule { }
