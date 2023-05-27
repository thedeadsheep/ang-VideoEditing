import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        var token = localStorage.getItem('token')
        console.log(token)
        //check some condition  
        if (token == null) {
            alert('You are not allowed to view this page');
            this._router.navigate(['/homepage'])
            return false;
        }
        return true;
    }

}