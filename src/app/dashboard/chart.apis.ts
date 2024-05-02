import {
  GET_ALL_MEDICINE_BY_DOCTOR,
  GET_AUDIENCE_BY_GENDER,
  GET_MEDICINE_ANALYTICS,
  GET_PATIENTS_BY_DOCTOR_ID,
  GET_VITAL_METRIC_CHART_STATS,
  GET_VITAL_RECORDING_STATS,
  GET_PATIENT_AGE_DISTRIBUTION
} from "src/app/graphql.module";

export const getMedicalCompliance = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
    patientId: filterInput?.patientId,
    medicineId: filterInput?.medicineId,
    timeOffset: filterInput?.timeOffset
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_MEDICINE_ANALYTICS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getMedicineAnalytics;
  } catch (error) {
    console.error("Error fetching getMedicalCompliance:", error);
    throw error;
  }
};

export const getHealthMetric = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
    timeOffset: filterInput.timeOffset,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_VITAL_METRIC_CHART_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getVitalsAnalytics;
  } catch (error) {
    console.error("Error fetching getVitalsAnalytics:", error);
    throw error;
  }
};

export const getFrequencyOfVitalRecording = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
    timeOffset: filterInput.timeOffset,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_VITAL_RECORDING_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getVitalRecordingFrequency;
  } catch (error) {
    console.error("Error fetching getFrequencyOfVitalRecording:", error);
    throw error;
  }
};

export const getAudienceByGender = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_AUDIENCE_BY_GENDER,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getRemoteGenderBasedPatient;
  } catch (error) {
    console.error("Error fetching getAudienceByGender:", error);
    throw error;
  }
};

export const getAllPatients = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    timeOffset: filterInput.timeOffset,
    page: {
      pageNumber: 0,
      perPage: 10000,
    },
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_PATIENTS_BY_DOCTOR_ID,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getPatientsByDoctorId;
  } catch (error) {
    console.error("Error fetching all patients data:", error);
    throw error;
  }
};

export const getAllMedicinesByDoctors = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    page: { pageNumber: 1, perPage: 1000 },
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_ALL_MEDICINE_BY_DOCTOR,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getAllMedicinesByDoctors;
  } catch (error) {
    console.error("Error fetching getAllMedicinesByDoctors:", error);
    throw error;
  }
};

export const getPatientAgeDistribution = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_PATIENT_AGE_DISTRIBUTION,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getPatientAgeDistribution;
  } catch (error) {
    console.error("Error fetching new patient list:", error);
    throw error;
  }
};
