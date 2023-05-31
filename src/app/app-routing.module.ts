import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridAppComponent } from './components/grid-app/grid-app.component';
import { CanDeactivateGaurdService } from './services/deactive-guard.service'
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuardService } from './services/canactive-guard.service';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent, data: { animation: 'HomePage' } },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'DashBoard' }, canActivate: [AuthGuardService] },
  { path: 'editapplication', component: GridAppComponent, canActivate: [AuthGuardService], data: { animation: 'AppEditor' }, canDeactivate: [CanDeactivateGaurdService] },
  { path: '', component: HomepageComponent },

  { path: 'login', component: LoginComponent, data: { animation: 'Login' } },
  { path: 'sign-in', component: SignInComponent, data: { animation: 'SignIn' } },
  { path: '**', pathMatch: 'full', redirectTo: '404page' },
  { path: '404page', component: PagenotfoundComponent, data: { animation: '404' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    CanDeactivateGaurdService,
    AuthGuardService,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
