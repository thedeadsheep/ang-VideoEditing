import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnChanges {
  @Input() videoArray: any
  constructor() { }
  video: any
  videoPreview: any = []
  cutPoint: any = []
  ngOnChanges(changes: SimpleChanges): void {
    this.videoPreview = this.videoArray
    this.video = <HTMLVideoElement>document.getElementById('preview-video')
  }
  cutPointSet() {
    this.cutPoint = []
    var l = this.videoPreview.length - 1
    if (l > 0) {
      for (var i = 0; i < l; i++) {
        var endPos
        if (this.isNumber(this.videoPreview[i].end)) {
          endPos = this.videoPreview[i].end - 1
        } else {
          endPos = this.hmsToSecondsOnly(this.videoPreview[i].end) - 1
        }
        this.cutPoint[i] = {
          num: i,
          begin: endPos
        }
      }
    }
  }
  continuousPlayingVideo(start: any, index: number) {
    if (index >= this.videoPreview.length)
      return
    this.video.pause()
    var playVideo = this.videoPreview[index]
    this.video.src = this.loadVideo(playVideo)
    if (!this.isNumber(playVideo.start))
      playVideo.start = this.hmsToSecondsOnly(playVideo.start)
    if (!this.isNumber(playVideo.end))
      playVideo.end = this.hmsToSecondsOnly(playVideo.end)

    this.video.currentTime = playVideo.start
    console.log(typeof playVideo.start)
    if (start != -1) {
      console.log(start, typeof start)
      this.video.currentTime = parseFloat(start)
    }
    this.video.play()
    this.video.ontimeupdate = () => {
      if (parseInt(this.video.currentTime) === parseInt(playVideo.end)) {
        this.video.pause()
        this.continuousPlayingVideo(-1, index + 1)
      }
    }
  }
  loadVideo(video: any) {
    const file = video.video
    if (file) {
      return URL.createObjectURL(file)
    }
    return false
  }

  abc() {
    console.log(this.videoPreview)
    this.cutPointSet()
    console.log(this.cutPoint)
    this.continuousPlayingVideo(-1, 0)
  }
  hmsToSecondsOnly(str: any) {
    var p = str.split(':'),
      s = 0, m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }
    return s;
  }

  isNumber(value: any) {
    console.log(Number.isInteger(value))
    if (Number.isInteger(value))
      return true
    return false
  }
  check(temp: any) {
    console.log(temp)
    this.continuousPlayingVideo(temp.begin, temp.num)
  }

}
