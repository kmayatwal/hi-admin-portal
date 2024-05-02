import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GET_MEDICINE_ANALYTICS, GET_MEDICINE_REMINDER } from 'src/app/graphql.module';
import { GraphqlService } from 'src/app/graphql-service/GraphqlService';
import moment from 'moment-timezone';


@Component({
  selector: 'app-medication-compliance',
  templateUrl: './medication-compliance.component.html',
  styleUrls: ['../../common.style.scss', './medication-compliance.component.scss']
})
export class MedicationComplianceComponent implements OnInit {
  @Input() clinic: any;
  @Input() patientId: any;

  revenueList: any;
  chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  loading = true;
  showDropdown = false;
  selectedDuration = 'week';
  startTime = moment().startOf('week').format('YYYY-MM-DD');
  barChartType = 'bar';
  barChartData = { datasets: [] };
  barChartOptions = {
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: 'x',
      },
    },
    legend: {
        position: 'bottom',
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: 'linear',
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  showDurationList: boolean = false;
  durationDataList = [
    {
      id: 1,
      value: 'Week',
      key: 'week'
    },
    {
      id: 2,
      value: 'Month',
      key: 'month'
    },
    // {
    //   id: 3,
    //   value: 'This Year',
    //   key: 'year'
    // }
  ];
  durationFieldWidth = '';
  duration: string = 'Week';
  takenPercentage = 0;
  medicineList = [];
  showMedicineList = false;
  medicineFieldWidth = '';
  medicine: string = 'All medicines';

  constructor(
    private graphqlService: GraphqlService,
  ) {
  }

  ngOnInit(): void {
    this.getMedicineAnalytics();
    this.getAllMedicineReminder();
  }

  changedValue() {
    this.showDropdown = !this.showDropdown;
  }

  get getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = daysInMonth;
      arrDays.push(current);
      daysInMonth--;
    }

    return arrDays.reverse();
  }

  get totalTakenPercentage() {
    return this.takenPercentage;
  }

  get dateRange() {
    return `${moment(this.startTime).format('DD MMM YYYY')} / ${moment().format('DD MMM YYYY')}`;
  }

  openMedicineList() {
    let medicineField = document.getElementById('medicineField') as HTMLDivElement;
    let medicineInputField = document.getElementById('medicineInputField') as HTMLInputElement;
    medicineInputField.focus();
    this.medicineFieldWidth = `${medicineField.offsetWidth}px`;
    this.showMedicineList = true;
  }
  setMedicine($event) {
    let medicineInputField = document.getElementById('medicineInputField') as HTMLInputElement;
    medicineInputField.blur();
    this.medicine = $event.value;
    this.showMedicineList = false;
    this.getMedicineAnalytics($event.id);
  }

  openDurationList() {
    let durationField = document.getElementById('durationField') as HTMLDivElement;
    let durationInputField = document.getElementById('durationInputField') as HTMLInputElement;
    durationInputField.focus();
    this.durationFieldWidth = `${durationField.offsetWidth}px`;
    this.showDurationList = true;
  }

  setDuration($event) {
    let durationInputField = document.getElementById('durationInputField') as HTMLInputElement;
    durationInputField.blur();
    this.duration = $event.value;
    this.selectDuration($event.key);
    this.showDurationList = false;
  }

  selectDuration(time) {
    this.selectedDuration = time;
    this.revenueList = [];
    this.showDropdown = false;
    if (time === 'week') {
      this.startTime = moment().startOf('week').format('YYYY-MM-DD');
      this.chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      this.barChartOptions.scales.xAxes = [{
        stacked: true,
        gridLines: {
          display: false,
        }
      }];
    } else if (time === 'month') {
        this.startTime = moment().startOf('year').format('YYYY-MM-DD');
        this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        this.barChartOptions.scales.xAxes = [{
            stacked: true,
            gridLines: {
                display: false,
            }
        }];
    } else if (time === 'year') {
      this.startTime = moment().startOf('year').format('YYYY-MM-DD');
      this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      this.barChartOptions.scales.xAxes = [{
        stacked: true,
        gridLines: {
          display: false,
        }
      }];
    }
    this.getMedicineAnalytics();
  }

  private async getMedicineAnalytics(medicineId = null) {
    let totalTaken = 0;
    let total = 0;
    this.loading = true;
    const result: any = await this.graphqlService.getGraphqlData({
      definition: {
        query: GET_MEDICINE_ANALYTICS,
        variables: {
          patientId: this.patientId,
          startDate: this.startTime,
          endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          ...(medicineId && {medicineId})
        },
      },
    });

    this.revenueList = result.data.getMedicineAnalytics || [];
    let data = [];
    let notTakenData = [];
    let unMarkedData = [];
    this.loading = false;
    if (this.revenueList) {
      if (this.selectedDuration === 'week') {
        data = Array.from({ length: 7 }, () => 0);
        notTakenData = Array.from({ length: 7 }, () => 0);
        unMarkedData = Array.from({ length: 7 }, () => 0);
      }
      if (this.selectedDuration === 'month') {
        data = Array.from({ length: 12 }, () => 0);
        notTakenData = Array.from({ length: 12 }, () => 0);
        unMarkedData = Array.from({ length: 12 }, () => 0);
      }

    const {notTaken, taken, unMarked} = this.revenueList;
    this.chartLabels?.forEach((item, index) => {
        if (taken[index]) {
            const findIndex = this.chartLabels?.indexOf(taken[index].key);
            if (findIndex !== -1) {
                data[findIndex] = taken[index].value;
                totalTaken += taken[index].value;
                total += taken[index].value;
            }
        }
        if (notTaken[index]) {
            const findIndex = this.chartLabels?.indexOf(notTaken[index].key);
            if (findIndex !== -1) {
                notTakenData[findIndex] = notTaken[index].value;
                total += notTaken[index].value;
            }
        }
        if (unMarked[index]) {
            const findIndex = this.chartLabels?.indexOf(unMarked[index].key);
            if (findIndex !== -1) {
                unMarkedData[findIndex] = unMarked[index].value;
                total += unMarked[index].value;
            }
        }
        this.takenPercentage = total ? ((totalTaken * 100) / total) : 0;
    });
      this.barChartData = {
        datasets: [
          { data, label: 'Taken', backgroundColor: "#34C38F" },
          { data: notTakenData, label: 'Not taken', backgroundColor: "#F46A6A" },
          { data: unMarkedData, label: 'Unmarked', backgroundColor: "#FFBC00" }
        ]
      };
    }
  }

  async getAllMedicineReminder() {
    const result: any = await this.graphqlService.getGraphqlData({
        definition: {
          query: GET_MEDICINE_REMINDER,
          variables: {
            patientId: this.patientId,
          },
        },
      });

      this.medicineList = result.data.getAllMedicineReminder?.map((item) => {
        return {
            id: item.id,
            value: item.genericName,
            key: item.id,
          };
      });
      this.medicineList.unshift({
        id: null,
        value: 'All medicines',
        key: null,
      });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (document.getElementById('durationField') && !document.getElementById('durationField').contains(event.target)) {
      this.showDurationList = false;
    }
    if (document.getElementById('medicineField') && !document.getElementById('medicineField').contains(event.target)) {
      this.showMedicineList = false;
    }

  }
}
