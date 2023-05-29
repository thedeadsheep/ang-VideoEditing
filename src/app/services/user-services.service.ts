import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const WEB_API: string = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }
  headers = this.getHeaders();
  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json') : null;
  }
  register(data: any) {
    console.log(data)
    return this.http.post(WEB_API + "newUser/", data)
  }
  getPassword(data: any) {
    return this.http.get(WEB_API + 'getOTP?email=' + data)
  }
  login(data: any) {
    console.log(data)
    return this.http.post<any>(WEB_API + 'login/', {
      email: data.email,
      password: data.password
    })
  }
  getVideoData(data: any) {
    if (this.headers instanceof HttpHeaders) {
      return this.http.get<any>(WEB_API + `getVideoDataByEmail?email=${data.email}`, { headers: this.headers })
    } return this.http.get<any>(WEB_API + `getVideoDataByEmail?email=${data.email}`)
  }
  deleteVideoData(data: any) {
    if (this.headers instanceof HttpHeaders) {
      return this.http.delete<any>(WEB_API + `deleteVideoData?email=${data.email}&video_id=${data.videoID}`, { headers: this.headers })
    } return this.http.delete<any>(WEB_API + `deleteVideoData?email=${data.email}&video_id=${data.videoID}`)
  }

}
