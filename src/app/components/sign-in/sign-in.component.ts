import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { UserServicesService } from 'src/app/services/user-services.service';
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

  constructor(private userServices: UserServicesService,
    public formBuilder: FormBuilder) { }
  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    nickname: ['', [Validators.required, Validators.maxLength(30)]]
  })
  isShow: boolean = true
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
  }
  signIn() {
    console.log(this.signUpForm.value)
    this.userServices.register(this.signUpForm.value).subscribe(
      res => {
        console.log(res)

        this.isShow = !this.isShow
      },
      err => {
        console.log(err)
        alert(err.message)
      }
    )
  }
}
