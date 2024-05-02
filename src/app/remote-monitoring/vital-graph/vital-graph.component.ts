import { Component, OnInit, Input, HostListener } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../stateService';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { getBaseURL, GET_VITAL_HISTORY, EXPORT_VITAL_HISTORY } from 'src/app/graphql.module';
import moment from 'moment-timezone';
import { VitalUtils } from 'src/app/chart/vital-utils';
import { AddVitalComponent } from '../add-vital/add-vital.component';
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

@Component({
  selector: 'app-vital-graph',
  templateUrl: './vital-graph.component.html',
  styleUrls: ['./vital-graph.component.scss']
})
export class VitalGraphComponent implements OnInit {

  @Input() data;

  selectedTime = 'day';
  selectedVital = 'temprature';
  loading = false;
  graphData: any = {};
  vitalGraph: any;
  title: string;
  startDate: string = '';
  endDate: string = '';

  currentYearVitalRecord = [];

  selectedBSTab: String;
  selectedVitalRange: any;
  isSystolicSelected = false;
  vitalIds: any;
  maxVitalValue: any;
  minVitalValue: any;
  avgVitalValue = 0;

  graphTime: string = 'Day';
  showGraphTimeList: boolean = false;
  graphTimeDataList = [
    {
      id: 1,
      value: 'Day'
    },
    {
      id: 2,
      value: 'Week'
    },
    {
      id: 3,
      value: 'Month'
    },
    {
      id: 4,
      value: '6 Months'
    },
    {
      id: 5,
      value: 'Year'
    }
  ];
  graphTimeFieldWidth = '';

  temperatureType: string = 'Fahrenheit';
  showTemperatureTypeList: boolean = false;
  temperatureTypeDataList = [
    {
      id: 1,
      value: 'Fahrenheit'
    },
    {
      id: 2,
      value: 'Celsius'
    }
  ];
  temperatureTypeFieldWidth = '';

  bloodGlucoseUnit: string = 'mg/dL';
  showBloodGlucoseUnitList: boolean = false;
  bloodGlucoseUnitDataList = [
    {
      id: 1,
      value: 'mg/dL'
    },
    {
      id: 2,
      value: 'mmol/L'
    }
  ];
  bloodGlucoseUnitFieldWidth = '';

  bloodGlucoseMealTiming: string = 'All Values';
  showBloodGlucoseMealTimingList: boolean = false;
  bloodGlucoseMealTimingDataList = [
    {
      id: 1,
      value: 'All Values'
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
    }
  ];
  bloodGlucoseMealTimingFieldWidth = '';

  bloodGlucoseReadingType: string = 'Blood Glucose';
  showBloodGlucoseReadingTypeList: boolean = false;
  bloodGlucoseReadingTypeDataList = [
    {
      id: 1,
      value: 'Blood Glucose'
    },
    {
      id: 2,
      value: 'HbA1C'
    }
  ];
  bloodGlucoseReadingTypeFieldWidth = '';

  bloodOxygenReadingType: string = 'All Values';
  showBloodOxygenReadingTypeList: boolean = false;
  bloodOxygenReadingTypeDataList = [
    {
      id: 1,
      value: 'All Values'
    },
    {
      id: 2,
      value: 'On Air'
    },
    {
      id: 2,
      value: 'On Oxygen'
    }
  ];
  bloodOxygenReadingTypeFieldWidth = '';

  showGraph: boolean = true;
  vitalHistory: [any];
  headingImg: string = '';

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private stateService: StateService,
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private httpLink: HttpLink,
  ) {
  }

  setGraphTitle() {
    this.selectedVital = this.data.graph;
    this.bloodGlucoseReadingType = 'Blood Glucose';
    if (this.data.graph === 'temperature') {
      this.title = 'Temperature';
      this.headingImg = './assets/images/temperature-heading.svg';
    } else if (this.data.graph === 'pulse') {
      this.title = 'Pulse';
      this.headingImg = './assets/images/pulse-heading.svg';
    } else if (this.data.graph === 'bloodPressure') {
      this.title = 'Blood Pressure';
      this.headingImg = './assets/images/blood-pressure-heading.svg';
    } else if (this.data.graph === 'bloodOxygen') {
      this.title = 'Blood Oxygen';
      this.headingImg = './assets/images/blood-oxygen-heading.svg';
    } else if (this.data.graph === 'respiratoryRate') {
      this.title = 'Respiratory Rate';
      this.headingImg = './assets/images/respiratory-rate-heading.svg';
    } else if (this.data.graph === 'bloodSugar') {
      this.title = 'Blood Sugar';
      this.selectedBSTab = 'bloodSugar';
      this.headingImg = './assets/images/blood-glucose-heading.svg';
    }
  }

  ngOnInit(): void {
    this.vitalIds = this.stateService.vitalIds$;
    this.setGraphTitle();
    this.getVitalHistory(this.selectedVital, this.selectedTime);
  }

  setStartDate($event) {
    if (this.endDate !== '')
      this.getVitalHistory(this.selectedVital, 'random');
  }

  setEndDate($event) {
    if (this.startDate === '')
      this.toastr.error('Please select start date');
    else {
      this.selectedTime = 'random';
      this.getVitalHistory(this.selectedVital, this.selectedTime);
    }
  }

  get getStartDateMaxDate() {
    if (this.endDate !== '')
      return this.endDate;
    return new Date();
  }

  get getEndDateMaxDate() {
    return new Date();
  }

  get getEndDateMinDate() {
    if (this.startDate !== '')
      return this.startDate;
    return new Date();
  }

  selectTime(val) {
    this.startDate = '';
    this.endDate = '';
    this.selectedTime = val;
    this.getVitalHistory(this.selectedVital, this.selectedTime);
  }

  selectVital(val) {
    this.bloodGlucoseReadingType = 'Blood Glucose';
    this.startDate = '';
    this.endDate = '';
    this.getVitalHistory(val, this.selectedTime);
  }

  setGraphTitleAndImage(val) {
    console.log('this is val', val);
    this.selectedVital = val;
    switch (val) {
      case 'temperature':
        this.title = 'Temperature';
        this.headingImg = './assets/images/temperature-heading.svg';
        break;
      case 'pulse':
        this.title = 'Pulse';
        this.headingImg = './assets/images/pulse-heading.svg';
        break;
      case 'bloodPressure':
        this.title = 'Blood Pressure';
        this.headingImg = './assets/images/blood-pressure-heading.svg';
        break;
      case 'bloodOxygen':
        this.title = 'Blood Oxygen';
        this.headingImg = './assets/images/blood-oxygen-heading.svg';
        break;
      case 'respiratoryRate':
        this.title = 'Respiratory Rate';
        this.headingImg = './assets/images/respiratory-rate-heading.svg';
        break;
      case 'bloodSugar':
        this.title = 'Blood Sugar';
        this.selectedBSTab = 'bloodSugar';
        this.headingImg = './assets/images/blood-glucose-heading.svg';
        break;
      case 'headCircumference':
        this.title = 'Head Circumference';
        break;
      case 'boneMass':
        this.title = 'Bone Mass';
        break;
      case 'hydration':
        this.title = 'Hydration';
        break;
      default:
        this.title = '';
    }
  }

  showTable() {
    this.showGraph = false;
  }

  close() {
    if (!this.showGraph) {
      this.getVitalHistory(this.selectedVital, this.selectedTime);
      this.showGraph = true;
      return;
    }

    this.data.that?.getVitals();
    this.activeModal.close();
  }

  get lastRecordedVitalDate() {
    let lastVitalDate = '';
    const hasChartData = !!this.currentYearVitalRecord.length;
    if (hasChartData) {
      const { time } = this.currentYearVitalRecord[0];
      if (moment(time).diff(moment().subtract(1, 'days')) >= 0) {
        lastVitalDate = moment(time).calendar();
      } else {
        lastVitalDate = moment(time).format('lll');
      }
    }
    return lastVitalDate;
  }

  getDateRangeString(startDate: string, endDate: string): string {
    // Parse the input dates using Moment.js
    const startDateObj = moment(startDate);
    const endDateObj = moment(endDate);

    // Format the start and end dates as "D MMM YYYY"
    const startFormatted = startDateObj.format('D MMM');
    const endFormatted = endDateObj.format('D MMM YYYY');

    // Construct the date range string
    const dateRangeString = `${startFormatted} - ${endFormatted}`;

    return dateRangeString;
  }

  get getDateText() {
    let startDate: string = this.endDate !== '' ? this.startDate : '';
    let endDate = this.endDate !== '' ? this.endDate : moment().format('YYYY-MM-DD');
    if (this.endDate !== '') {
      startDate = moment(this.startDate).format('YYYY-MM-DD');
      endDate = moment(this.endDate).format('YYYY-MM-DD');
      return this.getDateRangeString(startDate, endDate);
    } else if (this.selectedTime === 'day') {
      // startDate = moment().format('YYYY-MM-DD');
      return 'Today'
    } else if (this.selectedTime === 'week') {
      startDate = moment().startOf('week').format('YYYY-MM-DD');
      endDate = moment().endOf('week').format('YYYY-MM-DD');
      return this.getDateRangeString(startDate, endDate);
    } else if (this.selectedTime === 'month') {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
      return this.getDateRangeString(startDate, endDate);
    } else if (this.selectedTime === '6 months') {
      startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      endDate = moment().format('YYYY-MM-DD');
      return this.getDateRangeString(startDate, endDate);
    } else if (this.selectedTime === 'year') {
      startDate = moment().startOf('year').format('YYYY-MM-DD');
      endDate = moment().endOf('year').format('YYYY-MM-DD');
      return this.getDateRangeString(startDate, endDate);
    }
  }

  getVitalHistory(vital: string, time: any) {
    const vitalName = vital;
    const vitalId = this.vitalIds[vitalName]?.id;
    let startDate: string;
    let endDate = moment().format('YYYY-MM-DD');
    if (time === 'day') {
      startDate = moment().format('YYYY-MM-DD');
    } else if (time === 'week') {
      startDate = moment().startOf('week').format('YYYY-MM-DD');
      endDate = moment().endOf('week').format('YYYY-MM-DD');
    } else if (time === 'month') {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
    } else if (time === '6 months') {
      startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      endDate = moment().format('YYYY-MM-DD');
    } else if (time === 'year') {
      startDate = moment().startOf('year').format('YYYY-MM-DD');
      endDate = moment().endOf('year').format('YYYY-MM-DD');
    } else if (time === 'random') {
      startDate = moment(this.startDate).format('YYYY-MM-DD');
      endDate = moment(this.endDate).format('YYYY-MM-DD');
    }

    const variables = {
      patientId: this.data.that?.patient_data?.patientId * 1,
      vitalId,
      startDate,
      endDate
    }

    this.getGraphqlData(variables, (data) => {
      this.isSystolicSelected = vital === 'bloodPressure';
      this.setGraphTitleAndImage(vital);
      const hasChartData = !!data.data.getVitalHistory?.length;
      if (hasChartData) {
        this.vitalHistory = data.data.getVitalHistory;
        this.setGraphData(this.selectedTime, this.selectedVital);
      } else {
        this.vitalHistory = undefined;
        this.graphData = { time, vitalId, chartDatasets: null, chartLabels: null };
        this.selectedVitalRange = {};
        this.currentYearVitalRecord = [];
      }
    })
  }

  setGraphData(time, vital: string) {
    if (!this.vitalHistory)
      return;
    const vitalId = this.vitalIds[vital]?.id;
    const patientAge = moment().diff(this.data.that.patient_data.dateOfBirth, 'years') || 1;
    let unit = '';

    const valueArray = this.checkForGraphFilters();
    let vitalHistory = this.vitalHistory;

    if (this.title === 'Temperature') {
      unit = this.temperatureType === 'Fahrenheit' ? '°Fahrenheit' : '°Celsius';
    }

    if (this.title === 'Blood Oxygen') {
      let temp: [any] = valueArray as [any];
      vitalHistory = temp;
      unit = this.bloodOxygenReadingType;
    }

    if (this.title === 'Blood Sugar') {
      let temp: [any] = valueArray as [any];
      vitalHistory = temp;
      unit = this.bloodGlucoseUnit;
      if (this.bloodGlucoseReadingType === 'HbA1C') {
        vital = 'hba1c';
        unit = '%'
      }
    }

    const { chartDatasets, chartLabels } = VitalUtils.parseVitalHistory(vital, vitalHistory, time, patientAge, unit);
    this.graphData = { time, vitalId, chartDatasets, chartLabels, startDate: this.startDate, endDate: this.endDate };
    console.log('this is this.graphData', this.graphData);

    valueArray.sort((a, b) => {
      const valueA = parseFloat(this.bloodGlucoseReadingType === 'HbA1C' ? a.additionalInfo?.Hba1c : a.value);
      const valueB = parseFloat(this.bloodGlucoseReadingType === 'HbA1C' ? b.additionalInfo?.Hba1c : b.value);

      if (valueA > valueB) {
        return -1;
      } else if (valueA < valueB) {
        return 1;
      } else {
        // If 'value' is the same, use 'id' as a tiebreaker
        return parseInt(a.id, 10) - parseInt(b.id, 10);
      }
    });
    const numericValues = valueArray.map(obj => parseFloat(this.bloodGlucoseReadingType === 'HbA1C' ? obj.additionalInfo?.Hba1c : obj.value));
    this.avgVitalValue = this.calculateAverageFromArray(numericValues);

    if (vital !== 'bloodPressure') {
      this.maxVitalValue = valueArray[0];
      this.minVitalValue = valueArray[valueArray.length - 1];
    }

    this.mapVitalRangeValues(vital);

    const vitalRecord = this.vitalHistory;
    this.currentYearVitalRecord = vitalRecord.map(itm => {
      const vitalValue = { value: itm.value, name: this.title, mealPreference: itm.additionalInfo.mealTiming || 'not set', unit: itm.uom };
      let unit = itm.uom;
      if (this.title === 'Temperature') {
        unit = itm.uom === '°Fahrenheit' ? '°F' : '°C';
      }
      return {
        date: moment(itm.readingDate).format('ddd, MMM D'),
        time: itm.readingDate,
        unit,
        value: vitalValue.value,
        tags: this.getTags(itm.additionalInfo.tags),
        notes: itm.notes,
        attachmentUrls: itm.attachmentUrls,

        //For Temprature
        readingLocation: this.title === 'Temperature' ? itm.additionalInfo.readingLocation : '',

        //For Blood Pressure
        bodyPosition: this.title === 'Blood Pressure' ? itm.additionalInfo.bodyPosition : '',
        armLocation: this.title === 'Blood Pressure' ? itm.additionalInfo.armLocation : '',

        //For Blood Oxygen
        readingMethod: this.title === 'Blood Oxygen' ? itm.additionalInfo.readingMethod : '',
        measurementType: this.title === 'Blood Oxygen' ? itm.additionalInfo.measurementType : '',
        supplementalO2: this.title === 'Blood Oxygen' ? itm.additionalInfo.supplementalO2 : '',
        therapy: this.title === 'Blood Oxygen' ? itm.additionalInfo.therapy : '',

        //For Blood Glucose
        mealTiming: this.title === 'Blood Sugar' ? itm.additionalInfo.mealTiming : '',
        mealType: this.title === 'Blood Sugar' ? itm.additionalInfo.mealType : '',
        sleepTiming: this.title === 'Blood Sugar' ? itm.additionalInfo.sleepTiming : '',
        sampleSource: this.title === 'Blood Sugar' ? itm.additionalInfo.sampleSource : '',

        ...this.vitalFormatting(patientAge, vitalValue)
      }
    });
  }

  getTags(tags) {
    if (tags && tags.length > 0) {
      if (typeof tags === 'string') {
        return tags.split(',')
      }
      return tags;
    }
    return [];
  }

  checkForGraphFilters() {
    if (this.title === 'Temperature') {
      return this.convertTemperatures([...this.vitalHistory], this.temperatureType === 'Fahrenheit' ? '°Fahrenheit' : '°Celsius');
    }

    if (this.title === 'Blood Oxygen' && this.bloodOxygenReadingType !== 'All Values') {
      return [...this.vitalHistory].filter((obj) => {
        const provisionValue = obj.additionalInfo?.provision;
        return provisionValue === this.bloodOxygenReadingType;
      });
    }

    if (this.title === 'Blood Sugar') {
      if (this.bloodGlucoseReadingType === 'HbA1C') {
        return [...this.vitalHistory].filter((obj) => {
          return obj.additionalInfo?.Hba1c !== '';
        });
      } else {
        if (this.bloodGlucoseMealTiming !== 'All Values') {
          return [...this.vitalHistory].filter((obj) => {
            return obj.additionalInfo?.mealTiming === this.bloodGlucoseMealTiming && obj.uom === this.bloodGlucoseUnit;
          });
        } else if (this.bloodGlucoseMealTiming === 'All Values') {
          return [...this.vitalHistory].filter((obj) => {
            return obj.uom === this.bloodGlucoseUnit && obj.uom === this.bloodGlucoseUnit;
          });
        }
      }
    }

    return [...this.vitalHistory];
  }

  // Function to calculate max, min, and avg of blood pressure values
  findAvgBloodPressureStat(data: string[]): { systolicAvg: number, diastolicAvg: number } {
    let totalSystolic = 0;
    let totalDiastolic = 0;

    for (const value of data) {
      const [systolic, diastolic] = value.split('/').map(Number);

      // Add to totals
      totalSystolic += systolic;
      totalDiastolic += diastolic;
    }

    const systolicAvg = parseInt((totalSystolic / data.length) + '');
    const diastolicAvg = parseInt((totalDiastolic / data.length) + '');

    return {
      systolicAvg,
      diastolicAvg,
    };
  }

  findMaxAndMinBloodPressureStats(data: string[]): { max: string, min: string } {
    let maxA = -Infinity;
    let minA = Infinity;
    let maxBP = "";
    let minBP = "";

    for (const value of data) {
      const [a] = value.split('/').map(Number);
      if (a > maxA) {
        maxA = a;
        maxBP = value;
      }
      if (a < minA) {
        minA = a;
        minBP = value;
      }
    }

    return { max: maxBP, min: minBP };
  }

  private mapVitalRangeValues(vital: string) {
    let bloodPressureStats = undefined;
    let maxMinBloodPressureStats = undefined;
    let vitalValues = [...this.vitalHistory];
    const bloodPressureValues = vitalValues.map(obj => obj.value);
    if (vital === 'bloodPressure') {
      bloodPressureStats = this.findAvgBloodPressureStat(bloodPressureValues);
      maxMinBloodPressureStats = this.findMaxAndMinBloodPressureStats(bloodPressureValues);
    }
    let avgRange = undefined;
    let maxRange = undefined;
    let minRange = undefined;

    if (vital === 'bloodPressure') {
      avgRange = { value: `${bloodPressureStats.systolicAvg}/${bloodPressureStats.diastolicAvg}`, name: this.title, mealPreference: 'not set' };
      maxRange = { value: maxMinBloodPressureStats.max, name: this.title, mealPreference: this.maxVitalValue?.additionalInfo?.mealTiming || 'not set' };
      minRange = { value: maxMinBloodPressureStats.min, name: this.title, mealPreference: this.minVitalValue?.additionalInfo?.mealTiming || 'not set' };
    } else {
      avgRange = { value: parseInt(this.avgVitalValue + ''), name: this.title, mealPreference: 'not set', unit: this.selectedUnit };
      maxRange = { value: this.bloodGlucoseReadingType === 'HbA1C' ? parseFloat(this.maxVitalValue.additionalInfo.Hba1c) : parseFloat(this.maxVitalValue.value), name: this.title, mealPreference: this.maxVitalValue?.additionalInfo?.mealTiming || 'not set', unit: this.selectedUnit };
      minRange = { value: this.bloodGlucoseReadingType === 'HbA1C' ? parseFloat(this.minVitalValue.additionalInfo.Hba1c) : parseFloat(this.minVitalValue.value), name: this.title, mealPreference: this.minVitalValue?.additionalInfo?.mealTiming || 'not set', unit: this.selectedUnit };
    }
    const patientAge = moment().diff(this.data.that.patient_data.dateOfBirth, 'years') || 1;

    this.selectedVitalRange = {
      avg: { ...avgRange, ...this.vitalFormatting(patientAge, avgRange) },
      max: { ...maxRange, ...this.vitalFormatting(patientAge, maxRange), },
      min: { ...minRange, ...this.vitalFormatting(patientAge, minRange) }
    };
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
    if (vital.name === 'Blood Sugar' && this.bloodGlucoseReadingType !== 'HbA1C') {
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
    if (vital.name === 'Hba1c' || this.bloodGlucoseReadingType === 'HbA1C') {
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

  //Get F and C
  convertTemperatures(data: any[], targetUnit: '°Fahrenheit' | '°Celsius'): any[] {
    return data.map(item => {
      const temperature = item.value;
      const originalValue = parseFloat(temperature);
      const unit = item.uom;

      if (unit === targetUnit) {
        return { ...item, value: originalValue, unit: targetUnit };
      }

      if (unit === '°Fahrenheit' && targetUnit === '°Celsius') {
        const convertedValue = ((originalValue - 32) * 5) / 9;
        return { ...item, value: convertedValue.toFixed(2), unit: targetUnit };
      }

      if (unit === '°Celsius' && targetUnit === '°Fahrenheit') {
        const convertedValue = (originalValue * 9) / 5 + 32;
        return { ...item, value: convertedValue.toFixed(2), unit: targetUnit };
      }

      // If the unit is neither 'F' nor 'C', leave it unchanged
      return item;
    });
  }

  get selectedUnit() {
    if (this.title === 'Temperature') {
      return this.temperatureType === 'Fahrenheit' ? '°F' : '°C';
    }

    if (this.title === 'Blood Sugar' && this.bloodGlucoseReadingType !== 'HbA1C') {
      return this.bloodGlucoseUnit;
    }

    if (this.title === 'Blood Sugar' && this.bloodGlucoseReadingType === 'HbA1C') {
      return '%';
    }

    return '';
  }

  // Calculate the average of numeric values
  calculateAverageFromArray(arr: number[]): number {
    const sum = arr.reduce((acc, value) => acc + value, 0);
    const average = sum / arr.length;
    return average;
  }

  onScrollGetGraph($event) {
    console.log('this is $event', $event);
    //TODO: Add Pagination in getVitalHistory form BE then FE work on it.
  }

  getGraphqlData(variables: any, onSuccess: Function) {
    this.spinner.show();
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

    this.apollo
      .watchQuery({
        query: GET_VITAL_HISTORY,
        variables
      }).valueChanges.subscribe((result: any) => {
        onSuccess(result);
        this.spinner.hide();
      });
  }

  recordVital() {
    const modalRef = this.modalService.open(AddVitalComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.data = {
      that: this,
      comesFrom: 'Vitals Graph'
    };
    modalRef.result.then((result) => {
      if (result != 'close') {
      }
    }, (reason) => {
    });
  }

  get isAppointmentCancelled() {
    return this.stateService.appointment$?.status === 'cancelled';
  }

  get isCompleted() {
    return this.stateService.appointment$?.isCompleted;
  }


  openGraphTimeList() {
    let graphTimeField = document.getElementById('graphTimeField') as HTMLDivElement;
    let graphTimeInputField = document.getElementById('graphTimeInputField') as HTMLInputElement;
    graphTimeInputField.focus();
    this.graphTimeFieldWidth = `${graphTimeField.offsetWidth}px`;
    this.showGraphTimeList = true;
  }

  setGraphTime($event) {
    let graphTimeInputField = document.getElementById('graphTimeInputField') as HTMLInputElement;
    graphTimeInputField.blur();
    this.graphTime = $event.value;
    this.selectTime($event.value.toLowerCase());
    this.showGraphTimeList = false;
  }

  openTemperatureTypeList() {
    let temperatureTypeField = document.getElementById('temperatureTypeField') as HTMLDivElement;
    let temperatureTypeInputField = document.getElementById('temperatureTypeInputField') as HTMLInputElement;
    temperatureTypeInputField.focus();
    this.temperatureTypeFieldWidth = `${temperatureTypeField.offsetWidth}px`;
    this.showTemperatureTypeList = true;
  }

  setTemperatureType($event) {
    let temperatureTypeInputField = document.getElementById('temperatureTypeInputField') as HTMLInputElement;
    temperatureTypeInputField.blur();
    this.temperatureType = $event.value;
    this.setGraphData(this.selectedTime, this.selectedVital);
    this.showTemperatureTypeList = false;
  }

  openBloodGlucoseUnitList() {
    let bloodGlucoseUnitField = document.getElementById('bloodGlucoseUnitField') as HTMLDivElement;
    let bloodGlucoseUnitInputField = document.getElementById('bloodGlucoseUnitInputField') as HTMLInputElement;
    bloodGlucoseUnitInputField.focus();
    this.bloodGlucoseUnitFieldWidth = `${bloodGlucoseUnitField.offsetWidth}px`;
    this.showBloodGlucoseUnitList = true;
  }

  setBloodGlucoseUnit($event) {
    let bloodGlucoseUnitInputField = document.getElementById('bloodGlucoseUnitInputField') as HTMLInputElement;
    bloodGlucoseUnitInputField.blur();
    this.bloodGlucoseUnit = $event.value;
    this.setGraphData(this.selectedTime, this.selectedVital);
    this.showBloodGlucoseUnitList = false;
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
    this.bloodGlucoseMealTiming = $event.value;
    this.setGraphData(this.selectedTime, this.selectedVital);
    this.showBloodGlucoseMealTimingList = false;
  }

  openBloodGlucoseReadingTypeList() {
    let bloodGlucoseReadingTypeField = document.getElementById('bloodGlucoseReadingTypeField') as HTMLDivElement;
    let bloodGlucoseReadingTypeInputField = document.getElementById('bloodGlucoseReadingTypeInputField') as HTMLInputElement;
    bloodGlucoseReadingTypeInputField.focus();
    this.bloodGlucoseReadingTypeFieldWidth = `${bloodGlucoseReadingTypeField.offsetWidth}px`;
    this.showBloodGlucoseReadingTypeList = true;
  }

  setBloodGlucoseReadingType($event) {
    let bloodGlucoseReadingTypeInputField = document.getElementById('bloodGlucoseReadingTypeInputField') as HTMLInputElement;
    bloodGlucoseReadingTypeInputField.blur();
    this.bloodGlucoseReadingType = $event.value;
    this.setGraphData(this.selectedTime, this.selectedVital);
    this.showBloodGlucoseReadingTypeList = false;
  }

  openBloodOxygenReadingTypeList() {
    let bloodOxygenReadingTypeField = document.getElementById('bloodOxygenReadingTypeField') as HTMLDivElement;
    let bloodOxygenReadingTypeInputField = document.getElementById('bloodOxygenReadingTypeInputField') as HTMLInputElement;
    bloodOxygenReadingTypeInputField.focus();
    this.bloodOxygenReadingTypeFieldWidth = `${bloodOxygenReadingTypeField.offsetWidth}px`;
    this.showBloodOxygenReadingTypeList = true;
  }

  setBloodOxygenReadingType($event) {
    let bloodOxygenReadingTypeInputField = document.getElementById('bloodOxygenReadingTypeInputField') as HTMLInputElement;
    bloodOxygenReadingTypeInputField.blur();
    this.bloodOxygenReadingType = $event.value;
    this.setGraphData(this.selectedTime, this.selectedVital);
    this.showBloodOxygenReadingTypeList = false;
  }

  download() {
    // Download excel format file of Vitals
    const vitalName = this.selectedVital;
    const vitalId = this.vitalIds[vitalName]?.id;
    let startDate: string;
    let endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (this.selectedTime === 'day') {
      startDate = moment().format('YYYY-MM-DD');
    } else if (this.selectedTime === 'week') {
      startDate = moment().startOf('week').format('YYYY-MM-DD');
      endDate = moment().endOf('week').format('YYYY-MM-DD');
    } else if (this.selectedTime === 'month') {
      startDate = moment().startOf('month').format('YYYY-MM-DD');
      endDate = moment().endOf('month').format('YYYY-MM-DD');
    } else if (this.selectedTime === '6 months') {
      startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      endDate = moment().format('YYYY-MM-DD');
    } else if (this.selectedTime === 'year') {
      startDate = moment().startOf('year').format('YYYY-MM-DD');
      endDate = moment().endOf('year').format('YYYY-MM-DD');
    } else if (this.selectedTime === 'random') {
      startDate = moment(this.startDate).format('YYYY-MM-DD');
      endDate = moment(this.endDate).format('YYYY-MM-DD');
    }

    const variables = {
      patientId: this.data.that?.patient_data?.patientId * 1,
      vitalId,
      startDate,
      endDate,
      timeOffset: -(new Date().getTimezoneOffset())
    }

    this.spinner.show();
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

    this.apollo
      .watchQuery({
        query: EXPORT_VITAL_HISTORY,
        variables
      }).valueChanges.subscribe((result: any) => {
        this.spinner.hide();
        if (result.data.vitalExport) {
          window.open(result.data.vitalExport, '_');
        } else {
          this.toastr.warning('No Vital Exist for given Time.');
        }
      });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (document.getElementById('bloodOxygenReadingTypeField') && !document.getElementById('bloodOxygenReadingTypeField').contains(event.target)) {
      this.showBloodOxygenReadingTypeList = false;
    }

    if (document.getElementById('bloodGlucoseReadingTypeField') && !document.getElementById('bloodGlucoseReadingTypeField').contains(event.target)) {
      this.showBloodGlucoseReadingTypeList = false;
    }

    if (document.getElementById('bloodGlucoseMealTimingField') && !document.getElementById('bloodGlucoseMealTimingField').contains(event.target)) {
      this.showBloodGlucoseMealTimingList = false;
    }

    if (document.getElementById('bloodGlucoseUnitField') && !document.getElementById('bloodGlucoseUnitField').contains(event.target)) {
      this.showBloodGlucoseUnitList = false;
    }

    if (document.getElementById('temperatureTypeField') && !document.getElementById('temperatureTypeField').contains(event.target)) {
      this.showTemperatureTypeList = false;
    }

    if (document.getElementById('graphTimeField') && !document.getElementById('graphTimeField').contains(event.target)) {
      this.showGraphTimeList = false;
    }

  }

}
