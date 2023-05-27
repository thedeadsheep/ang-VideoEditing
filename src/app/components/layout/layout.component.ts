import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class LayoutComponent implements OnInit {
  isLogIned: string | null = '';
  show: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLogIned = localStorage.getItem('token')
    if (this.isLogIned) {
      this.show = false
    }
  }
  logout() {
    localStorage.clear()
    window.location.reload()
  }

}
