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

  constructor(private filesService:FilesService) {
    this.uploadedFile = null;
    this.error = '';
    this.file = null;
    this.fileValidated = false;
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
  }

  public uploadFile(): void {
    this.filesService.upload(this.file)
    .subscribe(
      resp => {
        console.log(resp);
        this.resetFile();
      },
      err => {
        console.log(err);
        this.resetFile();
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
      if (!allowedTypes.includes(files[0].type)) {
        this.error = 'Please select a valid file type (jpg, jpeg, png, docx, xlsx, csv).'
        this.resetFile();
        return;
      }
    } else {
      return;
    }

    this.file = files[0];
    console.log(this.file);
  }

  public resetFile(): void {
    this.file = null;
  }

}
