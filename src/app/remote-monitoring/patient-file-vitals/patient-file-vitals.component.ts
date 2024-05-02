import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apollo } from 'apollo-angular';
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { getBaseURL, MASTER_DATA, GET_VITAL_LETEST_READTING, GET_CURRENT_PATIENT_WEIGHT, GET_CURRENT_PATIENT_HEIGHT, GET_GLASSGOW_COMMA_SCALE } from 'src/app/graphql.module';
import { differenceInDays } from 'date-fns';
import { StateService } from '../../stateService';
import { AddVitalComponent } from '../add-vital/add-vital.component';
import { VitalGraphComponent } from '../vital-graph/vital-graph.component';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import moment from 'moment-timezone';
import {
  VitalBloodPressureRules,
  VitalBloodOxygenRules,
  VitalBloodSugerHbA1CRules,
  VitalPulseRules,

  VitalFahrenheitTempratureRules,
  VitalCelsiusTempratureRules,
  VitalRespiratoryRate2Rules,
  VitalBloodSugermgdLRules,
  VitalBloodSugermmolRules
} from 'src/app/chart/vital-rules';
import { GlasgowComaScaleComponent } from './glasgow-coma-scale/glasgow-coma-scale.component';

@Component({
  selector: 'app-patient-file-vitals',
  templateUrl: './patient-file-vitals.component.html',
  styleUrls: ['./patient-file-vitals.component.scss']
})
export class PatientFileVitalsComponent implements OnInit {

  @Input('patientId') patientId: number;
  @Input('patientFile') patientFile: any;
  @Input('page') page: string = '';
  @Input('comesFrom') comesFrom: string = '';

  patientWeight: any;
  patientHeight: any;
  temperature_data: any;
  pulse_data: any;
  blood_pressure_data: any;
  blood_oxygen_data: any;
  respiratory_rate_data: any;
  blood_glucose_data: any;
  headCircumference: any;
  boneMass: any;
  hydration: any;
  bloodGroup: any;
  height: any;
  weight: any;
  bmi: string = '';
  bmiCategory: string = '';
  bmiBgColor: string = '';
  bmiTxtColor: string = '';
  todayDate = new Date();

  patient_data: any;
  vitalIds: any;
  lastUpdatedDate: any;

  glasgowCommaScale: any;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private apollo: Apollo,
    private httpLink: HttpLink,
    private stateService: StateService,
    private graphqlService: GraphqlService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.patientFile = this.stateService.patientFile$;
    if (changes?.patientFile?.currentValue !== changes?.patientFile?.previousValue) {
      this.patientFile = changes.patientFile.currentValue;
    }
  }

  ngOnInit(): void {
    // this.getPatientWeight();
    // this.getPatientHeight();
    this.startService();
    this.getVitalId();
    this.getGlassgowScale();
  }

  get isAppointmentCompleted() {
    return this.page === 'complete-encounter';
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

  getLastUpdatedDay(val) {
    return differenceInDays(
      new Date(),
      new Date(val)
    );
  }

  // getPatientHeight() {
  //   const errorLink = onError(({ graphQLErrors, networkError }) => {
  //     this.spinner.hide();
  //     if (graphQLErrors) {
  //       this.toastr.error(graphQLErrors[0].message);
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //         ),
  //       );
  //     }

  //     if (networkError) {
  //       this.toastr.error(networkError.message);
  //       console.log(`[Network error]: ${networkError}`);
  //     }
  //   });

  //   const httpLink = this.httpLink.create({
  //     uri: getBaseURL(),
  //   });
  //   const link = ApolloLink.from([errorLink, httpLink]);

  //   this.apollo.removeClient();
  //   this.apollo.create({
  //     cache: new InMemoryCache(),
  //     link: link
  //   });

  //   this.spinner.show();
  //   this.apollo
  //     .watchQuery({
  //       query: GET_CURRENT_PATIENT_HEIGHT,
  //       variables: {
  //         patientId: this.patientId
  //       }
  //     }).valueChanges.subscribe((result: any) => {
  //       this.spinner.hide();
  //       this.patientHeight = result.data.getPatientCurrentHeight;
  //     });
  // }

  // getPatientWeight() {
  //   const errorLink = onError(({ graphQLErrors, networkError }) => {
  //     this.spinner.hide();
  //     if (graphQLErrors) {
  //       this.toastr.error(graphQLErrors[0].message);
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
  //         ),
  //       );
  //     }

  //     if (networkError) {
  //       this.toastr.error(networkError.message);
  //       console.log(`[Network error]: ${networkError}`);
  //     }
  //   });

  //   const httpLink = this.httpLink.create({
  //     uri: getBaseURL(),
  //   });
  //   const link = ApolloLink.from([errorLink, httpLink]);

  //   this.apollo.removeClient();
  //   this.apollo.create({
  //     cache: new InMemoryCache(),
  //     link: link
  //   });

  //   this.spinner.show();
  //   this.apollo
  //     .watchQuery({
  //       query: GET_CURRENT_PATIENT_WEIGHT,
  //       variables: {
  //         patientId: this.patientId
  //       }
  //     }).valueChanges.subscribe((result: any) => {
  //       this.spinner.hide();
  //       this.patientWeight = result.data.getPatientCurrentWeight;
  //     });
  // }

  get isAppointmentCancelled() {
    return this.stateService.appointment$?.status === 'cancelled';
  }

  get isCompleted() {
    return this.stateService.appointment$?.isCompleted;
  }

  getVitalId() {
    this.queryService(
      {
        query: MASTER_DATA,
        variables: {
          type: 'vitals'
        }
      },
      (result: any) => {
        this.spinner.hide();
        this.vitalIds = {
          'temperature': result?.data?.getMasterDataByType.find(ele => ele.name === 'Temperature'), //--
          'headCircumference': result?.data?.getMasterDataByType.find(ele => ele.name === 'Head Circumference'), //--
          'boneMass': result?.data?.getMasterDataByType.find(ele => ele.name === 'Bone Mass'), //--
          'hydration': result?.data?.getMasterDataByType.find(ele => ele.name === 'Hydration'), //--
          'height': result?.data?.getMasterDataByType.find(ele => ele.name === 'Height'), //--
          'weight': result?.data?.getMasterDataByType.find(ele => ele.name === 'Weight'), //--
          'bloodGroup': result?.data?.getMasterDataByType.find(ele => ele.name === 'Blood Group'), //--
          'pulse': result?.data?.getMasterDataByType.find(ele => ele.name === 'Pulse'), //--
          'bloodPressure': result?.data?.getMasterDataByType.find(ele => ele.name === 'Blood Pressure'), //--
          'bloodOxygen': result?.data?.getMasterDataByType.find(ele => ele.name === 'Blood oxygen'), //--
          'respiratoryRate': result?.data?.getMasterDataByType.find(ele => ele.name === 'Respiratory rate'), //--
          'bloodSugar': result?.data?.getMasterDataByType.find(ele => ele.name === 'Blood sugar'), //--
          'hba1c': result?.data?.getMasterDataByType.find(ele => ele.name === 'Hba1c'),
        }
        this.stateService.vitalIds$ = this.vitalIds;
        this.getVitals();
        this.getHWBVitals();
      }
    );
  }

  getHWBVitals() {
    if (this.comesFrom === 'remote-monitoring')
      return;
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
      cache: new InMemoryCache(),
      link: link
    });

    this.spinner.show();
    this.apollo
      .watchQuery({
        query: GET_VITAL_LETEST_READTING,
        variables: {
          patientId: this.patientId
        }
      }).valueChanges.subscribe((result: any) => {
        this.spinner.hide();
        let tempData = result.data.getLatestReadings;
        this.bloodGroup = tempData.find((item) => item.vitalId === this.vitalIds['bloodGroup']?.id);
        this.height = tempData.find((item) => item.vitalId === this.vitalIds['height']?.id);
        this.weight = tempData.find((item) => item.vitalId === this.vitalIds['weight']?.id);
        if (this.height && this.weight) {
          const { bmi, classification, bgColor, txtColor } = this.calculateBMI(this.height?.value, this.weight?.value, this.height?.uom, this.weight?.uom);
          this.bmi = bmi;
          this.bmiCategory = classification;
          this.bmiBgColor = bgColor;
          this.bmiTxtColor = txtColor;
        }
      });
  }

  calculateBMI(height, weight, heightUnit, weightUnit) {
    // Define conversion factors for different units
    const heightFactors = {
      'cm': 1,
      'feet': 30.48,  // 1 foot = 30.48 cm
      'in': 2.54,   // 1 inch = 2.54 cm
    };

    const weightFactors = {
      'kg': 1,
      'lbs': 0.453592,  // 1 lb = 0.453592 kg
    };

    // Convert height and weight to metric units (cm and kg)
    const heightInCm = height * heightFactors[heightUnit];
    const weightInKg = weight * weightFactors[weightUnit];

    // Calculate BMI
    const bmi = (weightInKg / Math.pow(heightInCm / 100, 2));

    const formattedBMI = bmi.toFixed(2); // Format BMI to display two decimal places

    let classification;
    let bgColor;
    let txtColor;

    if (bmi < 18.5) {
      classification = 'Underweight';
      bgColor = 'border-left-moderate';
      txtColor = 'value-color-moderate';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      classification = 'Healthy Weight';
      bgColor = 'border-left-mild';
      txtColor = 'value-color-mild';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      classification = 'Overweight';
      bgColor = 'border-left-moderate';
      txtColor = 'value-color-moderate';
    } else {
      classification = 'Obese';
      bgColor = 'border-left-Severe';
      txtColor = 'value-color-Severe';
    }

    return {
      bmi: formattedBMI,
      classification,
      bgColor,
      txtColor
    };
  }

  getVitals() {
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
      cache: new InMemoryCache(),
      link: link
    });

    this.spinner.show();
    this.apollo
      .watchQuery({
        query: GET_VITAL_LETEST_READTING,
        variables: {
          patientId: this.patientId,
          appointmentId: this.comesFrom === 'remote-monitoring' ? undefined : this.stateService.appointment$.id
        }
      }).valueChanges.subscribe((result: any) => {
        this.spinner.hide();
        let tempData = result.data.getLatestReadings;
        const updatedAt = tempData?.map(({ updatedAt }) => new Date(updatedAt));
        const maxDate = new Date(Math.max.apply(null, updatedAt));

        this.lastUpdatedDate = updatedAt.length ? maxDate : null;
        const patientAge = moment().diff(this.stateService.appointment$.patient.dateOfBirth, 'years') || 1;

        this.temperature_data = tempData.find((item) => item.vitalId === this.vitalIds['temperature']?.id);
        if (this.temperature_data) {
          let obj = {
            name: 'Temperature',
            unit: this.temperature_data.uom,
            value: this.temperature_data.value,
            uom: this.temperature_data.uom,
            readingDate: this.temperature_data.readingDate
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.temperature_data = { ...obj, ...tempColorObj };
        }

        this.pulse_data = tempData.find((item) => item.vitalId === this.vitalIds['pulse']?.id);
        if (this.pulse_data) {
          let obj = {
            name: 'Pulse',
            unit: this.pulse_data.uom,
            value: this.pulse_data.value,
            uom: this.pulse_data.uom,
            readingDate: this.pulse_data.readingDate
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.pulse_data = { ...obj, ...tempColorObj };
        }

        this.blood_pressure_data = tempData.find((item) => item.vitalId === this.vitalIds['bloodPressure']?.id);
        if (this.blood_pressure_data) {
          let obj = {
            name: 'Blood Pressure',
            unit: this.blood_pressure_data.uom,
            value: this.blood_pressure_data.value,
            uom: this.blood_pressure_data.uom,
            readingDate: this.blood_pressure_data.readingDate
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.blood_pressure_data = { ...obj, ...tempColorObj };
        }

        this.blood_glucose_data = tempData.find((item) => item.vitalId === this.vitalIds['bloodSugar']?.id);
        if (this.blood_glucose_data) {
          let obj = {
            name: 'Blood Sugar',
            unit: this.blood_glucose_data.uom,
            value: this.blood_glucose_data.value,
            uom: this.blood_glucose_data.uom,
            readingDate: this.blood_glucose_data.readingDate,
            mealPreference: this.blood_glucose_data.additionalInfo?.mealTiming || 'not set'
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.blood_glucose_data = { ...obj, ...tempColorObj };
        }

        this.respiratory_rate_data = tempData.find((item) => item.vitalId === this.vitalIds['respiratoryRate']?.id);
        if (this.respiratory_rate_data) {
          let obj = {
            name: 'Respiratory Rate',
            unit: this.respiratory_rate_data.uom,
            value: this.respiratory_rate_data.value,
            uom: this.respiratory_rate_data.uom,
            readingDate: this.respiratory_rate_data.readingDate
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.respiratory_rate_data = { ...obj, ...tempColorObj };
        }

        this.blood_oxygen_data = tempData.find((item) => item.vitalId === this.vitalIds['bloodOxygen']?.id);
        if (this.blood_oxygen_data) {
          let obj = {
            name: 'Blood Oxygen',
            unit: this.blood_oxygen_data.uom,
            value: this.blood_oxygen_data.value,
            uom: this.blood_oxygen_data.uom,
            readingDate: this.blood_oxygen_data.readingDate
          };
          let tempColorObj = this.vitalFormatting(patientAge, obj);
          this.blood_oxygen_data = { ...obj, ...tempColorObj };
        }

        this.headCircumference = tempData.find((item) => item.vitalId === this.vitalIds['headCircumference']?.id);
        this.boneMass = tempData.find((item) => item.vitalId === this.vitalIds['boneMass']?.id);
        this.hydration = tempData.find((item) => item.vitalId === this.vitalIds['hydration']?.id);

        if (this.comesFrom === 'remote-monitoring') {
          this.bloodGroup = tempData.find((item) => item.vitalId === this.vitalIds['bloodGroup']?.id);
          this.height = tempData.find((item) => item.vitalId === this.vitalIds['height']?.id);
          this.weight = tempData.find((item) => item.vitalId === this.vitalIds['weight']?.id);
        }
      });
  }

  recordVital() {
    const modalRef = this.modalService.open(AddVitalComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.data = {
      that: this,
      comesFrom: this.comesFrom === 'remote-monitoring' ? this.comesFrom : 'File Vitals'
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  openGraph(type) {
    this.patient_data = this.stateService.appointment$?.patient;
    const modalRef = this.modalService.open(VitalGraphComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.data = {
      that: this,
      graph: type
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  vitalFormatting(age, vital) {
    if (vital.name === 'Pulse') {
      const rule = new VitalPulseRules(Number(age));

      return this.getVitalFormatting(rule, (vital.value * 1));
    }
    if (vital.name === 'Blood Pressure' && vital.value) {
      const vitalBloodPressureRulesS = new VitalBloodPressureRules('systolic');
      const vitalBloodPressureRulesD = new VitalBloodPressureRules('diastoloc');
      const range = this.getVitalFormatting(vitalBloodPressureRulesS, vital.value?.split('/')[0])?.range;
      const range1 = this.getVitalFormatting(vitalBloodPressureRulesD, vital.value?.split('/')[1])?.range;

      if (range === 'normal' && range1 === 'normal') {
        return { color: '#51BE98', range: 'normal', background: '#34C38F40', border: '5px solid #51BE98' };
      }
      if ((range === 'normal' && range1 === 'risk') || (range === 'risk' && range1 === 'normal') || (range === 'risk' && range1 === 'risk')) {
        return { color: '#EEB300', range: 'risk', background: '#FFF6EB', border: '5px solid #EEB300' };
      }
      if ((range === 'normal' && range1 === 'emergency') || (range === 'emergency' && range1 === 'normal') || (range === 'emergency' && range1 === 'emergency')) {
        return { color: '#FF0000', range: 'emergency', background: '#EE686840', border: '5px solid #FF0000' };
      }
      if ((range === 'risk' && range1 === 'emergency') || (range === 'emergency' && range1 === 'risk')) {
        return { color: '#FF0000', range: 'emergency', background: '#EE686840', border: '5px solid #FF0000' };
      }
      return { color: '#51BE98', range: 'normal', background: '#34C38F40', border: '5px solid #51BE98' };
    }
    if (vital.name === 'Temperature') {
      return this.getVitalFormatting((vital.unit === '°Fahrenheit' || vital.unit === '°F') ? new VitalFahrenheitTempratureRules() : new VitalCelsiusTempratureRules(), (vital.value * 1));
    }
    if (vital.name === 'Blood Sugar') { // && this.bloodGlucoseReadingType !== 'HbA1C'
      return this.getVitalFormatting(vital.unit === 'mg/dL' ? new VitalBloodSugermgdLRules(vital.mealPreference) : new VitalBloodSugermmolRules(vital.mealPreference), (vital.value * 1));
    }
    if (vital.name === 'Blood Oxygen') {
      const rule = new VitalBloodOxygenRules();

      return this.getVitalFormatting(rule, vital.value);
    }
    if (vital.name === 'Respiratory Rate') {
      const rule = new VitalRespiratoryRate2Rules();

      return this.getVitalFormatting(rule, vital.value);
    }
    if (vital.name === 'Hba1c') { // || this.bloodGlucoseReadingType === 'HbA1C'
      const rule = new VitalBloodSugerHbA1CRules();

      return this.getVitalFormatting(rule, vital.value);
    }
    return null;
  }

  private getVitalFormatting(rule, value) {
    if (rule?.isNormal(value)) return { color: '#51BE98', range: 'normal', background: '#EAF7F6', border: '5px solid #51BE98' };
    else if (rule?.isRisk(value)) return { color: '#EEB300', range: 'risk', background: '#FFF6EB', border: '5px solid #EEB300' };
    else if (rule?.isEmergency(value)) return { color: '#FF0000', range: 'emergency', background: '#FBF2F2', border: '5px solid #FF0000' };
    return null;
  }

  addGlasgowComaScale() {
    const modalRef = this.modalService.open(GlasgowComaScaleComponent, { centered: true, backdrop: 'static', keyboard: false, windowClass: 'glasgow-coma-scale-width' });
    modalRef.componentInstance.data = this;
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  async getGlassgowScale() {
    if (!this.stateService.clinicAssessment$?.id) return;
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_GLASSGOW_COMMA_SCALE,
        variables: {
          clinicalAssessmentId: this.stateService.clinicAssessment$.id,
        }
      }
    });
    if (result.data.getGlassGowComaScale) {
      this.glasgowCommaScale = result.data.getGlassGowComaScale;
      console.log('this is result.data.getGlassGowComaScale', result);
    }
  }

  get getGalsgowCommaScaleColor() {
    if (this.glasgowCommaScale?.gcsTotalScore >= 13) {
      return "#34c38f";
    } else if (this.glasgowCommaScale?.gcsTotalScore >= 9) {
      return "#fca600";
    } else if (this.glasgowCommaScale?.gcsTotalScore >= 3) {
      return "#f46a6a";
    } else {
      return "";
    }
  }

}
