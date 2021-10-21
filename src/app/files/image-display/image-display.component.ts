import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  public imagePath:string;

  constructor(
    private dialogRef: MatDialogRef<ImageDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.imagePath = data.path;
      this.imagePath = this.imagePath.replace('thumb_', '');
    }

  ngOnInit(): void {
  }

}
