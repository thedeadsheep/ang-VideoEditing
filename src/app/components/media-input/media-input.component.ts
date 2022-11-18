import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnChanges {

  constructor() { }
  @Input() arrayOfCutVideo: any = {}
  sampleData: any = [
    {
      id: UUID.UUID(),
      video: {
        name: 'video02.mp4'
      },
      start: 2,
      end: 2
    },
    {
      id: UUID.UUID(),
      video: {
        name: 'video01.mp4'
      },
      start: 2,
      end: 2
    },
    {
      id: UUID.UUID(),
      video: {
        name: 'video03.mp4'
      },
      start: 2,
      end: 2
    }
  ]

  mergeData: any = []
  ngOnChanges(changes: SimpleChanges): void {
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
  sendRequest() {

  }
  removeCut(id: any) {
    let index = this.mergeData.findIndex((v: any) => v.id === id)
    this.mergeData.splice(index, 1)
  }
}
