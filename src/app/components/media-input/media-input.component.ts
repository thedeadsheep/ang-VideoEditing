import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderServiceService } from 'src/app/services/render-service.service';
import { saveAs } from 'file-saver'
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
  randomIntSecond(start: any, end: any) {
    console.log(start)
    var random1 = this.hmsToSecondsOnly(start)
    var random2 = this.hmsToSecondsOnly(end)
    console.log(typeof random1);
    const rndInt = Math.floor(Math.random() * random2) + random1
    return rndInt
  }
  sanitizeTime(data: any) {
    console.log(data)
    var url = data.video.blobURL + "#t=" + this.randomIntSecond(data.start, data.end).toString()
    let index = this.arrayOfCutVideo.findIndex((v: any) => v.id === data.id)
    this.arrayOfCutVideo[index].video.blob = url
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  sanitize(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  hmsToSecondsOnly(str: any) {
    console.log(str);
    var p = str.split(':'),
      s = 0, m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }
    return s;
  }
  secondsToTime(seconds: any) {
    seconds = parseFloat(seconds)
    const result = new Date(seconds * 1000).toISOString().slice(11, 19);
    return result
  }
  addVideoToRenderArray(id: any) {
    console.log("arry", this.arrayOfCutVideo)
    var pushObj = this.arrayOfCutVideo.find((obj: any) => { return obj.id === id })
    console.log(pushObj)
    var beginTime;
    var endTime;
    if (this.mergeData.length == 0) {
      beginTime = 0
      endTime = this.secondsToTime(this.hmsToSecondsOnly(pushObj.end) - this.hmsToSecondsOnly(pushObj.start))
    } else {
      beginTime = this.mergeData[this.mergeData.length - 1].endTime
      endTime = this.secondsToTime((this.hmsToSecondsOnly(pushObj.end) - this.hmsToSecondsOnly(pushObj.start)) + this.hmsToSecondsOnly(beginTime))
    }
    var obj = {
      id: UUID.UUID(),
      video: pushObj.video,
      start: pushObj.start,
      end: pushObj.end,
      beginTime: beginTime,
      endTime: endTime
    }
    this.mergeData.push(obj)
    console.log(this.mergeData)
  }

  removeCut(id: any) {
    let index = this.mergeData.findIndex((v: any) => v.id === id)
    this.mergeData.splice(index, 1)
    if (this.mergeData.length == 0) {
      return
    }
    if (index == 0) {
      this.mergeData[0].beginTime = 0
      this.mergeData[0].endTime = this.secondsToTime(this.hmsToSecondsOnly(this.mergeData[0].end) - this.hmsToSecondsOnly(this.mergeData[0].start))
      index = index + 1
    }
    for (var i = index; i < this.mergeData.length; i++) {
      this.mergeData[i].beginTime = this.mergeData[i - 1].endTime
      this.mergeData[i].endTime = this.secondsToTime((this.hmsToSecondsOnly(this.mergeData[i].end) - this.hmsToSecondsOnly(this.mergeData[i].start)) + this.hmsToSecondsOnly(this.mergeData[i].beginTime))
    }
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
        start: this.hmsToSecondsOnly(this.mergeData[i].start),
        end: this.hmsToSecondsOnly(this.mergeData[i].end),
      }
      requestData.videoProcess.push(data)
    }
    console.log(requestData)
    this.renderService.renderRequest(requestData).subscribe((data: Blob | MediaSource) => {
      let downloadURL = window.URL.createObjectURL(data)
      saveAs(downloadURL)
    })
  }
  downloadFile(file: any) {
    this.renderService.downloadFile(file).subscribe((data: Blob | MediaSource) => {
      let downloadURL = window.URL.createObjectURL(data)

      saveAs(downloadURL)
    })
  }
}

