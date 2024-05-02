import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../stateService';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apollo } from 'apollo-angular';
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { getBaseURL, GET_PATIENT, GET_PATIENT_IMAGES, GET_PATIENT_INSURANCE } from 'src/app/graphql.module';
import moment from 'moment-timezone';

@Component({
  selector: 'app-patient-view-file-side-menu',
  templateUrl: './patient-view-file-side-menu.component.html',
  styleUrls: ['./patient-view-file-side-menu.component.scss']
})
export class PatientViewFileSideMenuComponent implements OnInit {

  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Output('setPatientFile') setPatientFile: EventEmitter<any> = new EventEmitter<any>();
  @Input('patientId') patientId: number;
  @Input('routePage') routePage: string;
  @Input('status') status: string;

  public sidebarMenuOpened = true;
  patientFile: any;
  idProof = [];
  patientInsurance: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private stateService: StateService,
    private spinner: NgxSpinnerService,
    private apollo: Apollo,
    private httpLink: HttpLink,
  ) { }

  ngOnInit(): void {
    this.startService();
    this.getPatinetFile();
    this.getIdProof();
    this.getInsurance();
  }

  startService() {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      this.spinner.hide();
      if (graphQLErrors) {
        this.toastr.error(graphQLErrors[0].message);
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        this.toastr.error(networkError.message);
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const httpLink = this.httpLink.create({
      uri: getBaseURL(),
    });
    const link = ApolloLink.from([errorLink, httpLink]);

    this.apollo.removeClient();
    this.apollo.create({
      cache: new InMemoryCache({ addTypename: false }),
      link: link
    });
  }

  mutateService(mutatation, callback) {
    this.spinner.show();
    this.apollo
      .mutate(mutatation)
      .subscribe((result: any) => callback(result));
  }

  queryService(query, callback) {
    this.spinner.show();
    this.apollo
      .watchQuery(query)
      .valueChanges.subscribe((result: any) => callback(result));
  }

  get consentFormExist() {
    return !!(this.stateService?.appointment$?.appointmentConsentForm);
  }

  get transactionStatus() {
    if (this.routePage === 'profile/remote-monitoring') {
      this.status === 'ACTIVE' ? 'Paid' : 'Unpaid';
    }
    return this.stateService?.appointment$?.transactionId ? 'Paid' : 'Unpaid';
  }

  toggleMenu() {
    this.router.navigate(['/members']);
  }

  getAvatarURL(userData) {
    return `https://ui-avatars.com/api/?name=${userData?.firstName}+${userData?.lastName}&background=0D8ABC&color=fff`;
  }

  getPatinetFile() {
    this.queryService(
      {
        query: GET_PATIENT,
        variables: {
          patientId: this.patientId
        }
      },
      (result: any) => {
        this.setPatientFile.next(result.data.getPatient);
        this.patientFile = result.data.getPatient;
      }
    );
  }

  getIdProof() {
    this.queryService(
      {
        query: GET_PATIENT_IMAGES,
        variables: {
          patientId: this.patientId
        }
      },
      (result: any) => {
        if (result.data.getPatientImages && (result.data.getPatientImages).length > 0) {
          this.idProof = result.data.getPatientImages;
        }
      }
    );
  }

  getInsurance() {
    this.queryService(
      {
        query: GET_PATIENT_INSURANCE,
        variables: {
          patientId: this.patientId
        }
      },
      (result: any) => {
        this.patientInsurance = (result.data.getInsurance).length > 0 && result.data.getInsurance.filter(obj => {
          return obj.status === 'Active'
        })[0];
      }
    );
  }

  viewInsurance() {
    console.log('viewInsurance');
  }

  viewId() {
    console.log('viewId');
  }

  async downloadConsentForm() {
    const clinic = this.stateService.selectedClinic$;
    const param = new URLSearchParams();
    param.append('address', clinic.addressLine1);
    param.append('address', clinic.addressLine2);
    param.append('address', clinic.city + "," + clinic.state + ", " + clinic.country);
    param.append('address', this.stateService.doctorData$.mobileNumber);
    // param.append('address', `(${match[1]})${match[2]}-${match[3]}`);
    const address = param.toString();
    const form = this.stateService.appointment$.appointmentConsentForm;
    const name = form.fullName;
    const date = moment(form.updatedAt).format('Do MMM, YYYY');
    const time = moment(form.updatedAt).format('h:mm A');

    window.open(`./assets/images/patient-consent/index.html?name=${name}&date=${date}&time=${time}&${address}&print=yes&hr=${Date.now()}`, "_blank");

  }
}
