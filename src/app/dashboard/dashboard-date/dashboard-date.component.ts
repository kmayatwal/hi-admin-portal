import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-date',
  templateUrl: './dashboard-date.component.html',
  styleUrls: ['./dashboard-date.component.scss', '../../common.style.scss']
})
export class DashboardDateComponent implements OnInit {

  @Output('setDate') setDate: EventEmitter<any> = new EventEmitter();

  startDate: any;
  endDate: any;

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

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


  setStartDate($event) {
    if (this.endDate !== '') {
      this.setDate.emit({ startDate: this.startDate, endDate: this.endDate });
      // this.updateAllCharts(
      //   this.defaultDocIds,
      //   this.startDate ?? this.defaultStartDate,
      //   this.endDate ?? this.defaultEndDate
      // );
    }
    // this.getVitalHistory(this.selectedVital, 'random');
  }

  setEndDate($event) {
    if (this.startDate === '')
      this.toastr.error('Please select start date');
    else {
      this.setDate.emit({ startDate: this.startDate, endDate: this.endDate });
      // this.updateAllCharts(
      //   this.defaultDocIds,
      //   this.startDate ?? this.defaultStartDate,
      //   this.endDate ?? this.defaultEndDate
      // );
      // this.selectedTime = 'random';
      // this.getVitalHistory(this.selectedVital, this.selectedTime);
    }
  }

}
