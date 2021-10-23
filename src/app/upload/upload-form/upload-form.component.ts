import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../_services/files.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  public uploadedFile: any;
  public error: string;
  public fileValidated: boolean;
  public file: any;
  public progress:number;
  public cancelUpload:boolean;
  public notification:any;

  constructor(private filesService:FilesService) {
    this.uploadedFile = null;
    this.error = '';
    this.file = null;
    this.fileValidated = false;
    this.progress = 0;
    this.cancelUpload = false;
    this.notification = {
      display: false,
      message: '',
      error: false,
    }
  }

  ngOnInit(): void {
  }

  public onDropFile(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    this.validateFiles(files);
  }

  public onDragOverFile(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  public onFileChange(event: any) {
    const files = event.target.files;
    this.validateFiles(files);
    event.target.value = null;
  }

  public uploadFile(): void {
    this.progress = 0;
    this.cancelUpload = false;

    const sub = this.filesService.upload(this.file)
    .subscribe(
      resp => {
        if (resp.type === 1) {
          this.progress = resp.loaded * 100 / resp.total;
          if (this.cancelUpload) {
            sub.unsubscribe();

            // Display notification
            this.notification.message = 'File upload cancelled';
            this.notification.display = true;
            this.notification.error = true;
            setTimeout(() => {
              this.notification.display = false;
              this.notification.error = false;
            }, 3000);
            this.resetFile();
            return;
          }
        } else if (this.progress >= 99) {
          // Display notification
          this.notification.message = 'File uploaded successfully';
          this.notification.display = true;
          setTimeout(() => {
            this.notification.display = false;
          }, 3000);

          this.resetFile();
          return;
        }
      },
      err => {
        // Display notification
        this.notification.message = err.error.error || err.message;
        this.notification.display = true;
        this.notification.error = true;
        setTimeout(() => {
          this.notification.display = false;
          this.notification.error = false;
        }, 3000);
        this.resetFile();
        return;
      }
    )
  }

  private validateFiles(files:any) {
    this.error = '';
    const allowedTypes= [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // word
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // excel
      'application/vnd.ms-excel', // csv
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (files.length > 1) {
      this.error = 'You only can upload 1 file.'
      return;
    } else if (files.length === 1) {
      console.log(files[0].type);
      if (!allowedTypes.includes(files[0].type)) {
        this.error = 'Please select a valid file type (jpg, jpeg, png, docx, xlsx, csv).'
        this.resetFile();
        return;
      }
    } else {
      return;
    }

    this.file = files[0];
  }

  public resetFile(): void {
    this.file = null;
    this.cancelUpload = true;
    this.progress = 0;
  }
}
