import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.css']
})
export class SourceInputComponent implements OnInit {
  fileInput: any = null
  constructor() { }
  @Output() videoFiles = new EventEmitter();
  ngOnInit(): void {
  }
  fileBrowseHandler(files: any) {
    const dropFiles = files.target.files
    this.fileInput = dropFiles
  }
  transVideo(video: any) {
    this.videoFiles.emit(video);
  }
}
