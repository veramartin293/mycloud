import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {

  @Input() file: any;
  public isImage: boolean;

  constructor() {
    this.isImage = false;
  }

  ngOnInit(): void {
    this.isFileAnImage();
    this.file.created_at = new Date(this.file.created_at).toDateString();
  }

  public isFileAnImage(): void {
    const availableImageTypes = ['jpg', 'jpeg', 'png']
    this.isImage = availableImageTypes.includes(this.file.file_type);
  }
}
