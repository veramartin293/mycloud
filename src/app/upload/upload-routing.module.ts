import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: 'upload',
    component: UploadFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
