import { Component, ElementRef, OnInit, OnChanges, ViewChild, Input, Renderer2, NgZone } from '@angular/core';
import moment from 'moment-timezone';
import { VitalUtils } from './vital-utils';
import {
  VitalBloodPressureRules
} from 'src/app/chart/vital-rules';
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  @ViewChild('tooltip0') tooltip0Ref: ElementRef;
  @ViewChild('tooltip1') tooltip1Ref: ElementRef;
  @ViewChild('chartjs-tooltip') chartjstooltipRef: ElementRef;
  @Input() graph: any;
  @Input() vitalType: any;
  @Input() readingType: any;

  legend: boolean = false;
  hasChartData = false;

  chartType: string = 'line';
  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  chartColors: Array<any> = [];
  chartBackgroundColor: Array<any> = [];
  chartOptions: any = {};
  chartClicked(e: any): void { }
  chartHovered(e: any): void { }
  chartCanvas: HTMLCanvasElement;
  vitalHistory: Array<any> = [];

  vitalName: string = '';
  vitalIdealValue: string = '';
  vitalUnit: string = '';

  htmlContent: string[] = [];
  vitalRule: any;


  constructor(private renderer: Renderer2, private zone: NgZone) { }

  ngOnChanges(changes: any) {
    if (!changes.graph.currentValue.chartDatasets || !changes.graph.currentValue.chartLabels) {
      this.hasChartData = false;
      return;
    }


    this.zone.runOutsideAngular(() => {

      this.hasChartData = true;
      // let myCanvas = this.myCanvas;
      const canvasElement: HTMLCanvasElement = this.myCanvas.nativeElement;
      this.chartOptions = VitalUtils.getChartOptionByFilter({
        filter: changes.graph.currentValue.time,
        timezone: moment.tz.guess(),
        xInterval: 3,
        currentDate: moment().format('l'),
        myCanvas: canvasElement,
        startDate: changes.graph.currentValue.startDate,
        endDate: changes.graph.currentValue.endDate,
        toolTipFunction: this.toolTipFunction
      });

      const chartData = changes.graph.currentValue.chartDatasets.map(tt =>
        ({ data: tt.data.map(itm => itm.value) })
      );

      const { data } = changes.graph.currentValue.chartDatasets[0];
      this.vitalRule = data && data.length > 0 ? data[0].rule : undefined;
      let unit = data && data.length > 0 ? data[0].unit : '';

      this.setVitalNameAndIdealValue(this.vitalType, unit);
      if (this.vitalType === 'bloodPressure') {
        const array1 = changes.graph.currentValue.chartDatasets[0].data;
        const array2 = changes.graph.currentValue.chartDatasets[1].data;

        const tempArray = array1.map((item1, index) => ({
          value: `${array2[index].value}/${item1.value}`
        }));

        this.vitalHistory = tempArray;

        this.chartBackgroundColor = tempArray.map((item) => {
          return this.bloodPressureChart(item).color;
        });
      } else {
        this.chartBackgroundColor = data.map((item) => {
          return this.getVitalFormatting(item.rule, item.value).color;
        });
      }

      this.chartDatasets = chartData;
      this.chartLabels = changes.graph.currentValue.chartLabels;
      console.log('this is chartLabels', this.chartLabels);
      console.log('this is chartDatasets', this.chartDatasets);
      console.log('this is chartOptions', this.chartOptions);

      this.addGradient();
      // Chart.register(Chart.defaults)
      // Chart.register(Chart.);
      // let labses = this.getLables({
      //   filter: changes.graph.currentValue.time,
      //   timezone: moment.tz.guess(),
      //   xInterval: 3,
      //   currentDate: moment().format('l'),
      //   myCanvas: canvasElement,
      //   toolTipFunction: this.toolTipFunction
      // });
      // console.log('this is labses', labses);
      // Get the canvas element
      var canvas = document.getElementById('chartcomponent');

      // Check if a chart instance is already associated with the canvas
      if (canvas) {
        // Get the chart instance from the canvas
        var chartInstance = Chart.getChart(canvas as HTMLCanvasElement);

        // If a chart instance exists, destroy it
        if (chartInstance) {
          chartInstance.destroy();
        }
      }

      this.hasChartData = true;
      let dataset_1 = [];
      let dataset_2 = [];
      let dataSet = []
      this.chartDatasets[0].data.map((item, index) => {
        dataset_1.push({
          x: this.chartLabels[index],
          y: item
        });
      });
      dataSet.push({
        data: dataset_1,
        fill: false,
        borderWidth: 2,
        pointBorderColor: '#FFF',
        borderColor: '#057CC3',
        pointBackgroundColor: this.chartBackgroundColor,
        tension: 0,
        showLine: true,
        pointRadius: 5,
      });
      if (this.chartDatasets.length > 1) {
        this.chartDatasets[1].data.map((item, index) => {
          dataset_2.push({
            x: this.chartLabels[index],
            y: item
          });
        });
        dataSet.push({
          data: dataset_2,
          fill: false,
          borderWidth: 2,
          pointBorderColor: '#FFF',
          borderColor: '#51BE98',
          pointBackgroundColor: this.chartBackgroundColor,
          tension: 0,
          showLine: true,
          pointRadius: 5,
        });
      }

      console.log('this is dataSet', dataSet);

      let myChart = new Chart('chartcomponent', {
        type: 'line',
        data: {
          datasets: dataSet
          // labels: this.chartLabels,
          // labels: [labses],
          // datasets: [{
          //   // data: this.chartDatasets[0].data,
          //   data: dataset_1,
          //   // data: this.chartDatasets,
          //   fill: false,
          //   // backgroundColor: Utils.CHART_COLORS.blue,
          //   // borderColor: Utils.CHART_COLORS.blue,
          //   // label: '',
          //   borderWidth: 2,
          //   pointBorderColor: '#FFF',
          //   borderColor: '#057CC3',
          //   // pointHoverBackgroundColor: '#51BE98',
          //   pointBackgroundColor: this.chartBackgroundColor,
          //   tension: 0,
          //   showLine: true,
          //   // fill: 0,
          //   pointRadius: 5,
          //   // pointHoverBorderColor: '#FFFFFF'
          //   // pointBorderColor: '#FFFFFF'
          // }],
        },
        options: this.chartOptions
      });
      myChart.update();
    });
  }

  bloodPressureChart(vital) {
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

  setVitalNameAndIdealValue(val, unit) {
    switch (val) {
      case 'temperature':
        this.vitalName = 'Temperature';
        if (unit === '°Fahrenheit') {
          this.vitalIdealValue = 'Ideal Value: 96 °F';
          this.vitalUnit = '°F';
        }
        else {
          this.vitalIdealValue = 'Ideal Value: 36 °C';
          this.vitalUnit = '°C';
        }
        break;
      case 'pulse':
        this.vitalName = 'Pulse';
        this.vitalIdealValue = 'Ideal Value: 72 BPM';
        this.vitalUnit = 'BPM';
        break;
      case 'bloodPressure':
        this.vitalName = 'Blood Pressure';
        this.vitalIdealValue = 'Ideal Value: 120/80';
        this.vitalUnit = '';
        break;
      case 'bloodOxygen':
        this.vitalName = 'Blood Oxygen';
        this.vitalIdealValue = 'Ideal Value: 96% - 100%';
        this.vitalUnit = '%';
        break;
      case 'respiratoryRate':
        this.vitalName = 'Respiratory Rate';
        this.vitalIdealValue = 'Ideal Value: 15 BPM';
        this.vitalUnit = 'BPM';
        break;
      case 'bloodSugar':
        if (this.readingType === 'HbA1C') {
          this.vitalName = 'HbA1C';
          this.vitalIdealValue = 'Ideal 4-5.6%';
        } else {
          this.vitalName = 'Blood Sugar';
          this.vitalIdealValue = 'Ideal Value: 120 mg/dL';
        }
        this.vitalUnit = unit;
        break;
      case 'headCircumference':
        this.vitalName = 'Head Circumference';
        break;
      case 'boneMass':
        this.vitalName = 'Bone Mass';
        break;
      case 'hydration':
        this.vitalName = 'Hydration';
        break;
      default:
        this.vitalName = '';
    }
    this.htmlContent[1] = this.vitalName;
    this.htmlContent[7] = this.vitalIdealValue;
  }

  toolTipFunction = (tooltips, myCanvas) => {
    let tooltip = tooltips.tooltip;
    this.myCanvas.nativeElement.style.cursor = 'pointer';

    const positionY = myCanvas.offsetTop;
    const positionX = myCanvas.offsetLeft;

    const tooltip0Element = this.renderer.selectRootElement('#tooltip0');
    const tooltip1Element = this.renderer.selectRootElement('#tooltip1');

    this.renderer.setStyle(tooltip0Element, 'opacity', '0');
    this.renderer.setStyle(tooltip1Element, 'opacity', '0');

    if (tooltip && tooltip.opacity === 0) {
      return;
    }

    console.log('this is tooltip.dataPoints', tooltip);
    if (tooltip.dataPoints.length > 0) {
      // tooltip.dataPoints.forEach((dataPoint) => {
      let dataPoint = tooltip.dataPoints[0];
      // var content = [dataPoint.xLabel, dataPoint.yLabel].join(': ');
      // const tooltipId = `tooltip${dataPoint.datasetIndex}`;
      // console.log('this is ', this);
      console.log('this is datapoint', dataPoint);
      this.htmlContent[9] = `Recorded on ${dataPoint.label}`;
      let vitalProperties;
      if (this.vitalType === 'bloodPressure') {
        vitalProperties = this.bloodPressureChart(this.vitalHistory[dataPoint.dataIndex]);
      } else
        vitalProperties = this.getVitalFormatting(this.vitalRule, dataPoint.formattedValue);
      this.htmlContent[5] = `color: ${vitalProperties.color}">${this.vitalType === 'bloodPressure' ? this.vitalHistory[dataPoint.dataIndex].value : dataPoint.formattedValue} ${this.vitalUnit}`;
      if (vitalProperties.range === 'normal') {
        this.htmlContent[3] = `<div class="dot-green" style="height: 12px; width: 12px; background: green; border-radius: 50%;"></div>`;
      }
      if (vitalProperties.range === 'risk') {
        this.htmlContent[3] = `<div class="dot-green moderate" style="height: 12px; width: 12px; background: #fca600 !important; border-radius: 50%;"></div>`;
      }
      if (vitalProperties.range === 'emergency') {
        this.htmlContent[3] = `<div class="dot-green severe" style="height: 12px; width: 12px; background: #f46a6a !important; border-radius: 50%;"></div>`;
      }
      const tooltipElement = this.renderer.selectRootElement(`#tooltip${dataPoint.datasetIndex}`);

      this.renderer.setProperty(tooltipElement, 'innerHTML', this.htmlContent.join(''));
      this.renderer.setStyle(tooltipElement, 'opacity', '1');
      this.renderer.setStyle(tooltipElement, 'top', `${dataPoint.element.y + 90}px`);
      this.renderer.setStyle(tooltipElement, 'left', `${dataPoint.element.x + 375}px`);
      // });
    }
  }

  private getVitalFormatting(rule, value) {
    if (rule?.isNormal(value)) return { color: '#51BE98', range: 'normal', background: '#EAF7F6', border: '5px solid #51BE98' };
    else if (rule?.isRisk(value)) return { color: '#EEB300', range: 'risk', background: '#FFF6EB', border: '5px solid #EEB300' };
    else if (rule?.isEmergency(value)) return { color: '#FF0000', range: 'emergency', background: '#FBF2F2', border: '5px solid #FF0000' };
    return null;
  }


  ngOnInit(): void {
    this.htmlContent[0] = `<div class="tool-tip-box p-2 px-3" style="border-radius: 15px; background: var(--White, #fff); box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12); padding: 12px">
  <div class="row m-0 justify-content-start aling-items-center">
    <span class="vital-g-name" style="color: var(--Text-color, #171725); text-align: center; font-feature-settings: 'clig' off, 'liga' off; font-family: Poppins-SemiBold; font-size: 11px; font-style: normal; font-weight: 600; line-height: normal;">`;
    this.htmlContent[1] = ''; // Vital Heading
    this.htmlContent[2] = `</span>
    </div>
    <div class="row m-0 justify-content-start align-items-center">`
    this.htmlContent[3] = ''; //For Dot
    this.htmlContent[4] = `    <div class="row m-0 justify-content-start aling-items-center pl-1">
    <span class="vital-value-txt" style="font-family: Poppins-Regular; font-size: 14px; font-style: normal; font-weight: 400; line-height: normal;`;
    this.htmlContent[5] = '' // For Vital Value
    this.htmlContent[6] = `</span>
    </div>
  </div>
  <div class="row m-0 justify-content-start aling-items-center">
    <span class="vital-g-ideal-value" style="color: var(--Text-color, #171725); text-align: center; font-feature-settings: 'clig' off, 'liga' off; font-family: Poppins-Regular; font-size: 8px; font-style: normal; font-weight: 400; line-height: normal;">`;
    this.htmlContent[7] = '' // For ideal Value
    this.htmlContent[8] = `</span>
    </div>
    <div class="row m-0 justify-content-start aling-items-center">
      <span class="vital-time-txt" style="color: var(--Text-color, #171725); text-align: center; font-feature-settings: 'clig' off, 'liga' off; font-family: Poppins-Regular; font-size: 7px; font-style: normal; font-weight: 400; line-height: normal;">`;
    this.htmlContent[9] = '' // For Record Time
    this.htmlContent[10] = `</span>
    </div>
  </div>`

  }

  private addGradient() {
    // const greenGradient = this.myCanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 200);
    // greenGradient.addColorStop(0, 'rgba(81, 190, 152,1)');
    // greenGradient.addColorStop(1, 'rgba(81, 190, 152,0)');

    // let blueGradient = this.myCanvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 200);
    // blueGradient.addColorStop(0, 'rgba(5, 124, 195,1)');
    // blueGradient.addColorStop(1, 'rgba(5, 124, 195,0)');
    this.chartColors = [
      {
        // backgroundColor: this.chartBackgroundColor,
        borderColor: '#057CC3',
        borderWidth: 2,
        pointBackgroundColor: this.chartBackgroundColor,
        tension: 0,
        showLine: true,
        fill: 0,
        pointRadius: 5,
        pointBorderColor: '#FFFFFF'
      },
      {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderColor: '#51BE98',
        borderWidth: 2,
        pointBackgroundColor: this.chartBackgroundColor,
        tension: 0,
        showLine: true,
        fill: 0,
        pointRadius: 5,
        pointBorderColor: '#FFFFFF'
      },
    ]
  }
}
