import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const WEB_API: string = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class RenderServiceService {

  constructor(private http: HttpClient) { }
  headers = this.getHeaders();
  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json') : null;
  }
  renderRequest(renderData: any) {
    if (this.headers instanceof HttpHeaders) {
      return this.http.post(WEB_API + `renderVideo?email=${localStorage.getItem('email')}`, renderData, {
        responseType: 'blob', headers: this.headers
      });
    } return this.http.post(WEB_API + "renderVideo", renderData, {
      responseType: 'blob'
    });
    //if done server return link to download or watch video rendered
    //or not server will sent error
  }
  downloadFile(fileDownload: any) {
    return this.http.post(WEB_API + "download", fileDownload, {
      responseType: 'blob'
    })
  }

}
