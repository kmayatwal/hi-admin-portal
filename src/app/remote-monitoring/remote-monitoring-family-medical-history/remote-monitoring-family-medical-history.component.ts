import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../stateService';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { GET_ALL_FAMILY_MEDICAL_HISTORY } from 'src/app/graphql.module';

@Component({
  selector: 'app-remote-monitoring-family-medical-history',
  templateUrl: './remote-monitoring-family-medical-history.component.html',
  styleUrls: ['./remote-monitoring-family-medical-history.component.scss']
})
export class RemoteMonitoringFamilyMedicalHistoryComponent implements OnInit {

  patientFMHList = [];

  constructor(
    private stateService: StateService,
    private activeRouter: ActivatedRoute,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.getPatientFMH();
  }

  async getPatientFMH() {
    console.log('thi si this.patientFMHList  API call', this.stateService);
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_ALL_FAMILY_MEDICAL_HISTORY,
        variables: {
          patientId: this.activeRouter.snapshot.queryParamMap.get('id') || this.activeRouter.snapshot.queryParamMap.get('patientId'),
          doctorId: this.stateService.doctorProfile$.doctorId,
          page: {
            pageNumber: 1,
            perPage: 50
          }
        }
      },
    });
    console.log('this is getPatientMedicalCondition', result);
    if (result) {
      this.patientFMHList = result.data.getPatientClinicalAssessmentFamilyMedicalHistory;
      console.log('this is this.patientFMHList', this.patientFMHList);
    }
  }

  getName(userData) {
    const { title, firstName, lastName } = userData;
    return `${title ?? ''} ${firstName ?? ''} ${lastName ?? ''}`.replace(/\s+/g, ' ').trim();
  }

}
