import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class ContactModule { }
