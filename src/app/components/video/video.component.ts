import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnChanges {
  @Input() videoLoad: any
  @Output() cutMark: any = new EventEmitter<object>()
  video: any
  volValue: any
  currentTime: any
  timeDuration: any

  public markingPoint = this.fb.group({
    start: ['', [Validators.required, Validators.minLength(1)]],
    end: ['', [Validators.required, Validators.minLength(1)]]
  })
  constructor(
    public fb: FormBuilder
  ) { }
  ngOnChanges(changes: SimpleChanges): void {

    this.defaultState()

    this.loadVideo()

    this.getPlayedTime();
    this.cutSlider()

  }

  cutSlider() {
    var lowerSlider = <HTMLInputElement>document.getElementById('fromSlider')
    var upperSlider = <HTMLInputElement>document.getElementById('toSlider')

    var lowerInput = <HTMLInputElement>document.getElementById('fromInput')
    var upperInput = <HTMLInputElement>document.getElementById('toInput')

    var lowerVal = 0
    lowerSlider.value = lowerVal.toString()
    var upperVal = this.video.duration
    upperSlider.value = upperVal.toString()

    lowerInput.value = lowerVal.toString()
    upperInput.value = upperVal.toString()
    upperSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);
      lowerInput.value = ((this.video.duration * lowerVal) / 100).toString()
      upperInput.value = ((this.video.duration * upperVal) / 100).toString()
      if (upperVal < lowerVal + 2) {
        lowerSlider.value = (upperVal - 2).toString();
        console.log(lowerVal, upperVal)
        if (lowerVal == parseInt(lowerSlider.min)) {
          upperSlider.value = "1";
        }
      }
    }
    lowerSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);
      lowerInput.value = ((this.video.duration * lowerVal) / 100).toString()
      upperInput.value = ((this.video.duration * upperVal) / 100).toString()
      console.log(lowerVal, upperVal)
      if (lowerVal > upperVal - 2) {
        upperSlider.value = (lowerVal + 2).toString();

        if (upperVal == parseInt(upperSlider.max)) {
          lowerSlider.value = (parseInt(upperSlider.max) - 2).toString();
        }

      }
    };
  }
  getPlayedTime() {
    this.video.ontimeupdate = () => {
      this.currentTime = this.video.currentTime
    }
    this.video.oncanplay = () => {
      this.getDuration()
      const startInput = (<HTMLInputElement>document.getElementById("start-point"))
      const endInput = (<HTMLInputElement>document.getElementById("end-point"))
      startInput.placeholder = this.video.currentTime
      endInput.placeholder = this.video.duration;
      startInput.min = '0'
      endInput.max = this.video.duration.toString()
    }


  }
  defaultState() {
    const vid = (<HTMLInputElement>document.getElementById("video-played"))
    this.video = vid
    const time = (<HTMLInputElement>document.getElementById("time-range"))
    this.timeDuration = time
    this.currentTime = 0


    this.markingPoint.value.start = '0';
    this.markingPoint.value.end = this.video.duration

  }
  loadVideo() {
    const file = this.videoLoad
    if (file) {
      this.video.src = URL.createObjectURL(file)


    }
  }
  playPause() {
    if (this.video.paused) {
      this.playVideo()
      return
    }
    this.pauseVideo()
  }
  playVideo() {
    this.video.play()
  }
  pauseVideo() {
    this.video.pause()
  }
  prev5Sec() {
    const currentTime = this.video.currentTime

    this.video.currentTime = currentTime - 5;
  }
  next5Sec() {

    const currentTime = this.video.currentTime
    this.video.currentTime = currentTime + 5;
  }
  changeVol() {
    const slider = (<HTMLInputElement>document.getElementById("slider-vol"))
    if (slider) {
      var trueValue = Number(slider.value) / 100
      this.volValue = trueValue
      this.video.volume = trueValue
    }
  }
  stopVideo() {
    this.video.pause()
    this.video.currentTime = 0;
  }
  muteVol() {
    if (this.video.volume != 0) {
      this.video.volume = 0
      this.volValue = 0
    } else {
      this.video.volume = 1
      this.volValue = 1
    }
  }

  getDuration() {
    this.timeDuration.max = this.video.duration.toString()
  }
  seekTime() {
    this.video.currentTime = this.timeDuration.value
  }

  markingLoop(startLoop: any, endLoop: any) {
    const start = (startLoop != null) ? startLoop : this.markingPoint.value.start
    const end = (endLoop != null) ? endLoop : this.markingPoint.value.end
    console.log("start: ", start, "end: ", end)
    if (end < start) {
      return
    }
    this.video.currentTime = start
    this.video.ontimeupdate = () => {
      if (this.video.currentTime > end) {
        this.video.currentTime = start
      }
    }
  }
  unMarking() {
    this.markingLoop(0, this.video.duration)
  }


  createMarkingCutPoint() {
    var cutPoint = {
      id: UUID.UUID(),
      video: this.videoLoad,
      start: this.markingPoint.value.start,
      end: this.markingPoint.value.end,
    }
    this.cutMark.emit(cutPoint);
  }

  unForcus() {
    var start = (<HTMLInputElement>document.getElementById("start-range"))
    var end = (<HTMLInputElement>document.getElementById("end-range"))
    start.value = ""
    end.value = ""
    this.markingPoint.value.start = ""
    this.markingPoint.value.end = ""

  }
}
