import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.component';
import { MembersListComponent } from './members-list/members-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HealthHubComponent } from './health-hub/health-hub.component';
import { MonitoringPlanComponent } from './remote-monitoring/remote-monitoring-subscription-plan/remote-monitoring-subscription-plan.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersListComponent, canActivate: [AuthGuard] },
  { path: 'health-hub', component: HealthHubComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'remote-monitorin-subscription-plan/:id', component: MonitoringPlanComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled',
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
