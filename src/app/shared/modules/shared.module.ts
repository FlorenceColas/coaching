import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivityColorDirective } from '../directives/activity-color.directive';
import { BorderDirective } from '../directives/border.directive';
import { MaterialModule } from '../modules/material.module';

@NgModule({
    declarations: [
      ActivityColorDirective,
      BorderDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        ActivityColorDirective,
        BorderDirective,
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule {}