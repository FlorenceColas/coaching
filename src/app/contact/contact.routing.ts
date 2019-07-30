import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';

const CONTACT_ROUTE: Route[] = [
  { path: 'contact', component: ContactComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(CONTACT_ROUTE) ],
    exports: [ RouterModule ]
})
export class ContactRoutingModule {}