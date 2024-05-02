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
