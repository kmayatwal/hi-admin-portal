import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UtilityService } from '../_services/utility.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  selectedPage: string = 'overview';
  sidebarMenuOpened: boolean = true;

  route_name = {
    '/': 'overview',
    '/members': 'members',
    '/health-hub': 'health-hub',
  };

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        console.log('this is currentRoute', currentRoute);
        // this.isMembersRoute = currentRoute === '/members';
        this.selectedPage = currentRoute ? this.route_name[currentRoute] : 'home';
      }
    });
  }

  ngAfterInit() {

  }

  show(route) {
    this.selectedPage = route;
    switch (route) {
      case 'members':
        this._router.navigate(['/members']);
        break;
      case 'health-hub':
        this._router.navigate(['/health-hub']);
        break;
      default:
        this._router.navigate(['']);
    }
  }


  logout() {
    // Add that code on Logout
    this.utilityService.removeCurrentUser();
    this._router.navigate(['login']);
  }

}
