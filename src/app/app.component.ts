import { Component, OnDestroy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from './animation';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {

  constructor(private contexts: ChildrenOutletContexts) {


  };
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animaiton']
  }
  title = 'video-app';
}
