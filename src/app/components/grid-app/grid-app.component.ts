import { Component, OnInit, HostListener } from '@angular/core';
@Component({
  selector: 'app-grid-app',
  templateUrl: './grid-app.component.html',
  styleUrls: ['./grid-app.component.css']
})
export class GridAppComponent implements OnInit {
  public browserRefresh: boolean = false;
  public autoScroll: boolean = false;

  constructor() {

  }
  videoFile: any
  renderVideoData: any = []

  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    if (window.innerWidth < 770) {

      this.autoScroll = true
    } else {
      this.autoScroll = false
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 770) {

      this.autoScroll = true
    } else {
      this.autoScroll = false
    }
  }
  getVideo(video: any) {
    this.videoFile = video
  }
  getCutPointOfViedeo(cutPoint: any) {
    this.renderVideoData.push(cutPoint)
  }
  scrollToEnd() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
