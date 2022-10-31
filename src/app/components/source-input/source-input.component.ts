import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SourceServiceService } from '../../services/source-service.service'
@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.css']
})
export class SourceInputComponent implements OnInit {
  fileInput: any = []
  constructor(private ss: SourceServiceService) { }
  @Output() videoFiles = new EventEmitter();
  ngOnInit(): void {
  }
  fileBrowseHandler(files: any) {
    const dropFiles = files.target.files
    for (let i = 0; i < dropFiles.length; i++) {
      this.pushVideoTofileInputArray(dropFiles[i])
      ///push video to server here
    }
    this.filteringUploadedVideoToServer(dropFiles)
    console.log(dropFiles)
  }
  filteringUploadedVideoToServer(videoFiles: any) {
    var videoNotUploaded: any[] = [];
    videoFiles.forEach((vFile: any) => {
      if (vFile.uploaded == false)
        videoNotUploaded.push(vFile)
    });
    this.uploadVideos(videoNotUploaded)
  }
  uploadVideos(multipleVideos: any[]) {
    const formData = new FormData()
    for (let item of multipleVideos) {
      formData.append("video", item)
    }
    this.ss.uploadSource(formData).subscribe((res) => {
      console.log(res)
      multipleVideos = res // dữ liệu nhận cần thêm 2 thuộc tính về path và uploaded
    })
  }
  pushVideoTofileInputArray(file: any) {
    var fileCheck = this.fileInput.find((fI: any) => { return file.name == fI.name })
    if (fileCheck) {
      if (fileCheck.type == file.type) {
        console.log("noo Type")
        return
      }
      if (fileCheck.size == file.size) {
        console.log("noooo!")
        return
      }
      this.fileInput.push(file)
    } else this.fileInput.push(file)
  }
  transVideo(video: any) {
    this.videoFiles.emit(video);
  }
}
