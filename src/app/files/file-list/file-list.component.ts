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
  private pageNumber:number;

  constructor(private filesService: FilesService, private dialog: MatDialog) {
    this.files = [];
    this.pageNumber = 1;
  }

  ngOnInit(): void {
    this.getFiles();
  }

  public onScrollDown(event: any) {
    this.getFiles(++this.pageNumber);
  }

  public getFile(file:any) {
    const imageTypes = ['jpg', 'jpeg', 'png'];
    const isFileAnImage = imageTypes.includes(file.file_type);
    if (isFileAnImage) {
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

  public getFiles(page:number = 1) {
    this.filesService.getAll(page)
    .subscribe(
      resp => {
        if (page === 1) {
          this.files = resp;
        } else {
          for (let file of resp) {
            this.files.push(file);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
