import { Component, OnInit } from '@angular/core';
import { StateService } from '../../stateService';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { GET_REMOTE_MONITORING_BY_ID, GET_CARE_TEAM_BY_ID, CANCEL_REMOTE_MONITORING, GET_REMOTE_MONITORING_NOTES, GET_APPOINTMENT_BY_ID } from 'src/app/graphql.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RemoteMonitoringAddNotesComponent } from './../../remote-monitoring/remote-monitoring-add-notes/remote-monitoring-add-notes.component';
// import { CreateRemoteMonitoringComponent } from 'src/app/profile/remote-monitoring/create-remote-monitoring/create-remote-monitoring.component';
import { cloneDeep } from 'lodash';
import { HealthMetricsSetTargetComponent } from '../health-metrics-set-target/health-metrics-set-target.component';

@Component({
  selector: 'app-remote-monitoring-subscription-plan',
  templateUrl: './remote-monitoring-subscription-plan.component.html',
  styleUrls: ['../../common.style.scss', './remote-monitoring-subscription-plan.component.scss',]
})
export class MonitoringPlanComponent implements OnInit {

  public sidebarMenuOpened = false;
  patientFile: any;
  patientId = '';
  dataLoaded = false;
  remoteMonitoringData: any;
  careTeamAssigneesArray = [];
  htmlContent = '';
  textColorMap = {
    'pending': 'yellow-color',
    'canceled': 'red-color',
    'completed': 'green-color',
    'active': 'text-white',
    'expired': 'red-color',
  };
  colorMap = {
    'active': 'green-background',
    'pending': 'yellow-background',
    'completed': 'light-green-background',
    'canceled': 'red-background',
    'expired': 'red-background',
  };
  remoteMonitoringNotes = [];

  constructor(
    public stateService: StateService,
    private activeRouter: ActivatedRoute,
    private graphqlService: GraphqlService,
    private router: Router,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.patientId = this.activeRouter.snapshot.queryParamMap.get('patientId');
    this.getRemoteMonitoringById();
  }

  private async loadAppointmentById(id: string) {

    const result: any = await this.graphqlService.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_APPOINTMENT_BY_ID,
        variables: {
          id,
          timeOffset: -(new Date().getTimezoneOffset()),
        },
      },
    });
    return result.data?.getAppointment;
  }

  toggleMenuSidebar() {
    this.sidebarMenuOpened = !this.sidebarMenuOpened;
  }

  setPatientFile(patientData) {
    this.patientFile = patientData;
  }
  getFileName(url: string) {
    return decodeURIComponent(url).replace(/^.*[\\\/]\d+-/, '');
  }
  get rmEmergencyContacts() {
    return this.remoteMonitoringData?.rmEmergencyContacts || [];
  }

  get relevantMedicalInfoPresent() {
    return this.remoteMonitoringData.rmEmergencyResponse?.relevantMedicalInfo[0]?.length > 0;
  }

  get isAppointmentAvailable() {
    return this.stateService.appointment$;
  }

  isRelevantMedicalInfoSelected(item) {
    const { relevantMedicalInfo = [] } = this.remoteMonitoringData.rmEmergencyResponse;
    return relevantMedicalInfo[0]?.split(', ').indexOf(item) >= 0;
  }
  async getRemoteMonitoringById() {
    const id = this.activeRouter?.snapshot?.params?.id;
    this.dataLoaded = false;
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        query: GET_REMOTE_MONITORING_BY_ID,
        variables: {
          id,
          timeOffset: -(new Date().getTimezoneOffset()),
        },
      },
    });
    if (result.data.getRemoteMonitoring) {
      this.remoteMonitoringData = cloneDeep(result.data.getRemoteMonitoring);
      this.remoteMonitoringData['timeOffset'] = -(new Date().getTimezoneOffset());
      this.htmlContent = this.remoteMonitoringData.rmEmergencyResponse?.protocols;
      this.dataLoaded = true;
      this.careTeamByUserIds(this.remoteMonitoringData);
      this.getRemoteMonitoringNotes();
      console.log(this.remoteMonitoringData);
      if (!this.stateService?.appointment$) {
        const appointmentId = this.remoteMonitoringData?.patient?.latestPatientAssessment?.appointmentId;
        this.stateService.appointment$ = await this.loadAppointmentById(appointmentId);
      }
    }
  }
  get docUrls() {
    return this.remoteMonitoringData?.urls?.length ? this.remoteMonitoringData?.urls?.split(',') : [];
  }
  get planAmount() {
    const { totalAmount, currencyCode, planAmount } = this.remoteMonitoringData.rmPricings[0] || {};
    return planAmount ? `${currencyCode}${totalAmount || planAmount}` : 'Free';
  }
  get allCareTeamName() {
    let allCareTeamNameString = '';
    this.careTeamAssigneesArray.forEach((item, index) => allCareTeamNameString += `${index > 0 ? ', ' : ''}${this.careTeamName(item)} `);

    return allCareTeamNameString || '-';
  }
  get rmHealthTrackers() {
    const { rmHealthTrackers } = this.remoteMonitoringData;
    const convertedArray = rmHealthTrackers.reduce((acc, current) => {
      const existingEntry = acc.find(item => item.vitalName === current.vitalName);
      if (existingEntry) {
        existingEntry.time += `, ${format(new Date(`Jan 1 2000 ${current.time}`), 'hh:mm aa')}`;
      } else {
        acc.push({
          vitalName: current.vitalName,
          time: format(new Date(`Jan 1 2000 ${current.time}`), 'hh:mm aa')
        });
      }
      return acc;
    }, []);

    return convertedArray;
  }
  getReadingFrequency(time) {
    return `${this.formatTime(time)} times in a day`;
  }

  formatTime(timeString) {
    const timeArray = timeString.split(' ');
    const formattedTimeArray = [];
    for (let i = 0; i < timeArray.length; i += 2) {
      const time = timeArray[i] + ' ' + timeArray[i + 1];
      formattedTimeArray.push(time);
    }

    return formattedTimeArray.length;
  }
  careTeamByUserIds({ careTeamAssignIds }) {
    if (careTeamAssignIds?.length) {
      this.getCareTeamByUserIds(careTeamAssignIds.split(', '));
    }
  }
  careTeamName({ title, firstName }) {
    return `${title} ${firstName}`
  }
  private async getCareTeamByUserIds(careTeamAssignees) {
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        query: GET_CARE_TEAM_BY_ID,
        variables: {
          userIds: careTeamAssignees
        },
      },
    });
    if (result.data.careTeamByUserIds) {
      this.careTeamAssigneesArray = result.data.careTeamByUserIds;
    }
  }

  async getRemoteMonitoringNotes() {
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        query: GET_REMOTE_MONITORING_NOTES,
        variables: {
          rmId: this.remoteMonitoringData.id
        },
      },
    });
    if (result.data.getRemoteMonitoringNotes) {
      this.remoteMonitoringNotes = result.data.getRemoteMonitoringNotes;
    }
  }

  async cancelRemoteMonitoring() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        mutation: CANCEL_REMOTE_MONITORING,
        variables: {
          id: this.remoteMonitoringData.id
        }
      }
    });
    if (result.data.cancelRemoteMonitoring) {
      this.toastr.success('Remote Monitoring Subscription Program cancelled successfully');
      this.router.navigate(['profile/remote-monitoring']);
    }
  }

  openRemoteMonitoring() {
    const modalRef = this.modalService.open(RemoteMonitoringAddNotesComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.data = {
      that: this,
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  openRemoteMonitoringEditFlow() {
    // const modalRef = this.modalService.open(CreateRemoteMonitoringComponent, { centered: true, backdrop: 'static', keyboard: false, windowClass: 'mod-class' });
    // modalRef.componentInstance.data = {
    //   that: this,
    //   remoteMonitoringData: this.remoteMonitoringData
    // };
    // modalRef.result.then((result) => {
    //   if (result != 'close') {
    //   }
    // }, (reason) => {
    // });
  }

  openSetTarget() {
    const modalRef = this.modalService.open(HealthMetricsSetTargetComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.data = {
      that: this,
      remoteMonitoringData: this.remoteMonitoringData
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }
}
