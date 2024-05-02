import {
  APPOINTMENT_QUERY,
  GET_ALL_MEDICINE_BY_DOCTOR,
  GET_APPOINTMENT_STATS,
  GET_AUDIENCE_BY_GENDER,
  GET_CONFIDENCE_IN_TREATMENT,
  GET_COUNTRY,
  GET_DAILY_VISIT_INSIGHTS,
  GET_DEMOGRAPHIC,
  GET_FEEDBACK_PERCENTAGE,
  GET_GENDER_BASED_PATIENT_STATS,
  GET_GENDER_DIAGNOSIS_STATS,
  GET_IN_OUT_PATIENT_STATS,
  GET_MEDICAL_COMPLIANCE_STATS,
  GET_MEDICINE_ANALYTICS,
  GET_NEW_PATIENTS,
  GET_NO_SHOWS_STATS,
  GET_OUTSTANDING_BILL_STATS,
  GET_PATIENTS_BY_DOCTOR_ID,
  GET_PATIENT_AGE_DISTRIBUTION,
  GET_PATIENT_REFERRAL_STATS,
  GET_PATIENT_WAITING_TIME_STATS,
  GET_PRESCRIBED_MEDICINE_STATS,
  GET_PROGRAM_COMPLETION_STATS,
  GET_REMOTE_ACTIVE_PATIENT_STATS,
  GET_REMOTE_REVENUE_STATS,
  GET_REMOTE_TOTAL_PATIENT_STATS,
  GET_REVENUE_STATS,
  GET_TOTAL_PATIENT_STATS,
  GET_VITAL_METRIC_CHART_STATS,
  GET_VITAL_RECORDING_STATS,
} from "src/app/graphql.module";

export const getCountriesData = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    type: filterInput.type,
    countryCode: filterInput.countryCode,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_COUNTRY,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getCountryMasterData;
  } catch (error) {
    console.error("Error fetching country data:", error);
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

export const getTotalPatientAnalytics = async (
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
        query: GET_TOTAL_PATIENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getTotalPatientAnalytics;
  } catch (error) {
    console.error("Error fetching total patient statistics:", error);
    throw error;
  }
};

export const getNoShowsAnalytics = async (
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
        query: GET_NO_SHOWS_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getNoShowsAnalytics;
  } catch (error) {
    console.error("Error fetching no show statistics:", error);
    throw error;
  }
};

export const getRevenueAnalytics = async (
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
        query: GET_REVENUE_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getRevenueAnalytics;
  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
    throw error;
  }
};

export const getOutstandingBillsAnalytics = async (
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
        query: GET_OUTSTANDING_BILL_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getOutstandingBillsAnalytics;
  } catch (error) {
    console.error("Error fetching outstanding bill statistics:", error);
    throw error;
  }
};

export const getAppointmentStaticsAnalytics = async (
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
        query: GET_APPOINTMENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getAppointmentStaticsAnalytics;
  } catch (error) {
    console.error("Error fetching appointment statistics:", error);
    throw error;
  }
};

export const getDailyVisitInsightAnalytics = async (
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
        query: GET_DAILY_VISIT_INSIGHTS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getDailyVisitInsightAnalytics;
  } catch (error) {
    console.error("Error fetching daily visit insights statistics:", error);
    throw error;
  }
};

export const getInOutPatientAnalytics = async (
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
        query: GET_IN_OUT_PATIENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getInOutPatientAnalytics;
  } catch (error) {
    console.error("Error fetching in out patient statistics:", error);
    throw error;
  }
};

export const getPatientWaitingTimeAnalytics = async (
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
        query: GET_PATIENT_WAITING_TIME_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getPatientWatingTimeAnalytics;
  } catch (error) {
    console.error("Error fetching patient waiting time statistics:", error);
    throw error;
  }
};

export const getGenderBasedDiagnosis = async (
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
        query: GET_GENDER_DIAGNOSIS_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getGenderAudienceAnalytics;
  } catch (error) {
    console.error("Error fetching gender diagnosis statistics:", error);
    throw error;
  }
};

export const getGenderBasedPatient = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
    day: filterInput?.day || undefined,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_GENDER_BASED_PATIENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getGenderBasedPatient;
  } catch (error) {
    console.error("Error fetching gender based patient statistics:", error);
    throw error;
  }
};

export const getPatientReferralAnalytics = async (
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
        query: GET_PATIENT_REFERRAL_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getPatientReferralAnalytics;
  } catch (error) {
    console.error("Error fetching patient referral statistics:", error);
    throw error;
  }
};

export const getPrescribedMedicineAnalytics = async (
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
        query: GET_PRESCRIBED_MEDICINE_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getPrescribedMedicineAnalytics;
  } catch (error) {
    console.error("Error fetching prescribed medicine statistics:", error);
    throw error;
  }
};

export const getNewPatientList = async (
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
        query: GET_NEW_PATIENTS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getNewPatients;
  } catch (error) {
    console.error("Error fetching new patient list:", error);
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

export const getAppointmentsList = async (
  graphqlService,
  stateService,
  filterInput
) => {
  let docId;
  if (filterInput?.doctorId?.length === 1) {
    docId = filterInput.doctorId[0];
  }

  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorId: docId,
    fromDate: filterInput.startDate,
    toDate: filterInput.endDate,
    timeOffset: filterInput.timeOffset,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: APPOINTMENT_QUERY,
        variables: {
          ...input,
          page: {
            pageNumber: 1,
            perPage: 5,
          },
          order: "DESC",
        },
      },
    });

    return result.data.getAppointments;
  } catch (error) {
    console.error("Error fetching appointments list:", error);
    throw error;
  }
};

export const getFeedbackPercentage = async (
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
        query: GET_FEEDBACK_PERCENTAGE,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getFeedbackPercentage;
  } catch (error) {
    console.error("Error fetching feedback percentage:", error);
    throw error;
  }
};

export const getConfidenceInTreatment = async (
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
        query: GET_CONFIDENCE_IN_TREATMENT,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getConfidenceInTreatment;
  } catch (error) {
    console.error("Error fetching confidence in treatment:", error);
    throw error;
  }
};

export const getDemographicAudienceData = async (
  graphqlService,
  stateService,
  filterInput
) => {
  const input = {
    clinicId: stateService.selectedClinic$.clinicId,
    doctorIds: filterInput.doctorId,
    startDate: filterInput.startDate,
    endDate: filterInput.endDate,
    day: filterInput?.day || undefined,
    country: filterInput?.country || undefined,
    state: filterInput?.state || undefined,
    city: filterInput?.city || undefined,
  };

  try {
    const result = await graphqlService?.getGraphqlData({
      showLoader: true,
      definition: {
        query: GET_DEMOGRAPHIC,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getDemographicAudienceData;
  } catch (error) {
    console.error("Error fetching demographic audience:", error);
    throw error;
  }
};

export const getRemoteRevenueAnalytics = async (
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
        query: GET_REMOTE_REVENUE_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getRemoteRevenueAnalytics;
  } catch (error) {
    console.error("Error fetching getRemoteRevenueAnalytics:", error);
    throw error;
  }
};

export const getRemoteTotalPatientAnalytics = async (
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
        query: GET_REMOTE_TOTAL_PATIENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getRemoteTotalPatientAnalytics;
  } catch (error) {
    console.error("Error fetching getRemoteTotalPatientAnalytics:", error);
    throw error;
  }
};

export const getRemoteActivePatientAnalytics = async (
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
        query: GET_REMOTE_ACTIVE_PATIENT_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getRemoteActivePatientAnalytics;
  } catch (error) {
    console.error("Error fetching getRemoteActivePatientAnalytics:", error);
    throw error;
  }
};

export const getProgramCompletion = async (
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
        query: GET_PROGRAM_COMPLETION_STATS,
        variables: {
          ...input,
        },
      },
    });

    return result.data.getProgramCompletion;
  } catch (error) {
    console.error("Error fetching getProgramCompletion:", error);
    throw error;
  }
};

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
