import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserServicesService) { }
  email: string | any = localStorage.getItem('email')
  sampleData: any = [
    {
      video_id: 'asdas',
      projectName: 'asdassadsa',
      status: 'onpending',
      video_link: 'none'
    },
    {
      video_id: 'asdas',
      projectName: 'asdassadsa',
      status: 'done',
      video_link: 'none'
    }, {
      video_id: 'asdas',
      projectName: 'asdassadsa',
      status: 'error',
      video_link: 'none'
    }
  ]
  ngOnInit(): void {
    this.getData()
  }
  deleteRecord(id: string) {
    console.log(this.email, id)
    if (this.email) {
      this.userService.deleteVideoData({ email: this.email, videoID: id }).subscribe(
        res => {
          console.log('done')
          window.location.reload()
        },
        err => {
          console.log(err)
        }
      )
    }
  }
  getData() {
    if (this.email) {
      this.userService.getVideoData({ email: this.email }).subscribe(
        res => {
          this.sampleData = res.data
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )

    }
  }
}
