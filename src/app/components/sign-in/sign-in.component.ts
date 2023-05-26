import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
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
          opacity: '1'
        }),
        animate('0.5s ease-out', style({ opacity: 0, position: 'relative' }))
      ]),
      transition('false => true', [
        style({
          opacity: '0'
        }),
        animate('0.5s ease-in', style({ opacity: 1, position: 'absolute' }))
      ]),
    ])
  ]
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor() { }
  isShow: boolean = true
  isLoad: boolean = true
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.isLoad = false
  }
  signIn() {
    this.isShow = !this.isShow
  }
}
