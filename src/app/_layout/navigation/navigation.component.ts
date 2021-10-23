import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  public isUserAdmin:boolean;

  constructor(private router: Router, private authService:AuthService) {
    this.isUserAdmin = authService.getAuthenticatedUser().role === 'admin';
    console.log(this.isUserAdmin);
  }

  ngOnInit(): void {
  }

  public logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
