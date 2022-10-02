import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnChanges {

  constructor() { }
  @Input() cutVideo: any = {}
  sampleData: any = [
    {
      filename: "video01.mp4",
      cutPoint: "00:02:12.8219321",
      duration: "00:00:30", //cắt 30 giây sau cutPoint     
    },
    {
      filename: "video01.mp4",
      cutPoint: "00:02:12.8219321",
      duration: "00:00:30", //cắt 30 giây sau cutPoint     
    },
    {
      filename: "video01.mp4",
      cutPoint: "00:02:12.8219321",
      duration: "00:00:30", //cắt 30 giây sau cutPoint     
    },
  ]
  ngOnChanges(changes: SimpleChanges): void {

  }

}
