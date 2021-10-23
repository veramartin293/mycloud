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
  private currentPage:number;
  public notification:any;
  public serverError:boolean;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
    this.users = [];
    this.currentPage = 1;
    this.notification = {
      display: false,
      message: ''
    }
    this.serverError = false;
  }

  ngOnInit(): void {
    this.getAllUsers(1);
  }

  private getAllUsers(page:number = 1) {
    this.usersService.getAll(page)
    .subscribe(
      resp => {
        if (page === 1) {
          this.users = resp.data;
        } else {
          for(let user of resp.data) {
            this.users.push(user);
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  private addUser(user:any) {
    this.users.unshift(user);
  }

  public deleteUser(user:any) {
    this.usersService.deleteOne(user.id)
    .subscribe(
      resp => {
        this.users.forEach((elem, index) => {
          if (elem.id === user.id) {
            this.users.splice(index, 1);

            this.notification.message = 'User deleted successfully';
            this.notification.display = true;

            setTimeout(() => {
              this.notification.display = false;
            }, 3000);
            return;
          }
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  public formatDate(date:any):any {
    return new Date(date).toDateString();
  }

  public onScrollDown(event: any) {
    this.getAllUsers(++this.currentPage);
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
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.notification.message = data.message;
        this.notification.display = true;

        setTimeout(() => {
          this.notification.display = false;
        }, 3000);
      }
      sub.unsubscribe();
    });
  }

}
