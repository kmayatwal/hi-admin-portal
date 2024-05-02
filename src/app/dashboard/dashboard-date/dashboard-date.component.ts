import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-date',
  templateUrl: './dashboard-date.component.html',
  styleUrl: './dashboard-date.component.scss'
})
export class DashboardDateComponent implements OnInit {

  startDate: any;
  endDate: any;

  constructor() { }

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

}
