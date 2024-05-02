import moment from 'moment-timezone';
import {
    VitalBloodPressureRules,
    VitalBloodOxygenRules,
    VitalBloodSugerRules,
    VitalBloodSugerHbA1CRules,
    VitalPulseRules,
    VitalTempratureRules,
    VitalRespiratoryRateRules,


    VitalFahrenheitTempratureRules,
    VitalCelsiusTempratureRules,
    VitalRespiratoryRate2Rules,
    VitalBloodSugermgdLRules,
    VitalBloodSugermmolRules
} from './vital-rules';
type Filter = 'day' | 'week' | 'month' | 'year' | '6 months' | 'random';
type ChartOptionCallback = (tooltip: any, myCanvas: HTMLCanvasElement) => void;
import { startOfToday, endOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMinute, endOfMonth, startOfYear, endOfYear, addMonths } from "date-fns";
// import 'chartjs-adapter-date-fns';`
// import { enus } from 'date-fns/locale';`


export class VitalUtils {
    static getVitalId(vital: string) {
        const vitals = {
            'temperature': 539,
            'pulse': 540,
            'bloodPressure': 541,
            'bloodOxygen': 542,
            'respiratoryRate': 543,
            'bloodSugar': 544,
            'hba1c': 545,
        }
        return vitals[vital];
    }
    static getVitalUnit(vital: string) {
        const vitals = {
            'temperature': "°F",
            'pulse': "bpm",
            'bloodPressure': "mmHg",
            'bloodOxygen': "%",
            'respiratoryRate': "bpm",
            'bloodSugar': "mg/dL",
            'hba1c': "%",
        }
        return vitals[vital];
    }

    static celsiusToFahrenheit(celsius: number) {
        return (celsius * 9 / 5) + 32;
    }

    static fahrenheitToCelsius(fahrenheit: number) {
        return (fahrenheit - 32) / 1.8
    }

    //used to calculate mg/dl from mmol/l 
    // bloodSugarValue - in mmol/l 
    // return value in mg/dl
    static convertToMGPerDL(bloodSugarValue: number) {
        return bloodSugarValue * 18;
    }

    static convertToMMoL(bloodSugarValue: number) {
        return bloodSugarValue / 18;
    }

    static getChartOptionByFilter({
        filter,
        timezone,
        xInterval,
        currentDate,
        myCanvas,
        startDate,
        endDate,
        toolTipFunction
    }: {
        filter: Filter,
        timezone: string,
        xInterval: number,
        currentDate: string,
        myCanvas: HTMLCanvasElement,
        startDate: Date,
        endDate: Date,
        toolTipFunction: ChartOptionCallback
    }) {

        let chartOptions: any = {
            responsive: true,
            maintainAspectRatio: false,
            // tooltips: {
            //     enabled: false,
            //     mode: 'index',
            //     intersect: true,
            //     custom: (tooltip) => toolTipFunction(tooltip, myCanvas),
            //     // yAlign: 'bottom'
            // },
            // legendCallback: function (chart, data) {
            //     // Return the HTML string here.
            //     console.log('this is chart', chart);
            // },
            // legend: {
            //     labels: {
            //         usePointStyle: false
            //     }
            // },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false,
                    external: (tooltip) => toolTipFunction(tooltip, myCanvas),
                }
            },
            interaction: {
                mode: 'index',
                intersect: true
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            'millisecond': 'h:mm a',
                            'second': 'h:mm a',
                            'minute': 'h:mm a',
                            'hour': 'hh:mm a',
                            'day': 'ddd',
                            'week': 'h:mm a',
                            'month': 'h:mm a',
                            'quarter': 'h:mm a',
                            'year': 'h:mm a',
                        },
                        // stepSize: 3
                    },
                    // unitStepSize: 3,
                    min: startOfToday(),
                    max: endOfToday(),
                    ticks: {
                        // forces step size to be 50 units
                        stepSize: 1
                    }
                    // min: new Date('2024-02-27T00:00:00'),
                    // max: new Date('2024-02-28T00:00:00')
                    // beginAtZero: true,
                    // ticks: {
                    //     beginAtZero: true,
                    //     fontSize: 12,
                    //     source: 'auto',
                    //     stepSize: 3
                    // },
                    // gridLines: {
                    // color: "rgba(0, 0, 0, 0)",
                    // },
                    // adapters: {
                    //     date: {
                    //         // locale: enus,
                    //     },
                    // }
                },
                y: {
                    beginAtZero: true,
                    // ticks: {
                    //     beginAtZero: true,
                    //     fontSize: 12
                    // },
                    // gridLines: {
                    //     // color: "rgba(0, 0, 0, 0)",
                    // }
                },

            }
        }

        if (filter == 'day') {
            // chartOptions.scales.x.type = 'timeseries';
            chartOptions.scales.x.min = startOfToday();
            chartOptions.scales.x.max = endOfToday();
            chartOptions.scales.x.ticks.stepSize = 3;
            // chartOptions.scales.x.time.unitStepSize = xInterval;
            // chartOptions.scales.x.min = {
            //     min: startOfToday(),
            //     max: endOfToday()
            // format: 'h:mm a',
            // tooltipFormat: 'h:mm a',
            // unit: 'hour',
            // unitStepSize: xInterval,
            // min: moment(currentDate + " 03:00").tz(timezone).startOf('day'),
            // max: moment(currentDate + " 23:00").tz(timezone).endOf('day'),
            // timezone: timezone,
            // displayFormats: {
            //     'millisecond': 'h:mm a',
            //     'second': 'h:mm a',
            //     'minute': 'h:mm a',
            //     'hour': 'h:mm a',
            //     'day': 'h:mm a',
            //     'week': 'h:mm a',
            //     'month': 'h:mm a',
            //     'quarter': 'h:mm a',
            //     'year': 'h:mm a',
            // },
            // };
        } else if (filter == 'month') {
            chartOptions.scales.x.time.unit = 'day';
            chartOptions.scales.x.time.displayFormats.day = 'D';
            chartOptions.scales.x.min = startOfMonth(new Date());
            chartOptions.scales.x.max = endOfMonth(new Date());
            // chartOptions.scales.x.time = {
            //     format: 'ddd DD MMM yyyy',
            //     tooltipFormat: 'ddd DD MMM yyyy',
            //     unit: 'day',
            //     unitStepSize: 1,
            //     max: moment(currentDate).tz(timezone).endOf('month'),
            //     min: moment(currentDate).tz(timezone).startOf('month'),
            //     timezone: timezone,
            //     displayFormats: {
            //         'millisecond': 'DD',
            //         'second': 'DD',
            //         'minute': 'DD',
            //         'hour': 'DD',
            //         'day': 'DD',
            //         'week': 'DD',
            //         'month': 'DD',
            //         'quarter': 'DD',
            //         'year': 'DD',
            //     }
            // };
        } else if (filter == 'year') {
            chartOptions.scales.x.time.unit = 'month';
            chartOptions.scales.x.time.displayFormats.month = 'MMM';
            chartOptions.scales.x.min = startOfYear(new Date());
            chartOptions.scales.x.max = endOfYear(new Date());
            // chartOptions.scales.x.time = {
            //     format: 'MMM',
            //     tooltipFormat: 'MMM',
            //     unit: 'month',
            //     isoWeekday: true,
            //     unitStepSize: 1,
            //     max: moment(currentDate).tz(timezone).endOf('year'),
            //     min: moment(currentDate).tz(timezone).startOf('year'),
            //     timezone: timezone,

            //     displayFormats: {
            //         'millisecond': 'MMM',
            //         'second': 'MMM',
            //         'minute': 'MMM',
            //         'hour': 'MMM',
            //         'day': 'MMM',
            //         'week': 'MMM',
            //         'month': 'MMM',
            //         'quarter': 'MMM',
            //         'year': 'MMM',
            //     }
            // };
        } else if (filter == 'week') {
            chartOptions.scales.x.time.unit = 'day';
            chartOptions.scales.x.min = startOfWeek(new Date());
            chartOptions.scales.x.max = endOfWeek(new Date());
            // chartOptions.scales.x = {
            //     min: startOfWeek(new Date()),
            //     max: endOfWeek(new Date())
            // format: 'DD ddd',
            // tooltipFormat: 'DD ddd',
            // unit: 'day',
            // isoWeekday: true,
            // unitStepSize: 1,
            // min: moment(currentDate).startOf('week').valueOf(),
            // max: moment(currentDate).endOf('week').valueOf(),
            // timezone: timezone,

            // displayFormats: {
            //     'millisecond': 'ddd',
            //     'second': 'ddd',
            //     'minute': 'ddd',
            //     'hour': 'ddd',
            //     'day': 'ddd',
            //     'week': 'ddd',
            //     'month': 'ddd',
            //     'quarter': 'ddd',
            //     'year': 'ddd',
            // }
            // };
        } else if (filter == '6 months') {
            chartOptions.scales.x.time.unit = 'month';
            chartOptions.scales.x.time.displayFormats.month = 'MMM';
            chartOptions.scales.x.min = startOfMonth(addMonths(new Date(), -6));
            chartOptions.scales.x.max = endOfMonth(new Date());
        } else if (filter == 'random') {
            console.log('this is inside random')
            chartOptions.scales.x.time.unit = 'month';
            chartOptions.scales.x.time.displayFormats.month = 'MMM';
            chartOptions.scales.x.min = startOfMonth(startDate);
            chartOptions.scales.x.max = endOfMonth(endDate);
        }

        return chartOptions;
    }


    static parseVitalHistory(vital: string, vitalHistory: [any], time: Filter, patientAge: number, unit: string) {
        let result: any = { chartLabels: [], chartDatasets: [] };
        const vitalHistoryData = {};
        const timeFormatkeys = {
            'day': 'LT',
            'week': 'L',
            'month': 'L',
            'year': 'M',
        }
        vitalHistory.forEach(itm => {
            const key = moment(itm.readingDate).format(timeFormatkeys[time]);
            const value = itm.value;
            if (!vitalHistoryData[key]) {
                vitalHistoryData[key] = { value: [], actualDate: '', additional: '' }
            }
            if (vital === 'temperature') {
                vitalHistoryData[key].value.push(this.parseTempratureReading(itm, unit));
            } else if (vital === 'bloodOxygen' && unit !== 'All Values') {
                if (itm.additionalInfo?.provision === unit) {
                    vitalHistoryData[key].value.push(itm.value * 1);
                }
            } else if (vital === 'bloodPressure') {
                vitalHistoryData[key].value.push(itm.value)
            } else if (vital === 'bloodSugar') {
                vitalHistoryData[key].value.push(this.parseBloodSugarReading(itm, unit));
            } else if (vital === 'hba1c') {
                vitalHistoryData[key].value.push(itm.additionalInfo.Hba1c * 1);
            } else {
                vitalHistoryData[key].value.push(itm.value * 1);
            }
            vitalHistoryData[key].actualDate = itm.readingDate;

            switch (vital) {
                case 'temperature':
                case 'pulse':
                case 'respiratoryRate':
                    vitalHistoryData[key].additional = patientAge;
                    break;
                case 'bloodPressure':
                    vitalHistoryData[key].additional = 'systolic/diastoloc';
                    break;
                case 'bloodOxygen':
                    vitalHistoryData[key].additional = '';
                    break;
                case 'bloodSugar':
                    vitalHistoryData[key].additional = itm.mealPreference;
                    break;
                case 'hba1c':
                    vitalHistoryData[key].additional = '';
                    break;
            }

        });

        result.chartDatasets.push({ data: [] });
        if (vital === 'bloodPressure') {
            result.chartDatasets.push({ data: [] });
        }

        for (const key in vitalHistoryData) {
            if (vital === 'bloodPressure') {
                result.chartLabels.push(moment(vitalHistoryData[key].actualDate));
                const systolic = vitalHistoryData[key].value.reduce(
                    (pv, cv) => pv + cv.split('/')[0] * 1, 0
                ) / vitalHistoryData[key].value.length;
                const diastolic = vitalHistoryData[key].value.reduce(
                    (pv, cv) => pv + cv.split('/')[1] * 1, 0
                ) / vitalHistoryData[key].value.length;

                const vitalBloodPressureRulesS = new VitalBloodPressureRules(vitalHistoryData[key].additional.split('/')[0]);
                const vitalBloodPressureRulesD = new VitalBloodPressureRules(vitalHistoryData[key].additional.split('/')[1]);

                result.chartDatasets[0].data.push({
                    value: this.roundTo2(diastolic),
                    rule: vitalBloodPressureRulesD

                });
                result.chartDatasets[1].data.push({
                    value: this.roundTo2(systolic),
                    rule: vitalBloodPressureRulesS
                });

            } else {
                vitalHistoryData[key].value.map((item, index) => {
                    result.chartLabels.push(moment(vitalHistoryData[key].actualDate));
                    const value = item;
                    let rule: any;
                    switch (vital) {
                        case 'temperature':
                            rule = (unit === '°Fahrenheit') ? new VitalFahrenheitTempratureRules() : new VitalCelsiusTempratureRules();
                            break;
                        case 'pulse':
                            rule = new VitalPulseRules(vitalHistoryData[key].additional);
                            break;
                        case 'respiratoryRate':
                            rule = new VitalRespiratoryRate2Rules();
                            break;
                        case 'bloodOxygen':
                            rule = new VitalBloodOxygenRules();
                            break;
                        case 'bloodSugar':
                            rule = (unit === 'mg/dL') ? new VitalBloodSugermgdLRules(vitalHistoryData[key].additional) : new VitalBloodSugermmolRules(vitalHistoryData[key].additional);
                            break;
                        case 'hba1c':
                            rule = new VitalBloodSugerHbA1CRules();
                            break;
                    }
                    result.chartDatasets[0].data.push({
                        value: this.roundTo2(value),
                        rule,
                        unit
                    });
                })
            }
        }
        return result;
    }

    private static parseTempratureReading(data: any, unit: string) {
        if (data.uom === unit) {
            return data.value * 1;
        }
        if (unit === '°Fahrenheit') {
            return this.celsiusToFahrenheit(data.value * 1);
        } else {
            return this.fahrenheitToCelsius(data.value * 1);
        }
    }

    private static parseBloodOxygenReading(data: any, unit: string) {
        if (data.additionalInfo?.provision === unit) {
            return data.value * 1;
        }
    }

    private static parseBloodSugarReading(data: any, unit: string) {
        if (data.uom === unit) {
            return data.value * 1;
        }
        if (unit === 'mg/dL') {
            return this.convertToMGPerDL(data.value * 1);
        } else {
            return this.convertToMMoL(data.value * 1);
        }
    }



    public static roundTo2(value: number) {
        return Math.round(value * 100) / 100;
    }
}