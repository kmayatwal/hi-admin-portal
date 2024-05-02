import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { REMOTE_MONITORING_SET_TARGET } from 'src/app/graphql.module';

@Component({
  selector: 'app-health-metrics-set-target',
  templateUrl: './health-metrics-set-target.component.html',
  styleUrls: ['./health-metrics-set-target.component.scss', '../../common.style.scss']
})
export class HealthMetricsSetTargetComponent implements OnInit {

  @Input() data;

  hmst: FormGroup;

  weightTargetError: string = '';
  stepsError: string = '';
  bicycleTargetError: string = '';
  exerciseTargetError: string = '';
  swimmingTargetError: string = '';
  waterIntakeTargetError: string = '';
  sleepHourTargetError: string = '';
  calorieIntakeTargetError: string = '';
  calorieBurnTargetError: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    console.log('this is data', this.data);
    this.initHealthMetricsSetTargetForm();
  }

  initHealthMetricsSetTargetForm() {
    this.hmst = this.formBuilder.group({
      weightTarget: [''],
      weightTargetUnit: ['kg'],
      stepTarget: [''],
      stepTargetUnit: ['Per Day'],
      bicycleTarget: [''],
      bicycleTargetUnit: ['mins'],
      exerciseTarget: [''],
      exerciseTargetUnit: ['mins'],
      swimmingTarget: [''],
      swimmingTargetUnit: ['mins'],
      waterIntakeTarget: [''],
      calorieIntakeTarget: [''],
      calorieBurnTarget: [''],
      sleepHourTarget: [''],
    });
  }

  checkWeightTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkWeightTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.weightTargetError = 'This field is required.';
        return true;
      }
  }

  checkStepsStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkStepsError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.stepsError = 'This field is required.';
        return true;
      }
  }

  checkBicycleTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkBicycleTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.bicycleTargetError = 'This field is required.';
        return true;
      }
  }

  checkExerciseTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkExerciseTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.exerciseTargetError = 'This field is required.';
        return true;
      }
  }

  checkSwimmingTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkSwimmingTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.swimmingTargetError = 'This field is required.';
        return true;
      }
  }

  checkWaterIntakeTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkWaterIntakeTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.waterIntakeTargetError = 'This field is required.';
        return true;
      }
  }

  checkCalorieBurnTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkCalorieBurnTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.calorieBurnTargetError = 'This field is required.';
        return true;
      }
  }

  checkSleepHourTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkSleepHourTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.sleepHourTargetError = 'This field is required.';
        return true;
      }
  }

  checkCalorieIntakeTargetStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('pattern')) {
        return true;
      }
  }

  checkCalorieIntakeTargetError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.calorieIntakeTargetError = 'This field is required.';
        return true;
      }
  }

  callSaveTarget() {
    this.saveTarget();
  }

  async saveTarget() {
    console.log('this si saveTarget');
    let content = {
      patientId: this.data?.remoteMonitoringData?.patientId,
      weightTarget: parseFloat(this.hmst.get('weightTarget').value), // Float
      weightTargetUnit: this.hmst.get('weightTargetUnit').value, // String
      stepTarget: parseInt(this.hmst.get('stepTarget').value), // Int
      stepTargetUnit: "Per Day", // String
      bicycleTarget: parseInt(this.hmst.get('bicycleTarget').value), // Int
      bicycleTargetUnit: this.hmst.get('bicycleTargetUnit').value, // String
      exerciseTarget: parseInt(this.hmst.get('exerciseTarget').value), // Int
      exerciseTargetUnit: this.hmst.get('exerciseTargetUnit').value, // String
      swimmingTarget: parseFloat(this.hmst.get('swimmingTarget').value), // Float
      swimmingTargetUnit: this.hmst.get('swimmingTargetUnit').value, // String
      waterIntakeTarget: this.hmst.get('waterIntakeTarget').value, // String
      calorieIntakeTarget: this.hmst.get('calorieIntakeTarget').value, // String
      calorieBurnTarget: this.hmst.get('calorieBurnTarget').value, // String
      sleepHourTarget: this.hmst.get('sleepHourTarget').value // String
    };

    console.log('this is content', content);
    const result: any = await this.graphqlService.getGraphqlData({
      showLoader: true,
      definition: {
        mutation: REMOTE_MONITORING_SET_TARGET,
        variables: {
          rmId: this.data?.remoteMonitoringData?.id,
          content
        },
      },
    });
    console.log('this is result', result);
    if (result) {
      this.close();
    }
  }

  get hmstf() { return this.hmst.controls; }

  close() {
    this.activeModal.close();
  }

}
