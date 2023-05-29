import { Component, SimpleChanges, Input, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderServiceService } from 'src/app/services/render-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-media-input',
    templateUrl: './media-input.component.html',
    styleUrls: ['./media-input.component.css']
})
export class MediaInputComponent implements OnInit {

    constructor(
        private sanitizer: DomSanitizer,
        private renderService: RenderServiceService,
        public formBuilder: FormBuilder,
        private router: Router) { }
    @Input() arrayOfCutVideo: any = {}
    projectName = this.formBuilder.group({
        pName: ['', Validators.required]
    })
    mergeData: any = []
    cutVideo: any
    spinnerOpen: boolean = false
    reqOp: object = {
        ratio: false,
        speedup: false
    }
    showReqOp: boolean = false
    loadPreview: boolean = false
    video: any
    LUTInfo: any
    //videoPreview: any = []
    ngOnInit(): void {

    }
    deleteMarking(id: any) {
        var index = this.arrayOfCutVideo.findIndex((cut: any) => { return cut.id == id })
        this.arrayOfCutVideo.splice(index, 1)
    }

    randomIntSecond(start: any, end: any) {
        var random1 = this.hmsToSecondsOnly(start)
        var random2 = this.hmsToSecondsOnly(end)
        const rndInt = Math.floor(Math.random() * random2) + random1
        return rndInt
    }
    sanitizeTime(data: any) {
        var url = data.video.blobURL + "#t=" + this.randomIntSecond(data.start, data.end).toString()
        let index = this.arrayOfCutVideo.findIndex((v: any) => v.id === data.id)
        this.arrayOfCutVideo[index].video.blob = url
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    sanitize(url: any) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    isNumber(value: any) {
        if (Number.isInteger(value))
            return true
        return false
    }
    hmsToSecondsOnly(str: any) {
        if (this.isNumber(str)) {
            return str
        }
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
        var pushObj = this.arrayOfCutVideo.find((obj: any) => { return obj.id === id })
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
        if (this.mergeData.length > 0) {
            this.showReqOp = true
        }
    }
    async reload() {
        this.loadPreview = !this.loadPreview
    }

    removeCut(id: any) {
        let index = this.mergeData.findIndex((v: any) => v.id === id)
        this.mergeData.splice(index, 1)
        if (this.mergeData.length == 0) {
            this.showReqOp = false
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
    getVideoOutput() {
        var videoRatio = <HTMLSelectElement>document.getElementById('video-ratio')
        var videoResolu = <HTMLSelectElement>document.getElementById('video-resolution')
        var returnData = {
            ratio: videoRatio.value,
            resolu: ""
        }
        var height;
        if (videoResolu.value == "720") {
            height = "1280"
        }
        if (videoResolu.value == "480") {
            height = "854"
        }
        if (videoResolu.value == "360") {
            height = "640"
        }
        if (videoRatio.value === "landscape") {
            returnData.resolu = height + ":" + videoResolu.value
        }
        if (videoRatio.value === "portrait") {
            returnData.resolu = videoResolu.value + ":" + height
        }
        return returnData
    }
    checkEmail() {
        console.log("dasdasd")
        var cbElement = <HTMLInputElement>document.getElementById("email-checkbox")
        var inputElement = <HTMLInputElement>document.getElementById("email-input")

        console.log(cbElement.checked)

        if (!cbElement.checked) {
            inputElement.style.display = 'none'
            return
        }
        inputElement.style.display = 'block'
    }

    sendRequest() {
        this.spinnerOpen = true
        var requestData: any = {
            sessionID: localStorage.getItem("sessionID"),
            videoProcess: [],
            videoRatio: this.getVideoOutput(),
            speedup: false,
            filter: this.LUTInfo,
            email: localStorage.getItem('email'),
            projectName: this.projectName.value.pName
        }

        var speedup = <HTMLInputElement>document.getElementById('speed-up')
        var xName = <HTMLSelectElement>document.getElementById('extension-name')
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
        requestData.speedup = speedup.checked
        requestData.extensionName = xName.value
        console.log(requestData)
        if (this.loadPreview) {
            this.reload()
        }
        this.renderService.renderRequest(requestData).subscribe(
            res => {
                this.router.navigate(['/dashboard'])
                this.spinnerOpen = false
            }, err => {
                console.log(err)
            })
    }
    getLUT(item: any) {
        this.LUTInfo = item
        if (this.LUTInfo) {
            var status = <HTMLSpanElement>document.getElementById("status")
            status.innerHTML = "Active"
            status.classList.add("active-status")
            status.classList.remove("deactive-status")
        }
    }





}

