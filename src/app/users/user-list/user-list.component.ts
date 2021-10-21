import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users:any[];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers() {
    this.usersService.getAll()
    .subscribe(
      resp => {
        this.users = resp.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  public formatDate(date:any):any {
    return new Date(date).toDateString();
  }

  private addUser(user:any) {
    this.users.unshift(user);
  }

  public openFormDialog(user:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);

    // Subscribe to on add event
    const sub = dialogRef.componentInstance.onAdd.subscribe(data => {
      this.addUser(data);
    });

    // Subscirbe to Dialog close event
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

}
