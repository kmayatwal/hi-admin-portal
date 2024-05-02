import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  NgbModule,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AuthenticationService,
  HttpService,
  UtilityService,
} from './_services';
import { WINDOW_PROVIDERS } from './_providers/window.provider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthGuard } from './_guards';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgChartsModule } from 'ng2-charts';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MembersListComponent } from './members-list/members-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HealthHubComponent } from './health-hub/health-hub.component';
import { ArticleListComponent } from './health-hub/article-list/article-list.component';
import { CreateArticleComponent } from './health-hub/create-article/create-article.component';
import { PreviewArticleComponent } from './health-hub/preview-article/preview-article.component';
import { ArticleDescriptionComponent } from './health-hub/create-article/article-description/article-description.component';
import { HiSelectBoxComponent } from './hi-select-box/hi-select-box.component';
import { DashboardDateComponent } from './dashboard/dashboard-date/dashboard-date.component';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: 'https://pf-api.healthinterface.com/schema-stitching/graphql',
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MembersListComponent,
    SideMenuComponent,
    HealthHubComponent,
    ArticleListComponent,
    CreateArticleComponent,
    PreviewArticleComponent,
    ArticleDescriptionComponent,
    HiSelectBoxComponent,
    DashboardDateComponent
  ],
  imports: [
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgChartsModule,
    NgxSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.FIREBASE)),
    provideMessaging(() => getMessaging()),
    MatSliderModule,
    NgbCarouselModule,
    AngularEditorModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpService,
    WINDOW_PROVIDERS,
    UtilityService,
    provideNativeDateAdapter(),
    AuthGuard,
    AuthenticationService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    NgbActiveModal,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
