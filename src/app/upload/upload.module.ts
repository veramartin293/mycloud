import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';


@NgModule({
  declarations: [
    UploadFormComponent,
  ],
  imports: [
    CommonModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
