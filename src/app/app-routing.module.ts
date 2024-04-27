import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { JoinNowComponent } from './profile/join-now/join-now.component';
// import { ConsultationComponent } from './profile/consultation/consultation.component';
// import { RegisterComponent } from './profile/register/register.component';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.component';
import { MembersListComponent } from './members-list/members-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HealthHubComponent } from './health-hub/health-hub.component';
// import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
// import { PatientViewFileComponent } from './profile/patient-view-file/patient-view-file.component';
// import { EhrDashboardComponent } from './profile/ehr-dashboard/ehr-dashboard.component';
// import { PatientPersonalDetailsComponent } from './profile/patient-personal-details/patient-personal-details.component';
// import { ForgotPasswordComponent } from './profile/forgot-password/forgot-password.component';
// import { CompleteEncounterComponent } from './profile/consultation/complete-encounter/complete-encounter.component';
// import { ViewMedicalConsentFormComponent } from './profile/medical-forms/view-medical-consent-form/view-medical-consent-form.component';
// import { LabOrderPreviewComponent } from './profile/consultation/care-plan/lab-order/preview-lab-order/preview-lab-order.component';
// import { PreviewBillComponent } from './profile/consultation/billing/preview-bill/preview-bill.component';
// import { BillingInvoiceComponent } from './profile/user-settings/billing-invoice/billing-invoice.component';
// import { MonitoringPlanComponent } from './profile/remote-monitoring/remote-monitoring-subscription-plan/remote-monitoring-subscription-plan.component';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./main-web/main-web.module').then(m => m.MainModule) },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersListComponent, canActivate: [AuthGuard] },
  { path: 'health-hub', component: HealthHubComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  // { path: 'join-now', component: JoinNowComponent, canActivate: [AuthGuard] },
  // { path: 'consultation/:id', component: ConsultationComponent, canActivate: [AuthGuard] },
  // { path: 'register/:id', component: RegisterComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'create-profile/:id', component: CreateProfileComponent },
  // { path: '', redirectTo: '/Home', pathMatch: 'full' },
  // { path: 'patient-file', component: PatientViewFileComponent, canActivate: [AuthGuard] },
  // { path: 'patient-personal-detail', component: PatientPersonalDetailsComponent },
  // { path: 'ehr-detail', component: EhrDashboardComponent, canActivate: [AuthGuard] },
  // { path: 'appointment-info/:id/patient/:patientId', component: CompleteEncounterComponent, canActivate: [AuthGuard] },
  // { path: 'view-medical-consent-form', component: ViewMedicalConsentFormComponent },
  // { path: 'bill-preview', component: PreviewBillComponent },
  // { path: 'bill-invoice', component: BillingInvoiceComponent },
  // { path: 'lab-order-preview/:patientId', component: LabOrderPreviewComponent },
  // { path: 'remote-monitorin-subscription-plan/:id', component: MonitoringPlanComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled',
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
