import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
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
  }

}
