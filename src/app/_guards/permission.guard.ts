import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from '../_services/utility.service';

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private router: Router,
        private utilityService: UtilityService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = this.utilityService.getCurrentUser();
        if (user !== null) {
            if (user.permission !== null) {
                return true;
            }
            // this.router.navigate(['Dashbord'], { queryParams: {
            //     returnUrl: state.url } });
            this.router.navigate(['no-access'], { queryParams: {
              returnUrl: state.url } });
        } else {

          // not logged in so redirect to login page with the return url
          this.router.navigate(['Login'], { queryParams: {
              returnUrl: state.url } });
          }

        return false;
    }
}
