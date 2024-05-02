import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../stateService';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { GET_PATIENT_ALLERGY } from 'src/app/graphql.module';

@Component({
  selector: 'app-remote-monitoring-allergy',
  templateUrl: './remote-monitoring-allergy.component.html',
  styleUrls: ['./remote-monitoring-allergy.component.scss']
})
export class RemoteMonitoringAllergyComponent implements OnInit {
  patientAllergiesList = [];

  constructor(
    private stateService: StateService,
    private activeRouter: ActivatedRoute,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.getAllergies();
  }

  async getAllergies() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_PATIENT_ALLERGY,
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
    if (result) {
      this.patientAllergiesList = result.data.getPatientClinicalAssessmentAllergies;
    }
  }

  getName(userData) {
    const { title, firstName, lastName } = userData;
    return `${title ?? ''} ${firstName ?? ''} ${lastName ?? ''}`.replace(/\s+/g, ' ').trim();
  }

}
