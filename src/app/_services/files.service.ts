import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private url:string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  public getAll(page:number = 1): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/files?page=${page}`);
  }

  public upload(file: any): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url}/files`, formData, {reportProgress: true});
    return this.http.request(req);
  }

  public downloadFile(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
