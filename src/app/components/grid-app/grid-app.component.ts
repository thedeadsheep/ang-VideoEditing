import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { IDeactivateComponent } from 'src/app/services/deactive-guard.service';

@Component({
  selector: 'app-grid-app',
  templateUrl: './grid-app.component.html',
  styleUrls: ['./grid-app.component.css'],
  animations: [

  ]
})
export class GridAppComponent implements OnInit, IDeactivateComponent {
  public browserRefresh: boolean = false;
  public autoScroll: boolean = false;

  constructor() {
  }
  videoFile: any
  renderVideoData: any = []


  canExit() {
    if (this.videoFile) {
      return confirm('Are U sure to Exit This Project?')
    } else {
      return true
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    if (window.innerWidth < 770) {

      this.autoScroll = true
    } else {
      this.autoScroll = false
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('sessionID')
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
