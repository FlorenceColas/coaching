import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActivityColorDirective } from '../directives/activity-color.directive';
import { BorderDirective } from '../directives/border.directive';
import { HeaderComponent } from 'src/app/header/header.component';

@NgModule({
    declarations: [
      ActivityColorDirective,
      BorderDirective,
      HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        ActivityColorDirective,
        BorderDirective,
        HeaderComponent
    ]
})
export class SharedModule {}