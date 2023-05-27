import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VideoComponent } from './components/video/video.component';
import { MediaInputComponent } from './components/media-input/media-input.component';
import { SourceInputComponent } from './components/source-input/source-input.component';
import { GridAppComponent } from './components/grid-app/grid-app.component';
import { HttpClientModule } from '@angular/common/http';
import { PreviewComponent } from './components/preview/preview.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CanDeactivateGaurdService } from './services/deactive-guard.service';
import { AuthGuardService } from './services/canactive-guard.service'
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LayoutComponent } from './components/layout/layout.component'
@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MediaInputComponent,
    SourceInputComponent,
    GridAppComponent,
    PreviewComponent,
    HomepageComponent,
    PagenotfoundComponent,
    LoginComponent,
    DashboardComponent,
    SignInComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CanDeactivateGaurdService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
