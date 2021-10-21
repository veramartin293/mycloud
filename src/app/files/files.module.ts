import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FileListComponent } from './file-list/file-list.component';
import { FileCardComponent } from './file-card/file-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageDisplayComponent } from './image-display/image-display.component';


@NgModule({
  declarations: [
    FileListComponent,
    FileCardComponent,
    ImageDisplayComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FilesRoutingModule
  ]
})
export class FilesModule { }
