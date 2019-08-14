import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatInputModule, 
  MatCardModule, 
  MatCheckboxModule, 
  MatFormFieldModule, 
  MatIconModule, 
  MatSlideToggleModule, 
  MatToolbarModule 
} from '@angular/material';

const MATERIAL_MODULES = [
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
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
