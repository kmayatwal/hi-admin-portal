import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../stateService';
import { Apollo } from 'apollo-angular';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client/link/core';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import {
  getBaseURL,
  GET_PATIENTS_BY_DOCTOR_ID,
  CHANGE_APPOINTMENT_STATUS,
  MARK_APPOINTMENT_COMPLETE,
} from 'src/app/graphql.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import moment from 'moment-timezone';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss', '../common.style.scss']
})
export class MembersListComponent implements OnInit {
  patientForm: FormGroup;
  maxDate = new Date();
  loading: boolean = false;
  patients = [];
  originalPatientsList = [];
  alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  selectedAlphabet: string = '';
  searchTerm: string = '';

  appointmentStatus = {
    PROPOSED: 'Proposed',
    PENDING: 'Pending',
    BOOKED: 'Booked',
    ARRIVED: 'Arrived',
    NOSHOW: 'No Show',
    ENTERED_IN_ERROR: 'Entered in Error',
    CHECKED_IN: 'Checked in',
    WAITLIST: 'Waitlist',
    NEW: 'New',
    ACTIVE: 'Active',
    UPCOMING: 'Upcoming',
    FULFILLED: 'Fulfilled',
    CANCELLED: 'Cancelled',
  };
  colorMap = {
    active: 'green-background',
    upcoming: 'purple-background',
    pending: 'yellow-background',
    cancelled: 'red-background',
    fulfilled: 'light-green-background',
    proposed: 'proposed-background-color',
    waitlist: 'waitlist-background-color',
    checked_in: 'checkedIn-background-color',
    arrived: 'arrived-background-color',
    noshow: 'noshow-background-color',
    booked: 'booked-background-color',
    entered_in_error: 'enteredInError-background-color',
    new: 'blue-background',
  };
  textColorMap = {
    active: 'text-white',
    upcoming: 'purple-color',
    pending: 'yellow-color',
    cancelled: 'red-color',
    fulfilled: 'green-color',
    proposed: 'proposed-text-color',
    waitlist: 'waitlist-text-color',
    checked_in: 'checkedIn-text-color',
    arrived: 'arrived-text-color',
    noshow: 'noshow-text-color',
    booked: 'booked-text-color',
    entered_in_error: 'enteredInError-text-color',
    new: 'text-white',
  };

  startDate: string = '';
  endDate: string = '';

  showFilter: boolean = false;

  checkClinicConsultation: boolean = false;
  checkVirtualConsultation: boolean = false;

  checkConfirmedStatus: boolean = false;
  checkCanceledStatus: boolean = false;
  checkRescheduleStatus: boolean = false;

  showRowList: boolean = false;
  rowDataList = [
    { id: 1, value: '5' },
    { id: 2, value: '10' },
    { id: 3, value: '20' },
    { id: 4, value: '30' },
    { id: 5, value: '50' },
    { id: 6, value: '100' },
  ];
  rowFieldWidth = '';
  rowValue: string = '10';

  totalPatient: any;
  selectedPage: number = 1;
  numberOfPages = [];

  leftValue: number = 1;
  rightValue: number = 10;

  constructor(
    private stateService: StateService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private httpLink: HttpLink,
    private spinner: NgxSpinnerService,
    private graphqlService: GraphqlService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.startService();
    this.initPatientForm();
    this.getPatients({
      doctorId: '1408',
      clinicId: '572',
      // doctorId: this.stateService.doctorProfile$?.doctorId,
      // clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: '',
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: 0,
        perPage: 10,
      },
    });
  }

  get isUserNurse() {
    return (
      this.stateService?.doctorProfile$?.staffType?.toLowerCase() === 'nurse'
    );
  }

  startService() {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      this.spinner.hide();
      if (graphQLErrors) {
        this.toastr.error(graphQLErrors[0].message);
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
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
      link: link,
    });
  }

  mutateService(mutatation, callback) {
    this.spinner.show();
    this.apollo.mutate(mutatation).subscribe((result: any) => callback(result));
  }

  queryService(query, callback) {
    this.spinner.show();
    this.apollo
      .watchQuery(query)
      .valueChanges.subscribe((result: any) => callback(result));
  }

  getAvatarURL(userData) {
    return `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=4FB389&color=fff`;
  }

  selectAlphabet(val) {
    this.selectedAlphabet = val;
    this.searchTerm = '';
    // this.patientForm.get('endDate').setValue('');
    // this.patientForm.get('startDate').setValue('');
    this.filterRefresh();
    if (val === '') {
      this.patientForm.get('endDate').setValue('');
      this.patientForm.get('startDate').setValue('');
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: '',
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
    } else {
      this.rowValue = '10';
      this.leftValue = 1;
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: '',
        patientNamePrefix: val,
        fromDate:
          this.patientForm.get('startDate').value &&
            this.patientForm.get('endDate').value
            ? moment(this.patientForm.get('startDate').value).format(
              'YYYY-MM-DD'
            )
            : undefined,
        toDate:
          this.patientForm.get('startDate').value &&
            this.patientForm.get('endDate').value
            ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
            : undefined,
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
    }
  }

  searchPatients(term) {
    this.selectedAlphabet = '';
    this.getPatients({
      doctorId: this.stateService.doctorProfile$?.doctorId,
      clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: term,
      fromDate:
        this.patientForm.get('startDate').value &&
          this.patientForm.get('endDate').value
          ? moment(this.patientForm.get('startDate').value).format('YYYY-MM-DD')
          : undefined,
      toDate:
        this.patientForm.get('startDate').value &&
          this.patientForm.get('endDate').value
          ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
          : undefined,
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: 0,
        perPage: 10,
      },
    });
    return [];
  }

  initPatientForm() {
    this.patientForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
  }

  setStartDate($event) {
    if (this.patientForm.get('endDate').value !== '') {
      // this.searchTerm = '';
      // this.selectedAlphabet = '';
      this.filterRefresh();
      this.rowValue = '10';
      this.leftValue = 1;
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        fromDate: moment(this.patientForm.get('startDate').value).format(
          'YYYY-MM-DD'
        ),
        toDate: moment(this.patientForm.get('endDate').value).format(
          'YYYY-MM-DD'
        ),
        searchTerm: this.searchTerm,
        patientNamePrefix: this.selectedAlphabet,
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
    }
  }

  setEndDate($event) {
    if (this.patientForm.get('startDate').value === '')
      this.toastr.error('Please select start date');
    else {
      // this.searchTerm = '';
      // this.selectedAlphabet = '';
      this.filterRefresh();
      this.rowValue = '10';
      this.leftValue = 1;
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        fromDate: moment(this.patientForm.get('startDate').value).format(
          'YYYY-MM-DD'
        ),
        toDate: moment(this.patientForm.get('endDate').value).format(
          'YYYY-MM-DD'
        ),
        searchTerm: this.searchTerm,
        patientNamePrefix: this.selectedAlphabet,
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
    }
  }

  getStartDateMaxDate() {
    if (this.patientForm.get('endDate').value !== '')
      return this.patientForm.get('endDate').value;
    return new Date();
  }

  getEndDateMinDate() {
    if (this.patientForm.get('startDate').value !== '')
      return this.patientForm.get('startDate').value;
  }

  openFilter() {
    this.showFilter = !this.showFilter;
  }

  filterRefresh() {
    this.checkClinicConsultation = false;
    this.checkVirtualConsultation = false;

    this.checkConfirmedStatus = false;
    this.checkCanceledStatus = false;
    this.checkRescheduleStatus = false;
  }

  reset() {
    this.filterRefresh();
    this.getPatients({
      doctorId: this.stateService.doctorProfile$?.doctorId,
      clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: '',
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: 0,
        perPage: 10,
      },
    });
    this.showFilter = false;
  }

  setFilter(item, val) {
    this[item] = !val;
  }

  close() {
    this.showFilter = false;
  }

  applyFilter() {
    this.showFilter = false;

    let appointmentMode = [];
    if (this.checkClinicConsultation) appointmentMode.push('clinic');
    if (this.checkVirtualConsultation) appointmentMode.push('virtual');

    let appointmentStatus = [];
    if (this.checkConfirmedStatus) appointmentStatus.push('FULFILLED');
    if (this.checkCanceledStatus) appointmentStatus.push('CANCELLED');
    if (this.checkRescheduleStatus) appointmentStatus.push('CHECKED_IN');

    this.getPatients({
      doctorId: this.stateService.doctorProfile$?.doctorId,
      clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: this.searchTerm,
      patientNamePrefix: this.selectedAlphabet,
      fromDate:
        this.patientForm.get('startDate').value !== ''
          ? moment(this.patientForm.get('startDate').value).format('YYYY-MM-DD')
          : undefined,
      toDate:
        this.patientForm.get('endDate').value !== ''
          ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
          : undefined,
      appointmentMode: appointmentMode.length > 0 ? appointmentMode : undefined,
      appointmentStatus:
        appointmentStatus.length > 0 ? appointmentStatus : undefined,
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: 0,
        perPage: 10,
      },
    });
  }

  openRowList() {
    let rowField = document.getElementById('rowField') as HTMLDivElement;
    let rowInputField = document.getElementById(
      'rowInputField'
    ) as HTMLInputElement;
    rowInputField.focus();
    this.rowFieldWidth = `${rowField.offsetWidth}px`;
    this.showRowList = true;
  }

  setRow($event) {
    let rowInputField = document.getElementById(
      'rowInputField'
    ) as HTMLInputElement;
    rowInputField.blur();
    this.rowValue = $event.value;
    let numberOfPages = this.totalPatient / parseInt(this.rowValue);
    this.numberOfPages = Array.from(
      { length: Math.ceil(numberOfPages) },
      () => 0
    );
    this.selectedPage = 1;

    let appointmentMode = [];
    if (this.checkClinicConsultation) appointmentMode.push('clinic');
    if (this.checkVirtualConsultation) appointmentMode.push('virtual');

    let appointmentStatus = [];
    if (this.checkConfirmedStatus) appointmentStatus.push('FULFILLED');
    if (this.checkCanceledStatus) appointmentStatus.push('CANCELLED');
    if (this.checkRescheduleStatus) appointmentStatus.push('CHECKED_IN');

    this.getPatients({
      doctorId: this.stateService.doctorProfile$?.doctorId,
      clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: this.searchTerm,
      patientNamePrefix: this.selectedAlphabet,
      fromDate:
        this.patientForm.get('startDate').value !== ''
          ? moment(this.patientForm.get('startDate').value).format('YYYY-MM-DD')
          : undefined,
      toDate:
        this.patientForm.get('endDate').value !== ''
          ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
          : undefined,
      appointmentMode: appointmentMode.length > 0 ? appointmentMode : undefined,
      appointmentStatus:
        appointmentStatus.length > 0 ? appointmentStatus : undefined,
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: 0,
        perPage: parseInt(this.rowValue),
      },
    });
    this.leftValue = 1;
    this.rightValue = parseInt(this.rowValue);
    this.showRowList = false;
  }

  selectPage(val) {
    this.selectedPage = val;
    this.leftValue = (val - 1) * parseInt(this.rowValue) + 1;

    let appointmentMode = [];
    if (this.checkClinicConsultation) appointmentMode.push('clinic');
    if (this.checkVirtualConsultation) appointmentMode.push('virtual');

    let appointmentStatus = [];
    if (this.checkConfirmedStatus) appointmentStatus.push('FULFILLED');
    if (this.checkCanceledStatus) appointmentStatus.push('CANCELLED');
    if (this.checkRescheduleStatus) appointmentStatus.push('CHECKED_IN');

    this.getPatients({
      doctorId: this.stateService.doctorProfile$?.doctorId,
      clinicId: this.stateService.selectedClinic$.clinicId,
      nurseId: this.isUserNurse ? this.stateService?.doctorProfile$?.id : null,
      searchTerm: this.searchTerm,
      patientNamePrefix: this.selectedAlphabet,
      fromDate:
        this.patientForm.get('startDate').value !== ''
          ? moment(this.patientForm.get('startDate').value).format('YYYY-MM-DD')
          : undefined,
      toDate:
        this.patientForm.get('endDate').value !== ''
          ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
          : undefined,
      appointmentMode: appointmentMode.length > 0 ? appointmentMode : undefined,
      appointmentStatus:
        appointmentStatus.length > 0 ? appointmentStatus : undefined,
      timeOffset: -new Date().getTimezoneOffset(),
      page: {
        pageNumber: val - 1,
        perPage: parseInt(this.rowValue),
      },
    });
  }

  backPage() {
    if (this.selectedPage > 1) {
      this.selectedPage = this.selectedPage - 1;
      this.leftValue = (this.selectedPage - 1) * parseInt(this.rowValue) + 1;

      let appointmentMode = [];
      if (this.checkClinicConsultation) appointmentMode.push('clinic');
      if (this.checkVirtualConsultation) appointmentMode.push('virtual');

      let appointmentStatus = [];
      if (this.checkConfirmedStatus) appointmentStatus.push('FULFILLED');
      if (this.checkCanceledStatus) appointmentStatus.push('CANCELLED');
      if (this.checkRescheduleStatus) appointmentStatus.push('CHECKED_IN');

      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: this.searchTerm,
        patientNamePrefix: this.selectedAlphabet,
        fromDate:
          this.patientForm.get('startDate').value !== ''
            ? moment(this.patientForm.get('startDate').value).format(
              'YYYY-MM-DD'
            )
            : undefined,
        toDate:
          this.patientForm.get('endDate').value !== ''
            ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
            : undefined,
        appointmentMode:
          appointmentMode.length > 0 ? appointmentMode : undefined,
        appointmentStatus:
          appointmentStatus.length > 0 ? appointmentStatus : undefined,
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: this.selectedPage - 1,
          perPage: parseInt(this.rowValue),
        },
      });
    }
  }

  forwardPage() {
    if (this.selectedPage < this.numberOfPages.length) {
      this.selectedPage = this.selectedPage + 1;
      this.leftValue = (this.selectedPage - 1) * parseInt(this.rowValue) + 1;

      let appointmentMode = [];
      if (this.checkClinicConsultation) appointmentMode.push('clinic');
      if (this.checkVirtualConsultation) appointmentMode.push('virtual');

      let appointmentStatus = [];
      if (this.checkConfirmedStatus) appointmentStatus.push('FULFILLED');
      if (this.checkCanceledStatus) appointmentStatus.push('CANCELLED');
      if (this.checkRescheduleStatus) appointmentStatus.push('CHECKED_IN');

      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: this.searchTerm,
        patientNamePrefix: this.selectedAlphabet,
        fromDate:
          this.patientForm.get('startDate').value !== ''
            ? moment(this.patientForm.get('startDate').value).format(
              'YYYY-MM-DD'
            )
            : undefined,
        toDate:
          this.patientForm.get('endDate').value !== ''
            ? moment(this.patientForm.get('endDate').value).format('YYYY-MM-DD')
            : undefined,
        appointmentMode:
          appointmentMode.length > 0 ? appointmentMode : undefined,
        appointmentStatus:
          appointmentStatus.length > 0 ? appointmentStatus : undefined,
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: this.selectedPage - 1,
          perPage: parseInt(this.rowValue),
        },
      });
    }
  }

  viewFile(appointment) {
    this.stateService.patientFile$ = appointment.patient;
    this.router.navigate(['/consultation', appointment.appointmentId], {
      queryParams: { myPatient: true },
    });
  }

  printBill(appointment) {
    this.stateService.patientFile$ = appointment.patient;
    this.router.navigate(['/consultation', appointment.appointmentId], {
      queryParams: { printBill: true, myPatient: true },
    });
  }

  getPatients(variables) {
    if (variables?.searchTerm !== '') {
      this.patientForm.get('endDate').setValue('');
      this.patientForm.get('startDate').setValue('');
      this.selectedAlphabet = '';
    }
    this.queryService(
      {
        query: GET_PATIENTS_BY_DOCTOR_ID,
        variables,
      },
      (result: any) => {
        this.spinner.hide();
        this.originalPatientsList =
          result.data.getPatientsByDoctorId.patientAppointments;
        this.patients = result.data.getPatientsByDoctorId.patientAppointments;
        this.totalPatient = result.data.getPatientsByDoctorId.count;
        let numberOfPages = this.totalPatient / parseInt(this.rowValue);
        this.numberOfPages = Array.from(
          { length: Math.ceil(numberOfPages) },
          () => 0
        );
        if (this.numberOfPages.length === variables?.page?.pageNumber + 1) {
          this.rightValue = this.totalPatient;
        } else {
          this.rightValue =
            variables?.page?.pageNumber * parseInt(this.rowValue) +
            parseInt(this.rowValue);
        }
      }
    );
  }

  getDOBAndGender({ dateOfBirth, gender }) {
    let str = '';
    if (dateOfBirth) {
      str += this.CalculateAge(dateOfBirth) + ' | ';
    }

    if (gender) {
      str += gender;
    }

    return str;
  }

  public CalculateAge(birthdate): string {
    const bdate = new Date(birthdate);
    const timeDiff = Math.abs(Date.now() - bdate.getTime());
    return `${Math.floor(timeDiff / (1000 * 3600 * 24) / 365)} Yrs`;
  }

  getClass({ triageCategory }) {
    const i = triageCategory ? triageCategory[1] : '3';
    return `${`h${i}-triage`}`;
  }

  getBillingClass({ billingStatus }) {
    return billingStatus?.toLowerCase() || 'unpaid';
  }

  getTriageCategory({ triageCategory }) {
    return triageCategory?.split('-')?.slice(0, -1)?.join('-')?.trim();
  }

  // registerNewPatient() {
  //   const modalRef = this.modalService.open(RegisterNewPatientComponent, {
  //     centered: true,
  //     backdrop: 'static',
  //     keyboard: false,
  //     size: 'xl',
  //   });
  //   modalRef.componentInstance.data = {
  //     that: this,
  //   };
  //   modalRef.result.then(
  //     (result) => {
  //       if (result != 'close') {
  //       }
  //     },
  //     (reason) => { }
  //   );
  // }

  async changeAppointmentStatus(appointmentId, appointmentStatus) {
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        mutation: CHANGE_APPOINTMENT_STATUS,
        variables: {
          appointmentId: appointmentId,
          appointmentStatus: appointmentStatus,
        },
      },
    });

    if (result.data.changeAppointmentStatus) {
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: '',
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
      this.toastr.success('Appointment Status Changed Successfully');
    }
  }

  async markAppointmentComplete(appointmentId) {
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        mutation: MARK_APPOINTMENT_COMPLETE,
        variables: {
          id: appointmentId,
        },
      },
    });

    if (result.data.markAppointmentComplete) {
      this.getPatients({
        doctorId: this.stateService.doctorProfile$?.doctorId,
        clinicId: this.stateService.selectedClinic$.clinicId,
        nurseId: this.isUserNurse
          ? this.stateService?.doctorProfile$?.id
          : null,
        searchTerm: '',
        timeOffset: -new Date().getTimezoneOffset(),
        page: {
          pageNumber: 0,
          perPage: 10,
        },
      });
      this.toastr.success('Appointment Status Changed Successfully');
    }
  }

  get pf() {
    return this.patientForm.controls;
  }

  searchGenericName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      map((term) => (term === '' ? [] : this.searchPatients(term)))
    );

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (
      document.getElementById('rowField') &&
      !document.getElementById('rowField').contains(event.target)
    ) {
      this.showRowList = false;
    }
  }

}
