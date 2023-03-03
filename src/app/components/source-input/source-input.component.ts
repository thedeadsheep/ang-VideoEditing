import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SourceServiceService } from '../../services/source-service.service'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-source-input',
  templateUrl: './source-input.component.html',
  styleUrls: ['./source-input.component.css']
})
export class SourceInputComponent implements OnInit {
  fileInput: any = []
  firstUpload: boolean = true
  loadingState: boolean = false
  constructor(
    private ss: SourceServiceService,
    private sanitizer: DomSanitizer) { }
  @Output() videoFiles = new EventEmitter();
  ngOnInit(): void {

  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  fileBrowseHandler(files: any) {
    const dropFiles = files.target.files

    for (let i = 0; i < dropFiles.length; i++) {
      this.pushVideoTofileInputArray(dropFiles[i])
    }

    this.uploadVideos(this.fileInput)
    this.fileInput.forEach((video: any) => {
      video.blobURL = URL.createObjectURL(video)
    });
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
    } else {
      this.fileInput.push(file)

    }
  }

  uploadVideos(multipleVideos: any[]) {
    this.loadingState = true
    const formData = new FormData()
    for (let item of multipleVideos) {
      if (item.uploaded != true)
        formData.append("files", item)
    }
    var sid = localStorage.getItem("sessionID") || "null"
    this.ss.uploadSource(formData, sid).subscribe((res) => {
      this.dataNormalizer(res.data.serverResponse)
      localStorage.setItem("sessionID", res.data.sessionId)
      this.loadingState = false
      // dữ liệu nhận cần thêm 2 thuộc tính về path và uploaded
    })
  }

  //-----------chuẩn hóa dữ liệu, liên kết thông tin giữa server -client----
  dataNormalizer(sRes: any) {
    for (var i = 0; i < sRes.length; i++) {
      var index = this.fileInput.findIndex((fi: any) => { return sRes[i].originalname == fi.name })
      if (this.fileInput[index].size == sRes[i].size) {
        this.fileInput[index].uploaded = true
        this.fileInput[index].serverName = sRes[i].serverFilename
        this.fileInput[index].serverPath = sRes[i].serverPath
      }
    }

  }
  //------------------- push video to another component-----------------------------
  transVideo(video: any) {
    this.videoFiles.emit(video);
  }
}

