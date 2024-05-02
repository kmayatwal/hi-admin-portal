import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../stateService';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { GET_ALL_HEALTH_CONDITIONS } from 'src/app/graphql.module';

@Component({
  selector: 'app-remote-monitoring-medical-condition',
  templateUrl: './remote-monitoring-medical-condition.component.html',
  styleUrls: ['./remote-monitoring-medical-condition.component.scss']
})
export class RemoteMonitoringMedicalConditionComponent implements OnInit {

  patientMedicalConditionList = [];

  constructor(
    private stateService: StateService,
    private activeRouter: ActivatedRoute,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.getPatientMedicalCondition();
  }

  async getPatientMedicalCondition() {
    console.log('thi si this.patientMedicalConditionList  API call', this.stateService);
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_ALL_HEALTH_CONDITIONS,
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
      this.patientMedicalConditionList = result.data.getAllConditionByPatient;
      console.log('this is this.patientMedicalConditionList', this.patientMedicalConditionList);
    }
  }

  getName(userData) {
    const { title, firstName, lastName } = userData;
    return `${title ?? ''} ${firstName ?? ''} ${lastName ?? ''}`.replace(/\s+/g, ' ').trim();
  }

}
