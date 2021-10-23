import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputFileClear]'
})
export class InputFileClearDirective {

  constructor(el: ElementRef) {
  }

}
