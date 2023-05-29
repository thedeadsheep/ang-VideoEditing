import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/services/user-services.service';


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
  isLogIned: string | null | undefined;

  constructor(
    private userService: UserServicesService,
    private router: Router
  ) { }


  isShow: boolean = true
  ngOnInit(): void {
    this.isLogIned = localStorage.getItem('token')
    if (this.isLogIned) {
      this.router.navigate(['/dashboard'])
    }
  }

  getPassword() {
    var email = <HTMLInputElement>document.getElementById('email')
    this.userService.getPassword(email.value).subscribe(
      res => {
        console.log(res)
        this.isShow = !this.isShow
      },
      err => {
        console.log(err)
      }
    )

  }
  login() {
    var email = <HTMLInputElement>document.getElementById('email')
    var password = <HTMLInputElement>document.getElementById('password')
    this.userService.login({ email: email.value, password: password.value }).subscribe(
      res => {
        var data = res
        localStorage.setItem('token', data.token);
        localStorage.setItem('displayname', data.displayName)
        localStorage.setItem('email', email.value)
        window.location.reload()
      }, err => {
        console.log(err)
      }

    )
  }
}
