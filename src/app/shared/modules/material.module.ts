import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const MATERIAL_MODULES = [
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatIconModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
