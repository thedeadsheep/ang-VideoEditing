import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('modalState', [
      state('true', style({
        display: 'block',
        opacity: '1'
      })),
      state('false', style({
        display: 'none',
        opacity: '0'
      })),
      transition('true => false', [
        style({
        }),
        animate('1s ease-out')
      ]),
      transition('false => true', [
        style({
        }),
        animate('1s ease-in')
      ]),
    ])
  ],
})
export class LoginComponent implements OnInit {

  constructor() { }
  isShow: boolean = true
  show: string = 'none'
  ngOnInit(): void {
  }

  getPassword() {

    this.isShow = !this.isShow

  }
  login() {
  }
}
