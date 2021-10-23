import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string;
  private jwtHelper:JwtHelperService;

  constructor(private http: HttpClient) {
    this.url = environment.url;
    this.jwtHelper = new JwtHelperService;
  }

  public login(email:string, password:string): Observable<any> {
    const response = this.http.post<any>(this.url + '/login', {email, password});
    return response;
  }

  public setToken(token:string): void {
    // Set token in localstorage
    window.localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean {
    try {
      let userIsLoggedIn = false;
      const token = window.localStorage.getItem('token');
      if (token) {
        userIsLoggedIn = this.isTokenValidJwt(token);
      }
      return userIsLoggedIn;
    } catch (_err) {
      return false;
    }
  }

  public getAuthenticatedUser(): any {
    try {
      const token = window.localStorage.getItem('token');
      const decodeToken = this.jwtHelper.decodeToken(token || '');
      return decodeToken.user;
    } catch (err) {
      console.log('Invalid token');
      return false;
    }
  }

  private isTokenValidJwt(token: string): boolean {
    let validToken = false;
    const decodedToken = this.jwtHelper.decodeToken(token || '');
    if (decodedToken) {
      validToken = true;
    }
    return validToken;
  }

  public getToken() {
    const token = window.localStorage.getItem('token') || '';
    if (this.isTokenValidJwt(token)) {
      return token;
    } else {
      return '';
    }
  }
}
