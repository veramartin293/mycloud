import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {

  @Input() file: any;
  public isImage: boolean;
  public filePath: string;

  constructor() {
    this.isImage = false;
    this.filePath = '';
  }

  ngOnInit(): void {
    this.isFileAnImage();
    this.file.created_at = new Date(this.file.created_at).toDateString();
    this.filePath = this.file.path;
  }

  public isFileAnImage(): void {
    const availableImageTypes = ['jpg', 'jpeg', 'png']
    this.isImage = availableImageTypes.includes(this.file.file_type);
  }

  public cardClick() {
    // Download the file when it is not a image
    if (!this.isImage) {
      const url =this.filePath

       fetch(url)
        .then( res => res.blob() )
        .then( blob => {
          var file = window.URL.createObjectURL(blob);
          window.location.assign(file);
        });
    }
  }
}
