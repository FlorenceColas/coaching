import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ActivityColorDirective } from '../directives/activity-color.directive';
import { BorderDirective } from '../directives/border.directive';

const LAYOUT_MODULES = [
  CommonModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MaterialModule
];

const DIRECTIVES = [
  ActivityColorDirective,
  BorderDirective
]

@NgModule({
  declarations: DIRECTIVES,
  imports: LAYOUT_MODULES,
  exports: [
    ...DIRECTIVES,
    ...LAYOUT_MODULES
  ]
})
export class LayoutModule { }
