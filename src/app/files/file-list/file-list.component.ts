import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../_services/files.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageDisplayComponent } from '../image-display/image-display.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  public files:any[];

  constructor(private filesService: FilesService, private dialog: MatDialog) {
    this.files = [];
  }

  ngOnInit(): void {
    this.getFiles();
  }

  public getFile(file:any) {
    const imageTypes = ['jpg', 'jpeg', 'png'];
    const isFileAnImage = imageTypes.includes(file.file_type);
    if (isFileAnImage) {
      console.log('Path inside list');
      console.log(file.path);
      this.openImageDisplayDialog(file);
    }
  }

  public openImageDisplayDialog(file:any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = file;
    // dialogConfig.panelClass = 'image-upload-dialog'

    this.dialog.open(ImageDisplayComponent, dialogConfig);
  }

  public getFiles() {
    this.filesService.getAll()
    .subscribe(
      resp => {
        this.files = resp;
      },
      error => {
        console.log(error);
      }
    );
  }

}
