import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnChanges {
  
  constructor() { }
  @Input() arrayOfCutVideo: any = {}
  
  ngOnChanges(changes: SimpleChanges): void {

  }

}
