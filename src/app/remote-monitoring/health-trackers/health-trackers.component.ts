import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { StateService } from '../../stateService';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import { MASTER_DATA } from 'src/app/graphql.module';
import { format } from 'date-fns';

@Component({
  selector: 'app-health-trackers',
  templateUrl: './health-trackers.component.html',
  styleUrls: ['../../common.style.scss', './health-trackers.component.scss',]
})
export class HealthTrackersComponent implements OnInit {

  @Input() createRemoteMonitoringPlanObject: any;
  @Input() rmHealthTrackersString: any;
  @Output('next') next: EventEmitter<any> = new EventEmitter();
  @Output('previous') previous: EventEmitter<any> = new EventEmitter();
  healthTrackersFormGroup: FormGroup;
  showVitalList = -1;
  vitalFielddWidth = '';
  vitalDataList = [];
  selectedTimeArray = [];

  constructor(
    public stateService: StateService,
    private formBuilder: FormBuilder,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.initHealthTrackerForm();
    this.getVitalsName();
  }

  get isVitalSelected() {
    if (this.trackerFormControl?.controls?.length) {
      const firstVital = this.trackerFormControl?.controls[0];
      return !!(firstVital.value?.vitalName?.length && firstVital.value?.vitalTime?.length);
    }
    return false;
  }

  goToNext() {
    let rmHealthTrackers = [];
    let rmHealthTrackersString = [];
    if (this.trackerFormControl?.controls?.length) {
      rmHealthTrackersString = this.trackerFormControl?.controls?.map((item, index) => {
        this.selectedTimeArray[index]?.forEach((time, index1) => {
          rmHealthTrackers.push({
            vitalId: item.value?.vitalId,
            vitalName: item.value?.vitalName,
            time: format(new Date(`Jan 1 2000 ${time}`), 'HH:mm'),
            ...((item.value?.id) && { id: this.formatId(item.value?.id, index1) })
          });
        });
        return { vitalId: item.value?.vitalId, vitalName: item.value?.vitalName, time: this.selectedTimeArray[index].join(' '), ...((item.value?.id) && { id: item.value?.id, }) }
      });
    }
    let obj = {
      key: 'careTeam',
      rmHealthTrackers,
      rmHealthTrackersString
    }
    this.next.next(obj);
  }
  formatId(ids, index) {
    return ids?.split(', ')[index];
  }
  selectTime(time, index) {
    if (this.selectedTimeArray[index]) {
      this.selectedTimeArray[index].push(time);
    } else {
      this.selectedTimeArray[index] = [time];
    }
    this.trackerFormControl.controls[index].get('vitalTime').setValue(this.selectedTimeArray[index]?.join(' , '));
  }

  goBack() {
    this.previous.next('planOverview');
  }

  initHealthTrackerForm() {
    this.healthTrackersFormGroup = this.formBuilder.group({
      healthTrackersFormArray: this.formBuilder.array([this.createExisitingMedicalHistoryItem()]),
    });

    if (this.rmHealthTrackersString?.length > 1) {
      const length = this.rmHealthTrackersString?.length - 1;
      const array = Array.from(Array(length).keys());

      array.forEach((item) => this.addExisitngMedicalHistoryItem());
    }
  }

  createExisitingMedicalHistoryItem() {
    return this.formBuilder.group({
      vitalName: ['', [Validators.required]],
      vitalTime: ['', [Validators.required]],
      vitalId: [''],
      id: ['']
    });
  }

  checkOnSetDateStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        return true;
      }
  }

  addExisitngMedicalHistoryItem(): void {
    this.trackerFormControl.push(this.createExisitingMedicalHistoryItem());
  }

  deleteExisitingMedicalHistoryItem(treatmentIndex: number, removeItem) {
    this.selectedTimeArray.splice(treatmentIndex, 1);
    this.trackerFormControl.removeAt(treatmentIndex);
  }

  openVitalist(i) {
    const vitalField = document.getElementById(`vitalField_${i}`) as HTMLDivElement;
    const vitalInputField = document.getElementById('vitalInputField') as HTMLInputElement;
    vitalInputField.focus();
    this.vitalFielddWidth = `${vitalField.offsetWidth}px`;
    this.showVitalList = i;
  }
  setVital($event, i) {
    this.trackerFormControl.controls[i].get('vitalName').setValue($event.value);
    this.trackerFormControl.controls[i].get('vitalId').setValue($event.vitalId);
    this.showVitalList = -1;
  }

  async getVitalsName() {
    const reemoveArray = ['blood group', 'height', 'weight', 'bone mass', 'hydration', 'head circumference'];
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: MASTER_DATA,
        variables: {
          type: "vitals"
        }
      },
    });
    if (result) {
      result.data.getMasterDataByType?.forEach((item, index) => {
        if (reemoveArray.indexOf(item.name?.toLowerCase()) === -1) {
          this.vitalDataList.push({ id: index, value: item.name, vitalId: item.id });
        }
      });
    }
    if (this.rmHealthTrackersString?.length) {
      this.rmHealthTrackersString?.forEach((item, index) => {
        this.trackerFormControl.controls[index].get('vitalName').setValue(item.vitalName);
        this.trackerFormControl.controls[index].get('vitalId').setValue(item.vitalId);
        this.trackerFormControl.controls[index].get('vitalTime').setValue(item.time?.replaceAll('M ', 'M, '));
        this.trackerFormControl.controls[index].get('id').setValue(item.id);
        if (this.selectedTimeArray[index]) {
          this.selectedTimeArray[index].push(item.time);
        } else {
          this.selectedTimeArray[index] = this.formatTime(item.time);
        }
      });
    }
  }

  formatTime(timeString) {
    const timeArray = timeString?.replaceAll(',', '')?.split(' ');
    const formattedTimeArray = [];
    for (let i = 0; i < timeArray.length; i += 2) {
      const time = timeArray[i] + ' ' + timeArray[i + 1];
      formattedTimeArray.push(time);
    }

    return formattedTimeArray;
  }

  get mainTrackerFormControl() { return this.healthTrackersFormGroup.controls; }
  get trackerFormControl() { return this.healthTrackersFormGroup.controls["healthTrackersFormArray"] as FormArray }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (document.getElementById(`vitalField_${this.showVitalList}`) && !document.getElementById(`vitalField_${this.showVitalList}`).contains(event.target)) {
      this.showVitalList = -1;
    }

  }
}
