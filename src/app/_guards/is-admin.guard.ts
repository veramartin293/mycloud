import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate():boolean {
    let isAdmin = false;
    // Get the authenticated user
    const user = this.authService.getAuthenticatedUser();

    // Verify if is a admin
    if (user.role === 'admin') {
      isAdmin = true;
    } else {
      this.router.navigate(['/']);
    }
    return isAdmin;
  }
}
