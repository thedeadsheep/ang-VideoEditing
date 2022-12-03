import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderServiceService } from 'src/app/services/render-service.service';
@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnChanges {

  constructor(
    private sanitizer: DomSanitizer,
    private renderService: RenderServiceService) { }
  @Input() arrayOfCutVideo: any = {}
  mergeData: any = []
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.arrayOfCutVideo)
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  addVideoToRenderArray(id: any) {
    console.log("arry", this.arrayOfCutVideo)
    var pushObj = this.arrayOfCutVideo.find((obj: any) => { return obj.id === id })
    console.log(pushObj)
    var obj = {
      id: UUID.UUID(),
      video: pushObj.video,
      start: pushObj.start,
      end: pushObj.end
    }
    this.mergeData.push(obj)
    console.log(this.mergeData)
  }

  removeCut(id: any) {
    let index = this.mergeData.findIndex((v: any) => v.id === id)
    this.mergeData.splice(index, 1)
  }
  sendRequest() {
    var requestData: any = {
      sessionID: localStorage.getItem("sessionID"),
      videoProcess: []
    }

    var length = this.mergeData.length
    let data
    for (var i = 0; i < length; i++) {
      data = {
        fileName: this.mergeData[i].video.serverName,
        start: parseInt(this.mergeData[i].start),
        end: parseInt(this.mergeData[i].end),
      }
      requestData.videoProcess.push(data)
    }
    console.log(requestData)
    this.renderService.renderRequest(requestData).subscribe((res) => {
      console.log(res)
    })
  }
}
