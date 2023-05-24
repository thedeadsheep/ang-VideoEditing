import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router'
import { GridAppComponent } from '../components/grid-app/grid-app.component'
import { Observable } from 'rxjs'

export interface IDeactivateComponent {
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGaurdService implements CanDeactivate<IDeactivateComponent>{
    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        return component.canExit()
    }
}