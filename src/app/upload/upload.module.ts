import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InputFileClearDirective } from '../_directives/input-file-clear.directive';


@NgModule({
  declarations: [
    InputFileClearDirective,
    UploadFormComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
