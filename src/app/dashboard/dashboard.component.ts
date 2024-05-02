import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chart } from "chart.js";
import { StateService } from "src/app/stateService";
import { GraphqlService } from "src/app/graphql-service/GraphqlService";
import {
  audienceByGenderChartConfig,
  healthMetricChartConfig,
  medicalComplianceChartConfig,
  vitalRecordingChartConfig,
  ageDistributionChartConfig
} from "./summaryCharts.config";
import {
  getAllMedicinesByDoctors,
  getAllPatients,
  getAudienceByGender,
  getFrequencyOfVitalRecording,
  getHealthMetric,
  getMedicalCompliance,
  getPatientAgeDistribution,
} from "./chart.apis";
import { formatDate } from "src/app/_helpers/utils.helpers";
import { GET_CLINIC } from "src/app/graphql.module";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  @Input() docIds;

  startDate: any;
  endDate: any;

  defaultDocIds: any;
  defaultStartDate: any;
  defaultEndDate: any;

  ageDistributionData: any = [];
  myOldAgeDistributionChart: any;
  vitalRecordingData: any = [];
  myOldVitalRecordingChart: any;
  audienceByGenderData: any = [];
  myOldAudienceByGenderChart: any;
  medicalComplianceData: any = [];
  myOldMedicalComplianceChart: any;
  listOfMedicines: any = [];
  listOfPatients: any = [];
  healthMetricData: any = [];
  myOldHealthMetricChart: any;
  selectedMedicine: any;
  selectedPatient: any;
  weeklyRangedSDate: any;
  weeklyRangedEDate: any;
  dateRange: string = "Monthly";

  constructor(
    private graphqlService: GraphqlService,
    private stateService: StateService
  ) { }

  getClinicData = async () => {
    const result: any = await this.graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_CLINIC,
        variables: {
          clinicId: this.stateService.selectedClinic$.clinicId,
        },
      },
    });

    this.defaultDocIds = result.data.getClinic.doctors.map(
      (docs) => docs.doctorId
    );
  };

  ngOnInit() {
    this.stateService.selectedClinic$ = {
      clinicId: '572'
    }
    const currentDate = new Date();

    this.startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    this.endDate = new Date();

    this.defaultStartDate = formatDate(this.startDate, "yyyy-MM-dd");
    this.defaultEndDate = formatDate(this.endDate, "yyyy-MM-dd");

    this.getClinicData().then(() =>
      this.updateAllCharts(
        this.defaultDocIds,
        this.defaultStartDate,
        this.defaultEndDate
      )
    );
    // this.getCountries("country", "");
    this.getAdditionalData();
  }

  setDate($event) {

    this.startDate = $event.startDate;
    this.endDate = $event.endDate;

    this.updateAllCharts(
      this.defaultDocIds,
      this.startDate ?? this.defaultStartDate,
      this.endDate ?? this.defaultEndDate
    );
  }


  getAdditionalData() {
    const filterInput = {
      timeOffset: -new Date().getTimezoneOffset(),
    };

    getAllPatients(this.graphqlService, this.stateService, filterInput).then(
      (res) => {
        this.listOfPatients = res?.patientAppointments;
      }
    );

    getAllMedicinesByDoctors(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.listOfMedicines = res;
    });
  }

  updateAllCharts(doctorId, startDate, endDate) {
    const filterInput = {
      doctorId,
      startDate,
      endDate,
      timeOffset: -new Date().getTimezoneOffset(),
    };

    getMedicalCompliance(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.medicalComplianceData = res;
      this.initiateMedicalComplianceChart();
    });

    getFrequencyOfVitalRecording(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.vitalRecordingData = res;
      this.initiateVitalRecordingChart();
    });

    getAudienceByGender(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.audienceByGenderData = res;
      this.initiateAudienceByGenderChart();
    });

    getHealthMetric(this.graphqlService, this.stateService, filterInput).then(
      (res) => {
        this.healthMetricData = res;
        this.initiateHealthMetricChart();
      }
    );

    getPatientAgeDistribution(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.ageDistributionData = res;
      this.initiateAgeDistributionChart();
    });
  }

  showNoData(
    type: boolean,
    noDataDivId: string,
    ctxId: string,
    wrapperDivId: string
  ) {
    const div: any = document.getElementById(noDataDivId);
    const graph: any = document.getElementById(ctxId);
    const wrapperDiv: any = document.getElementById(wrapperDivId);

    if (type) {
      graph.classList.add("d-none");
      div.classList.remove("d-none");
      wrapperDiv.classList.add("mh-100");
      wrapperDiv.classList.remove("max-25");
      wrapperDiv.classList.remove("max-12");
    } else {
      div.classList.add("d-none");
      graph.classList.remove("d-none");
      wrapperDiv.classList.remove("mh-100");
    }
  }

  initiateMedicalComplianceChart() {
    const ctx: any = document.getElementById("medicalComplianceChart");
    const legend: any = document.getElementById(
      "medicalComplianceChartLegends"
    );
    const data = medicalComplianceChartConfig(this.medicalComplianceData);
    const checkTaken = this.medicalComplianceData["taken"].some(
      (element) => element?.value
    );
    const checkNotTaken = this.medicalComplianceData["notTaken"].some(
      (element) => element?.value
    );
    const checkUnMarked = this.medicalComplianceData["unMarked"].some(
      (element) => element?.value
    );
    const consistsData = checkTaken || checkNotTaken || checkUnMarked;

    if (consistsData) {
      legend.classList.remove("d-none");
      this.showNoData(
        false,
        "noShowMedicalComplianceDiv",
        "medicalComplianceChart",
        "medicalComplianceChartWrapper"
      );

      if (this.myOldMedicalComplianceChart) {
        this.myOldMedicalComplianceChart.data = data;
        this.myOldMedicalComplianceChart.update();
      } else {
        this.myOldMedicalComplianceChart = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            plugins: {
              legend: {
                display: false
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                  display: false,
                },
              },
              y: { stacked: true },
            },
          },
        });
      }
    } else {
      this.showNoData(
        true,
        "noShowMedicalComplianceDiv",
        "medicalComplianceChart",
        "medicalComplianceChartWrapper"
      );
    }
  }

  onMedicineChange(e) {
    this.selectedMedicine = e.target.value;

    const filterInput = {
      startDate:
        formatDate(this.startDate, "yyyy-MM-dd") ?? this.defaultStartDate,
      endDate: formatDate(this.endDate, "yyyy-MM-dd") ?? this.defaultEndDate,
      doctorId: this.docIds ?? this.defaultDocIds,
      medicineId: e.target.value === "all" ? "" : e.target.value,
      patientId: this.selectedPatient,
    };

    getMedicalCompliance(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.medicalComplianceData = res;
      this.initiateMedicalComplianceChart();
    });
  }

  onPatientChange(e) {
    console.log(e.target.value);
    this.selectedPatient = e.target.value;

    const filterInput = {
      startDate:
        formatDate(this.startDate, "yyyy-MM-dd") ?? this.defaultStartDate,
      endDate: formatDate(this.endDate, "yyyy-MM-dd") ?? this.defaultEndDate,
      doctorId: this.docIds ?? this.defaultDocIds,
      patientId: e.target.value === "all" ? "" : e.target.value,
      medicineId: this.selectedMedicine,
    };

    getMedicalCompliance(
      this.graphqlService,
      this.stateService,
      filterInput
    ).then((res) => {
      this.medicalComplianceData = res;
      this.initiateMedicalComplianceChart();
    });
  }

  initiateVitalRecordingChart() {
    const ctx: any = document.getElementById("vitalRecordingChart");
    const data = vitalRecordingChartConfig(this.vitalRecordingData);
    const consistsData = (element) => element.frequencyCount;
    const check = this.vitalRecordingData.some(consistsData);

    if (check) {
      this.showNoData(
        false,
        "noShowVitalRecordingDiv",
        "vitalRecordingChart",
        "vitalRecordingChartWrapper"
      );

      if (this.myOldVitalRecordingChart) {
        this.myOldVitalRecordingChart.data = data;
        this.myOldVitalRecordingChart.update();
      } else {
        this.myOldVitalRecordingChart = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            plugins: {
              legend: {
                display: false
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      }
    } else {
      this.vitalRecordingData = [];
      this.showNoData(
        true,
        "noShowVitalRecordingDiv",
        "vitalRecordingChart",
        "vitalRecordingChartWrapper"
      );
    }
  }

  initiateAudienceByGenderChart() {
    const ctx: any = document.getElementById("audienceByGenderChart");
    const legendsDiv: any = document.getElementById(
      "audienceByGenderChartLegends"
    );
    const data = audienceByGenderChartConfig(this.audienceByGenderData);
    const consistsData = this.audienceByGenderData;
    const check =
      consistsData?.totalMale ||
        consistsData?.totalFemale ||
        consistsData?.totalOther
        ? true
        : false;

    if (consistsData && check) {
      legendsDiv.classList.remove("d-none");
      this.showNoData(
        false,
        "noShowAudienceByGenderDiv",
        "audienceByGenderChart",
        "audienceByGenderChartWrapper"
      );

      if (this.myOldAudienceByGenderChart) {
        this.myOldAudienceByGenderChart.data = data;
        this.myOldAudienceByGenderChart.update();
      } else {
        this.myOldAudienceByGenderChart = new Chart(ctx, {
          type: "doughnut",
          data: data,
          options: {
            plugins: {
              legend: {
                display: false
              },
            },
            responsive: true,
          },
        });
      }
    } else {
      this.audienceByGenderData = [];
      this.showNoData(
        true,
        "noShowAudienceByGenderDiv",
        "audienceByGenderChart",
        "audienceByGenderChartWrapper"
      );
    }
  }

  initiateHealthMetricChart() {
    const ctx: any = document.getElementById("healthMetricChart");
    const data = healthMetricChartConfig(this.healthMetricData);

    if (this.healthMetricData.length) {
      this.showNoData(
        false,
        "noDataHealthMetricDiv",
        "healthMetricChart",
        "healthMetricChartWrapper"
      );
      if (this.myOldHealthMetricChart) {
        this.myOldHealthMetricChart.data = data;
        this.myOldHealthMetricChart.update();
      } else {
        this.myOldHealthMetricChart = new Chart(ctx, {
          type: "line",
          data: data,
          options: {
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false
              },
            },
          },
        });
      }
    } else {
      this.healthMetricData = [];
      this.showNoData(
        true,
        "noDataHealthMetricDiv",
        "healthMetricChart",
        "healthMetricChartWrapper"
      );
    }
  }

  initiateAgeDistributionChart() {
    const ctx: any = document.getElementById("ageDistributionChart");
    const data = ageDistributionChartConfig(this.ageDistributionData);
    const consistsData = (element) => element.totalMale || element.totalFemale;
    const check = this.ageDistributionData.some(consistsData);

    if (check) {
      this.showNoData(
        false,
        "noShowAgeDistributionDiv",
        "ageDistributionChart",
        "ageDistributionWrapper"
      );

      if (this.myOldAgeDistributionChart) {
        this.myOldAgeDistributionChart.data = data;
        this.myOldAgeDistributionChart.update();
      } else {
        this.myOldAgeDistributionChart = new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            plugins: {
              legend: {
                display: false
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      }
    } else {
      this.ageDistributionData = [];
      this.showNoData(
        true,
        "noShowAgeDistributionDiv",
        "ageDistributionChart",
        "ageDistributionWrapper"
      );
    }
  }

  getBorderStyle(index, deg) {
    let style = {};
    switch (index) {
      case 0:
        style = `conic-gradient(#3498db ${deg}deg, #F5F1FD 0deg)`;
        break;
      case 1:
        style = `conic-gradient(#45C49C ${deg}deg, #ECF8F5 0deg)`;
        break;
      case 2:
        style = `conic-gradient(#FC5A5A ${deg}deg, #FFF5ED 0deg)`;
        break;
      case 3:
        style = `conic-gradient(#45B275 ${deg}deg, #E6E6E6 0deg)`;
        break;
      case 4:
        style = `conic-gradient(#FCA600 ${deg}deg, #FFF6E6 0deg)`;
        break;
      case 5:
        style = `conic-gradient(#3498db ${deg}deg, #FFF5ED 0deg)`;
        break;
      default:
        style = `conic-gradient(#FFF5ED ${deg}deg, #F5F1FD 0deg)`;
    }

    return { background: style };
  }

  getFormattedDate() {
    const my_start_date = this.startDate ?? this.defaultStartDate;
    const myStartDate = new Date(my_start_date);
    const formattedSDate = formatDate(myStartDate, "mm yy");

    const my_end_date = this.endDate ?? this.defaultEndDate;
    const myEndDate = new Date(my_end_date);
    const formattedEDate = formatDate(myEndDate, "mm yy");

    return `${formattedSDate} - ${formattedEDate}`;
  }


  getWeeklyRange() {
    const my_start_date = this.startDate ?? this.defaultStartDate;
    const myStartDate: any = new Date(my_start_date);
    const formattedSDate = formatDate(myStartDate, "dd-mm-yy");
    const my_end_date = this.endDate ?? this.defaultEndDate;
    const myEndDate: any = new Date(my_end_date);
    const formattedEDate = formatDate(myEndDate, "dd-mm-yy");

    this.weeklyRangedEDate = formatDate(myStartDate, "yyyy-MM-dd");
    this.weeklyRangedSDate = formatDate(myEndDate, "yyyy-MM-dd");

    //* Calculate time difference in milliseconds
    const timeDifference = myEndDate - myStartDate;

    //* Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.abs(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
    const hours = Math.abs(
      Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = Math.abs(
      Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days >= 365) {
      this.dateRange = "Yearly";
    } else if (days < 365 && days >= 30) {
      this.dateRange = "Monthly";
    } else if (days < 30 && days >= 7) {
      this.dateRange = "Weekly";
    } else if (days < 7) {
      this.dateRange = "Daily";
    }

    return `${formattedSDate} - ${formattedEDate}`;
  }

  getPercentage(data: any, type: string) {
    let myValue = 0;
    let sumOfTaken = 0;
    let sumOfNotTaken = 0;
    let sumOfUnmarked = 0;
    let total = 0;

    if (data) {
      data.taken.forEach((val) => (sumOfTaken += val.value));
      data.notTaken.forEach((val) => (sumOfNotTaken += val.value));
      data.unMarked.forEach((val) => (sumOfUnmarked += val.value));
      total = sumOfTaken + sumOfNotTaken + sumOfUnmarked;
      myValue = Math.round((sumOfTaken / total) * 100);

      if (type === "total-360") {
        //? Multiplied by 3.6 as in this case percentage is used for deg of circle
        myValue = Math.round(myValue * 3.6);
      }
    }

    return isNaN(myValue) ? 0 : myValue;
  }

}
