export const appointmentChartConfig = (data: any) => {
  return {
    labels: data.map((elem) => elem.xAxis),
    datasets: [
      {
        label: "Clinical Visit",
        data: data.map((elem) => elem.clinicalCount),
        fill: false,
        borderColor: "#057CC3",
        backgroundColor: "#057CC3",
        tension: 0.75,
      },
      {
        label: "Virtual Visit",
        data: data.map((elem) => elem.virtualCount),
        fill: false,
        borderColor: "#2DB1A4",
        backgroundColor: "#2DB1A4",
        tension: 0.75,
      },
    ],
  };
};

export const dailyVisitChartConfig = (data: any) => {
  return {
    labels: data.map((elem) => elem.xAxis),
    datasets: [
      {
        label: "New Patients",
        data: data.map((elem) => elem.newPatient),
        backgroundColor: "#057CC3",
        borderColor: "#057CC3",
      },
      {
        label: "Recurring Patients",
        data: data.map((elem) => elem.recurrentPatient),
        backgroundColor: "#E0EEF7",
        borderColor: "#E0EEF7",
      },
    ],
  };
};

export const inOutTrendChartConfig = (data: any) => {
  return {
    labels: data.map((label) => label.xAxis),
    datasets: [
      {
        label: "Outpatients",
        data: data.map((elem) => elem.outPatient),
        backgroundColor: "#2DB1A4",
        borderColor: "#2DB1A4",
        borderWidth: 1,
        barThickness: 5,
        borderRadius: 5,
      },
      {
        label: "Inpatients",
        data: data.map((elem) => elem.inPatient),
        backgroundColor: "#057CC3",
        borderColor: "#057CC3",
        borderWidth: 1,
        barThickness: 5,
        borderRadius: 5,
      },
    ],
  };
};

export const inOutTrendDoughnutChartConfig = (totalIn, totalOut) => {
  return {
    labels: ["Inpatients", "Outpatients"],
    datasets: [
      {
        label: "Inpatient vs Outpatient",
        data: [totalIn, totalOut],
        backgroundColor: ["#057CC3", "#2AB2A4"],
        hoverOffset: 4,
      },
    ],
  };
};

export const revenueChartConfig = (data: any) => {
  return {
    labels: ["Pending", "Partially received", "Received"],
    datasets: [
      {
        label: "Revenue",
        data: [data?.pendingAmount, data?.partialAmount, data?.receivedAmount],
        backgroundColor: ["#F00", "#FEA736", "#45C49C"],
        hoverOffset: 3,
      },
    ],
  };
};

export const genderBasedDiagnosisChartConfig = (data: any) => {
  return {
    labels: data.map((elem) => elem.xAxis || "Unrecorded"),
    datasets: [
      {
        label: "Male",
        data: data.map((elem) => elem.maleCount),
        backgroundColor: "#057CC3",
        borderColor: "#057CC3",
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 5,
      },
      {
        label: "Female",
        data: data.map((elem) => elem.femaleCount),
        backgroundColor: "#F00",
        borderColor: "#F00",
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 5,
      },
    ],
  };
};

export const patientGenderChartConfig = (data: any) => {
  return {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        label: "Gender",
        data: [data[0].totalMale, data[0].totalFemale, data[0].totalOthers],
        backgroundColor: ["#057CC3", "#FF7C98", "#2DB1A4"],
        hoverOffset: 3,
      },
    ],
  };
};

export const ageDistributionChartConfig = (data: any) => {
  return {
    labels: data.map((elem) => elem.ageRange),
    datasets: [
      {
        label: "Male",
        data: data.map((elem) => elem.totalMale),
        backgroundColor: "#057CC3",
        borderColor: "#057CC3",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
      {
        label: "Female",
        data: data.map((elem) => elem.totalFemale),
        backgroundColor: "#F00",
        borderColor: "#F00",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
    ],
  };
};

export const demographicAudienceChartConfig = (data: any, type: string) => {
  return data?.demographicsStats?.map((item) => [item.locality, item.value]);
};

export const feedbackChartConfig = (data: any) => {
  return {
    labels: ["Excellent", "Poor", "Neutral"],
    datasets: [
      {
        label: "Revenue",
        data: [data?.Excellent, data?.Poor, data?.Neutral],
        backgroundColor: ["#45C49C", "#F00", "#FEA736"],
        hoverOffset: 3,
      },
    ],
  };
};

export const medicalComplianceChartConfig = (allData: any) => {
  return {
    labels: allData.taken.map((elem) => elem.key),
    datasets: [
      {
        label: "Taken",
        data: allData.taken.map((elem) => elem.value),
        backgroundColor: "#34C38F",
        borderColor: "#34C38F",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
      {
        label: "Not Taken",
        data: allData.notTaken.map((elem) => elem.value),
        backgroundColor: "#F00",
        borderColor: "#F00",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
      {
        label: "Unmarked",
        data: allData.unMarked.map((elem) => elem.value),
        backgroundColor: "#FFBC00",
        borderColor: "#FFBC00",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
    ],
  };
};

export const vitalRecordingChartConfig = (data: any) => {
  return {
    labels: data.map((elem) => elem.xAxis),
    datasets: [
      {
        label: "Vital",
        data: data.map((elem) => elem.frequencyCount),
        backgroundColor: "#23A9F9",
        borderColor: "#23A9F9",
        borderWidth: 1,
        barThickness: 2,
        borderRadius: 5,
      },
    ],
  };
};

export const audienceByGenderChartConfig = (data: any) => {
  return {
    labels: ["Female", "Male", "Others"],
    datasets: [
      {
        label: "Gender",
        data: [
          data?.totalFemale ?? 0,
          data?.totalMale ?? 0,
          data?.totalOther ?? 0,
        ],
        backgroundColor: ["#FF7C98", "#057CC3", "#34C38F"],
        hoverOffset: 3,
      },
    ],
  };
};

export const healthMetricChartConfig = (data: any) => {
  const formattedData = data.map((elem) => {
    const parseNumeric = (value) => parseFloat(value.replace(/[^\d.]/g, ""));

    return {
      ...elem,
      vitals: {
        ...elem.vitals,
        bloodPressure: parseNumeric(elem.vitals.bloodPressure),
        pulse: parseNumeric(elem.vitals.pulse),
        bloodSugar: parseNumeric(elem.vitals.bloodSugar),
        temperature: parseNumeric(elem.vitals.temperature),
        bloodOxygen: parseNumeric(elem.vitals.bloodOxygen),
        respiratoryRate: parseNumeric(elem.vitals.respiratoryRate),
      },
    };
  });

  return {
    labels: data.map((elem) => elem.xAxis),
    datasets: [
      {
        label: "Blood Pressure - mmHg",
        data: formattedData.map((elem) => elem.vitals.bloodPressure),
        fill: true,
        borderColor: "#34C38F",
        backgroundColor: "#34C38F",
        tension: 0.1,
      },
      {
        label: "Pulse",
        data: formattedData.map((elem) => elem.vitals.pulse),
        fill: true,
        borderColor: "#00AFF0",
        backgroundColor: "#00AFF0",
        tension: 0.1,
      },
      {
        label: "Blood Sugar - mg/dl",
        data: formattedData.map((elem) => elem.vitals.bloodSugar),
        fill: true,
        borderColor: "#FFBC00",
        backgroundColor: "#FFBC00",
        tension: 0.1,
      },
      {
        label: "Temperature - Celsius",
        data: formattedData.map((elem) => elem.vitals.temperature),
        fill: true,
        borderColor: "#7B5CDC",
        backgroundColor: "#7B5CDC",
        tension: 0.1,
      },
      {
        label: "Blood O2 - %",
        data: formattedData.map((elem) => elem.vitals.bloodOxygen),
        fill: true,
        borderColor: "#F00",
        backgroundColor: "#F00",
        tension: 0.1,
      },
      {
        label: "Respiratory Rate - bpm",
        data: formattedData.map((elem) => elem.vitals.respiratoryRate),
        fill: true,
        borderColor: "#3487EB",
        backgroundColor: "#3487EB",
        tension: 0.1,
      },
    ],
  };
};
