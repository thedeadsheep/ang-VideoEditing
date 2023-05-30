import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  isLogIned: any
  show: boolean = true
  ngOnInit(): void {

    this.isLogIned = localStorage.getItem('token')
    if (this.isLogIned) {
      this.show = false
    }
  }

}
