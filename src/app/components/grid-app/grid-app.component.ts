import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-app',
  templateUrl: './grid-app.component.html',
  styleUrls: ['./grid-app.component.css']
})
export class GridAppComponent implements OnInit {

  constructor() { }
  videoFile: any
  renderVideoData: any

  ngOnInit(): void {
  }
  getVideo(video: any) {
    this.videoFile = video
  }
}
