import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './components/video/video.component';
import { MediaInputComponent } from './components/media-input/media-input.component';
import { VideoTimelineComponent } from './components/video-timeline/video-timeline.component';
import { SourceInputComponent } from './components/source-input/source-input.component';
import { GridAppComponent } from './components/grid-app/grid-app.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MediaInputComponent,
    VideoTimelineComponent,
    SourceInputComponent,
    GridAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
