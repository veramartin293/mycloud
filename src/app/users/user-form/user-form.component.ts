import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm:FormGroup;
  public user:any;
  public formMode:string;
  public onAdd: EventEmitter<any>;
  public formLegend: string;
  // onAdd = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private usersService:UsersService,
    public formBuilder: FormBuilder
    ) {
      this.user = data
      this.formMode = this.user.id ? 'update' : 'create';
      this.formLegend = this.formMode === 'create' ? 'Create a User' : 'Update the User'

      // Password Validating rule changes when updating a user, it is NOT required
      const passwordValidators = this.formMode === 'create' ? [Validators.required] : [];
      this.userForm = this.formBuilder.group({
        name: [this.user.name, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: [this.user.password, passwordValidators],
        role: [this.user.role || 'admin', [Validators.required]],
      });

      this.onAdd = new EventEmitter();
    }

  ngOnInit(): void {
  }

  public saveUser() {
    console.log(this.userForm.valid);

    // Get the data from the form
    const tempUser:any = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role_id: this.userForm.value.role === 'admin' ? 1 : 2
    };
    // If user has a password set it (TO UPDATE CASE!!!)
    if (this.userForm.value.password) {
      tempUser.password = this.userForm.value.password;
    }

    // If the user has id, UPDATE it else CREATE IT
    if (this.user.id) {
      tempUser.id = this.user.id
      this.updateUser(tempUser);
    } else {
      this.createUser(tempUser);
    }
  }

  private createUser(tempUser:any) {
    this.usersService.addOne(tempUser)
    .subscribe(
      resp => {
        this.onAdd.emit(resp);
        this.dialogRef.close();
      },
      err => {
        console.log(err);
        this.dialogRef.close();
      }
    )
  }

  private updateUser(tempUser:any) {
    this.usersService.updateOne(tempUser)
    .subscribe(
      resp => {
        console.log(resp);
        this.setNewUserValues(tempUser);
        this.dialogRef.close();
      },
      err => {
        console.log(err);
        this.dialogRef.close();
      }
    )
  }

  private setNewUserValues(tempUser:any) {
    this.user.name = tempUser.name;
    this.user.email = tempUser.email;
    this.user.role = tempUser.role_id === 1 ? 'admin' : 'user';
  }

}
