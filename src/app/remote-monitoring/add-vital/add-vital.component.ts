import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Apollo } from 'apollo-angular';
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { getBaseURL, MASTER_DATA, RECORD_VITALS, CREATE_APPOINTMENTS_NOTES } from 'src/app/graphql.module';
import { StateService } from '../../stateService';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';

@Component({
  selector: 'app-add-vital',
  templateUrl: './add-vital.component.html',
  styleUrls: ['../../common.style.scss', './add-vital.component.scss']
})
export class AddVitalComponent implements OnInit {

  @Input() data;

  addVitalForm: FormGroup;

  temperatureError: string = '';

  pulseError: string = '';

  bpSystolicError: string = '';
  bpDiastolicError: string = '';

  bloodOxygenError: string = '';

  respiratoryRateError: string = '';

  bloodGlucoseError: string = '';

  heightError: string = '';
  weightError: string = '';

  headCircumferenceError: string = '';

  boneMassError: string = '';
  hydrationError: string = '';

  reminderError: string = '';

  readingDateError: string = '';
  readingTimeError: string = '';

  hbA1cError: string = '';

  is_manual_timestamp: boolean = false;

  tags = [];
  selectedTags: string[] = [];
  attachments = [];

  reminderList = [];
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vitalIds: any;


  showTemperatureReadingLocationList: boolean = false;
  temperatureReadingLocationDataList = [
    {
      id: 1,
      value: 'Not Set'
    },
    {
      id: 2,
      value: 'Armpit'
    },
    {
      id: 3,
      value: 'Finger'
    },
    {
      id: 4,
      value: 'Forehead'
    },
    {
      id: 5,
      value: 'Mouth'
    },
    {
      id: 6,
      value: 'Rectum'
    },
    {
      id: 7,
      value: 'Temporal artery'
    },
    {
      id: 8,
      value: 'Toe'
    },
    {
      id: 9,
      value: 'Ear'
    },
    {
      id: 10,
      value: 'Wrist'
    },
    {
      id: 11,
      value: 'Vagina'
    }
  ];
  temperatureReadingLocationFieldWidth = '';

  showBpBodyPositionList: boolean = false;
  bpBodyPositionDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Standing'
    },
    {
      id: 3,
      value: 'Sitting'
    },
    {
      id: 4,
      value: 'Lying down'
    },
    {
      id: 5,
      value: 'Reclining'
    }
  ];
  bpBodyPositionFieldWidth = '';

  showBpArmLocationList: boolean = false;
  bpArmLocationDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Left wrist'
    },
    {
      id: 3,
      value: 'Right wrist'
    },
    {
      id: 4,
      value: 'Left upper arm'
    },
    {
      id: 5,
      value: 'Right upper arm'
    },
  ];
  bpArmLocationFieldWidth = '';

  showBloodOxygenOxygenTherapyList: boolean = false;
  bloodOxygenOxygenTherapyDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Nasal canula'
    }
  ];
  bloodOxygenOxygenTherapyFieldWidth = '';

  showBloodOxygenReadingMethodList: boolean = false;
  bloodOxygenReadingMethodDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Pulse oximetry'
    }
  ];
  bloodOxygenReadingMethodFieldWidth = '';

  showBloodOxygenMeasurementTypeList: boolean = false;
  bloodOxygenMeasurementTypeDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Peripheral capillaries'
    }
  ];
  bloodOxygenMeasurementTypeFieldWidth = '';

  showBloodGlucoseMealTimingList: boolean = false;
  bloodGlucoseMealTimingDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'General'
    },
    {
      id: 3,
      value: 'While fasting'
    },
    {
      id: 4,
      value: 'Before a meal'
    },
    {
      id: 5,
      value: 'After a meal'
    },
  ];
  bloodGlucoseMealTimingFieldWidth = '';

  showBloodGlucoseMealTypeList: boolean = false;
  bloodGlucoseMealTypeDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Unknown'
    },
    {
      id: 3,
      value: 'Breakfast'
    },
    {
      id: 4,
      value: 'Lunch'
    },
    {
      id: 5,
      value: 'Dinner'
    },
    {
      id: 6,
      value: 'Snack'
    }
  ];
  bloodGlucoseMealTypeFieldWidth = '';

  showBloodGlucoseSleepTimingList: boolean = false;
  bloodGlucoseSleepTimingDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'While awake'
    },
    {
      id: 3,
      value: 'Just before sleep'
    },
    {
      id: 4,
      value: 'During sleep'
    },
    {
      id: 5,
      value: 'Just after waking'
    }
  ];
  bloodGlucoseSleepTimingFieldWidth = '';

  showBloodGlucoseSampleSourceList: boolean = false;
  bloodGlucoseSampleSourceDataList = [
    {
      id: 1,
      value: 'Not set'
    },
    {
      id: 2,
      value: 'Interstitial fluid'
    },
    {
      id: 3,
      value: 'Capillary blood'
    },
    {
      id: 4,
      value: 'Plasma'
    },
    {
      id: 5,
      value: 'Serum'
    },
    {
      id: 5,
      value: 'Tears'
    }
  ];
  bloodGlucoseSampleSourceFieldWidth = '';

  temperatureTags = ["Fever", "Normal", "Hyperthermia", "Hypothermia", "Cold/Flu", "Infection", "Medication", "Heatstroke", "Insomnia", "Restful sleep"];
  selectedTemperatureTags: string[] = [];

  pulseTags = ["Resting Heart Rate", "Exercise", "Stress", "Medication", "Morning Reading", "Evening Reading", "Pre-Meal", "Post-Meal", "Pre-Workout", "Post-Workout"];
  selectedPulseTags: string[] = [];

  bpTags = ["Medication", "Exercise", "Stress", "Resting", "Post-Exercise", "Morning Reading", "Evening Reading", "Pre-Meal", "Post-Meal", "Hypertensive Crisis"];
  selectedBPTags: string[] = [];

  boTags = ["Hypoxemia", "Oxygen Therapy", "COPD", "Asthma", "Sleep Apnea", "Pulmonary Disease", "Exercise", "Altitude Sickness", "Lung Disease", "Cardiac Conditions"];
  selectedBOTags: string[] = [];

  raspiratoryTags = ["Normal Breathing", "Tachypnea", "Bradypnea", "Respiratory Distress", "Respiratory Infection", "Asthma", "Chronic Obstructive Pulmonary Disease (COPD)", "Lung Disease", "Respiratory Conditions", "Sleep Apnea"];
  selectedRaspiratoryTags: string[] = [];

  bgTags = ["Normal Range", "Hypoglycemia", "Hyperglycemia", "Diabetes", "Pre-Diabetes", "Gestational Diabetes", "Insulin Resistance", "Post-Meal", "Continuous Glucose Monitoring (CGM)", "Glucometer"];
  selectedBGTags: string[] = [];

  maxDate = new Date();

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private apollo: Apollo,
    private httpLink: HttpLink,
    private apiService: ApiService,
    public stateService: StateService,
    private spinner: NgxSpinnerService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
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

    this.initAddVitalForm();
    this.getTags();
    this.getVitalIds();
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

  setManualTimestamp() {
    this.is_manual_timestamp = !this.is_manual_timestamp;
  }

  initAddVitalForm() {
    this.addVitalForm = this.formBuilder.group({
      temperature: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      temperature_unit: ['°Celsius'],
      temperatureReadingLocation: ['Not set'],

      pulse: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],

      bp_systolic: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      bp_diastolic: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      bpBodyPosition: ['Not set'],
      bpArmLocation: ['Not set'],

      blood_oxygen: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      provision: ['On Air'],
      bloodOxygenSupplementalO2: [''],
      bloodOxygenOxygenTherapy: ['Not set'],
      bloodOxygenReadingMethod: ['Not set'],
      bloodOxygenMeasurementType: ['Not set'],

      respiratory_rate: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],

      blood_glucose: [''],
      HbA1c: [''],
      blood_glucose_type: ['Blood Glucose'],
      // bloodGlucoseMealTiming: ['Random'],
      blood_glucose_unit: ['mg/dL'],
      bloodGlucoseMealTiming: ['Not set'],
      bloodGlucoseMealType: ['Not set'],
      bloodGlucoseSleepTiming: ['Not set'],
      bloodGlucoseSampleSource: ['Not set'],

      blood_group: [''],

      height: [''],
      height_inch: [''],
      height_unit: ['feet'],
      weight: [''],
      weight_unit: ['kg'],

      head_circumference: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],
      head_circumference_unit: ['cm'],
      bone_mass: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],

      hydration: ['', [Validators.pattern(/^[0-9]*\.?[0-9]*$/)]],

      tags: [''],

      reading_date: [''],
      reading_time: [''],

      reminder: [''],

      notes: [''],
      attachment: [''],

    });
  }

  checkTemperatureStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('pattern')) {
        return true;
      }
  }

  checkTemperatureError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('pattern')) {
        this.temperatureError = 'Please enter correct value.';
        return true;
      }
  }

  checkPulseStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkPulseError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.pulseError = 'This field is required.';
        return true;
      }
  }

  checkBPSystolicStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBPSystolicError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bpSystolicError = 'This field is required.';
        return true;
      }
  }

  checkBPDiastolicStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBPDiastolicError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bpDiastolicError = 'This field is required.';
        return true;
      }
  }

  checkBloodOxygenStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBloodOxygenError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bloodOxygenError = 'This field is required.';
        return true;
      }
  }

  checkBloodOxygenSupplementalO2StyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBloodOxygenSupplementalO2Error(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bloodOxygenError = 'This field is required.';
        return true;
      }
  }

  checkRespiratoryRateStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkRespiratoryRateError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.respiratoryRateError = 'This field is required.';
        return true;
      }
  }

  checkBloodGlucoseStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBloodGlucoseError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bloodGlucoseError = 'This field is required.';
        return true;
      }
  }

  checkHeightStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkHeightError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.heightError = 'This field is required.';
        return true;
      }
  }

  checkWeightStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkWeightError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.weightError = 'This field is required.';
        return true;
      }
  }

  checkHeadCircumferenceStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkHeadCircumferenceError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.headCircumferenceError = 'This field is required.';
        return true;
      }
  }

  checkBoneMassStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBoneMassError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.boneMassError = 'This field is required.';
        return true;
      }
  }

  checkHydrationStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkHydrationError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.hydrationError = 'This field is required.';
        return true;
      }
  }

  checkReminderStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReminderError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.reminderError = 'This field is required.';
        return true;
      }
  }

  checkReadingDateStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReadingDateError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.readingDateError = 'This field is required.';
        return true;
      }
  }

  checkReadingTimeStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkReadingTimeError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.readingTimeError = 'This field is required.';
        return true;
      }
  }

  checkHbA1cStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkHbA1cError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.hbA1cError = 'This field is required.';
        return true;
      }
  }

  openTemperatureReadingLocationList() {
    let temperatureReadingLocationField = document.getElementById('temperatureReadingLocationField') as HTMLDivElement;
    let temperatureReadingLocationInputField = document.getElementById('temperatureReadingLocationInputField') as HTMLInputElement;
    temperatureReadingLocationInputField.focus();
    this.temperatureReadingLocationFieldWidth = `${temperatureReadingLocationField.offsetWidth}px`;
    this.showTemperatureReadingLocationList = true;
  }

  setTemperatureReadingLocation($event) {
    let temperatureReadingLocationInputField = document.getElementById('temperatureReadingLocationInputField') as HTMLInputElement;
    temperatureReadingLocationInputField.blur();
    this.addVitalForm.get('temperatureReadingLocation').setValue($event.value);
    this.showTemperatureReadingLocationList = false;
  }

  openBpBodyPositionList() {
    let bpBodyPositionField = document.getElementById('bpBodyPositionField') as HTMLDivElement;
    let bpBodyPositionInputField = document.getElementById('bpBodyPositionInputField') as HTMLInputElement;
    bpBodyPositionInputField.focus();
    this.bpBodyPositionFieldWidth = `${bpBodyPositionField.offsetWidth}px`;
    this.showBpBodyPositionList = true;
  }

  setBpBodyPosition($event) {
    let bpBodyPositionInputField = document.getElementById('bpBodyPositionInputField') as HTMLInputElement;
    bpBodyPositionInputField.blur();
    this.addVitalForm.get('bpBodyPosition').setValue($event.value);
    this.showBpBodyPositionList = false;
  }

  openBpArmLocationList() {
    let bpArmLocationField = document.getElementById('bpArmLocationField') as HTMLDivElement;
    let bpArmLocationInputField = document.getElementById('bpArmLocationInputField') as HTMLInputElement;
    bpArmLocationInputField.focus();
    this.bpArmLocationFieldWidth = `${bpArmLocationField.offsetWidth}px`;
    this.showBpArmLocationList = true;
  }

  setBpArmLocation($event) {
    let bpArmLocationInputField = document.getElementById('bpArmLocationInputField') as HTMLInputElement;
    bpArmLocationInputField.blur();
    this.addVitalForm.get('bpArmLocation').setValue($event.value);
    this.showBpArmLocationList = false;
  }

  openBloodOxygenOxygenTherapyList() {
    let bloodOxygenOxygenTherapyField = document.getElementById('bloodOxygenOxygenTherapyField') as HTMLDivElement;
    let bloodOxygenOxygenTherapyInputField = document.getElementById('bloodOxygenOxygenTherapyInputField') as HTMLInputElement;
    bloodOxygenOxygenTherapyInputField.focus();
    this.bloodOxygenOxygenTherapyFieldWidth = `${bloodOxygenOxygenTherapyField.offsetWidth}px`;
    this.showBloodOxygenOxygenTherapyList = true;
  }

  setBloodOxygenOxygenTherapy($event) {
    let bloodOxygenOxygenTherapyInputField = document.getElementById('bloodOxygenOxygenTherapyInputField') as HTMLInputElement;
    bloodOxygenOxygenTherapyInputField.blur();
    this.addVitalForm.get('bloodOxygenOxygenTherapy').setValue($event.value);
    this.showBloodOxygenOxygenTherapyList = false;
  }

  openBloodOxygenReadingMethodList() {
    let bloodOxygenReadingMethodField = document.getElementById('bloodOxygenReadingMethodField') as HTMLDivElement;
    let bloodOxygenReadingMethodInputField = document.getElementById('bloodOxygenReadingMethodInputField') as HTMLInputElement;
    bloodOxygenReadingMethodInputField.focus();
    this.bloodOxygenReadingMethodFieldWidth = `${bloodOxygenReadingMethodField.offsetWidth}px`;
    this.showBloodOxygenReadingMethodList = true;
  }

  setBloodOxygenReadingMethod($event) {
    let bloodOxygenReadingMethodInputField = document.getElementById('bloodOxygenReadingMethodInputField') as HTMLInputElement;
    bloodOxygenReadingMethodInputField.blur();
    this.addVitalForm.get('bloodOxygenReadingMethod').setValue($event.value);
    this.showBloodOxygenReadingMethodList = false;
  }

  openBloodOxygenMeasurementTypeList() {
    let bloodOxygenMeasurementTypeField = document.getElementById('bloodOxygenMeasurementTypeField') as HTMLDivElement;
    let bloodOxygenMeasurementTypeInputField = document.getElementById('bloodOxygenMeasurementTypeInputField') as HTMLInputElement;
    bloodOxygenMeasurementTypeInputField.focus();
    this.bloodOxygenMeasurementTypeFieldWidth = `${bloodOxygenMeasurementTypeField.offsetWidth}px`;
    this.showBloodOxygenMeasurementTypeList = true;
  }

  setBloodOxygenMeasurementType($event) {
    let bloodOxygenMeasurementTypeInputField = document.getElementById('bloodOxygenMeasurementTypeInputField') as HTMLInputElement;
    bloodOxygenMeasurementTypeInputField.blur();
    this.addVitalForm.get('bloodOxygenMeasurementType').setValue($event.value);
    this.showBloodOxygenMeasurementTypeList = false;
  }

  openBloodGlucoseMealTimingList() {
    let bloodGlucoseMealTimingField = document.getElementById('bloodGlucoseMealTimingField') as HTMLDivElement;
    let bloodGlucoseMealTimingInputField = document.getElementById('bloodGlucoseMealTimingInputField') as HTMLInputElement;
    bloodGlucoseMealTimingInputField.focus();
    this.bloodGlucoseMealTimingFieldWidth = `${bloodGlucoseMealTimingField.offsetWidth}px`;
    this.showBloodGlucoseMealTimingList = true;
  }

  setBloodGlucoseMealTiming($event) {
    let bloodGlucoseMealTimingInputField = document.getElementById('bloodGlucoseMealTimingInputField') as HTMLInputElement;
    bloodGlucoseMealTimingInputField.blur();
    this.addVitalForm.get('bloodGlucoseMealTiming').setValue($event.value);
    this.showBloodGlucoseMealTimingList = false;
  }

  openBloodGlucoseMealTypeList() {
    let bloodGlucoseMealTypeField = document.getElementById('bloodGlucoseMealTypeField') as HTMLDivElement;
    let bloodGlucoseMealTypeInputField = document.getElementById('bloodGlucoseMealTypeInputField') as HTMLInputElement;
    bloodGlucoseMealTypeInputField.focus();
    this.bloodGlucoseMealTypeFieldWidth = `${bloodGlucoseMealTypeField.offsetWidth}px`;
    this.showBloodGlucoseMealTypeList = true;
  }

  setBloodGlucoseMealType($event) {
    let bloodGlucoseMealTypeInputField = document.getElementById('bloodGlucoseMealTypeInputField') as HTMLInputElement;
    bloodGlucoseMealTypeInputField.blur();
    this.addVitalForm.get('bloodGlucoseMealType').setValue($event.value);
    this.showBloodGlucoseMealTypeList = false;
  }

  openBloodGlucoseSleepTimingList() {
    let bloodGlucoseSleepTimingField = document.getElementById('bloodGlucoseSleepTimingField') as HTMLDivElement;
    let bloodGlucoseSleepTimingInputField = document.getElementById('bloodGlucoseSleepTimingInputField') as HTMLInputElement;
    bloodGlucoseSleepTimingInputField.focus();
    this.bloodGlucoseSleepTimingFieldWidth = `${bloodGlucoseSleepTimingField.offsetWidth}px`;
    this.showBloodGlucoseSleepTimingList = true;
  }

  setBloodGlucoseSleepTiming($event) {
    let bloodGlucoseSleepTimingInputField = document.getElementById('bloodGlucoseSleepTimingInputField') as HTMLInputElement;
    bloodGlucoseSleepTimingInputField.blur();
    this.addVitalForm.get('bloodGlucoseSleepTiming').setValue($event.value);
    this.showBloodGlucoseSleepTimingList = false;
  }

  openBloodGlucoseSampleSourceList() {
    let bloodGlucoseSampleSourceField = document.getElementById('bloodGlucoseSampleSourceField') as HTMLDivElement;
    let bloodGlucoseSampleSourceInputField = document.getElementById('bloodGlucoseSampleSourceInputField') as HTMLInputElement;
    bloodGlucoseSampleSourceInputField.focus();
    this.bloodGlucoseSampleSourceFieldWidth = `${bloodGlucoseSampleSourceField.offsetWidth}px`;
    this.showBloodGlucoseSampleSourceList = true;
  }

  setBloodGlucoseSampleSource($event) {
    let bloodGlucoseSampleSourceInputField = document.getElementById('bloodGlucoseSampleSourceInputField') as HTMLInputElement;
    bloodGlucoseSampleSourceInputField.blur();
    this.addVitalForm.get('bloodGlucoseSampleSource').setValue($event.value);
    this.showBloodGlucoseSampleSourceList = false;
  }

  getVitalIds() {
    this.queryService(
      {
        query: MASTER_DATA,
        variables: {
          type: 'vitals',
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
        console.log('this is result', result);
      }
    )
  }

  getTags() {
    this.queryService(
      {
        query: MASTER_DATA,
        variables: {
          type: 'vitalsTag',
        }
      },
      (result: any) => {
        this.spinner.hide();
        let tempTags = [...result.data.getMasterDataByType];
        this.tags = [...new Set([...new Set(tempTags.map(item => item.name))])];
        if (this.tags.length > 3) {
          this.tags.splice(3);
          console.log('Shortened this.tags:', this.tags);
        } else {
          console.log('This.tags length is less than or equal to 3');
        }
      }
    )
  }

  scrollRight() {
    document.getElementById('tag-container').scrollLeft += 40;
  }

  addTag(val, item) {
    if (this[item] && this[item].includes(val)) {
      this[item] = this[item].filter(e => e !== val);
    } else
      this[item].push(val);
  }

  uploadImageFileDND(files: Array<any>, funcName) {
    let tempEvent = {
      target: {
        files: files
      }
    }
    this[funcName](tempEvent);
  }

  generateUniqueName(fileType) {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return timestamp + randomString + '.' + fileType;
  }

  changeFileName(file, newFileName) {
    const blob = file.slice(0, file.size, file.type);
    const newFile = new File([blob], newFileName, { type: file.type });
    return newFile;
  }

  changeFileNames(files) {
    return files.map(fileObj => {
      const fileExtension = fileObj.type.split('/')[1];
      const newFileName = this.generateUniqueName(fileExtension);
      const newFile = this.changeFileName(fileObj, newFileName);
      return newFile;
    });
  }

  onSelectAttachmentFile(event) {
    if (event.target.files && event.target.files[0]) {
      let imgFile = [];
      for (let i = 0; i < event.target.files.length; i++) {
        imgFile.push(event.target.files[i]);
      }
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          // this.clinicImagesfileUploadURL.push(event.target.result);
        }
      }
      let tempFiles = this.changeFileNames(imgFile);
      if (tempFiles.length > 0) {
        this.spinner.show();
        this.apiService.imgUpload(tempFiles, 'multiple').subscribe((data: any) => {
          data.map((item) => {
            this.attachments.push(item.url);
          });
          // this.clinicImagesForm.get('images').setValue(tempImages);
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.statusText == 'Unauthorized') {
              this.toastr.error('user session has been expired please relogin');
              this.router.navigateByUrl('/login');
            }
          });
      }
    }
  }

  addReminder() {
    const modalRef = this.modalService.open(AddReminderComponent, { centered: true, backdrop: 'static', keyboard: false, size: 's' });
    modalRef.componentInstance.data = {
      that: this
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  removeClinicImages(url, index) {
    this.attachments.splice(index, 1);
    // this.clinicImagesfileUpload.splice(index, 1);
    // let tempFormData = this.clinicImagesForm.get('images').value;
    // tempFormData.splice(index, 1);
    // this.clinicImagesForm.get('images').setValue([...tempFormData]);
  }

  addVitalReading() {
    console.log('this is selectedTags', this.selectedTags);

    let vitalReadings = [];
    let readingTime = new Date();
    let appointmentId = this.data.comesFrom === 'remote-monitoring' ? undefined : this.stateService.appointment$.id;

    if (this.is_manual_timestamp) {
      let date = new Date(this.addVitalForm.get('reading_date').value);
      let time = this.addVitalForm.get("reading_time").value;

      if (date && time) {
        readingTime = new Date(`${this.month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${time}:00`);
      } else {
        this.toastr.error('Please enter date and time.');
        return;
      }
    }

    // First check for Temprature
    let temperature;
    let tempratureReminder = new Date();
    if (this.avf.temperature.value) {
      if (parseFloat(this.avf.temperature.value) < 0 || parseFloat(this.avf.temperature.value) > 200) {
        this.toastr.error('Please enter value between 0 to 200 for Temprature');
        return;
      }
      if (this.reminderList.findIndex(item => item.reminder === 'Temperature') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Temperature');
        tempratureReminder = this.reminderList[index].time;
      }
      temperature = {
        name: 'Temperature',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['temperature']?.id,
        value: this.avf.temperature.value,
        uom: this.avf.temperature_unit.value,
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: {
          tags: this.selectedTemperatureTags.join(','),
          readingLocation: this.avf.temperatureReadingLocation.value
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: tempratureReminder,
        appointmentId
      }
      console.log('this is temperature', temperature);
      vitalReadings.push(temperature);
    }

    console.log('this is vitalReadings', vitalReadings);

    // Second Check for Pulse
    let pulse;
    let pulseReminder = new Date();
    if (this.avf.pulse.value) {
      if (parseFloat(this.avf.pulse.value) < 0 || parseFloat(this.avf.pulse.value) > 400) {
        this.toastr.error('Please enter value between 0 to 400 for Pulse');
        return;
      }
      if (this.reminderList.findIndex(item => item.reminder === 'Pulse') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Pulse');
        pulseReminder = this.reminderList[index].time;
      }
      pulse = {
        name: 'Pulse',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['pulse']?.id,
        value: this.avf.pulse.value,
        uom: 'bpm',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: {
          tags: this.selectedPulseTags.join(',')
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: pulseReminder,
        appointmentId
      }
      console.log('this is pulse', pulse);
      vitalReadings.push(pulse);
    }

    // Third Check for Blood Pressure
    let bloodPressure;
    let bloodPressureReminder = new Date();
    if (this.avf.bp_systolic.value && this.avf.bp_diastolic.value) {
      if (parseFloat(this.avf.bp_systolic.value) < 50 || parseFloat(this.avf.bp_systolic.value) > 400) {
        this.toastr.error('Please enter value between 50 to 400 for Systolic');
        return;
      }

      if (parseFloat(this.avf.bp_diastolic.value) < 20 || parseFloat(this.avf.bp_diastolic.value) > 250) {
        this.toastr.error('Please enter value between 20 to 250 for Diastolic');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Blood Pressure') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Blood Pressure');
        bloodPressureReminder = this.reminderList[index].time;
      }

      bloodPressure = {
        name: 'Blood Pressure',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['bloodPressure']?.id,
        value: `${this.avf.bp_systolic.value}/${this.avf.bp_diastolic.value}`,
        uom: 'mmHg',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: {
          tags: this.selectedBPTags.join(','),
          bodyPosition: this.avf.bpBodyPosition.value,
          armLocation: this.avf.bpArmLocation.value,
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: bloodPressureReminder,
        appointmentId
      }
      console.log('this is bloodPressure', bloodPressure);
      vitalReadings.push(bloodPressure);
    }

    // Fourth Check for Blood Oxygen
    let bloodOxygen;
    let bloodOxygenReminder = new Date();
    if (this.avf.blood_oxygen.value) {
      if (parseFloat(this.avf.blood_oxygen.value) < 40 || parseFloat(this.avf.blood_oxygen.value) > 100) {
        this.toastr.error('Please enter value between 40 to 100 for Blood Oxygen');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Blood Oxygen') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Blood Oxygen');
        bloodOxygenReminder = this.reminderList[index].time;
      }

      bloodOxygen = {
        name: 'Blood oxygen',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['bloodOxygen']?.id,
        value: this.avf.blood_oxygen.value,
        uom: '%',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: {
          tags: this.selectedBOTags.join(','),
          supplementalO2: this.avf.bloodOxygenSupplementalO2.value,
          therapy: this.avf.bloodOxygenOxygenTherapy.value,
          readingMethod: this.avf.bloodOxygenReadingMethod.value,
          measurementType: this.avf.bloodOxygenMeasurementType.value,
          provision: this.avf.provision.value
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: bloodOxygenReminder,
        appointmentId
      }
      console.log('this is bloodOxygen', bloodOxygen);
      vitalReadings.push(bloodOxygen);
    }

    // Fifth Check for Raspiratory rate
    let respiratory_rate;
    let respiratory_rateReminder = new Date();
    if (this.avf.respiratory_rate.value) {
      if (parseFloat(this.avf.respiratory_rate.value) < 0 || parseFloat(this.avf.respiratory_rate.value) > 200) {
        this.toastr.error('Please enter value between 0 to 200 for Respiratory rate');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Respiratory Rate') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Respiratory Rate');
        respiratory_rateReminder = this.reminderList[index].time;
      }

      respiratory_rate = {
        name: 'Respiratory rate',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['respiratoryRate']?.id,
        value: this.avf.respiratory_rate.value,
        uom: 'bpm',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: {
          tags: this.selectedRaspiratoryTags.join(',')
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: respiratory_rateReminder,
        appointmentId
      }
      console.log('this is respiratory_rate', respiratory_rate);
      vitalReadings.push(respiratory_rate);
    }

    // Sixth check for Blood Glucose
    let bloodGlucose;
    let bloodGlucoseReminder = new Date();
    if (this.avf.blood_glucose.value) {
      let tempUnit = this.avf.blood_glucose_unit.value
      let mealPreference = this.avf.bloodGlucoseMealTiming.value;
      // if (this.avf.blood_glucose_type.value === 'HbA1C') {
      //   tempUnit = '%';
      //   mealPreference = '';

      //   if (parseFloat(this.avf.blood_glucose.value) < 0 || parseFloat(this.avf.blood_glucose.value) > 20) {
      //     this.toastr.error('Please enter value between 0 to 20 for HbA1C');
      //     return;
      //   }
      // } else {
      if (this.avf.blood_glucose_unit.value === 'mmol/L' && (parseFloat(this.avf.blood_glucose.value) < 0 || parseFloat(this.avf.blood_glucose.value) > 55.6)) {
        this.toastr.error('Please enter value between 0 to 55.6 for Blood glucose');
        return;
      }

      if (this.avf.blood_glucose_unit.value === 'mg/dL' && (parseFloat(this.avf.blood_glucose.value) < 0 || parseFloat(this.avf.blood_glucose.value) > 1000)) {
        this.toastr.error('Please enter value between 0 to 1000 for Blood glucose');
        return;
      }
      // }

      if (this.reminderList.findIndex(item => item.reminder === 'Blood Sugar') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Blood Sugar');
        bloodGlucoseReminder = this.reminderList[index].time;
      }

      bloodGlucose = {
        name: tempUnit === '%' ? 'Hba1c' : 'Blood sugar',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds[tempUnit === '%' ? 'hba1c' : 'bloodSugar']?.id,
        value: this.avf.blood_glucose.value,
        uom: tempUnit,
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: mealPreference,
        additionalInfo: {
          tags: this.selectedBGTags.join(','),
          mealTiming: this.avf.bloodGlucoseMealTiming.value,
          mealType: this.avf.bloodGlucoseMealType.value,
          sleepTiming: this.avf.bloodGlucoseSleepTiming.value,
          sampleSource: this.avf.bloodGlucoseSampleSource.value,
          Hba1c: this.avf.HbA1c.value,
        },
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: bloodGlucoseReminder,
        appointmentId
      }
      console.log('this is bloodGlucose', bloodGlucose);
      vitalReadings.push(bloodGlucose);
    }

    // Seventh check for Blood Group
    let bloodGroup;
    let bloodGroupReminder = new Date();
    if (this.avf.blood_group.value) {
      if (this.reminderList.findIndex(item => item.reminder === 'Blood Group') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Blood Group');
        bloodGroupReminder = this.reminderList[index].time;
      }

      bloodGroup = {
        name: 'Blood Group',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['bloodGroup']?.id,
        value: this.avf.blood_group.value,
        uom: '',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: bloodGroupReminder,
        // appointmentId
      }
      console.log('this is bloodGroup', bloodGroup);
      vitalReadings.push(bloodGroup);
    }

    // Eigth check for Height
    let height;
    let heightReminder = new Date();
    if (this.avf.height.value) {
      let tempHeight = this.avf.height_unit.value;
      let heightValue = this.avf.height.value;
      if (tempHeight === 'feet') {
        heightValue = `${this.avf.height.value}.${this.avf.height_inch.value}`;
        if ((this.avf.height.value < 1 || this.avf.height.value > 10) && (this.avf.height.value < 0 || this.avf.height_inch.value > 11)) {
          this.toastr.error('The minimum can be 1 feet and 0 inches and Max Human height in Feet/Inches will be 10 feet 11 inches');
          return;
        }
      } else if (this.avf.height.value < 10 || this.avf.height.value > 300) {
        this.toastr.error('The minimum human height in cm is “10” and Maximum human height in cm is “300”');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Height') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Height');
        heightReminder = this.reminderList[index].time;
      }

      height = {
        name: 'Height',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['height']?.id,
        value: heightValue,
        uom: this.avf.height_unit.value,
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: heightReminder,
        // appointmentId
      }
      console.log('this is height', height);
      vitalReadings.push(height);
    }

    // Ninth check for weight
    let weight;
    let weightReminder = new Date();
    if (this.avf.weight.value) {

      if (this.avf.weight_unit.value === 'kg' && (this.avf.weight.value < 0 || this.avf.weight.value > 500)) {
        this.toastr.error('Please enter value between 0 to 500 for weight');
        return;
      }

      if (this.avf.weight_unit.value === 'lbs' && (this.avf.weight.value < 10 || this.avf.weight.value > 1000)) {
        this.toastr.error('Please enter value between 10 to 1000 for weight');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Weight') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Weight');
        weightReminder = this.reminderList[index].time;
      }

      weight = {
        name: 'Weight',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['weight']?.id,
        value: this.avf.weight.value,
        uom: this.avf.weight_unit.value,
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: weightReminder,
        // appointmentId
      }
      console.log('this is weight', weight);
      vitalReadings.push(weight);
    }

    // Tenth check for Head Circumference
    let head_circumference;
    let head_circumferenceReminder = new Date();
    if (this.avf.head_circumference.value) {

      if (this.avf.head_circumference.value < 5 || this.avf.head_circumference.value > 75) {
        this.toastr.error('Please enter value between 5 to 75 for Head circumference');
        return;
      }

      if (this.reminderList.findIndex(item => item.reminder === 'Head Circumference') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Head Circumference');
        head_circumferenceReminder = this.reminderList[index].time;
      }

      head_circumference = {
        name: 'Head Circumference',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['headCircumference']?.id,
        value: this.avf.head_circumference.value,
        uom: this.avf.head_circumference_unit.value,
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: head_circumferenceReminder,
        appointmentId
      }
      console.log('this is head_circumference', head_circumference);
      vitalReadings.push(head_circumference);
    }

    // Eleventh check for Bone Mass
    let bone_mass;
    let bone_massReminder = new Date();
    if (this.avf.bone_mass.value) {
      if (this.reminderList.findIndex(item => item.reminder === 'Bone Mass') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Bone Mass');
        bone_massReminder = this.reminderList[index].time;
      }

      bone_mass = {
        name: 'Bone Mass',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['boneMass']?.id,
        value: this.avf.bone_mass.value,
        uom: 'kg',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: bone_massReminder,
        appointmentId
      }
      console.log('this is bone_mass', bone_mass);
      vitalReadings.push(bone_mass);
    }

    // Twevelth check for Hydration
    let hydration;
    let hydrationReminder = new Date();
    if (this.avf.hydration.value) {
      if (this.reminderList.findIndex(item => item.reminder === 'Hydration') > -1) {
        let index = this.reminderList.findIndex(item => item.reminder === 'Hydration');
        tempratureReminder = this.reminderList[index].time;
      }

      hydration = {
        name: 'Hydration',
        patientId: this.stateService.appointment$.patient.patientId,
        vitalId: this.vitalIds['hydration']?.id,
        value: this.avf.hydration.value,
        uom: '%',
        notes: this.avf.notes.value,
        readingSource: "",
        mealPreference: "",
        additionalInfo: this.selectedTags.join(','),
        attachmentUrls: this.attachments,
        readingDate: readingTime,
        reminder: hydrationReminder,
        appointmentId
      }
      console.log('this is hydration', hydration);
      vitalReadings.push(hydration);
    }

    console.log('this is vitasl', vitalReadings);

    if (vitalReadings.length === 0) {
      this.toastr.error('Please enter any Vital first');
      return;
    }

    // if (this.addVitalForm.valid)
    this.mutateService(
      {
        mutation: RECORD_VITALS,
        variables: {
          vitalReadings: vitalReadings
        }
      },
      (result: any) => {
        this.createNoteTimeLine();
        this.spinner.hide();
        this.toastr.success('Vitals Recorded Successfully');
        this.close();
        if (this.data?.comesFrom === 'Vitals Graph') {
          this.data.that?.getVitalHistory(this.data.that?.selectedVital, this.data.that?.selectedTime);
        } else {
          this.data.that?.getVitals();
          this.data.that?.getHWBVitals();
        }
      }
    );
  }

  get doctorUserType() {
    return !(this.stateService?.doctorProfile$?.staffType);
  }

  async createNoteTimeLine() {
    if (this.addVitalForm.get('notes').value === '') {
      return;
    }

    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        mutation: CREATE_APPOINTMENTS_NOTES,
        variables: {
          appointmentId: this.stateService?.appointment$?.id,
          content: {
            title: '',
            note: this.addVitalForm.get('notes').value,
            noteType: 'VITAL',
            userId: this.stateService.doctorProfile$?.doctorId || this.stateService?.doctorProfile$?.id,
            profileType: this.doctorUserType ? 'DOCTOR' : 'CARE_TEAM',
          }
        }
      }
    });
    if (result) {
      console.log(result);
    }
  }

  removeReminder(index) {
    this.reminderList.splice(index, 1);
  }

  get avf() { return this.addVitalForm.controls; }

  close() {
    this.activeModal.close();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (document.getElementById('temperatureReadingLocationField') && !document.getElementById('temperatureReadingLocationField').contains(event.target)) {
      this.showTemperatureReadingLocationList = false;
    }

    if (document.getElementById('bpBodyPositionField') && !document.getElementById('bpBodyPositionField').contains(event.target)) {
      this.showBpBodyPositionList = false;
    }

    if (document.getElementById('bpArmLocationField') && !document.getElementById('bpArmLocationField').contains(event.target)) {
      this.showBpArmLocationList = false;
    }

    if (document.getElementById('bloodOxygenOxygenTherapyField') && !document.getElementById('bloodOxygenOxygenTherapyField').contains(event.target)) {
      this.showBloodOxygenOxygenTherapyList = false;
    }

    if (document.getElementById('bloodOxygenReadingMethodField') && !document.getElementById('bloodOxygenReadingMethodField').contains(event.target)) {
      this.showBloodOxygenReadingMethodList = false;
    }

    if (document.getElementById('bloodOxygenMeasurementTypeField') && !document.getElementById('bloodOxygenMeasurementTypeField').contains(event.target)) {
      this.showBloodOxygenMeasurementTypeList = false;
    }

    if (document.getElementById('bloodGlucoseMealTimingField') && !document.getElementById('bloodGlucoseMealTimingField').contains(event.target)) {
      this.showBloodGlucoseMealTimingList = false;
    }

    if (document.getElementById('bloodGlucoseMealTypeField') && !document.getElementById('bloodGlucoseMealTypeField').contains(event.target)) {
      this.showBloodGlucoseMealTypeList = false;
    }

    if (document.getElementById('bloodGlucoseSleepTimingField') && !document.getElementById('bloodGlucoseSleepTimingField').contains(event.target)) {
      this.showBloodGlucoseSleepTimingList = false;
    }

    if (document.getElementById('bloodGlucoseSampleSourceField') && !document.getElementById('bloodGlucoseSampleSourceField').contains(event.target)) {
      this.showBloodGlucoseSampleSourceList = false;
    }

  }

}
