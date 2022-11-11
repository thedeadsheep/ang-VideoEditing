import { Component, OnDestroy } from '@angular/core';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    if (confirm('Successful Message')) {
      localStorage.clear()
    }
  };

  title = 'video-app';
}
