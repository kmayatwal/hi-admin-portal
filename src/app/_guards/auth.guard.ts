import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from '../_services/utility.service';
// import { KeycloakService } from '../keycloak.service';
// import { BeforeLoginApis } from 'src/app/basicLoginCalls';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        // private beforeLoginApis: BeforeLoginApis,
        private router: Router,
        private utilityService: UtilityService,
        // private keycloakService: KeycloakService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.utilityService.getCurrentUser();
        console.log('this is user', user);

        if (!user) {
            // return this.beforeLoginApis?.observer;
            return false;
        }

        return true;

        // if (this.keycloakService?.getKeycloakInstance()?.authenticated && user !== null) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
}
