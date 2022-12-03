import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './components/video/video.component';
import { MediaInputComponent } from './components/media-input/media-input.component';
import { SourceInputComponent } from './components/source-input/source-input.component';
import { GridAppComponent } from './components/grid-app/grid-app.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MediaInputComponent,
    SourceInputComponent,
    GridAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
