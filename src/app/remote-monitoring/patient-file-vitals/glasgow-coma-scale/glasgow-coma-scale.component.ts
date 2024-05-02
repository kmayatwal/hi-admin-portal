import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../../../stateService';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MASTER_DATA, CREATE_GLASSGOW_COMMA_SCALE } from 'src/app/graphql.module';

@Component({
  selector: 'app-glasgow-coma-scale',
  templateUrl: './glasgow-coma-scale.component.html',
  styleUrls: ['./glasgow-coma-scale.component.scss']
})
export class GlasgowComaScaleComponent implements OnInit {

  @Input() data;

  eyeOpenging = [];
  verbalResponse = [];
  motorResponse = [];

  selectedEyeOpening: any;
  selectedVerbalResponse: any;
  selectedMotorResponse: any;
  glasgowCommaScale = 0;

  constructor(
    public stateService: StateService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.getEyeOpeningData();
    this.getVerbalData();
    this.getMotorData();
  }

  async getEyeOpeningData() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: MASTER_DATA,
        variables: {
          type: 'gcsEyeOpening'
        }
      }
    });
    if (result) {
      this.eyeOpenging = result.data.getMasterDataByType;
    }
  }

  async getVerbalData() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: MASTER_DATA,
        variables: {
          type: 'gcsVerbal'
        }
      }
    });
    if (result) {
      this.verbalResponse = result.data.getMasterDataByType;
    }
  }

  async getMotorData() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: MASTER_DATA,
        variables: {
          type: 'gcsMotor'
        }
      }
    });
    if (result) {
      this.motorResponse = result.data.getMasterDataByType;
    }
  }

  get getColorStyle() {
    if (this.glasgowCommaScale >= 13) {
      return "box-mild";
    } else if (this.glasgowCommaScale >= 9) {
      return "box-Moderate";
    } else if (this.glasgowCommaScale >= 3) {
      return "box-severe";
    } else {
      return "box-severe";
    }
  }

  setEyeOpening(item) {
    this.selectedEyeOpening = item;
    this.setGlasgowCommaScale();
  }

  setVerbalResponse(item) {
    this.selectedVerbalResponse = item;
    this.setGlasgowCommaScale();
  }

  setMotorResponse(item) {
    this.selectedMotorResponse = item;
    this.setGlasgowCommaScale();
  }

  setGlasgowCommaScale() {
    this.glasgowCommaScale = 0;
    this.glasgowCommaScale += this.selectedEyeOpening ? parseInt(this.selectedEyeOpening.description) : 0;
    this.glasgowCommaScale += this.selectedVerbalResponse ? parseInt(this.selectedVerbalResponse.description) : 0;
    this.glasgowCommaScale += this.selectedMotorResponse ? parseInt(this.selectedMotorResponse.description) : 0;
  }

  async saveGlasgowScale() {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        mutation: CREATE_GLASSGOW_COMMA_SCALE,
        variables: {
          clinicalAssessmentId: this.stateService.clinicAssessment$.id,
          patientId: this.stateService.appointment$.patientId,
          content: {
            eyeOpeningScore: this.selectedEyeOpening ? parseInt(this.selectedEyeOpening.description) : 0,
            verbalScore: this.selectedVerbalResponse ? parseInt(this.selectedVerbalResponse.description) : 0,
            motorScore: this.selectedMotorResponse ? parseInt(this.selectedMotorResponse.description) : 0
          }
        }
      }
    });
    if (result.data.createGlassGowComaScale) {
      this.close();
    }
  }

  close() {
    this.data.getGlassgowScale();
    this.activeModal.close();
  }
}
