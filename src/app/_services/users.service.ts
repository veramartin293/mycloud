import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url:string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }

  public updateOne(user:any): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${user.id}`, user);
  }

  public addOne(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/users`, user);
  }
}

