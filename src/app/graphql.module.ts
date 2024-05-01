// RewriteEngine On
// # If an existing asset or directory is requested go to it as it is
// RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
// RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
// RewriteRule ^ - [L]

// # If the requested resource doesn't exist, use index.html
// RewriteRule ^ /index.html

import { gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';

export const getBaseURL = () => {
      return `${environment.API_URL}/schema-stitching/graphql`;
}

export const getIMURL = () => {
      return `${environment.API_URL}/iam/graphql`;
}

export const getMultimediaURL = () => {
      return `${environment.API_URL}/multimedia/`;
}

export const GET_DOCTOR_FEES_STRUCTURE = gql`query getDoctorFeesStruture($doctorId: ID!) {
            getDoctorFeesStruture(doctorId: $doctorId) {
                  category
                  services {
                        service
                        currencyCode
                        price
                        taxPercentage
                  }
            }
      }
`

export const DOWNLOAD_SALES_REPORT = gql`query downloadSalesReport($content: DownloadSalesReportInput!, $type: String, $timeOffset: Int = 0) {
            downloadSalesReport(content: $content, type: $type, timeOffset: $timeOffset) {
                  url
                  message
            }
}`

export const GET_COUNTRY = gql`
      query getCountryMasterData ($type: String!, $stateCode: String, $countryCode: String)  
      {    
      getCountryMasterData (type: $type, stateCode: $stateCode, countryCode: $countryCode)
}`

export const SUBSCRIPTION_HOSPITAL = gql`mutation subscribeHospital($subscriptionInput: HospitalSubscriptionInput!) {
      subscribeHospital(subscriptionInput: $subscriptionInput)
}`

export const USER_SUBSCRIPTION_PLAN = gql`query userSubscriptionPlan($userId: String!) {
      userSubscriptionPlan (userId: $userId) {
          id
          displayName
          price
          currency
          renewalDate
          paymentMethod {
              id
              cardPaymentMethod {
                  brand
                  last4
                  expiryMonth
                  expiryYear
              }
          }
          billingDetail {
              email
              name
              phone
              billingAddress {
                  city
                  country
                  line1
                  line2
                  postalCode
                  state
              }
          }
      }
}`

export const USER_SESSION_PORTAL = gql`query userSessionPortal($userId: ID!) {
      userSessionPortal(userId: $userId) { 
            customerId
            url
      }
}`

export const CHECKOUT_SESSION = gql`mutation checkoutSession($input: CheckoutSessionInput!) {
      checkoutSession(input: $input) {
          id
          url
      }
}`

export const VERIFY_ACCOUNT = gql`mutation verifyAccount ($mobileNumber: String!, $email: String) {
            verifyAccount (mobileNumber: $mobileNumber, email: $email) {
                  status
                  message
                  data
            }
      }
`

export const CREATE_MOBILE_OTP = gql`mutation sendMobileOtp ($countryCode: String, $source: String!, $deviceId: String!, $isNewUser: Bool) {
      sendMobileOtp (countryCode: $countryCode, source: $source, deviceId: $deviceId, isNewUser: $isNewUser) {
          status
          message
          data
      }
}`

export const CREATE_EMAIL_OTP = gql`mutation sendEmailOtp ($source: String!, $deviceId: String!, $isNewUser: Bool) {
      sendEmailOtp (source: $source, deviceId: $deviceId, isNewUser: $isNewUser) {
          status
          message
          data
      }
}`

export const VERIFY_OTP = gql`mutation verifyOtp ($mobileNumber: String, $email: String, $otp: String!, $deviceId: String!) {
            verifyOtp (mobileNumber: $mobileNumber, email: $email, otp: $otp, deviceId: $deviceId) {
                  status
                  message
                  data
            }
      }
`

export const CREATE_ACCOUNT = gql`mutation createAccount ($content: AccountInput!) {
            createAccount (content: $content) {
                  status
                  message
                  data
            }
      }
`

export const ACCOUNT_EXISTS = gql`query accountExists($mobileNumber: String, $email: String) {
            accountExists(mobileNumber: $mobileNumber, email: $email) {
                  status
                  message
            }
      }
`

export const FORGOT_PASSWORD = gql`mutation forgotPassword ($username: String!, $password: String!) {
            forgotPassword (username: $username, password: $password) {
                  status
                  message
                  data
            }
      }
`

export const CHANGE_PASSWORD = gql`mutation changePassword($username: ID!, $oldPassword: String!, $newPassword: String!) {
      changePassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword) {
        status
        message
        data
      }
}`

export const APPOINTMENT_QUERY = gql`query getAppointments ($doctorId: ID, $patientId: ID, $status: String, $date: Date, $toDate: Date, $fromDate: Date, $page: PaginationInput, $clinicId: ID, $timeOffset: Int, $order: SortingOrder, $statuses: [String!], $nurseId: ID) {
      getAppointments (doctorId: $doctorId, patientId: $patientId, status: $status, date: $date, toDate: $toDate, fromDate: $fromDate, page: $page, clinicId: $clinicId, timeOffset: $timeOffset, order: $order, statuses: $statuses, nurseId: $nurseId) {
                  id
                  treatmentId
                  slotId
                  patientId
                  doctorId
                  clinicId
                  isCompleted
                  appointmentStatus
                  canceledBy
                  nurseId
                  token
                  labOrderExists
                  careTeamAssignees
                  admissionTime
                  diagnosis
                  newOrder {
                        appointmentId
                        treatmentId
                        category
                  }
                  patient {
                        patientId
                        title
                        firstName
                        lastName
                        dateOfBirth
                        gender
                        profileImage
                        nationality
                        # insurances
                        countryOfResidence
                        isVip
                        mrn
                  }
                  doctor {
                        title
                        doctorId
                        firstName
                        middleName
                        lastName
                        specialities
                        profilePhotoUrl
                        clinics {
                              clinicName
                              city
                              country
                        }
                  }
                  transactionId
                  lastVistedDatetime
                  # transaction {
                        #       transactionId
                        # }
                        time
                        duration
                        # transactionId
                        status
                        count
                        orderId
                        appointmentOtherInfo {
                              id
                              appointmentId
                              patientId
                              reason
                              notes
                              reportUrl
                              relatedPatientId
                              createdAt
                              updatedAt
                              clinicCheckIn
                              clinicCheckOut
                              triageCategory
                              modeOfPayment
                              department
                        }
                        appointmentConsentForm {
                              id
                              appointmentId
                              patientId
                              fullName
                              dob
                              nationalId
                              insuranceNumber
                              consentUrl
                              createdAt
                              updatedAt
                        }
                        recordSymptom {
                              id
                              appointmentId
                              patientId
                              url
                              audioUrl
                              descibeNotes
                              createdAt
                              updatedAt
                        }
                        bodyViewSymptom {
                              id
                              appointmentId
                              patientId
                              bodyViewImageUrl
                              createdAt
                              updatedAt
                        }
                        searchViewSymptoms {
                              id
                              appointmentId
                              patientId
                              symptomCode
                              startDate
                              endDate
                              severity
                              createdAt
                              updatedAt
                        }
                        createdAt
                        updatedAt
                        slot {
                              id
                              date
                              startTime
                              endTime
                              phaseOfDay
                              mode
                              doctorId
                              clinicId
                              duration
                              status
                              createdAt
                              updatedAt
                        }
                        appointmentConcierge {
                              id
                              appointmentId
                              requireParking
                              carPlateNumber
                              specialAssistance
                              vipArrival
                              conciergePreference
                              conciergeLanguage
                              createdAt
                              updatedAt
                        }
                        transaction{
                              transactionId
                              transactionType
                              amount
                              currencyCode
                              description
                              transactionStatus
                        }
                  }
            }
`

export const APPOINTMENT_CANCEL = gql`mutation cancelAppointment ($appointmentId: ID!, $timeOffset: Int, $reason: String, $canceledBy: String) {
            cancelAppointment (appointmentId: $appointmentId, timeOffset: $timeOffset, reason: $reason, canceledBy: $canceledBy) {
                  message
            }
      }
`;

export const APPOINTMENT_RESCHEDULE = gql`mutation rescheduleAppointment ($appointmentId: ID!, $slotId: ID!, $timeOffset: Int, $reason: String) {
            rescheduleAppointment (appointmentId: $appointmentId, slotId: $slotId, timeOffset: $timeOffset, reason: $reason) {
                  id
                  treatmentId
                  slotId
                  patientId
                  doctorId
                  clinicId
                  patient {
                        patientId
                  }
                  doctor {
                        doctorId
                  }
                  transaction {
                        transactionId
                  }
                  time
                  duration
                  transactionId
                  status
                  count
                  appointmentOtherInfo {
                        id
                        appointmentId
                        patientId
                        reason
                        notes
                        reportUrl
                        relatedPatientId
                        createdAt
                        updatedAt
                  }
                  appointmentConsentForm {
                        id
                        appointmentId
                        patientId
                        fullName
                        dob
                        nationalId
                        insuranceNumber
                        consentUrl
                        createdAt
                        updatedAt
                  }
                  recordSymptom {
                        id
                        appointmentId
                        patientId
                        url
                        audioUrl
                        descibeNotes
                        createdAt
                        updatedAt
                  }
                  bodyViewSymptom {
                        id
                        appointmentId
                        patientId
                        bodyViewImageUrl
                        createdAt
                        updatedAt
                  }
                  searchViewSymptoms {
                        id
                        appointmentId
                        patientId
                        symptomCode
                        startDate
                        endDate
                        severity
                        createdAt
                        updatedAt
                  }
                  createdAt
                  updatedAt
                  slot {
                        id
                        date
                        startTime
                        endTime
                        phaseOfDay
                        mode
                        doctorId
                        clinicId
                        duration
                        status
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const CREATE_APPOINTMENT = gql`mutation createAppointment ($appointment: AppointmentInput!) {
      createAppointment (appointment: $appointment) {
          id
          treatmentId
          previousAppointmentId
          slotId
          patientId
          doctorId
          clinicId
          token
          patient {
              patientId
              title
              firstName
              lastName
              dateOfBirth
              gender
          }
          doctor {
              doctorId
              firstName
              middleName
              lastName
          }
          transaction {
              transactionId
          }
          time
          duration
          type
          transactionId
          status
          count
          appointmentOtherInfo {
              id
              appointmentId
              patientId
              reason
              notes
              reportUrl
              relatedPatientId
              createdAt
              updatedAt
              clinicCheckIn
              clinicCheckOut
              triageCategory
              modeOfPayment
              department
          }
          appointmentConsentForm {
              id
              appointmentId
              patientId
              fullName
              dob
              nationalId
              insuranceNumber
              consentUrl
              createdAt
              updatedAt
          }
          recordSymptom {
              id
              appointmentId
              patientId
              url
              audioUrl
              descibeNotes
              createdAt
              updatedAt
          }
          bodyViewSymptom {
              id
              appointmentId
              patientId
              bodyViewImageUrl
              createdAt
              updatedAt
          }
          searchViewSymptoms {
              id
              appointmentId
              patientId
              symptomCode
              startDate
              endDate
              severity
              createdAt
              updatedAt
          }
          isCompleted
          createdAt
          updatedAt
          slot {
              id
              date
              startTime
              endTime
              phaseOfDay
              mode
              doctorId
              clinicId
              duration
              status
              createdAt
              updatedAt
          }
          nurseId
          careTeamAssignees
      }
  }
`

export const UPDATE_APPOINTMENT_NOTES = gql`mutation editAppointmentNote ($appointmentId: ID!, $note: String!) {
      editAppointmentNote(appointmentId: $appointmentId, note: $note) {
          message
          status
      }
}`

export const CHANGE_APPOINTMENT_STATUS = gql`mutation changeAppointmentStatus($appointmentId: ID!, $appointmentStatus: AppointmentStatus!) {
      changeAppointmentStatus(appointmentId: $appointmentId, appointmentStatus: $appointmentStatus) {
          message
      }
}`

export const GET_APPOINTMENT_BY_ID = gql`query getAppointment ($id: ID!, $timeOffset: Int) {
            getAppointment (id: $id, timeOffset: $timeOffset) {
                  id
                  treatmentId
                  slotId
                  patientId
                  doctorId
                  clinicId
                  careTeamAssignees
                  admissionTime
                  appointmentStatus
                  patient {
                        patientId
                        title
                        firstName
                        lastName
                        dateOfBirth
                        gender
                        profileImage
                        nationality
                        # insurances
                        countryOfResidence
                        isVip
                        emailId
                        countryCode
                        mobileNumber
			mrn
                  }
                  doctor {
                        title
                        doctorId
                        firstName
                        middleName
                        lastName
                        specialities
                        clinics {
                              clinicName
                              city
                              country
                        }
                  }
                  transactionId
                  lastVistedDatetime
                  time
                  duration
                  status
                  count
                  careTeamAssignees
                  appointmentOtherInfo {
                        id
                        appointmentId
                        patientId
                        reason
                        notes
                        reportUrl
                        relatedPatientId
                        createdAt
                        updatedAt
                  }
                  appointmentConsentForm {
                        id
                        appointmentId
                        patientId
                        fullName
                        dob
                        nationalId
                        insuranceNumber
                        consentUrl
                        createdAt
                        updatedAt
                  }
                  recordSymptom {
                        id
                        appointmentId
                        patientId
                        url
                        audioUrl
                        descibeNotes
                        createdAt
                        updatedAt
                  }
                  bodyViewSymptom {
                        id
                        appointmentId
                        patientId
                        bodyViewImageUrl
                        createdAt
                        updatedAt
                  }
                  searchViewSymptoms {
                        id
                        appointmentId
                        patientId
                        symptomCode
                        startDate
                        endDate
                        severity
                        createdAt
                        updatedAt
                  }
                  createdAt
                  updatedAt
                  cancelAppointmentReason
                  canceledBy
                  rescheduleAppointmentReason
                  isCompleted
                  slot {
                        id
                        date
                        startTime
                        endTime
                        phaseOfDay
                        mode
                        doctorId
                        clinicId
                        duration
                        status
                        createdAt
                        updatedAt
                  }
                  appointmentConcierge {
                        id
                        appointmentId
                        requireParking
                        carPlateNumber
                        specialAssistance
                        vipArrival
                        conciergePreference
                        conciergeLanguage
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const GET_SLOTS = gql`query getSlots ($doctorId: ID!, $date: Date!, $clinicId: ID!, $phaseOfDay: String, $timeOffset: Int, $mode: Mode) {
            getSlots (doctorId: $doctorId, date: $date, clinicId: $clinicId, phaseOfDay: $phaseOfDay, timeOffset: $timeOffset, mode: $mode)
      }
`

export const GET_UPCOMING_SLOTS = gql`query getUpcomingSlots ($doctorId: ID!, $doctorWorkingHours: [doctorWorkingHourInput]!, $timeOffset: Int) {
      getUpcomingSlots(doctorId: $doctorId, doctorWorkingHours: $doctorWorkingHours, timeOffset: $timeOffset) {
            date
            startTime
            endTime
            duration
            mode
            day
      }
}`

export const CREATE_SLOT = gql`mutation createSlot ($content: SlotInput!) {
            createSlot (content: $content) {
                  id
                  date
                  startTime
                  endTime
                  phaseOfDay
                  mode
                  doctorId
                  clinicId
                  duration
                  status
                  createdAt
                  updatedAt
            }
      }
`

export const CREATE_PROFILE = gql`
      mutation createDoctorProfile ($doctorProfile: DoctorProfileInput!) {
            createDoctorProfile (doctorProfile: $doctorProfile) {
                  doctorId
                  title
                  userId
                  firstName
                  middleName
                  lastName
                  suffix
                  gender
                  dateOfBirth
                  languages
                  countryCode
                  mobileNumber
                  emailId
                  specialities
                  profilePhotoUrl
                  digitalSignatureUrl
                  licenseDate
                  about
                  createdAt
                  updatedAt
            }
      }
`;

export const UPDATE_PROFILE = gql`mutation updateDoctorProfile ($doctorId: ID!, $doctorProfile: DoctorProfileInput!) {
            updateDoctorProfile (doctorId: $doctorId, doctorProfile: $doctorProfile) {
                  doctorId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  gender
                  dateOfBirth
                  languages
                  countryCode
                  mobileNumber
                  emailId
                  specialities
                  profilePhotoUrl
                  digitalSignatureUrl
                  licenseDate
                  about
                  createdAt
                  updatedAt
                  hasMultipleClinics
            }
      }
`;

export const LOGIN = gql`
      mutation loginUser ($content: LoginInput!) {
            loginUser (content: $content) {
                  access_token
                  expires_in
                  refresh_token
                  token_type
                  scope
            }
      }
`;

export const GET_DOCTOR = gql`query getDoctor ($doctorId: ID, $timeOffset: Int) {
            getDoctor (doctorId: $doctorId, timeOffset: $timeOffset) {
                  doctorId
                  userId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  gender
                  dateOfBirth
                  doctorTotalExperience
                  languages
                  idProof {
                        id
                        doctorId
                        type
                        number
                        documentUrl
                        createdAt
                        updatedAt
                  }
                  educations {
                        id
                        doctorId
                        degree
                        university
                        startYear
                        endYear
                        school
                        grade
                        description
                        certificateDocumentUrl
                        educationCertificate {
                              id
                              name
                              issuingOrganisation
                              issueDate
                              expirationDate
                              credentialId
                              credentialUrl
                              createdAt
                              updatedAt
                        }
                        createdAt
                        updatedAt
                  }
                  countryCode
                  mobileNumber
                  emailId
                  specialities
                  hasMultipleClinics
                  profilePhotoUrl
                  digitalSignatureUrl
                  socialLink {
                        id
                        doctorId
                        website
                        linkedin
                        facebook
                        instagram
                        twitter
                        youtube
                        tiktok
                  }
                  registrationDetails {
                        id
                        doctorId
                        country
                        state
                        city
                        number
                        council
                        date
                        expirationDate
                        certificateDocumentUrl
                        createdAt
                        updatedAt
                  }
                  about
                  clinics {
                        clinicId
                        clinicName
                        logourl
                        licenseUrl
                        licenseName
                        licenseNumber
                        licenseExpiryDate
                        addressLine1
                        addressLine2
                        postalCode
                        country
                        city
                        state
                        latitude
                        longitude
                        contactNumber
                        clinicType
                        workingHours
                        imageUrls
                        treatments
                        facilities
                        createdAt
                        updatedAt
                        trn
                  }
                  workingHours {
                        id
                        doctorId
                        clinicId
                        day
                        phaseOfDay
                        mode
                        startTime
                        endTime
                        duration
                        createdAt
                        updatedAt
                  }
                  fees {
                        feeId
                        doctorId
                        clinicId
                        categoryName
                        currency
                        fee
                        followupFee
                        followupDuration
                        taxPercentage
                        taxValue
                        createdAt
                        updatedAt
                  }
                  upcomingAppointment {
                        id
                  }
                  rating {
                        doctorId
                  }
                  upcomingSlots {
                        date
                        startTime
                        endTime
                        duration
                        mode
                        day
                  }
                  staffAccesses
            }
      }
`;

export const MASTER_DATA = gql`
      query getMasterDataByType ($type: String!, $parentId: ID, $searchTerm: String) {
            getMasterDataByType (type: $type, parentId: $parentId, searchTerm: $searchTerm) {
                  id
                  parentId
                  name
                  description
                  order
                  type
                  imageUrl
                  isEnable
                  createdAt
                  updatedAt
            }
      }
`;

export const ADD_ID_PROOF = gql`mutation addIdProof ($doctorId: ID!, $idProof: IDProofInput!) {
            addIdProof (doctorId: $doctorId, idProof: $idProof) {
                  id
                  doctorId
                  type
                  number
                  documentUrl
                  createdAt
                  updatedAt
            }
      }
`;

export const UPDATE_ID_PROOF = gql`mutation updateIdProof ($id: ID!, $idProof: IDProofInput!) {
            updateIdProof (id: $id, idProof: $idProof) {
                  id
                  doctorId
                  type
                  number
                  documentUrl
                  createdAt
                  updatedAt
            }
      }
`;

export const GET_ID_PROOF = gql`query getIdProof ($id: ID!) {
            getIdProof (id: $id) {
                  id
                  doctorId
                  type
                  number
                  documentUrl
                  createdAt
                  updatedAt
            }
      }
`;

export const CREATE_SOCIAL_LINK = gql`mutation createSocialLink ($content: SocialLinkInput!) {
            createSocialLink (content: $content) {
                  id
                  doctorId
                  website
                  linkedin
                  facebook
                  instagram
                  twitter
                  youtube
                  tiktok
            }
      }
`;

export const UPDATE_SOCIAL_LINK = gql`mutation updateSocialLink ($id: ID!, $content: SocialLinkInput!) {
            updateSocialLink (id: $id, content: $content) {
                  id
                  doctorId
                  website
                  linkedin
                  facebook
                  instagram
                  twitter
                  youtube
                  tiktok
            }
      }
`;

export const GET_EDUCATION = gql`query getAllEducation ($doctorId: ID!) {
            getAllEducation (doctorId: $doctorId) {
                  id
                  doctorId
                  degree
                  university
                  startYear
                  endYear
                  school
                  grade
                  description
                  certificateDocumentUrl
                  educationCertificate{
                        id
                        name
                        issuingOrganisation
                        issueDate
                        expirationDate
                        credentialId
                        credentialUrl
                  }
            }
      }
`;

export const ADD_EDUCATION = gql`mutation addEducation ($doctorId: ID!, $education: DoctorEducationInput!) {
            addEducation (doctorId: $doctorId, education: $education) {
                  id
                  doctorId
                  degree
                  university
                  startYear
                  endYear
                  school
                  grade
                  description
                  certificateDocumentUrl
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_EDUCATION = gql`mutation updateEducation ($id: ID!, $education: DoctorEducationInput!) {
            updateEducation (id: $id, education: $education) {
                  id
                  doctorId
                  degree
                  university
                  startYear
                  endYear
                  school
                  grade
                  description
                  certificateDocumentUrl
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_EDUCATION = gql`mutation deleteEducation ($id: ID!) {
            deleteEducation (id: $id)
      }
`

export const GET_REGISTRATION_DETAIL = gql`query getRegistrationDetail ($id: ID!) {
            getRegistrationDetail (id: $id) {
                  id
                  doctorId
                  country
                  state
                  city
                  number
                  council
                  date
                  expirationDate
                  certificateDocumentUrl
                  createdAt
                  updatedAt
            }
      }
`

export const ADD_REGISTRATION_DETAIL = gql`mutation addRegistrationDetail ($doctorId: ID!, $registrationDetail: RegistrationDetailInput!) {
            addRegistrationDetail (doctorId: $doctorId, registrationDetail: $registrationDetail) {
                  id
                  doctorId
                  country
                  state
                  city
                  number
                  council
                  date
                  expirationDate
                  certificateDocumentUrl
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_REGISTRATION_DETAIL = gql`mutation updateRegistrationDetail ($id: ID!, $registrationDetail: RegistrationDetailInput!) {
            updateRegistrationDetail (id: $id, registrationDetail: $registrationDetail) {
                  id
                  doctorId
                  country
                  state
                  city
                  number
                  council
                  date
                  expirationDate
                  certificateDocumentUrl
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_REGISTRATION_DETAIL = gql`mutation deleteRegistrationDetail ($id: ID!) {
            deleteRegistrationDetail (id: $id)
      }
`

export const GET_TREATMENT = gql`query getDescriptionsByStringFromProcedure ($searchTerm: String!, $semanticTag: String!, $page: PaginationInput) {
            getDescriptionsByStringFromProcedure (searchTerm: $searchTerm, semanticTag: $semanticTag, page: $page)
      }
`

export const ADD_CLINIC = gql`
      mutation addClinic ($doctorId: ID!, $clinicId: ID!) {
            addClinic (doctorId: $doctorId, clinicId: $clinicId)
      }
`

export const CREATE_CLINIC = gql`
      mutation createClinic ($clinic: ClinicInput!) {
            createClinic (clinic: $clinic) {
                  clinicId
                  clinicName
                  logourl
                  licenseUrl
                  licenseName
                  licenseNumber
                  licenseExpiryDate
                  addressLine1
                  addressLine2
                  postalCode
                  country
                  city
                  state
                  latitude
                  longitude
                  contactNumber
                  clinicType
                  imageUrls
                  treatments
                  facilities
                  createdAt
                  updatedAt
            }
      }
`;

export const GET_CLINIC = gql`query getClinic ($clinicId: ID!) {
      getClinic (clinicId: $clinicId) {
          clinicId
          clinicName
          logourl
          licenseUrl
          licenseName
          licenseNumber
          licenseExpiryDate
          addressLine1
          addressLine2
          postalCode
          country
          city
          state
          latitude
          longitude
          contactNumber
          clinicType
          workingHours
          imageUrls
          treatments
          facilities
          trn
          doctors{
            doctorId
            firstName
            lastName
          }
      }
}`

export const UPDATE_CLINIC = gql`
      mutation updateClinic ($clinicId: ID!, $clinic: ClinicInput!) {
            updateClinic (clinicId: $clinicId, clinic: $clinic) {
                  clinicId
                  clinicName
                  logourl
                  licenseUrl
                  licenseName
                  licenseNumber
                  licenseExpiryDate
                  addressLine1
                  addressLine2
                  postalCode
                  country
                  city
                  state
                  latitude
                  longitude
                  contactNumber
                  clinicType
                  imageUrls
                  treatments
                  facilities
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_CLINIC = gql`mutation deleteClinic ($clinicId: ID!) {
            deleteClinic (clinicId: $clinicId) 
      }
`

export const CREATE_SLOTS = gql`mutation createBulkSlots ($slots: [SlotInput]!, $timeOffset: Int) {
            createBulkSlots (slots: $slots, timeOffset: $timeOffset) {
                  id
                  startTime
                  endTime
                  phaseOfDay
                  mode
                  doctorId
                  clinicId
                  duration
                  status
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_SLOTS = gql`
      mutation updateBulkSlots ($slots: [SlotInput]!, $timeOffset: Int) {
            updateBulkSlots (slots: $slots, timeOffset: $timeOffset) {
                  id
                  startTime
                  endTime
                  phaseOfDay
                  mode
                  doctorId
                  clinicId
                  duration
                  status
                  createdAt
                  updatedAt
            }
      }
`

export const GET_PATIENT = gql`query getPatient ($patientId: ID) {
            getPatient (patientId: $patientId) {
                  id
                  userId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  countryCode
                  mobileNumber
                  emailId
                  gender
                  dateOfBirth
                  placeOfBirth
                  nationality
                  countryOfResidence
                  languages
                  bio
                  deviceToken
                  profileImage
                  isoCode
                  maritalStatus
                  bloodGroup
                  bloodDoner
                  noOfChildren
                  occupation
                  notification
                  isDeleted
                  preferedLanguages
                  verifiedByAdmin
                  createdAt
                  updatedAt
                  isVip
                  mrn
                  contacts{
                        id
                        patientId
                        primaryNumber
                        secondaryNumber
                        email
                        createdAt
                        updatedAt
                  }
                  addresses{
                        id
                        patientId
                        addressLine1
                        addressLine2
                        latitude
                        longitude
                        addressType
                        addTitle
                        city
                        district
                        state
                        country
                        pincode
                        isDefaultAddress
                        createdAt
                        updatedAt
                  }
                  insurances{
                        patientId
                        insurenceId
                  }
                  patientImages{
                        id
                        profileImage
                        patientId
                        imageName
                        imageType
                        imageSide
                        documentName
                        documentType
                        documentIdNumber
                        frontImage
                        backImage
                        isDocumentUploaded
                  }
                  socialLink{
                        patientId
                        linkedin
                        facebook
                        instagram
                        twitter
                        youtube
                  }
                  interests{
                        patientId
                        interest
                  }
                  emergencyContacts{
                        id
                        patientId
                        name
                        contact
                        countryCode
                        relation
                        otherRelation
                        email
                        createdAt
                        updatedAt
                  }
                  lifeStyle{
                        id
                        patientId
                        occupation
                        occupationType
                        activityLevel
                        diet
                        alchohalConsumption
                        smokingHabit
                        sexualActivity
                        contraception
                        drug
                        createdAt
                        updatedAt
                  }
                  healthConditions{
                        id
                        patientId
                        healthConditionType{
                              id    
                              code
                              name
                              description
                        }
                        name
                        value
                  }
                  relatives{
                        id
                        patientId
                        suffix
                        firstName
                        middleName
                        lastName
                        relation
                        occupation
                        dob
                        gender
                  }
                  homeEnviornments{
                        id
                        questions
                        options
                        answer
                  }
                  weights{
                        id
                        patientId
                        weight
                        weightUnit
                        targetWeight
                        targetWeightUnit
                        reminders
                  }
                  heights{
                        id
                        patientId
                        height
                        heightUnit
                  }
                  kins {
                        id
                        patientId
                        firstName
                        lastName
                        relation
                        contact
                        email
                  }
                  healthCard {
                        id
                        patientId
                        number
                        province
                        expiryDate
                        race
                        createdAt
                        updatedAt
                  }
                  latestPatientAssessment{
                        appointmentId
                  }
            }
      }
`

export const RECORD_VITALS = gql`mutation recordBulkVitalReadings ($vitalReadings: [VitalReadingInput!]!) {
            recordBulkVitalReadings (vitalReadings: $vitalReadings) {
                  id
                  patientId
                  vitalId
                  value
                  uom
                  notes
                  readingSource
                  mealPreference
                  additionalInfo
                  attachmentUrls
                  readingDate
                  reminder
                  createdAt
                  updatedAt
            }
      }
`

export const GET_VITAL_LETEST_READTING = gql`query getLatestReadings ($patientId: ID, $appointmentId: ID) {
            getLatestReadings (patientId: $patientId, , appointmentId: $appointmentId) {
                  id
                  patientId
                  vitalId
                  value
                  uom
                  notes
                  readingSource
                  mealPreference
                  additionalInfo
                  attachmentUrls
                  readingDate
                  createdAt
                  updatedAt
            }
      }
`

export const GET_VITAL_HISTORY = gql`query getVitalHistory ($startDate: Date!, $endDate: Date!, $appointmentId: ID, $patientId: ID, $vitalId: ID) {
            getVitalHistory (startDate: $startDate, endDate: $endDate, appointmentId: $appointmentId, patientId: $patientId, vitalId: $vitalId) {
                  id
                  patientId
                  vitalId
                  value
                  uom
                  notes
                  readingSource
                  mealPreference
                  additionalInfo
                  attachmentUrls
                  readingDate
                  reminder
                  createdAt
                  updatedAt
            }
      }
`
export const EXPORT_VITAL_HISTORY = gql`query VitalExport ($startDate: Date!, $endDate: Date!, $patientId: ID!, $vitalId: ID!, $timeOffset: Int = 0) {
      vitalExport (startDate: $startDate, endDate: $endDate, patientId: $patientId, vitalId: $vitalId, timeOffset: $timeOffset) 
}`

export const GET_ALL_CLINIC = gql`query getDoctor ($doctorId: ID) {
            getDoctor (doctorId: $doctorId) {
                  doctorId
                  userId
                  clinics {
                        clinicId
                        clinicName
                        logourl
                        licenseUrl
                        licenseName
                        licenseNumber
                        licenseExpiryDate
                        addressLine1
                        addressLine2
                        postalCode
                        country
                        city
                        state
                        latitude
                        longitude
                        contactNumber
                        clinicType
                        workingHours
                        imageUrls
                        treatments
                        facilities
                        createdAt
                        updatedAt
                  }
                  workingHours {
                        id
                        doctorId
                        clinicId
                        day
                        phaseOfDay
                        mode
                        startTime
                        endTime
                        duration
                        createdAt
                        updatedAt
                  }
                  fees {
                        feeId
                        doctorId
                        clinicId
                        categoryName
                        currency
                        fee
                        followupFee
                        followupDuration
                        taxPercentage
                        taxValue
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const GET_ALL_FEES = gql`query getAllFees ($doctorId: ID!, $clinicId: ID!, $searchTerm: String, $page: PaginationInput) {
            getAllFees (doctorId: $doctorId, clinicId: $clinicId, searchTerm: $searchTerm, page: $page) {
                  treatmentCount
                  virtualConsultation {
                        feeId
                        doctorId
                        clinicId
                        categoryName
                        currency
                        fee
                        followupFee
                        followupDuration
                        taxPercentage
                        taxValue
                        createdAt
                        updatedAt
                  }
                  clinicalConsultation {
                        feeId
                        doctorId
                        clinicId
                        categoryName
                        currency
                        fee
                        followupFee
                        followupDuration
                        taxPercentage
                        taxValue
                        createdAt
                        updatedAt
                  }
                  fees {
                        feeId
                        doctorId
                        clinicId
                        categoryName
                        currency
                        fee
                        followupFee
                        followupDuration
                        taxPercentage
                        taxValue
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const ADD_FEE = gql`mutation addFee ($fee: FeeInput!) {
            addFee (fee: $fee) {
                  feeId
                  doctorId
                  clinicId
                  categoryName
                  currency
                  fee
                  followupFee
                  followupDuration
                  taxPercentage
                  taxValue
                  createdAt
                  updatedAt
            }
      }
`

export const BULK_ADD_FEE = gql`mutation bulkAddFee ($fees: [FeeInput!]!) {
      bulkAddFee (fees: $fees) {
            feeId
            doctorId
            clinicId
            categoryName
            currency
            fee
            followupFee
            followupDuration
            taxPercentage
            taxValue
            createdAt
            updatedAt
      }
}`

export const BULK_UPDATE_FEE = gql`mutation bulkUpdateFee ($fees: [FeeInput!]!) {
      bulkUpdateFee (fees: $fees) {
            feeId
            doctorId
            clinicId
            categoryName
            currency
            fee
            followupFee
            followupDuration
            taxPercentage
            taxValue
            createdAt
            updatedAt
      }
}`

export const UPDATE_FEE = gql`mutation updateFee ($feeId: ID!, $fee: FeeInput!) {
            updateFee (feeId: $feeId, fee: $fee) {
                  feeId
                  doctorId
                  clinicId
                  categoryName
                  currency
                  fee
                  followupFee
                  followupDuration
                  taxPercentage
                  taxValue
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_FEE = gql`mutation deleteFee ($feeId: ID!) {
            deleteFee (feeId: $feeId)
      }
`

export const CREATE_BULK_WORKING_HOURS = gql`mutation createBulkWoringHours ($workingHours: [WorkingHourInput]!, $timeOffset: Int) {
            createBulkWoringHours (workingHours: $workingHours, timeOffset: $timeOffset) {
                  id
                  doctorId
                  clinicId
                  day
                  phaseOfDay
                  mode
                  startTime
                  endTime
                  duration
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_BULK_WORKING_HOURS = gql`mutation updateBulkWoringHours ($workingHours: [WorkingHourInput]!, $timeOffset: Int) {
            updateBulkWoringHours (workingHours: $workingHours, timeOffset: $timeOffset) {
                  id
                  doctorId
                  clinicId
                  day
                  phaseOfDay
                  mode
                  startTime
                  endTime
                  duration
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_BULK_WORKING_HOURS = gql`mutation deleteWoringHours ($ids: [ID!]!) {
            deleteWoringHours (ids: $ids)
      }
`

export const GET_ALL_WORKING_HOURS = gql`query getWorkingHours ($doctorId: ID!, $clinicId: ID!, $day: String, $phaseOfDay: String, $timeOffset: Int) {
            getWorkingHours (doctorId: $doctorId, clinicId: $clinicId, day: $day, phaseOfDay: $phaseOfDay, timeOffset: $timeOffset) {
                  id
                  doctorId
                  clinicId
                  day
                  phaseOfDay
                  mode
                  startTime
                  endTime
                  duration
                  createdAt
                  updatedAt
            }
      }
`

export const GET_PATIENT_HEIGHT = gql`query getPatientHeight ($id: ID!) {
            getPatientHeight (id: $id) {
                  id
                  patientId
                  height
                  heightUnit
                  createdAt
                  updatedAt
            }
      }
`

export const GET_CURRENT_PATIENT_HEIGHT = gql`query getPatientCurrentHeight ($patientId: ID!) {
            getPatientCurrentHeight (patientId: $patientId) {
                  id
                  patientId
                  height
                  heightUnit
                  createdAt
                  updatedAt
            }
      }
`

export const GET_PATIENT_HEIGHT_HISTORY = gql`query getPatientWeightHistory ($patientId: ID!, $unit: String, $startDate: Date!, $endDate: Date!) {
            getPatientWeightHistory (patientId: $patientId, unit: $unit, startDate: $startDate, endDate: $endDate) {
                  date
                  weight
                  change
                  unit
            }
      }
`

export const GET_PATIENT_WEIGHT = gql`query getPatientWeight ($id: ID!) {
            getPatientWeight (id: $id) {
                  id
                  patientId
                  weight
                  weightUnit
                  targetWeight
                  targetWeightUnit
                  reminders
                  createdAt
                  updatedAt
            }
      }
`

export const GET_CURRENT_PATIENT_WEIGHT = gql`query getPatientCurrentWeight ($patientId: ID!) {
            getPatientCurrentWeight (patientId: $patientId) {
                  id
                  patientId
                  weight
                  weightUnit
                  targetWeight
                  targetWeightUnit
                  reminders
                  createdAt
                  updatedAt
            }
      }
`

export const GET_PATIENT_WEIGHT_HISTORY = gql`query getPatientHeightHistory ($patientId: ID!, $unit: String, $startDate: Date!, $endDate: Date!) {
            getPatientHeightHistory (patientId: $patientId, unit: $unit, startDate: $startDate, endDate: $endDate) {
                  date
                  height
                  change
                  unit
            }
      }
`

export const GET_PATIENT_BMI = gql`query getPatientBMI ($patientId: ID!) {
            getPatientBMI (patientId: $patientId) {
                  patientId
                  bmi
                  message
            }
      }
`

export const CREATE_SYMPTOM = gql`mutation createSymptoms ($clinicalAssessmentId: ID!, $patientId: ID, $content: [SymptomInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
            createSymptoms (clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
                  id
            }
      }
`

export const UPDATE_SYMPTOM = gql`mutation updateSymptom ($symptomId: ID!, $content: SymptomInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updateSymptom (symptomId: $symptomId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
          id
      }
}`

export const DELETE_SYMPTOM = gql`mutation deleteSymptom ($symptomId: ID!) {
      deleteSymptom (symptomId: $symptomId) {
          message
      }
}`

export const GET_ALL_PATIENT_SYMPTOM = gql`query getAllSymptomByPatient ($patientId: ID!, $clinicalAssessmentId: ID) {
            getAllSymptomByPatient (patientId: $patientId, clinicalAssessmentId: $clinicalAssessmentId) {
                  id
                  clinicalAssessmentId
                  patientId
                  condition
                  status
                  onsetDate
                  severity
                  abatementDate
            }
      }
`

export const GET_PATIENT_IMAGES = gql`query getPatientImages ($patientId: ID!) {
            getPatientImages (patientId: $patientId) {
                  id
                  profileImage
                  patientId
                  imageName
                  imageType
                  imageSide
                  documentName
                  documentType
                  documentIdNumber
                  frontImage
                  backImage
                  isDocumentUploaded
            }
      }
`

export const CREATE_PATIENT_IMAGES = gql`mutation createPatientImages($patientId: ID!, $content: PatientImagesInput!) {
      createPatientImages(patientId: $patientId, content: $content) {
        id
        profileImage
        patientId
        imageName
        imageType
        imageSide
        documentName
        documentType
        documentIdNumber
        frontImage
        backImage
        isDocumentUploaded
      }
}`

export const UPDATE_PATIENT_IMAGES = gql`mutation updatePatientImages($id: ID!, $patientId: ID!, $content: PatientImagesInput!) {
      updatePatientImages(id: $id, patientId: $patientId, content: $content) {
        id
        profileImage
        patientId
        imageName
        imageType
        imageSide
        documentName
        documentType
        documentIdNumber
        frontImage
        backImage
        isDocumentUploaded
      }
}`

export const GET_PATIENT_INSURANCE = gql`query getInsurance ($patientId: ID!) {
      getInsurance (patientId: $patientId) {
          id
          patientId
          country
          insuranceProvider
          tpa
          insuranceIdNumber
          plan
          policyStatus
          startDate
          terminateDate
          endDate
          cardFrontImage
          cardBackImage
          createdAt
          updatedAt
      }
}`

// export const GET_ICD_CODE = gql`query getICDBySearch ($searchTerm: String!, $page: PaginationInput) {
//             getICDBySearch (searchTerm: $searchTerm, page: $page)
//       }
// `
export const GET_ICD_CODE = gql`query getICDBySearch ($searchTerm: String!, $page: PaginationInput) {
      getICDBySearch (searchTerm: $searchTerm, page: $page) {
                  id
                  code
                  display
            }
      }
`

export const CREATE_CLINICAL_ASSESSMENT = gql`mutation createClinicalAssessment ($content: ClinicalAssessmentInput) {
            createClinicalAssessment (content: $content) 
      }
`

export const GET_CLINICAL_ASSESSMENT = gql`query getClinicalAssessment ($clinicalAssessmentId: ID, $appointmentId: ID, $timeOffset: Int) {
            getClinicalAssessment (clinicalAssessmentId: $clinicalAssessmentId, appointmentId: $appointmentId, timeOffset: $timeOffset)
      }
`

export const DELETE_ALLERGY = gql`mutation deleteAllergy ($allergyId: ID!) {
      deleteAllergy (allergyId: $allergyId) {
          message
      }
}`

export const DELETE_FAMILY_MEDICAL_HISTORY = gql`mutation deleteFamilyMedicalHistory ($familyMedicalHistoryId: ID!) {
      deleteFamilyMedicalHistory (familyMedicalHistoryId: $familyMedicalHistoryId) {
          message
      }
}`

export const DELETE_EXISTING_MEDICAL_HISTORY = gql`mutation deleteExistingMedicalHistory ($existingMedicalHistoryId: ID!) {
      deleteExistingMedicalHistory (existingMedicalHistoryId: $existingMedicalHistoryId) {
          message
      }
}`

export const DELETE_PRESENT_ILLNESS = gql`mutation deletePresentIllness ($presentIllnessId: ID!) {
      deletePresentIllness (presentIllnessId: $presentIllnessId) {
          message
      }
}`

export const DELETE_CONDITION = gql`mutation deleteCondition ($conditionId: ID!) {
      deleteCondition (conditionId: $conditionId) {
          message
      }
}`

export const CREATE_TREATMENT = gql`mutation createTreatment ($content: TreatmentInput!) {
            createTreatment (content: $content) {
                  id
                  appointmentId
                  patientId
                  doctorId
                  details
                  patientInstruction
                  notes
                  url
                  status
                  patient {
                        patientId
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const GET_TREATMENT_APPOINTMENT_ID = gql`query getTreatmentByAppointmentId ($appointmentId: ID!) {
            getTreatmentByAppointmentId (appointmentId: $appointmentId) {
                  id
                  appointmentId
                  patientId
                  doctorId
                  details
                  patientInstruction
                  notes
                  url
                  status
                  patient {
                        patientId
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_CLINICAL_ASSESSMENT = gql`mutation updateClinicalAssessment ($clinicalAssessmentId: ID!, $content: ClinicalAssessmentUpdateInput) {
            updateClinicalAssessment (clinicalAssessmentId: $clinicalAssessmentId, content: $content)
      }
`

export const CREATE_ALLERGY = gql`mutation createAllergies ($clinicalAssessmentId: ID!, $content: [AllergyInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      createAllergies (clinicalAssessmentId: $clinicalAssessmentId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}`

export const UPDATE_ALLERGY = gql`mutation updateAllergy ($allergyId: ID!, $content: AllergyInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updateAllergy (allergyId: $allergyId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}`

export const GET_ALL_PATIENT_ALLERGY = gql`query getPatientAllergies ($patientId: ID!) {
            getPatientAllergies (patientId: $patientId) {
                  id
                  patientId
                  name
                  status
                  type
                  category
                  criticality
                  onsiteDate
                  lastOccurence
                  substance
                  certanity
                  routeOfExposure
                  manifestation
                  abatementDate
                  duration
                  notes
            }
      }
`

export const GET_PATIENT_ALLERGY = gql`query getPatientClinicalAssessmentAllergies ($patientId: ID!, $doctorId: ID!, $page: PaginationInput) {
      getPatientClinicalAssessmentAllergies (patientId: $patientId, doctorId: $doctorId, page: $page) {
          id
          clinicalAssessmentId
          allergen
          status
          criticality
          type
          category
          abatementDate
          lastOccurenceDate
          substance
          certainty
          routeOfExposure
          manifestations
          onsetDate
          duration
          recordedBy
          recordedUserDetail {
              firstName
              lastName
              middleName
              staffType
              title
          }
          createdAt
          updatedAt
      }
}`

export const GET_SESSION = gql`query getSession ($appointmentId: ID!, $profileType: ProfileType) {
            getSession (appointmentId: $appointmentId, profileType: $profileType) {
                  sessionId
                  token
            }
      }
`

export const SEND_CALL_INVITE = gql`mutation sendCallInvite ($content: SendInviteInput) {
      sendCallInvite (content: $content) {
          id
          senderUserId
          senderUserProfile
          receiverUserId
          receiverUserProfile
          link
          sessionId
          callJoinTime
          callLeaveTime
          createdAt
          updatedAt
      }
}`

export const START_CALL_ARCHIVE = gql`mutation startCallArchive ($appointmentId: ID!, $sessionId: ID!, $content: CallArchiveInput!) {
      startCallArchive (appointmentId: $appointmentId, sessionId: $sessionId, content: $content) {
          status
          archiveId
          url
      }
}`

export const GET_ARCHIVED_CALL = gql`query getCallArchive ($archiveId: ID!) {
      getCallArchive (archiveId: $archiveId) {
          status
          archiveId
          url
      }
}`

export const STOP_CALL_ARCHIVE = gql`mutation stopCallArchive ($archiveId: ID!) {
      stopCallArchive (archiveId: $archiveId) {
          status
          archiveId
          url
      }
}`

export const CALL_ARCHIVE_HISTORY = gql`query getAppointmentCallArchiveHistory($appointmentId: ID!) {
      getAppointmentCallArchiveHistory(appointmentId: $appointmentId) {
        appointmentId
        archiveId
        url
        date
        duration
      }
}`

export const UPDATE_VIDEO_CALL_STATUS = gql`mutation updateVideoCallStatus ($id: ID!, $callJoinTime: Date, $callLeaveTime: Date) {
      updateVideoCallStatus (id: $id, callJoinTime: $callJoinTime, callLeaveTime: $callLeaveTime) {
          message
      }
}`

export const REGISTER_NEW_PATIENT = gql`mutation createPatientProfile ($patient: PatientInput!) {
            createPatientProfile (patient: $patient) {
                  id
                  userId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  countryCode
                  mobileNumber
                  emailId
                  gender
                  dateOfBirth
                  placeOfBirth
                  nationality
                  countryOfResidence
                  languages
                  bio
                  deviceToken
                  profileImage
                  isoCode
                  maritalStatus
                  bloodGroup
                  bloodDoner
                  verifiedByAdmin
                  notification
                  createdAt
                  updatedAt
                  isDeleted
                  isVip
                  addresses {
                        id
                        patientId
                        addressLine1
                        addressLine2
                        latitude
                        longitude
                        addressType
                        addTitle
                        country
                        state
                        city
                        district
                        pincode
                        isDefaultAddress
                        createdAt
                        updatedAt
                  }
                  patientImages {
                        id
                        profileImage
                        patientId
                        imageName
                        imageType
                        imageSide
                        documentName
                        documentType
                        documentIdNumber
                        frontImage
                        backImage
                        isDocumentUploaded
                  }
                  insurances {
                        patientId
                        insurenceId
                  }
                  socialLink {
                        patientId
                        linkedin
                        facebook
                        instagram
                        twitter
                        youtube
                  }
                  interests {
                        patientId
                        interest
                  }
                  emergencyContacts {
                        id
                        patientId
                        name
                        contact
                        countryCode
                        relation
                        otherRelation
                        createdAt
                        updatedAt
                  }
                  lifeStyle {
                        id
                        patientId
                        occupation
                        occupationType
                        activityLevel
                        diet
                        alchohalConsumption
                        smokingHabit
                        sexualActivity
                        contraception
                        drug
                        createdAt
                        updatedAt
                  }
                  healthConditions {
                        id
                        patientId
                        healthConditionType {
                              id
                              code
                              name
                              description
                        }
                        name
                        value
                  }
                  relatives {
                        id
                        patientId
                        suffix
                        firstName
                        middleName
                        lastName
                        relation
                        occupation
                        dob
                        gender
                        createdAt
                        updatedAt
                  }
                  homeEnviornments {
                        id
                        questions
                        options
                        answer
                  }
                  weights {
                        id
                        patientId
                        weight
                        weightUnit
                        targetWeight
                        targetWeightUnit
                        reminders
                        createdAt
                        updatedAt
                  }
                  heights {
                        id
                        patientId
                        height
                        heightUnit
                        createdAt
                        updatedAt
                  }
                  kins {
                        id
                        firstName
                        lastName
                        relation
                        contact
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const UPDATE_PATIENT_PROFILE = gql`mutation updatePatientProfile ($id: ID!, $patient: PatientUpdateInput!) {
            updatePatientProfile (id: $id, patient: $patient) {
                  id
                  userId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  countryCode
                  mobileNumber
                  emailId
                  gender
                  dateOfBirth
                  placeOfBirth
                  nationality
                  countryOfResidence
                  languages
                  bio
                  deviceToken
                  profileImage
                  isoCode
                  maritalStatus
                  bloodGroup
                  bloodDoner
                  verifiedByAdmin
                  notification
                  createdAt
                  updatedAt
                  isDeleted
                  isVip
                  addresses {
                        id
                        patientId
                        addressLine1
                        addressLine2
                        latitude
                        longitude
                        addressType
                        addTitle
                        country
                        state
                        city
                        district
                        pincode
                        isDefaultAddress
                        createdAt
                        updatedAt
                  }
                  patientImages {
                        id
                        profileImage
                        patientId
                        imageName
                        imageType
                        imageSide
                        documentName
                        documentType
                        documentIdNumber
                        frontImage
                        backImage
                        isDocumentUploaded
                  }
                  insurances {
                        patientId
                        insurenceId
                  }
                  socialLink {
                        patientId
                        linkedin
                        facebook
                        instagram
                        twitter
                        youtube
                  }
                  interests {
                        patientId
                        interest
                  }
                  emergencyContacts {
                        id
                        patientId
                        name
                        contact
                        countryCode
                        relation
                        otherRelation
                        createdAt
                        updatedAt
                  }
                  lifeStyle {
                        id
                        patientId
                        occupation
                        occupationType
                        activityLevel
                        diet
                        alchohalConsumption
                        smokingHabit
                        sexualActivity
                        contraception
                        drug
                        createdAt
                        updatedAt
                  }
                  healthConditions {
                        id
                        patientId
                        healthConditionType {
                              id
                              code
                              name
                              description
                        }
                        name
                        value
                  }
                  relatives {
                        id
                        patientId
                        suffix
                        firstName
                        middleName
                        lastName
                        relation
                        occupation
                        dob
                        gender
                        createdAt
                        updatedAt
                  }
                  homeEnviornments {
                        id
                        questions
                        options
                        answer
                  }
                  weights {
                        id
                        patientId
                        weight
                        weightUnit
                        targetWeight
                        targetWeightUnit
                        reminders
                        createdAt
                        updatedAt
                  }
                  heights {
                        id
                        patientId
                        height
                        heightUnit
                        createdAt
                        updatedAt
                  }
                  kins {
                        id
                        firstName
                        lastName
                        relation
                        contact
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const CREATE_PATIENT_LIFESTYLE = gql`mutation createPatientLifeStyle ($patientId: ID!, $content: LifestyleProfileInput!) {
            createPatientLifeStyle (patientId: $patientId, content: $content) {
                  id
                  patientId
                  occupation
                  occupationType
                  activityLevel
                  diet
                  alchohalConsumption
                  smokingHabit
                  sexualActivity
                  contraception
                  drug
                  createdAt
                  updatedAt
            }
      }
`
// export const CREATE_PATIENT_LIFESTYLE = gql`mutation createLifestyle ($patientId: ID!, $content: LifestyleInput!) {
//             createLifestyle (patientId: $patientId, content: $content) {
//                   id
//                   patientId
//                   smokingHabit
//                   alchohalConsumption
//                   occupation
//                   occupationType
//                   diet
//                   sexualActivity
//                   contraception
//                   drug
//                   activityLevel
//                   createdAt
//                   updatedAt
//             }
//       }
// `

export const GET_PATIENT_LIFESTYLE = gql`query getPatientLifeStyle ($patientId: ID!) {
            getPatientLifeStyle (patientId: $patientId) {
                  id
                  patientId
                  smokingHabit
                  alchohalConsumption
                  occupation
                  occupationType
                  diet
                  sexualActivity
                  contraception
                  drug
                  activityLevel
                  createdAt
                  updatedAt
            }
      }
`

export const CREATE_PATIENT_EXISITING_MEDICAL_HISTORY = gql`mutation createExistingMedicalHistories ($clinicalAssessmentId: ID!, $content: [ExistingMedicalHistoryInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
            createExistingMedicalHistories (clinicalAssessmentId: $clinicalAssessmentId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
                  id
            }
      }
`

export const UPDATE_EXISITING_MEDICAL_HISTORY = gql`mutation updateExistingMedicalHistory ($existingMedicalHistoryId: ID!, $content: ExistingMedicalHistoryInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updateExistingMedicalHistory (existingMedicalHistoryId: $existingMedicalHistoryId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}`

export const GET_PRESCRIPTION_BY_TREATMENT_ID = gql`query getPrescriptionByTreatment ($treatmentId: ID!) {
            getPrescriptionByTreatment (treatmentId: $treatmentId) {
                  id
                  doctorId
                  notes
                  url
                  prescriptionUrl
                  medicines {
                        id
                        genericName
                        brandName
                        strength
                        unit
                        dosageForm
                        quantity
                        color
                        routeOfAdministation
                        dosageStartDate
                        dosageEndDate
                        dosageDays
                        dosageTimings
                        dosageFrequency
                        intervalDays
                        inventory
                        refillDate
                        instructions
                        scheduleX
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const CREATE_PRESCRIPTION = gql`mutation createPrescription ($treatmentId: ID!, $appointmentId: ID!, $content: PrescriptionInput!) {
            createPrescription (treatmentId: $treatmentId, appointmentId: $appointmentId, content: $content) {
                  id
                  doctorId
                  notes
                  url
                  prescriptionUrl
                  medicines {
                        id
                        genericName
                        brandName
                        strength
                        unit
                        dosageForm
                        quantity
                        color
                        routeOfAdministation
                        dosageStartDate
                        dosageEndDate
                        dosageDays
                        dosageTimings
                        dosageFrequency
                        dosageFrequencyType
                        intervalDays
                        inventory
                        refillDate
                        instructions
                        scheduleX
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_PRESCRIPTION = gql`mutation updatePrescription ($id: ID!, $treatmentId: ID!, $appointmentId: ID!, $content: PrescriptionInput!) {
            updatePrescription (id: $id, treatmentId: $treatmentId, appointmentId: $appointmentId, content: $content) {
                  id
                  doctorId
                  notes
                  url
                  prescriptionUrl
                  medicines {
                        id
                        prescriptionId
                        genericName
                        brandName
                        strength
                        unit
                        dosageForm
                        quantity
                        color
                        routeOfAdministation
                        dosageStartDate
                        dosageEndDate
                        dosageDays
                        dosageTimings
                        dosageFrequency
                        dosageFrequencyType
                        intervalDays
                        inventory
                        refillDate
                        createdAt
                        updatedAt   
                        instructions
                        scheduleX
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_PRESCRIPTION = gql`mutation deletePrescription ($id: ID!) {
            deletePrescription (id: $id) {
                  message
            }
      }
`

export const CREATE_MEDICINE = gql`mutation createMedicine (\$prescriptionId: ID,\$patientId: ID, \$content: MedicineInput!) {
      createMedicine (prescriptionId: \$prescriptionId, patientId: \$patientId, content: \$content) {
          id
          prescriptionId
          genericName
          brandName
          strength
          unit
          dosageForm
          quantity
          color
          dosageStartDate
          dosageEndDate
          dosageDays
          dosageTimings
          dosageFrequency
          inventory
          refillDate
          createdAt
          updatedAt
      }
  }
`

export const UPDATE_MEDICINE = gql`mutation updateMedicine (\$id: ID!, \$content: MedicineInput!) {
      updateMedicine (id: \$id, content: \$content) {
          id
          prescriptionId
          genericName
          brandName
          strength
          unit
          dosageForm
          quantity
          color
          routeOfAdministation
          dosageStartDate
          dosageEndDate
          dosageDays
          dosageTimings
          dosageFrequency
          inventory
          refillDate
          createdAt
          updatedAt
      }
  }
`

export const DELETE_MEDICINE = gql`mutation deleteMedicine ($id: ID!) {
      deleteMedicine (id: $id) {
            message
      }
}
`

export const CREATE_PRESCRIPTION_INVOICE = gql`mutation createPrescriptionInvoice ($appointmentId: ID!) {
            createPrescriptionInvoice (appointmentId: $appointmentId) {
                  id
                  doctorId
                  notes
                  url
                  prescriptionUrl
                  medicines {
                        id
                        prescriptionId
                        genericName
                        brandName
                        strength
                        unit
                        dosageForm
                        quantity
                        color
                        routeOfAdministation
                        dosageStartDate
                        dosageEndDate
                        dosageDays
                        dosageTimings
                        dosageFrequency
                        intervalDays
                        inventory
                        refillDate
                        createdAt
                        updatedAt
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const PREVIEW_PRESCRIPTION_PATIENT = gql`query getPatientDetails($patientId: ID!) {
      getPatient(patientId: $patientId) {
        id
        userId
        title
        firstName
        middleName
        lastName
        suffix
        dateOfBirth
        countryCode
        countryOfResidence
        mobileNumber
        emailId
        gender
        nationality
        bloodGroup
      }
      getPatientCurrentHeight(patientId: $patientId) {
        height
        heightUnit
      }
      getPatientCurrentWeight(patientId: $patientId) {
        weight
        weightUnit
      }
      getPatientAllergies(patientId: $patientId) {
        substance
      }
   }
`

export const GET_LOINC_CODE_BY_NAME = gql`query getLoincCodeByName ($searchTerm: String!, $page: PaginationInput) {
            getLoincCodeByName(searchTerm: $searchTerm, page: $page)
      }
`

export const GET_LAB_REPORT_BY_TREATMENT = gql`query getLabReportByTreatment ($treatmentId: ID!) {
            getLabReportByTreatment (treatmentId: $treatmentId) {
                  id
                  notes
                  url
                  labOrderUrl
                  tests {
                        id
                        labReportId
                        orderId
                        code
                        name
                        quantity
                        labName
                        date
                        time
                        priority
                        result
                        createdAt
                        updatedAt
                        sampleType
                  }
                  doctor {
                        doctorId
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const CREATE_LAB_REPORT = gql`mutation createLabReport ($treatmentId: ID!, $content: LabReportInput!) {
            createLabReport (treatmentId: $treatmentId, content: $content) {
                  id
                  notes
                  url
                  tests {
                        id
                        labReportId
                        orderId
                        code
                        name
                        quantity
                        labName
                        date
                        time
                        priority
                        result
                        createdAt
                        updatedAt
                  }
                  doctor {
                        doctorId
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_LAB_TEST = gql`mutation deleteLabTest ($id: ID!) {
            deleteLabTest (id: $id) {
                  message
            }
      }
`

export const UPDATE_LAB_REPORT = gql`mutation updateLabReport ($id: ID!, $content: LabReportInput!) {
            updateLabReport (id: $id, content: $content) {
                  id
                  notes
                  url
                  tests {
                        id
                        labReportId
                        orderId
                        code
                        name
                        quantity
                        labName
                        date
                        time
                        priority
                        result
                        createdAt
                        updatedAt
                  }
                  doctor {
                        doctorId
                  }
                  createdAt
                  updatedAt
            }
      }
`

export const GET_REFERRAL_ORDER_BY_TREATMENT = gql`query getReferralOrderByTreatment ($treatmentId: ID!) {
      getReferralOrderByTreatment (treatmentId: $treatmentId) {
          id
          treatmentId
          specialty
          physician
          clinicName
          consultation
          procedure
          priority
          startDate
          startTime
          reason
          notes
          url
          createdAt
          updatedAt
      }
  }
`

export const CREATE_REFERRAL_ORDER = gql`mutation createReferralOrder ($treatmentId: ID!, $content: ReferralOrderInput!) {
      createReferralOrder (treatmentId: $treatmentId, content: $content) {
          id
          treatmentId
          specialty
          physician
          clinicName
          consultation
          procedure
          priority
          startDate
          startTime
          reason
          notes
          url
          createdAt
          updatedAt
      }
  }
`

export const SEARCH_DOCTOR = gql`query searchDoctorByName ($searchTerm: String!, $page: PaginationInput) {
      searchDoctorByName (searchTerm: $searchTerm, page: $page) {
          doctorId
          userId
          title
          firstName
          middleName
          lastName
          suffix
          gender
          dateOfBirth
          languages
          idProof {
              id
              doctorId
              type
              number
              documentUrl
              createdAt
              updatedAt
          }
          educations {
              id
              doctorId
              degree
              university
              startYear
              endYear
              school
              grade
              description
              certificateDocumentUrl
              educationCertificate {
                  id
                  name
                  issuingOrganisation
                  issueDate
                  expirationDate
                  credentialId
                  credentialUrl
                  createdAt
                  updatedAt
              }
              createdAt
              updatedAt
          }
          countryCode
          mobileNumber
          emailId
          specialities
          profilePhotoUrl
          digitalSignatureUrl
          socialLink {
              id
              doctorId
              website
              linkedin
              facebook
              instagram
              twitter
              youtube
              tiktok
          }
          registrationDetails {
              id
              doctorId
              country
              state
              city
              number
              council
              date
              expirationDate
              certificateDocumentUrl
              createdAt
              updatedAt
          }
          about
          isFavorite
          clinics {
              clinicId
              clinicName
              logourl
              licenseUrl
              licenseName
              licenseNumber
              licenseExpiryDate
              addressLine1
              addressLine2
              postalCode
              country
              city
              state
              latitude
              longitude
              contactNumber
              clinicType
              workingHours
              imageUrls
              treatments
              facilities
              createdAt
              updatedAt
          }
          workingHours {
              id
              doctorId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          fees {
              feeId
              doctorId
              clinicId
              categoryName
              currency
              fee
              followupFee
              followupDuration
              taxPercentage
              taxValue
              createdAt
              updatedAt
          }
          upcomingAppointment {
              id
          }
          rating {
              doctorId
          }
          upcomingSlots {
              date
              startTime
              endTime
              duration
              mode
              day
          }
          hasMultipleClinics
      }
  }
`

export const SEARCH_DOCTORS = gql`query searchDoctorsByName ($page: PaginationInput, $searchTerm: String, $timeOffset: Int) {
      searchDoctorsByName (page: $page, searchTerm: $searchTerm, timeOffset: $timeOffset) {
          totalSearchResults
          results {
              id
              title
              firstName
              middleName
              lastName
              suffix
              clinics {
                  id
                  name
                  logourl
              }
          }
      }
  }`

export const DELETE_REFERRAL_ORDER = gql`mutation deleteReferralOrder ($id: ID!) {
      deleteReferralOrder (id: $id) {
          message
      }
  }
`

export const UPDATE_REFERRAL_ORDER = gql`mutation updateReferralOrder ($id: ID!, $treatmentId: ID!, $content: ReferralOrderInput!) {
      updateReferralOrder (id: $id, treatmentId: $treatmentId, content: $content) {
          id
          treatmentId
          specialty
          physician
          clinicName
          consultation
          procedure
          priority
          startDate
          startTime
          reason
          notes
          url
          createdAt
          updatedAt
      }
  }
`

export const GET_FOLLOW_UP_APPOINTMENTS = gql`query getFollowUpAppointments ($previousAppointmentId: ID!, $timeOffset: Int) {
      getFollowUpAppointments (previousAppointmentId: $previousAppointmentId, timeOffset: $timeOffset) {
          id
          treatmentId
          previousAppointmentId
          slotId
          patientId
          doctorId
          clinicId
          patient {
              patientId
              title
              firstName
              lastName
              dateOfBirth
              gender
          }
          doctor {
              doctorId
              title
              firstName
              middleName
              lastName
          }
          transaction {
              transactionId
          }
          time
          duration
          type
          transactionId
          status
          count
          appointmentOtherInfo {
              id
              appointmentId
              patientId
              reason
              notes
              reportUrl
              relatedPatientId
              createdAt
              updatedAt
          }
          appointmentConsentForm {
              id
              appointmentId
              patientId
              fullName
              dob
              nationalId
              insuranceNumber
              consentUrl
              createdAt
              updatedAt
          }
          recordSymptom {
              id
              appointmentId
              patientId
              url
              audioUrl
              descibeNotes
              createdAt
              updatedAt
          }
          bodyViewSymptom {
              id
              appointmentId
              patientId
              bodyViewImageUrl
              createdAt
              updatedAt
          }
          searchViewSymptoms {
              id
              appointmentId
              patientId
              symptomCode
              startDate
              endDate
              severity
              createdAt
              updatedAt
          }
          isCompleted
          createdAt
          updatedAt
          slot {
              id
              date
              startTime
              endTime
              phaseOfDay
              mode
              doctorId
              clinicId
              duration
              status
              createdAt
              updatedAt
          }
      }
  }
`

export const GET_MEDICINE_BY_NAME = gql`query getMedicineByName ($searchTerm: String!, $page: PaginationInput) {
            getMedicineByName (searchTerm: $searchTerm, page: $page) {
                  id
                  status
                  ddc_code
                  trade_name
                  scientific_code
                  scientific_name
                  ingredient_strength
                  dosage_form_package
                  route_of_admin
                  package_price
                  granular_unit
                  manufacturer
                  registered_owner
                  updated_date
                  source
                  is_ebp
            }
      }
`

export const CREATE_DOCTOR_HOLIDAY = gql`mutation createDoctorHoliday ($doctorId: ID!,$content: DoctorHolidayInput!) {
            createDoctorHoliday (doctorId: $doctorId, content: $content) {
                  id
                  doctorId
                  startDate
                  endDate
                  reason
                  createdAt
                  updatedAt
            }
      }
`

export const GET_DOCTOR_HOLIDAY = gql`query getDoctorHoliday ($doctorId: ID!, $date: Date) {
            getDoctorHoliday (doctorId: $doctorId, date: $date) {
                  id
                  startDate
                  endDate
                  doctorId
                  reason
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_DOCTOR_HOLIDAY = gql`mutation deleteDoctorHoliday ($id: ID!) {
            deleteDoctorHoliday (id: $id) {
                  message
            }
      }
`

export const CREATE_DOCTOR_INSURANCE = gql`mutation createDoctorInsurnaces ($doctorId: ID!, $content: [DoctorInsuranceInput]) {
            createDoctorInsurnaces (doctorId: $doctorId, content: $content) {
                  id
                  doctorId
                  company
                  description
            }
      }
`

export const GET_DOCTOR_INSURANCE = gql`query getDoctorInsurance ($doctorId: ID!) {
            getDoctorInsurance (doctorId: $doctorId) {
                  id
                  doctorId
                  company
                  description
            }
      }
`

export const DELETE_DOCTOR_INSURANCE = gql`mutation deleteDoctorInsurnace ($id: ID!) {
            deleteDoctorInsurnace (id: $id) {
                  message
            }
      }
`

export const SEARCH_PATIENTS = gql`query searchPatient ($doctorId: ID, $searchText: String, $clinicId: ID, $page: PaginationInput) {
            searchPatient (doctorId: $doctorId, searchText: $searchText, clinicId: $clinicId, page: $page) {
                  id
                  userId
                  title
                  firstName
                  middleName
                  lastName
                  suffix
                  countryCode
                  mobileNumber
                  emailId
                  gender
                  dateOfBirth
                  placeOfBirth
                  nationality
                  countryOfResidence
                  languages
                  bio
                  deviceToken
                  profileImage
                  isoCode
                  maritalStatus
                  bloodGroup
                  bloodDoner
                  noOfChildren
                  occupation
                  verifiedByAdmin
                  notification
                  createdAt
                  updatedAt
                  isDeleted
                  mrn
                  preferedLanguages
                  patientImages {
                        id
                        profileImage
                        patientId
                        imageName
                        imageType
                        imageSide
                        documentName
                        documentType
                        documentIdNumber
                        frontImage
                        backImage
                        isDocumentUploaded
                  }
                  insurances {
                        patientId
                        insurenceId
                  }
            }
      }
`

export const SEARCH_PATIENT = gql`query searchPatients($page: PaginationInput, $filters: PatientInputFilters, $timeOffset: Int) {
      searchPatients(page: $page, filters: $filters, timeOffset: $timeOffset) {
        totalSearchResults
        results {
          id
          userId
          title
          firstName
          middleName
          lastName
          suffix
          countryCode
          mobileNumber
          emailId
          gender
          dateOfBirth
          nationality
          profileImage
          isDeleted
          mrn
        }
      }
}`

export const GET_APPOINTMENT_COUNT_HISTORY = gql`query getAppointmentCountHistory ($doctorId: ID, $clinicId: ID, $date: Date, $nurseId: ID) {
            getAppointmentCountHistory (doctorId: $doctorId, clinicId: $clinicId, date: $date, nurseId: $nurseId) {
                  totalCount
                  totalCheckIns
                  totalPatientServed
                  noShows
                  totalWalkIns
            }
      }
`

export const GET_DOCTOR_TASK_TYPE = gql`query getUserTaskType ($userId: ID!) {
            getUserTaskType (userId: $userId) {
                  id
                  userId
                  type
                  createdAt
                  updatedAt
            }
      }
`

export const CREATE_DOCTOR_TASK_TYPE = gql`mutation createUserTaskType ($userId: ID!, $content: [UserTaskTypeInput]!) {
            createUserTaskType (userId: $userId, content: $content) {
                  id
                  userId
                  type
                  createdAt
                  updatedAt
            }
      }
`

export const UPDATE_DOCTOR_TASK_TYPE = gql`mutation updateUserTaskType ($id: ID!, $content: UserTaskTypeInput!) {
            updateUserTaskType (id: $id, content: $content) {
                  id
                  userId
                  type
                  createdAt
                  updatedAt
            }
      }
`

export const DELETE_DOCTOR_TASK_TYPE = gql`mutation deleteUserTaskType ($id: ID!) {
            deleteUserTaskType (id: $id) {
                  message
            }
      }
`

export const GET_USER_TASKS = gql`query getUserTasks ($userId: ID!, $userType: ClinicUserType!, $status: [String], $startDate: String, $endDate: String, $page: PaginationInput) {
      getUserTasks (userId: $userId, userType: $userType, status: $status, startDate: $startDate, endDate: $endDate, page: $page) {
          id
          userId
          title
          status
          typeIds
          types
          priority
          date
          time
          location
          assigneeUsers {
              userId
              userType
          }
          assigneeUserDetails {
              id
              userId
              firstName
              lastName
          }
          createdAt
          updatedAt
      }
}`

export const CREATE_DOCTOR_TASK = gql`mutation createUserTask ($userId: ID!, $userType: ClinicUserType, $content: UserTaskInput!) {
      createUserTask (userId: $userId, userType: $userType, content: $content) {
          id
          userId
          title
          status
          typeIds
          types
          priority
          date
          time
          assigneeUsers {
              userId
              userType
          }
          location
          createdAt
          updatedAt
      }
  }
`

export const UPDATE_TASK = gql`mutation updateUserTask ($id: ID!, $content: UserTaskInput!) {
      updateUserTask (id: $id, content: $content) {
          id
          userId
          title
          status
          typeIds
          types
          priority
          date
          time
          location
          assigneeUsers {
              userId
              userType
          }
          createdAt
          updatedAt
      }
}`

export const DELETE_TASK = gql`mutation deleteUserTask ($id: ID!) {
      deleteUserTask (id: $id) {
          message
      }
}`

export const GET_CURRENT_ENCOUNTER = gql`query getEncounter ($id: ID, $appointmentId: ID) {
      getEncounter(id: $id, appointmentId: $appointmentId) {
            id
            appointmentId
            patientId
            doctorId
            participantType
            encounterStatus
            encounterPriority
            encounterCategory
            startDate
            endDate
            admitSource
            encounterLocation
            encounterType
            encounterReason
            serviceType
            communicationMethod
            callType
            referralType
            referredBy
            reason
            provider
            assignedTo
            facility
            laboratory
            pharmacy
            hospitalization
            dietPreference
            specialArrangement
            specialCourtesy
            destination
            dischargeDisposition
            location
            serviceProvider
            partOf
            notes
            url
            isCompleted
                  encounterAdmitingConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
            }
                  encounterDischargeConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
            }
      }
}
`

export const GET_ENCOUNTER = gql`query getAllEncounters($doctorId: ID!, $patientId: ID, $page: PaginationInput) {
      getAllEncounters(doctorId: $doctorId, patientId: $patientId, page: $page) {
            id
            appointmentId
            patientId
            doctorId
            participantType
            encounterStatus
            encounterPriority
            encounterCategory
            startDate
            endDate
            admitSource
            encounterLocation
            encounterType
            encounterReason
            serviceType
            communicationMethod
            callType
            referralType
            referredBy
            reason
            provider
            assignedTo
            facility
            laboratory
            pharmacy
            hospitalization
            dietPreference
            specialArrangement
            specialCourtesy
            destination
            dischargeDisposition
            location
            serviceProvider
            partOf
            notes
            url
            isCompleted
                  appointment{
                  cancelAppointmentReason
                  rescheduleAppointmentReason
                  status
                        slot {
                        mode
                  }
                  isCompleted
            }
                  encounterAdmitingConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
                  createdAt
                  updatedAt
            }
                  encounterDischargeConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
                  createdAt
                  updatedAt
            }
            createdAt
            updatedAt
      }
}
`

export const MARK_APPOINTMENT_COMPLETE = gql`mutation markAppointmentComplete($id: ID!) {
      markAppointmentComplete(id: $id) {
            message
      }
}
`

export const CREATE_AND_UPDATE_ENCOUNTERS = gql`mutation createAndUpdateEncounter($appointmentId: ID!, $content: EncounterInput) {
      createAndUpdateEncounter(appointmentId: $appointmentId, content: $content) {
            id
            appointmentId
            patientId
            doctorId
            participantType
            encounterStatus
            encounterPriority
            encounterCategory
            startDate
            endDate
            admitSource
            encounterLocation
            encounterType
            encounterReason
            serviceType
            communicationMethod
            callType
            referralType
            referredBy
            reason
            provider
            assignedTo
            facility
            laboratory
            pharmacy
            hospitalization
            dietPreference
            specialArrangement
            specialCourtesy
            destination
            dischargeDisposition
            location
            serviceProvider
            partOf
            notes
            url
            isCompleted
                  encounterAdmitingConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
                  createdAt
                  updatedAt
            }
                  encounterDischargeConditions {
                  id
                  condition
                  active
                  category
                  onsetDate
                  severity
                  clinicalStatus
                  verificationStatus
                  abatementDate
                  conditionType
                  notes
                  url
                  createdAt
                  updatedAt
            }
            createdAt
            updatedAt
      }
}
`
export const CREATE_ENCOUNTER_CONSENT_FORM = gql`mutation createEncounterConsentForm($appointmentId: ID!, $content: encounterConsentFormInput!) {
      createEncounterConsentForm(appointmentId: $appointmentId, content: $content) {
            id
            appointmentId
            patientId
            doctorId
            zscFacilityOptOut
            zscGlobalOptOut
            zscFacilityReOptIn
            zscGlobalReOptIn
            isPolicyAccepted
            acceptDate
            consentFormVersion
            isSpousalConsent
            patientConsentFromSigned
            patientConsentFromSignedUrl
            interpreterConsentFromSigned
            interpreterConsentFromSignedUrl
            translatorConsentFromSigned
            translatorConsentFromSignedUrl
            createdAt
            updatedAt
      }
}
`

export const UPDATE_ENCOUNTER_CONSENT_FORM = gql`mutation updateEncounterConsentForm($id: ID!, $content: encounterConsentFormInput!) {
      updateEncounterConsentForm(id: $id, content: $content) {
            id
            appointmentId
            patientId
            doctorId
            zscFacilityOptOut
            zscGlobalOptOut
            zscFacilityReOptIn
            zscGlobalReOptIn
            isPolicyAccepted
            acceptDate
            consentFormVersion
            isSpousalConsent
            patientConsentFromSigned
            patientConsentFromSignedUrl
            interpreterConsentFromSigned
            interpreterConsentFromSignedUrl
            translatorConsentFromSigned
            translatorConsentFromSignedUrl
            createdAt
            updatedAt
      }
}
`

export const GET_ENCOUNTER_CONSENT_FORM = gql`query getEncounterConsentForm($appointmentId: ID!) {
      getEncounterConsentForm(appointmentId: $appointmentId) {
            id
            appointmentId
            patientId
            doctorId
            zscFacilityOptOut
            zscGlobalOptOut
            zscFacilityReOptIn
            zscGlobalReOptIn
            isPolicyAccepted
            acceptDate
            consentFormVersion
            isSpousalConsent
            patientConsentFromSigned
            patientConsentFromSignedUrl
            interpreterConsentFromSigned
            interpreterConsentFromSignedUrl
            translatorConsentFromSigned
            translatorConsentFromSignedUrl
            createdAt
            updatedAt
      }
}
`

export const GET_APPOINTMENT_BILLING = gql`query getAppointmentBilling($appointmentId: ID!) {
      getAppointmentBilling(appointmentId: $appointmentId) {
            id
            appointmentId
            doctorId
            patientId
            invoice
            tax
            discount
            amountReceived
            insuranceApplied
            refund
            dueToPay
            currencyCode
            billingMode
            status
            createdAt
            updatedAt
          cardDetail {
                  cardType
                  cardNumber
                  cardHolderName
            }
            cardAmountReceived
            cashAmountReceived
          appointmentBillingHistories {
                  appointmentBillingId
                  id
                  service
                  billingType
                  unitPrice
                  quantity
                  payment
                  approvalCode
                  discount
                  vat
                  copay
                  receivedAmount
                  status
                  dueDate
                  paymentDue
                  teethDetails
                        # doctorName
                        # receivedBy
                  createdAt
                  updatedAt
            }
      }
} `

export const CREATE_APPOINTMENT_BILLING = gql`mutation createAppointmentBilling($appointmentId: ID!, $content: appointmentBillingInput!) {
      createAppointmentBilling(appointmentId: $appointmentId, content: $content) {
            id
            appointmentId
            doctorId
            patientId
            invoice
            tax
            discount
            amountReceived
            insuranceApplied
            refund
            dueToPay
            currencyCode
            billingMode
            insuranceApplied
            status
                  appointmentBillingHistories {
                  appointmentBillingId
                  service
                  billingType
                  unitPrice
                  quantity
                  payment
                  approvalCode
                  discount
                  vat
                  copay
                  receivedAmount
                  status
                  dueDate
                  paymentDue
                  doctorName
                  receivedBy
                  teethDetails
                  createdAt
                  updatedAt
            }
                  cardDetail {
                  cardType
                  cardNumber
                  cardHolderName
            }
            cardAmountReceived
            cashAmountReceived
            createdAt
            updatedAt
      }
}
`

export const UPDATE_APPOINTMENT_BILLING = gql`mutation updateAppointmentBilling($id: ID!, $content: appointmentBillingInput!) {
      updateAppointmentBilling(id: $id, content: $content) {
            id
            appointmentId
            doctorId
            patientId
            invoice
            tax
            discount
            amountReceived
            insuranceApplied
            refund
            dueToPay
            currencyCode
            billingMode
            status
          appointmentBillingHistories {
                  appointmentBillingId
                  service
                  billingType
                  unitPrice
                  quantity
                  payment
                  approvalCode
                  discount
                  vat
                  copay
                  receivedAmount
                  status
                  dueDate
                  paymentDue
                  doctorName
                  receivedBy
                  teethDetails
                  createdAt
                  updatedAt
            }
            createdAt
            updatedAt
      }
} `

export const DELETE_APPOINTMENT_BILLING_HISTORY_BY_ID = gql`mutation deleteAppointmentBillingHistory($id: ID!) {
      deleteAppointmentBillingHistory(id: $id) {
            message
      }
} `

export const GET_APPOINTMENT_BILLING_LOG = gql`query getAppointmentBillingLogByAppointmentId($appointmentId: ID!, $page: PaginationInput) {
      getAppointmentBillingLogByAppointmentId(appointmentId: $appointmentId, page: $page) {
            appointmentId
            service
            billingType
            doctorName
            totalAmount
            receivedAmount
            payment
            receivedBy
            billingStatus
            status
            createdAt
            updatedAt
            currencyCode
      }
} `

export const GET_REVIEW_SYSTEM_DATA = gql`query getReviewSystemData($specialty: String) {
      getReviewSystemData(specialty: $specialty) {
            id
            specialty
            symptom
            choiceType
            choices
            order
      }
} `

export const CREATE_UPDATE_REVIEW_SYSTEM = gql`mutation createAndUpdateReviewOfSystem($clinicalAssessmentId: ID!, $patientId: ID!, $content: [ReviewSystemDataInput]!) {
      createAndUpdateReviewOfSystem(clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, content: $content) {
            id
            specialty
            symptom
            choices
            createdAt
            updatedAt
      }
} `

export const GET_ALL_REVIEW_SYSTEM_DATA = gql`query getAllReviewOfSystem($clinicalAssessmentId: ID!, $page: PaginationInput) {
      getAllReviewOfSystem(clinicalAssessmentId: $clinicalAssessmentId, page: $page) {
            id
            specialty
            symptom
            choices
      }
} `

export const DELETE_REVIEW_SYSTEM_DATA = gql`mutation deleteReviewOfSystem($ids: [ID]!) {
      deleteReviewOfSystem(ids: $ids) {
            message
      }
} `

export const CREATE_IMMUNIZATION = gql`mutation createImmunizations($clinicalAssessmentId: ID, $patientId: ID!, $content: ImmunizationInput) {
      createImmunizations(clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, content: $content) {
            id
            patientId
            immunizationFor
            dose
            administrationSite
            administrationRoute
            dateOfImmunization
            brandName
            manufacture
            lotNo
            nextDoseReminder
            vaccinationCenter
      }
} `

export const GET_ALL_IMMUNIZATION = gql`query getAllImmunizationByFilters($patientId: ID, $clinicalAssessmentId: ID, $page: PaginationInput) {
      getAllImmunizationByFilters(patientId: $patientId, clinicalAssessmentId: $clinicalAssessmentId, page: $page) {
            id
            patientId
            immunizationFor
            dose
            administrationSite
            administrationRoute
            dateOfImmunization
            brandName
            manufacture
            lotNo
            nextDoseReminder
            vaccinationCenter
      }
} `

export const UPDATE_IMMUNIZATION = gql`mutation updateImmunization($immunizationId: ID!, $content: ImmunizationInput) {
      updateImmunization(immunizationId: $immunizationId, content: $content) {
            id
            patientId
            immunizationFor
            dose
            administrationSite
            administrationRoute
            dateOfImmunization
            brandName
            manufacture
            lotNo
            nextDoseReminder
            vaccinationCenter
      }
} `

export const DELETE_IMMUNIZATION = gql`mutation deleteImmunization($immunizationId: ID!) {
      deleteImmunization(immunizationId: $immunizationId) {
            message
      }
} `

export const CREATE_CURRENT_MEDICATIONS = gql`mutation createCurrentMedicactions($clinicalAssessmentId: ID, $patientId: ID, $content: CurrentMedicactionInput) {
      createCurrentMedicactions(clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, content: $content) {
            id
            patientId
            clinicalAssessmentId
            medicationName
            medicationCategory
            medicationActive
            onsetDate
            abatementDate
            refillRequired
            refillDate
            quantity
      }
} `

export const GET_ALL_CURRENT_MEDICATIONS = gql`query getAllCurrentMedicationByFilters($clinicalAssessmentId: ID, $patientId: ID, $page: PaginationInput) {
      getAllCurrentMedicationByFilters(clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, page: $page) {
            id
            patientId
            clinicalAssessmentId
            medicationName
            medicationCategory
            medicationActive
            onsetDate
            abatementDate
            refillRequired
            refillDate
            quantity
          dosageFrequency {
                  timeSlot
                  dosageTime
            }
      }
} `

export const UPDATE_CURRENT_MEDICATIONS = gql`mutation updateCurrentMedicaction($currentMedicactionId: ID!, $content: CurrentMedicactionInput) {
      updateCurrentMedicaction(currentMedicactionId: $currentMedicactionId, content: $content) {
            id
            patientId
            clinicalAssessmentId
            medicationName
            medicationCategory
            medicationActive
            onsetDate
            abatementDate
            refillRequired
            refillDate
            quantity
      }
} `

export const DELETE_CURRENT_MEDICATINOS = gql`mutation deleteCurrentMedicaction($currentMedicactionId: ID!) {
      deleteCurrentMedicaction(currentMedicactionId: $currentMedicactionId) {
            message
      }
} `

export const GET_ALL_RISK_FACTOR = gql`query getAllRiskFactorByFilters($patientId: ID, $clinicalAssessmentId: ID, $page: PaginationInput) {
      getAllRiskFactorByFilters(patientId: $patientId, clinicalAssessmentId: $clinicalAssessmentId, page: $page) {
            id
            clinicalAssessmentId
            patientId
            riskFactor
            createdAt
            updatedAt
      }
} `

export const CREATE_RISK_FACTOR = gql`mutation createRiskFactor($clinicalAssessmentId: ID, $patientId: ID!, $content: [RiskFactorInput]) {
      createRiskFactor(clinicalAssessmentId: $clinicalAssessmentId, patientId: $patientId, content: $content) {
            id
            clinicalAssessmentId
            patientId
            riskFactor
            createdAt
            updatedAt
      }
} `

export const UPDATE_RISK_FACTOR = gql`mutation updateRiskFactor($id: ID!, $content: RiskFactorInput) {
      updateRiskFactor(id: $id, content: $content) {
            id
            clinicalAssessmentId
            patientId
            riskFactor
            createdAt
            updatedAt
      }
} `

export const DELETE_RISK_FACTOR = gql`mutation deleteRiskFactor($id: ID!) {
      deleteRiskFactor(id: $id) {
            message
      }
} `

export const GET_GLASSGOW_COMMA_SCALE = gql`query getGlassGowComaScale($clinicalAssessmentId: ID!) {
      getGlassGowComaScale(clinicalAssessmentId: $clinicalAssessmentId) {
            id
            patientId
            clinicalAssessmentId
            eyeOpeningScore
            verbalScore
            motorScore
            gcsTotalScore
            createdAt
            updatedAt
      }
} `

export const CREATE_GLASSGOW_COMMA_SCALE = gql`mutation createGlassGowComaScale($patientId: ID!, $clinicalAssessmentId: ID!, $content: GlassGowComaScaleInput!) {
      createGlassGowComaScale(patientId: $patientId, clinicalAssessmentId: $clinicalAssessmentId, content: $content) {
            id
            patientId
            clinicalAssessmentId
            eyeOpeningScore
            verbalScore
            motorScore
            gcsTotalScore
            createdAt
            updatedAt
      }
} `

export const UPDATE_GLASSGOW_COMMA_SCALE = gql`mutation updateGlassGowComaScale($id: ID!, $content: GlassGowComaScaleInput!) {
      updateGlassGowComaScale(id: $id, content: $content) {
            id
            patientId
            clinicalAssessmentId
            eyeOpeningScore
            verbalScore
            motorScore
            gcsTotalScore
            createdAt
            updatedAt
      }
} `

export const DELETE_GLASSGLOW_COMMA_SCALE = gql`mutation deleteGlassGowComaScale($id: ID!) {
      deleteGlassGowComaScale(id: $id) {
            message
      }
} `

export const GET_RECENTLY_USED_MEDICINE = gql`query getRecentlyUsedMedicine($doctorId: ID!, $page: PaginationInput) {
      getRecentlyUsedMedicine(doctorId: $doctorId, page: $page) {
            id
            prescriptionId
            genericName
            brandName
            strength
            unit
            dosageForm
            quantity
            color
            routeOfAdministation
            dosageStartDate
            dosageEndDate
            dosageDays
            dosageTimings
            dosageFrequency
            intervalDays
            inventory
            refillDate
            instructions
            scheduleX
            createdAt
            updatedAt
      }
} `

export const GET_FAV_MEDICINES = gql`query getMedicineFavouriteSelections($doctorId: ID!, $page: PaginationInput) {
      getMedicineFavouriteSelections(doctorId: $doctorId, page: $page) {
            id
            prescriptionId
            genericName
            brandName
            strength
            unit
            dosageForm
            quantity
            color
            routeOfAdministation
            dosageStartDate
            dosageEndDate
            dosageDays
            dosageTimings
            dosageFrequency
            intervalDays
            inventory
            refillDate
            instructions
            scheduleX
            isFavourite
            createdAt
            updatedAt
      }
} `;

export const ADD_REMOVE_FAV_MEDICINES = gql`mutation medicineFavouriteSelection($medicineId: ID!, $isFavourite: Bool!) {
      medicineFavouriteSelection(medicineId: $medicineId, isFavourite: $isFavourite) {
            message
      }
} `;

export const GET_ALL_MEDICINE_TEMPLATE = gql`query getMedicineTemplates($clinicId: ID!, $doctorId: ID!, $page: PaginationInput) {
      getMedicineTemplates(clinicId: $clinicId, doctorId: $doctorId, page: $page) {
            id
            doctorId
            clinicId
            template
      }
} `

export const CREATE_UPDATE_MEDICINE_TEMPLATE = gql`mutation createAndUpdateMedicineTemplate($id: ID, $content: MedicineTemplateInput!) {
      createAndUpdateMedicineTemplate(id: $id, content: $content) {
            id
            doctorId
            clinicId
            template
      }
} `

export const DELETE_MEDCINE_TEMPLATE = gql`mutation deleteMedicineTemplate($id: ID!) {
      deleteMedicineTemplate(id: $id) {
            message
      }
} `

export const CREATE_MEDICINE_DETAILS = gql`mutation createMedicineDetails($content: MedicineDetailsInput!) {
      createMedicineDetails(content: $content) {
            id
            clinicId
            doctorId
            name
            brandNames
            genericNames
            dosageStrength
            dosageUnit
      #     dosage
            form
            routeOfAdmin
            frequency
            when
            scheduleX
            createdAt
            updatedAt
      }
} `

export const UPDATE_MEDICINE_DETAILS = gql`mutation updateMedicineDetails($id: ID!, $content: MedicineDetailsInput!) {
      updateMedicineDetails(id: $id, content: $content) {
            id
            clinicId
            doctorId
            name
            brandNames
            genericNames
            dosageStrength
            dosageUnit
      #     dosage
            form
            routeOfAdmin
            frequency
            when
            scheduleX
            createdAt
            updatedAt
      }
} `

export const DELETE_MEDICINE_DETAILS = gql`mutation deleteMedicineDetails($id: ID!) {
      deleteMedicineDetails(id: $id) {
            message
      }
} `


export const CREATE_PRESENT_ILLNESS = gql`mutation createPresentIllness($clinicalAssessmentId: ID!, $content: [PresentIllnessInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      createPresentIllness(clinicalAssessmentId: $clinicalAssessmentId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}
`

export const UPDATE_PRESENT_ILLNESS = gql`mutation updatePresentIllness($presentIllnessId: ID!, $content: PresentIllnessInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updatePresentIllness(presentIllnessId: $presentIllnessId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
} `

export const CREATE_FAMILY_MEDICAL_HISTORY = gql`mutation createFamilyMedicalHistories($clinicalAssessmentId: ID!, $content: [FamilyMedicalHistoryInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      createFamilyMedicalHistories(clinicalAssessmentId: $clinicalAssessmentId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}
`

export const UPDATE_FAMILY_MEDICAL_HISTORY = gql`mutation updateFamilyMedicalHistory($familyMedicalHistoryId: ID!, $content: FamilyMedicalHistoryInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updateFamilyMedicalHistory(familyMedicalHistoryId: $familyMedicalHistoryId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
} `

export const REQUEST_EHR_ACCESS = gql`mutation requestEHRAccess($doctorId: ID!, $patientId: ID!) {
      requestEHRAccess(doctorId: $doctorId, patientId: $patientId) {
            id
            patientId
            doctorId
      }
}
`

export const VALIDATE_EHR_ACCESS = gql`query validateEHRAccess($doctorId: ID!, $patientId: ID!, $otp: Long!) {
      validateEHRAccess(doctorId: $doctorId, patientId: $patientId, otp: $otp) {
            id
            patientId
            doctorId
            otp
            expiresAt
      }
}
`

export const GET_DOCTOR_PATIENTS = gql`query getDoctorPatients($doctorId: ID!, $page: PaginationInput) {
      getDoctorPatients(doctorId: $doctorId, page: $page) {
            id
            treatmentId
            slotId
            patientId
            doctorId
            clinicId
            isCompleted
                  patient {
                  patientId
                  title
                  firstName
                  lastName
                  dateOfBirth
                  gender
                  profileImage
            }
                  doctor {
                  doctorId
                  firstName
                  middleName
                  lastName
            }
                  # transaction {
                        #       transactionId
                        #       }
            
            time
            duration
                        # transactionId
            status
            count
                        appointmentOtherInfo {
                  id
                  appointmentId
                  patientId
                  reason
                  notes
                  reportUrl
                  relatedPatientId
                  createdAt
                  updatedAt
            }
                        appointmentConsentForm {
                  id
                  appointmentId
                  patientId
                  fullName
                  dob
                  nationalId
                  insuranceNumber
                  consentUrl
                  createdAt
                  updatedAt
            }
                        recordSymptom {
                  id
                  appointmentId
                  patientId
                  url
                  audioUrl
                  descibeNotes
                  createdAt
                  updatedAt
            }
                        bodyViewSymptom {
                  id
                  appointmentId
                  patientId
                  bodyViewImageUrl
                  createdAt
                  updatedAt
            }
                        searchViewSymptoms {
                  id
                  appointmentId
                  patientId
                  symptomCode
                  startDate
                  endDate
                  severity
                  createdAt
                  updatedAt
            }
            createdAt
            updatedAt
                        slot {
                  id
                  date
                  startTime
                  endTime
                  phaseOfDay
                  mode
                  doctorId
                  clinicId
                  duration
                  status
                  createdAt
                  updatedAt
            }
      }
}
`

export const GET_PATIENTS_BY_DOCTOR_ID = gql`query getPatientsByDoctorId($doctorId: ID, $clinicId: ID, $toDate: Date, $fromDate: Date, $appointmentMode: [String], $appointmentStatus: [String], $patientNamePrefix: String, $searchTerm: String, $page: PaginationInput, $timeOffset: Int) {
      getPatientsByDoctorId(doctorId: $doctorId, clinicId: $clinicId, toDate: $toDate, fromDate: $fromDate, appointmentMode: $appointmentMode, appointmentStatus: $appointmentStatus, patientNamePrefix: $patientNamePrefix, searchTerm: $searchTerm, page: $page, timeOffset: $timeOffset) {
            count
            patientAppointments {
                  triageCategory
                  billingStatus
                  paymentModes
                  appointmentId
                  patientId
                  doctorId
                  clinicId
                  appointmentTime
                  appointmentStatus
                  appointmentMode
                  lastVisit
                  totalVisit
                  totalClinicVisit
                  totalVirtualVisit
                  upCommingVisit
                  patientFirstName
                  patientMiddleName
                  patientLastName
                  patient {
                        id
                        userId
                        title
                        firstName
                        middleName
                        lastName
                        suffix
                        countryCode
                        mobileNumber
                        emailId
                        gender
                        dateOfBirth
                        placeOfBirth
                        nationality
                        countryOfResidence
                        languages
                        bio
                        deviceToken
                        profileImage
                        isoCode
                        maritalStatus
                        bloodGroup
                        bloodDoner
                        noOfChildren
                        healthCard {
                              id
                              patientId
                              number
                              province
                              expiryDate
                              race
                              createdAt
                              updatedAt
                        }
                        occupation
                        verifiedByAdmin
                        notification
                        createdAt
                        updatedAt
                        isDeleted
                        preferedLanguages
                        isVip
                        contacts {
                              id
                              patientId
                              primaryNumber
                              secondaryNumber
                              email
                              createdAt
                              updatedAt
                        }
                        addresses {
                              id
                              patientId
                              addressLine1
                              addressLine2
                              latitude
                              longitude
                              addressType
                              addTitle
                              country
                              state
                              city
                              district
                              pincode
                              isDefaultAddress
                              createdAt
                              updatedAt
                        }
                        patientImages {
                              id
                              profileImage
                              patientId
                              imageName
                              imageType
                              imageSide
                              documentName
                              documentType
                              documentIdNumber
                              frontImage
                              backImage
                              isDocumentUploaded
                        }
                        insurances {
                              patientId
                              insurenceId
                        }
                        socialLink {
                              patientId
                              linkedin
                              facebook
                              instagram
                              twitter
                              youtube
                        }
                        interests {
                              patientId
                              interest
                        }
                        emergencyContacts {
                              id
                              patientId
                              name
                              contact
                              countryCode
                              relation
                              otherRelation
                              email
                              createdAt
                              updatedAt
                        }
                        lifeStyle {
                              id
                              patientId
                              occupation
                              occupationType
                              activityLevel
                              diet
                              alchohalConsumption
                              smokingHabit
                              sexualActivity
                              contraception
                              drug
                              createdAt
                              updatedAt
                        }
                        healthConditions {
                              id
                              patientId
                              healthConditionType {
                                    id
                                    code
                                    name
                                    description
                              }
                              name
                              value
                        }
                        relatives {
                              id
                              patientId
                              suffix
                              firstName
                              middleName
                              lastName
                              relation
                              occupation
                              dob
                              gender
                              createdAt
                              updatedAt
                        }
                        homeEnviornments {
                              id
                              questions
                              options
                              answer
                        }
                        weights {
                              id
                              patientId
                              weight
                              weightUnit
                              targetWeight
                              targetWeightUnit
                              reminders
                              createdAt
                              updatedAt
                        }
                        heights {
                              id
                              patientId
                              height
                              heightUnit
                              createdAt
                              updatedAt
                        }
                        kins {
                              id
                              patientId
                              firstName
                              lastName
                              relation
                              contact
                              email
                              createdAt
                              updatedAt
                        }
                  }
            }
      }
} `

export const MERGE_PATIENT_DATA = gql`
  mutation mergePatientData($content: PatientMergeRequestInput!) {
    mergePatientData(content: $content) {
      message
    }
  }
`;

export const CONTACT_US = gql`mutation contactUs($content: ContactUsInput!) {
      contactUs(content: $content) {
            id
            userId
            profileType
            fullName
            mobileNumber
            title
            description
            url
            createdAt
            updatedAt
      }
}
`

export const UPDATE_APPOINTMENT_STATUS = gql`mutation updateAppointmentCallStatus($appointmentId: ID!, $content: callStatusInput!) {
      updateAppointmentCallStatus(appointmentId: $appointmentId, content: $content) {
            message
      }
}
`

export const SEND_NOTIFICATION = gql`mutation sendNotificatioin($userId: ID!, $content: NotificationInput!) {
      sendNotificatioin(userId: $userId, content: $content)
} `

export const GET_CURRENT_MEDICATION = gql`query getActiveMedications($patientId: ID!) {
      getActiveMedications(patientId: $patientId) {
            id
            patientId
            name
            prescriptionUrl
            category
            isActive
            startDate
            endDate
            refillRequired
            refillDate
      }
}
`
export const GET_PATIENT_FAMILY_MEDICAL_HISTORY = gql`query getPatientFamilyMedicalHistories($patientId: ID!) {
      getPatientFamilyMedicalHistories(patientId: $patientId) {
            id
            patientId
            relationship
            medicalProblem
            yearOfBirth
            onsetAge
            status
      }
}
`

export const GET_ALL_FAMILY_MEDICAL_HISTORY = gql`query getPatientClinicalAssessmentFamilyMedicalHistory($patientId: ID!, $doctorId: ID!, $page: PaginationInput) {
      getPatientClinicalAssessmentFamilyMedicalHistory(patientId: $patientId, doctorId: $doctorId, page: $page) {
            id
            clinicalAssessmentId
            relationship
            medicalProblem
            age
            yearOfBirth
            abatementDate
            currentStatus
            recordedBy
          recordedUserDetail {
                  firstName
                  lastName
                  middleName
                  staffType
                  title
            }
            createdAt
            updatedAt
      }
} `

export const GET_PATIENT_HEALTH_CONDITION = gql`query getActiveMedicalConditions($patientId: ID!) {
      getActiveMedicalConditions(patientId: $patientId) {
            id
            patientId
            name
            isActive
            startDate
            endDate
            notes
            reportUrls
      }
}
`

export const GET_ALL_HEALTH_CONDITIONS = gql`query getAllConditionByPatient($patientId: ID!, $doctorId: ID, $page: PaginationInput) {
      getAllConditionByPatient(patientId: $patientId, doctorId: $doctorId, page: $page) {
            id
            clinicalAssessmentId
            condition
            status
            category
            onsetDate
            severity
            clinicalStatus
            verificationStatus
            abatementDate
            conditionType
            confidential
            displayOnPatientFile
            recordedBy
          recordedUserDetail {
                  firstName
                  lastName
                  middleName
                  staffType
                  title
            }
            createdAt
            updatedAt
      }
} `

export const GET_SURGERIES = gql`query getSurgeries($patientId: ID!) {
      getSurgeries(patientId: $patientId) {
            id
            patientId
            name
            bodySite
            reason
            age
            date
            hospital
            careTeam
            complications
            notes
            attachmentUrls
      }
}
`

export const APPOINTMENT_QUERY_HISTORY = gql`query getAppointments($doctorId: ID, $patientId: ID, $status: String, $date: Date, $toDate: Date, $fromDate: Date, $page: PaginationInput, $clinicId: ID, $timeOffset: Int, $nurseId: ID) {
      getAppointments(doctorId: $doctorId, patientId: $patientId, status: $status, date: $date, toDate: $toDate, fromDate: $fromDate, page: $page, clinicId: $clinicId, timeOffset: $timeOffset, nurseId: $nurseId) {
            time
            id
            type
            appointmentStatus
            isCompleted
            patientId
            status
            cancelAppointmentReason
            completedAt
                  slot {
                  date
                  startTime
                  endTime
                  phaseOfDay
                  mode
                  duration
                  status
            }
                  latestAppointmentBilling {
                  status
                  currencyCode
                  dueToPay
                  amountReceived
            }
      }
}
`

export const CREATE_CONDITIONS = gql`mutation createConditions($clinicalAssessmentId: ID!, $content: [ConditionInput], $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      createConditions(clinicalAssessmentId: $clinicalAssessmentId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
}
`

export const UPDATE_CONDITIONS = gql`mutation updateCondition($conditionId: ID!, $content: ConditionInput, $clinicalAssessmentNotes: ClinicalAssessmentNotesDetailsInput) {
      updateCondition(conditionId: $conditionId, content: $content, clinicalAssessmentNotes: $clinicalAssessmentNotes) {
            id
      }
} `

export const CREATE_FAV_DOC_CONDITIONS = gql`mutation createFavStaffSelections($userId: ID!, $content: [FavStaffSelectionInput!]!) {
      createFavStaffSelections(userId: $userId, content: $content) {
            id
            userId
            code
            name
            type
            group
            createdAt
            updatedAt
      }
}
`

export const GET_DOCTOR_FAV_CONDITION = gql`query getFavStaffSelections($userId: ID!, $type: StaffSelectionType, $page: PaginationInput, $group: FavStaffGroup!) {
      getFavStaffSelections(userId: $userId, type: $type, page: $page, group: $group) {
            id
            userId
            code
            name
            type
            group
            createdAt
            updatedAt
      }
}
`

export const REMOVE_FAV_DOC_CONDITIONS = gql`mutation removeFavStaffSelection($id: ID!) {
      removeFavStaffSelection(id: $id) {
            message
            status
      }
}
`

export const UPDATE_PATIENT_LIFESTYLE = gql`mutation updatePatientLifeStyle($id: ID!, $patientId: ID!, $content: LifestyleProfileInput!) {
      updatePatientLifeStyle(id: $id, patientId: $patientId, content: $content) {
            id
            patientId
            occupation
            occupationType
            activityLevel
            diet
            alchohalConsumption
            smokingHabit
            sexualActivity
            contraception
            drug
            createdAt
            updatedAt
      }
}
`

export const CHECK_EHR_ACCESS = gql`query getEHRAccess($doctorId: ID!, $patientId: ID!) {
      getEHRAccess(doctorId: $doctorId, patientId: $patientId) {
            status
      }
}
`

export const GET_NOTIFICATION = gql`query getNotifications($userId: ID!, $profileType: String!, $page: PaginationInput) {
      getNotifications(userId: $userId, profileType: $profileType, page: $page)
}
`
export const UPDATE_UNSEEN_NOTIFICATION = gql`mutation updateUnseenNotification($userId: ID!, $profileType: ProfileType!) {
      updateUnseenNotification(userId: $userId, profileType: $profileType)
}
`
export const GET_UNREAD_NOTIFICATION_COUNT = gql`query getUnReadNotificationCount($userId: ID!, $profileType: ProfileType!){
      getUnReadNotificationCount(userId: $userId, profileType: $profileType) {
            count
      }
}
`
// export const GET_UNREAD_NOTIFICATION_COUNT = gql`subscription unreadNotificationCount($userId: ID!, $profileType: ProfileType!) {
//       unreadNotificationCount (userId: $userId, profileType: $profileType) {
//           count
//       }
//   }
// `

export const GET_TRANSACTIONS = gql`query getTransactions($doctorId: ID!, $clinicId: ID!, $startTime: String!, $endTime: String, $timeOffset: Int, $page: Int, $limit: Int ){
      getTransactions(doctorId: $doctorId, clinicId: $clinicId, startTime: $startTime, endTime: $endTime, timeOffset: $timeOffset, page: $page, limit: $limit) {
            transactionId
            transactionStatus
            currencyCode
            amount
            paymentDate
            taxPercentage
            invoiceUrl
            appointment {
                  id
                  patientId
                  mode
                  slot {
                        date
                  }
                  patient {
                        firstName
                        middleName
                        lastName
                        profileImage
                        gender
                        dateOfBirth
                        addresses {
                              id
                              patientId
                              addressLine1
                              addressLine2
                              latitude
                              longitude
                              addressType
                              addTitle
                              country
                              state
                              city
                              district
                              pincode
                              isDefaultAddress
                              createdAt
                              updatedAt
                        }
                        mrn
                        id
                  }
                  doctor {
                        title
                        firstName
                        lastName
                  }
                  transactionId
            }
      }
    }
`

export const GET_REVENUE = gql`query getRevenue($doctorId: ID!, $clinicId: ID!, $startTime: String!, $endTime: String, $timeOffset: Int, $timeGroup: TimeGroup! ){
      getRevenue(doctorId: $doctorId, clinicId: $clinicId, startTime: $startTime, endTime: $endTime, timeOffset: $timeOffset, timeGroup: $timeGroup) {
            time
            currencyCode
            revenue
            transactionReason
      }
    }
`

export const GET_ALL_USERS = gql`query getAllClinicStaff ($clinicId: ID!, $doctorId: ID, $searchTerm: String, $staffType: String, $page: PaginationInput) {
      getAllClinicStaff (clinicId: $clinicId, doctorId: $doctorId, searchTerm: $searchTerm, page: $page, staffType: $staffType) {
          id
          title
          firstName
          middleName
          lastName
          email
          userType
          userId
          lastActiveAt
      #     staffType
          isEnable
          isDeleted
      }
}`

export const GET_CLINIC_STAFF_BY_ID = gql`query getClinicStaff ($id: ID, $userId: ID) {
      getClinicStaff (id: $id, userId: $userId) {
          id
          title
          userId
          firstName
          middleName
          lastName
          suffix
          registeredNumber
          telephoneCode
          mobileNumber
          email
          clinicId
          staffType
          staffAccesses
          workingHours {
              id
              doctorId
              staffId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          isEnable
          isDeleted
      }
}`

export const GET_CLINIC_STAFF_TYPE = gql`query getClinicStaffType ($clinicId: ID) {
      getClinicStaffType (clinicId: $clinicId) {
          id
          type
          isEnable
          clinicId
          createdAt
          updatedAt
      }
}`

export const CREATE_BULK_CLINIC_STAFF_TYPE = gql`mutation createBulkClinicStaffType ($content: [ClinicStaffTypeInput!]!) {
      createBulkClinicStaffType (content: $content) {
          id
          type
          isEnable
          clinicId
          createdAt
          updatedAt
      }
}`

export const CREATE_CLINIC_STAFF = gql`mutation createClinicStaff ($content: ClinicStaffInput!) {
      createClinicStaff (content: $content) {
          id
          title
          userId
          firstName
          middleName
          lastName
          suffix
          registeredNumber
          telephoneCode
          mobileNumber
          email
          clinicId
          staffType
          staffAccesses
          workingHours {
              id
              doctorId
              staffId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          isEnable
          isDeleted
      }
}`

export const UPDATE_CLINIC_STAFF = gql`mutation updateClinicStaff ($id: ID!, $content: ClinicStaffInput!) {
      updateClinicStaff (id: $id, content: $content) {
          id
          title
          userId
          firstName
          middleName
          lastName
          suffix
          registeredNumber
          telephoneCode
          mobileNumber
          email
          clinicId
          staffType
          staffAccesses
          workingHours {
              id
              doctorId
              staffId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          isEnable
          isDeleted
      }
  }`

export const REVOKE_USER_ACCESS = gql`mutation revokeClinicStaffOrDoctorAccess ($id: ID!, $type: ClinicUserType!) {
      revokeClinicStaffOrDoctorAccess (id: $id, type: $type) {
          message
      }
}`

export const DELETE_USER_ACCESS = gql`mutation deleteClinicStaffOrDoctor ($id: ID!, $type: ClinicUserType!) {
      deleteClinicStaffOrDoctor (id: $id, type: $type) {
          message
      }
}`

export const ENABLE_USER_ACCESS = gql`mutation grantClinicStaffOrDoctorAccess ($id: ID!, $type: ClinicUserType!) {
      grantClinicStaffOrDoctorAccess (id: $id, type: $type) {
          message
      }
}`

export const CREATE_CLINIC_DOCTOR = gql`mutation createClinicDoctor ($content: ClinicDoctorInput!) {
      createClinicDoctor (content: $content) {
          doctorDetails {
              doctorId
              userId
              title
              firstName
              middleName
              lastName
              suffix
              gender
              dateOfBirth
              idProof {
                  id
                  doctorId
                  type
                  number
                  documentUrl
                  createdAt
                  updatedAt
              }
              languages
              educations {
                  id
                  doctorId
                  degree
                  university
                  startYear
                  endYear
                  school
                  grade
                  description
                  certificateDocumentUrl
                  educationCertificate {
                      id
                      name
                      issuingOrganisation
                      issueDate
                      expirationDate
                      credentialId
                      credentialUrl
                      createdAt
                      updatedAt
                  }
                  createdAt
                  updatedAt
              }
              countryCode
              mobileNumber
              emailId
              specialities
              profilePhotoUrl
              digitalSignatureUrl
              socialLink {
                  id
                  doctorId
                  website
                  linkedin
                  facebook
                  instagram
                  twitter
                  youtube
                  tiktok
              }
              about
              hasMultipleClinics
              createdAt
              updatedAt
              staffAccesses
          }
          workingHours {
              id
              doctorId
              staffId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          doctorfees {
              feeId
              doctorId
              clinicId
              categoryName
              currency
              fee
              followupFee
              followupDuration
              taxPercentage
              taxValue
              createdAt
              updatedAt
          }
      }
}`

export const UPDATE_CLINIC_DOCTOR = gql`mutation updateClinicDoctor ($id: ID!, $content: ClinicDoctorInput!) {
      updateClinicDoctor (id: $id, content: $content) {
          doctorDetails {
              doctorId
              userId
              title
              firstName
              middleName
              lastName
              suffix
              gender
              dateOfBirth
              idProof {
                  id
                  doctorId
                  type
                  number
                  documentUrl
                  createdAt
                  updatedAt
              }
              languages
              educations {
                  id
                  doctorId
                  degree
                  university
                  startYear
                  endYear
                  school
                  grade
                  description
                  certificateDocumentUrl
                  educationCertificate {
                      id
                      name
                      issuingOrganisation
                      issueDate
                      expirationDate
                      credentialId
                      credentialUrl
                      createdAt
                      updatedAt
                  }
                  createdAt
                  updatedAt
              }
              countryCode
              mobileNumber
              emailId
              specialities
              profilePhotoUrl
              digitalSignatureUrl
              socialLink {
                  id
                  doctorId
                  website
                  linkedin
                  facebook
                  instagram
                  twitter
                  youtube
                  tiktok
              }
              about
              hasMultipleClinics
              createdAt
              updatedAt
              staffAccesses
          }
          workingHours {
              id
              doctorId
              staffId
              clinicId
              day
              phaseOfDay
              mode
              startTime
              endTime
              duration
              createdAt
              updatedAt
          }
          doctorfees {
              feeId
              doctorId
              clinicId
              categoryName
              currency
              fee
              followupFee
              followupDuration
              taxPercentage
              taxValue
              createdAt
              updatedAt
          }
      }
  }`

export const GET_CURRENCY = gql`query getCurrencyDetails{
      getCurrencyDetails
}`

export const GET_ASSESMENT_FOR_APPOINTMENT = gql`query getAssesmentForAppointment ($appointmentIds: [ID!]!) {
      getAssesmentForAppointment (appointmentIds: $appointmentIds) {
            appointmentId
            relatedNote {
                  conditionNotes
            }
            conditions {
                  condition
                  clinicalStatus
            }
      }
}`

export const GET_HI_APP_EMAIL = gql`mutation enqueueNotification ($userId: ID, $emailId: String, $content: NotificationInputV1!) {
      enqueueNotification (userId: $userId, emailId: $emailId, content: $content) {
            message
      }
}`

export const SUBSCRIBE_NEWS_LATTER = gql`mutation subscriptionNewsLetter ($email: String!, $profileType: ProfileType!) {
      subscriptionNewsLetter (email: $email, profileType: $profileType) {
            message
      }
}`

export const CONTACT_US_FORM = gql`mutation enqueueNotification ($userId: ID, $emailId: String, $content: NotificationInputV1!) {
      enqueueNotification (userId: $userId, emailId: $emailId, content: $content) {
            message
            status
      }
}`

export const GET_ALL_DOCTOR = gql`query getAllDoctor ($clinicId: ID, $limit: Int, $offset: Int, $timeOffset: Int) {
      getAllDoctor (clinicId: $clinicId, limit: $limit, offset: $offset, timeOffset: $timeOffset) {
            doctorId
            userId
            title
            firstName
            middleName
            lastName
            suffix
            gender
            specialities
            profilePhotoUrl
            about
            onHoliday
            doctorTotalExperience
            educations {
                  degree
            }
            clinics {
                  addressLine1
                  city
            }
            upcomingSlots{
                  date
                  startTime
                  endTime
                  duration
                  mode
                  day
            }
      }
}`

export const GET_ALL_DOCTOR_FOR_APPOINTMENT = gql`query getAllDoctor ($clinicId: ID, $limit: Int, $offset: Int, $timeOffset: Int) {
      getAllDoctor (clinicId: $clinicId, limit: $limit, offset: $offset, timeOffset: $timeOffset) {
            doctorId
            userId
            title
            firstName
            middleName
            lastName
            suffix
            gender
            specialities
            profilePhotoUrl
            about
            onHoliday
            doctorTotalExperience
            educations {
                  degree
            }
            clinics {
                  addressLine1
                  city
            }
            workingHours {
                  id
                  doctorId
                  staffId
                  clinicId
                  day
                  phaseOfDay
                  mode
                  startTime
                  endTime
                  duration
                  createdAt
                  updatedAt
            }
      }
}`

export const GET_CARE_TEAM = gql`query careTeamOfClinic ($clinicId: ID!) {
      careTeamOfClinic (clinicId: $clinicId) {
            id
            userId
            title
            firstName
            middleName
            lastName
            designation
            mobileNumber
            emailId
            profileType
      }
}`

export const ASSIGN_CARE_TEAM = gql`mutation assignCareTeamToAppointment ($appointmentId: ID!, $careTeamAssignees: [String!]!) {
      assignCareTeamToAppointment (appointmentId: $appointmentId, careTeamAssignees: $careTeamAssignees) {
            careTeamAssignees
      }
}`

export const ADD_ASSESSMENT_FILE = gql`mutation addAssessmentFile ($appointmentId: ID!, $content: AssessmentFileInput!) {
      addAssessmentFile (appointmentId: $appointmentId, content: $content) {
            appointmentId
      }
}`

export const UPDATE_ASSESSMENT_FILE = gql`mutation updateAssessmentFile ($id: ID!, $content: AssessmentFileInput!) {
      updateAssessmentFile (id: $id, content: $content) {
            id
            appointmentId
            title
            url
      }
}`

export const DELETE_ASSESSMENT_FILE = gql`mutation deleteAssessmentFile ($id: ID!) {
      deleteAssessmentFile (id: $id) {
            message
      }
}`

export const GET_ASSESSMENT_FILE = gql`query assessmentFilesOfAppointment ($appointmentId: ID!) {
      assessmentFilesOfAppointment (appointmentId: $appointmentId) {
            id
            appointmentId
            title
            url
            createdAt
            updatedAt
      }
}`

export const UPDATE_APPOINTMENT = gql`mutation updateAppointmentDetails($id: ID!, $content: UpdateAppointmentDetailInput) {
      updateAppointmentDetails(id: $id, content: $content) {
        message
      }
}`

export const CREATE_INSURANCE = gql`mutation createInsurance ($patientId: ID!, $content: insuranceInput!) {
      createInsurance (patientId: $patientId, content: $content) {
          id
          patientId
          country
          insuranceProvider
          tpa
          insuranceIdNumber
          plan
          policyStatus
          startDate
          terminateDate
          endDate
          cardFrontImage
          cardBackImage
          createdAt
          updatedAt
      }
}`

export const UPDATE_INSURANCE = gql`mutation updateInsurance ($id: ID!, $content: insuranceInput!) {
      updateInsurance (id: $id, content: $content) {
          id
          patientId
          country
          insuranceProvider
          tpa
          insuranceIdNumber
          plan
          policyStatus
          startDate
          terminateDate
          endDate
          cardFrontImage
          cardBackImage
          createdAt
          updatedAt
      }
}`

export const DELETE_INSURANCE = gql`mutation deleteInsurance ($id: ID!) {
      deleteInsurance (id: $id) {
          status
          message
      }
}`

export const UPDATE_APPOINTMENT_ORDER = gql`mutation updateAppointmentOrdering ($requests: [AppointmentOrderingUpdateInput!]!) {
      updateAppointmentOrdering (requests: $requests) {
          status
          message
      }
}`

export const CREATE_MEDICAL_QUESTIONNAIRE = gql`mutation createMedicalQuestionnaire($request: MedicalQuestionnaireInput!) {
      createMedicalQuestionnaire(request: $request) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const UPDATE_MEDICAL_QUESTIONNAIRE = gql`mutation updateMedicalQuestionnaire($id: ID!, $request: MedicalQuestionnaireInput!) {
      updateMedicalQuestionnaire(id: $id, request: $request) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const DELETE_MEDICAL_QUESTIONNAIRE = gql`mutation deleteMedicalQuestionnaire($id: ID!) {
      deleteMedicalQuestionnaire(id: $id) {
        status
        message
      }
}`

export const GET_MEDICAL_QUESTIONNAIRE = gql`query medicalQuestionnaireById($id: ID!) {
      medicalQuestionnaireById(id: $id) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const GET_MEDICAL_QUESTIONNAIRE_BY_CLINIC = gql`query medicalQuestionnaireOfClinic($clinicId: ID!) {
      medicalQuestionnaireOfClinic(clinicId: $clinicId) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const SUBMIT_MEDICAL_QUESTIONNAIRE = gql`mutation submitMedicalQuestionnaire($appointmentId: ID!, $clinicId: ID!, $medicalQuestionnaireId: ID!, $content: MedicalQuestionnaireSubmissionInput!) {
      submitMedicalQuestionnaire(appointmentId: $appointmentId, clinicId: $clinicId, medicalQuestionnaireId: $medicalQuestionnaireId, content: $content) {
            clinicId
            appointmentId
            medicalQuestionnaireId
            title
            questions {
                  question
                  answers
                  questionType
                  required
                  availableAnswers
            }
      }
}`

export const EDIT_MEDICAL_QUESTIONNAIRE = gql`mutation editMedicalQuestionnaireSubmission($id: ID!, $content: MedicalQuestionnaireSubmissionInput!) {
      editMedicalQuestionnaireSubmission(id: $id, content: $content) {
            id
            clinicId
            appointmentId
            medicalQuestionnaireId
            title
            questions {
                  question
                  answers
                  questionType
                  required
                  availableAnswers
            }
      }
}`

export const DELETE_MEDICAL_QUESTIONNAIRE_SUBMISSION = gql`mutation deleteMedicalQuestionnaireSubmission($id: ID!) {
      deleteMedicalQuestionnaireSubmission(id: $id) {
            message
            status
      }
}`

export const GET_ALL_DOCTOR_FOR_CALENDAR = gql`query getAllDoctor($clinicId: ID, $limit: Int, $offset: Int, $timeOffset: Int) {
      getAllDoctor(clinicId: $clinicId, limit: $limit, offset: $offset, timeOffset: $timeOffset) {
        doctorId
        userId
        title
        firstName
        middleName
        lastName
        suffix
        gender
        specialities
        profilePhotoUrl
        about
        onHoliday
      }
}`

export const GET_CLINIC_SPECIALITIES = gql`query getClinicSpecialities($clinicId: ID!) {
      getClinicSpecialities(clinicId: $clinicId) 
}`

export const GET_PATIENT_INSTRUCTIONS_BY_TREATMENT_ID = gql`query getPatientInstructionsByTreatmentId($treatmentId: ID!) {
      getPatientInstructionsByTreatmentId(treatmentId: $treatmentId) {
        id
        treatmentId
        title
        description
        videoUrl
        urls
        createdAt
        updatedAt
      }
}`

export const CREATE_PATIENT_INSTRUCTION = gql`mutation createPatientInstruction($treatmentId: ID!, $content: PatientInstructionInput!) {
      createPatientInstruction(treatmentId: $treatmentId, content: $content) {
        id
        treatmentId
        title
        description
        videoUrl
        urls
        createdAt
        updatedAt
      }
}`

export const UPDATE_PATIENT_INSTRUCTION = gql`mutation updatePatientInstruction($id: ID!, $content: PatientInstructionInput!) {
      updatePatientInstruction(id: $id, content: $content) {
        id
        treatmentId
        title
        description
        videoUrl
        urls
        createdAt
        updatedAt
      }
}`

export const DELETE_PATIENT_INSTRUCTION_BY_ID = gql`mutation deletePatientInstruction($id: ID!) {
      deletePatientInstruction(id: $id) {
        message
      }
}`

export const GET_CARE_TEAM_BY_ID = gql`query careTeamByUserIds($userIds: [ID!]!) {
      careTeamByUserIds(userIds: $userIds) {
            id
            userId
            title
            firstName
            middleName
            lastName
            designation
            mobileNumber
            emailId
      }
}`

export const GET_CLINICAL_ASSESSMENT_NOTES_TIMELINE = gql`query getClinicalAssessmentNotesTimeline($clinicalAssessmentId: ID!, $page: PaginationInput) {
      getClinicalAssessmentNotesTimeline(clinicalAssessmentId: $clinicalAssessmentId, page: $page) {
        clinicalAssessmentId
        appointmentId
        notesOwnerId
        notesOwnerProfileType
        notesOwnerDetails {
          firstName
          lastName
          middleName
          profilePhotoUrl
          title
        }
        notes
        url
        createdAt
        updatedAt
      }
}`

export const GET_CLINIC_MEDICAL_QUESTIONNAIRE_SUBMISSION = gql`query getMedicalQuestionnaireSubmissions($clinicId: ID!, $appointmentId: ID) {
      getMedicalQuestionnaireSubmissions(clinicId: $clinicId, appointmentId: $appointmentId) {
            id
            clinicId
            appointmentId
            medicalQuestionnaireId
            title
            questions {
                  question
                  answers
                  questionType
                  required
                  availableAnswers
            }
      }
}`

export const CREATE_CLINIC_MEDICAL_QUESTIONNAIRE = gql`mutation CreateMedicalQuestionnaire($request: MedicalQuestionnaireInput!) {
      createMedicalQuestionnaire(request: $request) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const UPDATE_CLINIC_MEDICAL_QUESTIONNAIRE = gql`mutation UpdateMedicalQuestionnaire($id: ID!, $request: MedicalQuestionnaireInput!) {
      updateMedicalQuestionnaire(id: $id, request: $request) {
        id
        clinicId
        title
        questions {
            id
            questionStatement
            questionType
            required
            answers {
                answerStatement
            }
        }
      }
}`

export const DELETE_CLINIC_MEDICAL_QUESTIONNAIRE = gql`mutation DeleteMedicalQuestionnaire($id: ID!) {
      deleteMedicalQuestionnaire(id: $id) {
        status
        message
      }
}`

export const GET_MEDICAL_CONSENT_FORMS_BY_ID = gql`query getClinicConsentForm ($id: ID!) {
      getClinicConsentForm (id: $id) {
          id
          clinicId
          title
          description
          signatures
          createdAt
          updatedAt
      }
}`

export const GET_MEDICAL_CONSENT_FORMS_BY_CLINIC_ID = gql`query getClinicConsentFormByClinicId ($clinicId: ID!) {
      getClinicConsentFormByClinicId (clinicId: $clinicId) {
          id
          clinicId
          title
          description
          signatures
          createdAt
          updatedAt
      }
}`

export const CREATE_CLINIC_CONSET_FORMS = gql`mutation createClinicConsentForm ($clinicId: ID!, $content: ClinicConsentFormInput!) {
      createClinicConsentForm (clinicId: $clinicId, content: $content) {
          id
          clinicId
          title
          description
          signatures
          createdAt
          updatedAt
      }
}`

export const UPDATE_CLINIC_CONSET_FORMS = gql`mutation updateClinicConsentForm ($id: ID!, $content: ClinicConsentFormInput!) {
      updateClinicConsentForm (id: $id, content: $content) {
          id
          clinicId
          title
          description
          signatures
          createdAt
          updatedAt
      }
}`

export const DELETE_CLINIC_CONSET_FORMS = gql`mutation deleteClinicConsentForm ($id: ID!) {
      deleteClinicConsentForm (id: $id) {
          message
      }
}`

export const ACCEPT_APPOINTMENT = gql`mutation acceptAppointmemt($id: ID!) {
      acceptAppointmemt(id: $id) {
        id
      }
}`

export const RECORD_ADMISSION_TIME = gql`mutation recordAdmissionTime($appointmentId: ID!, $admissionTime: Date!, $timeOffset: Int) {
      recordAdmissionTime(appointmentId: $appointmentId, admissionTime: $admissionTime, timeOffset: $timeOffset) {
            message
            status
      }
}`

export const GET_PRIORITY_APPOINTMENTS = gql`query getPriorityAppointments ($doctorId: ID, $patientId: ID, $clinicId: ID, $nurseId: ID, $date: Date, $toDate: Date, $fromDate: Date, $page: PaginationInput, $timeOffset: Int) {
      getPriorityAppointments (doctorId: $doctorId, patientId: $patientId, date: $date, toDate: $toDate, fromDate: $fromDate, page: $page, clinicId: $clinicId, timeOffset: $timeOffset, nurseId: $nurseId) {
            id
            treatmentId
            slotId
            patientId
            doctorId
            clinicId
            isCompleted
            appointmentStatus
            canceledBy
            nurseId
            token
            labOrderExists
            careTeamAssignees
            admissionTime
            patient {
                  patientId
                  title
                  firstName
                  lastName
                  dateOfBirth
                  gender
                  profileImage
                  nationality
                  # insurances
                  countryOfResidence
                  isVip
                  emailId
                  countryCode
                  mobileNumber
            }
            doctor {
                  title
                  doctorId
                  firstName
                  middleName
                  lastName
                  specialities
                  profilePhotoUrl
                  clinics {
                        clinicName
                        city
                        country
                  }
            }
            transactionId
            lastVistedDatetime
                  time
                  duration
                  status
                  count
                  orderId
                  appointmentOtherInfo {
                        id
                        appointmentId
                        patientId
                        reason
                        notes
                        reportUrl
                        relatedPatientId
                        createdAt
                        updatedAt
                        clinicCheckIn
                        clinicCheckOut
                        triageCategory
                        modeOfPayment
                        department
                  }
                  createdAt
                  updatedAt
                  slot {
                        id
                        date
                        startTime
                        endTime
                        phaseOfDay
                        mode
                        doctorId
                        clinicId
                        duration
                        status
                        createdAt
                        updatedAt
                  }
            }
      }
`

export const CREATE_ENCOUNTER_V2 = gql`mutation CreateEncounterV2($content: EncounterV2Input!) {
      createEncounterV2(content: $content) {
        id
        patientId
        doctorId
        encounterClass
        subjectStatus
        episodeOfCare
        basedOn
        encounterCareProviders {
          userId
          type
          fromTime
          toTime
        }
        appointmentReference
        appointmentPeriod
        appointmentPlannedStartTime
        appointmentPlannedEndTime
        appointmentLength
        appointmentEncounterReason
        appointmentEncounterReasonUse
        diagnosisDietPreference
        diagnosisSpecialArrangement
        diagnosisSpecialCourtesy
        encounterDiagnoses {
          diagnosis
          diagnosisUse
          billing
        }
        hospitalizationType
        hospitalizationNote
        hospitalizationRefererenceOrigin
        hospitalizationAdmitSource
        hospitalizationReferredBy
        hospitalizationDestination
        hospitalizationBedNumber
        hospitalizationDischargeDisposition
        encounterLocations {
          location
          status
          form
          fromTime
          toTime
        }
        note
        noteAttachments
      }
}`

export const UPDATE_ENCOUNTER_V2 = gql`mutation UpdateEncounterV2($id: ID!, $content: EncounterV2Input!) {
      updateEncounterV2(id: $id, content: $content) {
        id
        patientId
        doctorId
        encounterClass
        subjectStatus
        episodeOfCare
        basedOn
        encounterCareProviders {
          userId
          type
          fromTime
          toTime
        }
        appointmentReference
        appointmentPeriod
        appointmentPlannedStartTime
        appointmentPlannedEndTime
        appointmentLength
        appointmentEncounterReason
        appointmentEncounterReasonUse
        diagnosisDietPreference
        diagnosisSpecialArrangement
        diagnosisSpecialCourtesy
        encounterDiagnoses {
          diagnosis
          diagnosisUse
          billing
        }
        hospitalizationType
        hospitalizationNote
        hospitalizationRefererenceOrigin
        hospitalizationAdmitSource
        hospitalizationReferredBy
        hospitalizationDestination
        hospitalizationBedNumber
        hospitalizationDischargeDisposition
        encounterLocations {
          location
          status
          form
          fromTime
          toTime
        }
        note
        noteAttachments
      }
}`

export const GET_ALL_ENCOUNTER_V2 = gql`query GetAllEncountersV2($doctorId: String!, $patientId: String!, $pageNumber: Int!, $perPage: Int!) {
      getAllEncountersV2(doctorId: $doctorId, page: { pageNumber: $pageNumber, perPage: $perPage }, patientId: $patientId) {
        id
        patientId
        doctorId
        encounterClass
        subjectStatus
        episodeOfCare
        basedOn
        appointmentReference
        appointmentPeriod
        appointmentPlannedStartTime
        appointmentPlannedEndTime
        appointmentLength
        appointmentEncounterReason
        appointmentEncounterReasonUse
        diagnosisDietPreference
        diagnosisSpecialArrangement
        diagnosisSpecialCourtesy
        hospitalizationType
        hospitalizationNote
        hospitalizationRefererenceOrigin
        hospitalizationAdmitSource
        hospitalizationReferredBy
        hospitalizationDestination
        hospitalizationBedNumber
        hospitalizationDischargeDisposition
        note
        noteAttachments
        encounterDiagnoses {
          diagnosis
          diagnosisUse
          billing
        }
        encounterLocations {
          location
          status
          form
          fromTime
          toTime
        }
        encounterCareProviders {
          userId
          type
          fromTime
          toTime
        }
      }
}`

export const GET_ENCOUNTER_BY_ID_V2 = gql`query GetEncounterV2($id: String!) {
      getEncounterV2(id: $id) {
        id
        patientId
        doctorId
        encounterClass
        subjectStatus
        episodeOfCare
        basedOn
        encounterCareProviders {
          userId
          type
          fromTime
          toTime
        }
        appointmentReference
        appointmentPeriod
        appointmentPlannedStartTime
        appointmentPlannedEndTime
        appointmentLength
        appointmentEncounterReason
        appointmentEncounterReasonUse
        diagnosisDietPreference
        diagnosisSpecialArrangement
        diagnosisSpecialCourtesy
        encounterDiagnoses {
          diagnosis
          diagnosisUse
          billing
        }
        hospitalizationType
        hospitalizationNote
        hospitalizationRefererenceOrigin
        hospitalizationAdmitSource
        hospitalizationReferredBy
        hospitalizationDestination
        hospitalizationBedNumber
        hospitalizationDischargeDisposition
        encounterLocations {
          location
          status
          form
          fromTime
          toTime
        }
        note
        noteAttachments
      }
}`

export const GET_ALL_DOCTOR_FOR_FOLLOW_UP = gql`query getAllDoctor ($clinicId: ID, $limit: Int, $offset: Int, $timeOffset: Int) {
      getAllDoctor (clinicId: $clinicId, limit: $limit, offset: $offset, timeOffset: $timeOffset) {
            doctorId
            userId
            firstName
            middleName
            lastName
      }
}`

export const DOWNLOAD_INSTRUCTIONS = gql`query downloadPatientInstructionByTreatmentId ($treatmentId: ID!) {
      downloadPatientInstructionByTreatmentId (treatmentId: $treatmentId)
}`

export const CREATE_APPOINTMENTS_NOTES = gql`mutation createAppointmentNote ($appointmentId: ID!, $content: AppointmentNoteInput!) {
      createAppointmentNote (appointmentId: $appointmentId, content: $content) {
            id
      }
}`

export const GET_APPOINTMENTS_NOTES = gql`query getAppointmentNotes ($appointmentId: ID!, $noteType: String, $page: PaginationInput) {
      getAppointmentNotes (appointmentId: $appointmentId, noteType: $noteType, page: $page) {
            id
            appointmentId
            noteType
            title
            note
            urls
            userId
            profileType
            user {
                  profilePhotoUrl
                  title
                  firstName
                  lastName
            }
            createdAt
      }
}`

export const DELETE_CLINICAL_NOTE = gql`mutation deleteAppointmentNote($id: ID!) {
      deleteAppointmentNote(id: $id) {
        message
      }
}`

export const UPDATE_CLINICAL_NOTE = gql`mutation updateAppointmentNote($id: ID!, $content: AppointmentNoteInput!) {
      updateAppointmentNote(id: $id, content: $content) {
        id
      }
}`

export const GET_REMOTE_MONITORING_LIST = gql`query getRemoteMonitoringByFilters($careTeamUserId: ID, $userId: ID, $patientId: ID, $timeOffset: Int, $page: PaginationInput, $userProfileType: ProfileType, $clinicId: ID) {
      getRemoteMonitoringByFilters(careTeamUserId: $careTeamUserId, userId: $userId, patientId: $patientId, timeOffset: $timeOffset, page: $page, userProfileType: $userProfileType, clinicId: $clinicId) {
            id
            patientId
            userId
            monitoringPlan
            urls
            aimMonitoringPlan
            careTeamAssignIds
            startDate
            endDate
            status
            createdAt
            updatedAt
            rmHealthTrackers {
                  vitalName
            }
            patient {
                  firstName
                  lastName
                  gender
                  dateOfBirth
                  profileImage
            }
      }
}`

export const GET_PATIENT_PRESENT_INNNESS = gql`query getAllPresentIllnessByPatient ($patientId: ID!, $page: PaginationInput) {
      getAllPresentIllnessByPatient (patientId: $patientId, page: $page) {
            id
            location
            quality
            duration
            timing
            context
            modifyingFactor
            associatedSign
      }
}
`

export const GET_PATIENT_CONDITION = gql`query getAllConditionByPatient ($patientId: ID!, $page: PaginationInput) {
      getAllConditionByPatient (patientId: $patientId, page: $page) {
            id
            condition
            status
            category
            onsetDate
            severity
            clinicalStatus
            verificationStatus
            abatementDate
            conditionType
            confidential
            displayOnPatientFile
      }
}
`
export const GET_PATIENT_MEDICAL_HISTORY = gql`query getAllExistingMedicalHistoryByPatient ($patientId: ID!, $page: PaginationInput) {
      getAllExistingMedicalHistoryByPatient (patientId: $patientId, page: $page) {
            id
            onDate
            medicalProblem
      }
}
`

export const CREATE_REMOTE_MONITORING = gql`mutation createRemoteMonitoring($content: RemoteMonitoringInput!) {
      createRemoteMonitoring(content: $content) {
        id
      }
}`

export const UPDATE_REMOTE_MONITORING = gql`mutation updateRemoteMonitoring($id: ID!, $content: RemoteMonitoringUpdateInput!) {
      updateRemoteMonitoring(id: $id, content: $content) {
        id
      }
}`

export const GET_REMOTE_MONITORING_BY_ID = gql`query getRemoteMonitoring($id: ID!, $timeOffset: Int) {
      getRemoteMonitoring(id: $id, timeOffset: $timeOffset) {
            id
            clinicId
            patientId
            userId
            monitoringPlan
            urls
            aimMonitoringPlan
            careTeamAssignIds
            startDate
            endDate
            status
            createdAt
            updatedAt
            rmHealthTrackers {
                  vitalName
                  time
                  id
                  vitalId
            }
            patient {
                  firstName
                  lastName
                  gender
                  dateOfBirth
                  profileImage
                  latestPatientAssessment {
                        appointmentId
                  }
            }
            rmEmergencyContacts {
                  name
                  relation
                  mobileNumber
                  emailId
                  id
            }
            rmEmergencyResponse {
                  protocols
                  relevantMedicalInfo
                  notes
                  id
            }
            rmPricings {
                  totalAmount
                  currencyCode
                  planAmount
                  planType
                  planName
                  setUpFee
                  tax
            }
      }
}`

export const CANCEL_REMOTE_MONITORING = gql`mutation cancelRemoteMonitoring($id: ID!) {
      cancelRemoteMonitoring(id: $id) {
            message
      }
}`

export const GET_REMOTE_MONITORING_NOTES = gql`query getRemoteMonitoringNotes($rmId: ID!, $page: PaginationInput) {
      getRemoteMonitoringNotes(rmId: $rmId, page: $page) {
            id
            rmId
            userId
            profileType
            userName
            speciality
            title
            desciption
            urls
            createdAt
            updatedAt
      }
}`

export const CREATE_REMOTE_MONITORING_NOTES = gql`mutation createRemoteMonitoringNotes($rmId: ID!, $content: RemoteMonitoringNotesInput!) {
      createRemoteMonitoringNotes(rmId: $rmId, content: $content) {
            id
      }
}`

export const REMOTE_MONITORING_SET_TARGET = gql`mutation createRemoteMonitoringSetTarget ($rmId: ID!, $content: RemoteMonitoringSetTargetInput!) {
      createRemoteMonitoringSetTarget (rmId: $rmId, content: $content) {
          id
          rmId
          patientId
          weightTarget
          weightTargetUnit
          stepTarget
          stepTargetUnit
          bicycleTarget
          bicycleTargetUnit
          exerciseTarget
          exerciseTargetUnit
          swimmingTarget
          swimmingTargetUnit
          waterIntakeTarget
          calorieIntakeTarget
          calorieBurnTarget
          sleepHourTarget
          createdAt
          updatedAt
      }
}`

export const GET_REMOTE_MONITORING_HEALTH_METRICS = gql`query getRemoteMonitoringSetTarget ($rmId: ID!) {
      getRemoteMonitoringSetTarget (rmId: $rmId) {
          id
          rmId
          patientId
          weightTarget
          weightTargetUnit
          stepTarget
          stepTargetUnit
          bicycleTarget
          bicycleTargetUnit
          exerciseTarget
          exerciseTargetUnit
          swimmingTarget
          swimmingTargetUnit
          waterIntakeTarget
          calorieIntakeTarget
          calorieBurnTarget
          sleepHourTarget
          createdAt
          updatedAt
      }
}`

export const GET_MEDICINE_ANALYTICS = gql`query getMedicineAnalytics($clinicId: ID, $doctorIds: [ID] $patientId: ID, $startDate: Date!, $endDate: Date!, $medicineId: ID, $timeOffset: Int) {
      getMedicineAnalytics(clinicId: $clinicId, doctorIds: $doctorIds, patientId: $patientId, startDate: $startDate, endDate: $endDate, medicineId: $medicineId, timeOffset: $timeOffset) {
            taken {
                  key
                  value
            }
            notTaken {
                  key
                  value
            }
            unMarked {
                  key
                  value
            }
      }
}`

export const GET_MEDICINE_REMINDER = gql`query getAllMedicineReminder($patientId: ID!) {
      getAllMedicineReminder(patientId: $patientId) {
            genericName
            id
            brandName
      }
}`
export const GET_USER_SUBSCRIPTION_FEATURES = gql`query userSubscriptionFeatures($userId: String!) {
      userSubscriptionFeatures(userId: $userId) {
            appointmentCommisionPercentage
            multipleClinicEnabled
            appProfileEnabled
            teleHealthEnabled
            maxUsersAllowed
            encounterManagement {
                  idCardScannerEnabled
                  digitalConsentFormEnabled
                  medicalQuestionnaireEnabled
            }
            myCalendarEnabled
            myWalledEnabled
            serverStorageInGB
            aiToolsEnabled
            remoteMonitoringEnabled
            softwareTrainingEnabled
            exportSalesReportEnabled
      }
}`

export const EXPORT_CLINICAL_SUMMARY = gql`mutation exportClinicalSummary($appointmentId: ID!, $timeOffset: Int = 0) {
      exportClinicalSummary(appointmentId: $appointmentId, timeOffset: $timeOffset)
}`

export const GET_APPOINTMENT_PROCEDURE = gql`query appointmentProcedures($appointmentId: ID!, $page: PaginationInput) {
      appointmentProcedures(appointmentId: $appointmentId, page: $page) {
            id
            appointmentId
            name
            basedOn
            partOf
            status
            statusReason
            category
            encounterReference
            occurences {
                  id
                  startTime
                  endTime
            }
            recordedBy
            performers {
                  id
                  name
                  role
                  organization
                  startTime
                  endTime
                  note
            }
            locations
            procedureDetails {
                  id
                  reason
                  bodySite
                  outcome
                  reportUrls
            }
            complications
            followUpInstructionTitle
            followUpInstruction
            focalDevices {
                  id
                  deviceType
                  deviceAction
            }
            procedureItems {
                  id
                  name
                  quantity
            }
            supportingInfo
            notes {
                  id
                  content
                  attachmentUrls
            }
      }
}`

export const GET_CPT_SEARCH = gql`query getCPTBySearch($searchTerm: String!, $page: PaginationInput) {
      getCPTBySearch(searchTerm: $searchTerm, page: $page) {
            id
            code
            display
      }
}`

export const UPSERT_PROCEDURE = gql`mutation upsertProcedure ($content: ProcedureInput!) {
      upsertProcedure (content: $content) {
            id
      }
}
`;

export const REMOTE_MONITORING_TILES = gql`query remoteMonitoringTiles($careTeamUserId: ID, $userId: ID, $page: PaginationInput, $userProfileType: ProfileType, $clinicId: ID!, $timeOffset: Int = 0, $status: [String]) {
      remoteMonitoringTiles(careTeamUserId: $careTeamUserId, userId: $userId, page: $page, userProfileType: $userProfileType, timeOffset: $timeOffset, clinicId: $clinicId, status: $status) {
            id
            status
            rmHealthTrackers {
                  vitalName
                  time
                  thisWeekVitalHistory {
                        id
                        patientId
                        name
                        vitalId
                        value
                        uom
                        notes
                        readingSource
                        mealPreference
                        additionalInfo
                        attachmentUrls
                        readingDate
                        reminder
                        createdAt
                        updatedAt
                        vital {
                              id
                              parentId
                              name
                              description
                              order
                              type
                              imageUrl
                              isEnable
                              createdAt
                              updatedAt
                        }
                  }
            }
            patient {
                  firstName
                  lastName
                  dateOfBirth
                  gender
                  profileImage
                  id
                  latestPatientAssessment {
                        appointmentId
                  }
            }
      }
}`

export const UPDATE_USER_TWO_FA = gql`mutation updateUserTwoFA ($userId: ID!, $status: Bool!) {
      updateUserTwoFA (userId: $userId, status: $status) {
            message
            status
            data
      }
}`


export const GET_BLOGS = gql`
  query getBlogs($searchTerm: String, $page: PaginationInput) {
    getFeeds(searchTerm: $searchTerm, page: $page) {
      totalCount
      response {
            id
              title
              images
              description
              videoUrls
              categories
              referenceUrls
              username
              status
              isBookmark
              updatedAt
              createdAt
      }
    }
  }
`;

export const GET_BLOG = gql`
  query getBlog($id: ID!) {
    getFeedById(id: $id) {
      id
      title
      images
      description
      videoUrls
      categories
      referenceUrls
      username
      status
      createdAt
    }
  }
`;

export const CREATE_BLOG = gql`mutation createArticle($content: feedInput!) {
      createArticle(content: $content) {
        id
      }
}`

export const GET_REPORT_SUMMARIES = gql`
  query getReportSummariesByAppoinmtmentId(
    $appointmentId: ID!
    $page: PaginationInput
  ) {
    getReportSummariesByAppoinmtmentId(
      appointmentId: $appointmentId
      page: $page
    ) {
      id
      appointmentId
      title
      summary
    }
  }
`;

export const CREATE_REPORT_SUMMARY = gql`
  mutation createReportSummary(
    $appointmentId: ID!
    $content: ReportSummaryInput
  ) {
    createReportSummary(appointmentId: $appointmentId, content: $content) {
      id
      appointmentId
      summary
    }
  }
`;

export const DELETE_REPORT_SUMMARY = gql`
  mutation deleteReportSummary($id: ID!) {
    deleteReportSummary(id: $id) {
      status
      message
    }
  }
`;

export const UPDATE_REPORT_SUMMARY = gql`
  mutation updateReportSummary($id: ID!, $content: ReportSummaryInput) {
    updateReportSummary(id: $id, content: $content) {
      id
      appointmentId
    }
  }
`;

export const GET_ALL_TREATMENT_GOALS = gql`
  query getAllTreatmentGoals($appointmentId: ID, $page: PaginationInput, $timeOffset: Int) {
    getAllTreatmentGoals(appointmentId: $appointmentId, page: $page, timeOffset: $timeOffset) {
      id
      goal
      achievedBy
      achievedOn
      status
      clinicalAssessmentId
    }
  }
`;

export const CREATE_TREATMENT_GOAL = gql`
  mutation createTreatmentGoals(
    $clinicalAssessmentId: ID
    $appointmentId: ID!
    $content: [TreatmentGoalInput]!
  ) {
    createTreatmentGoals(
      clinicalAssessmentId: $clinicalAssessmentId
      appointmentId: $appointmentId
      content: $content
    ) {
      id
    }
  }
`;

export const UPDATE_TREATMENT_GOAL = gql`
  mutation updateTreatmentGoal($id: ID!, $content: TreatmentGoalInput!) {
    updateTreatmentGoal(id: $id, content: $content) {
      id
      status
      goal
    }
  }
`;

export const DELETE_TREATMENT_GOAL = gql`
  mutation deleteTreatmentGoal($id: ID!) {
    deleteTreatmentGoal(id: $id) {
      status
      message
    }
  }
`;

export const GET_PHYSICAL_EXAMINATION = gql`
  query getPhysicalExaminationByFilter(
    $id: ID
    $appointmentId: ID
    $clinicalAssessmentId: ID
  ) {
    getPhysicalExaminationByFilter(
      id: $id
      appointmentId: $appointmentId
      clinicalAssessmentId: $clinicalAssessmentId
    ) {
      id
      bodySite
      morphology
      laterality
      bodyViewUrl
      attachments
      patientId
    }
  }
`;

export const CREATE_PHYSICAL_EXAMINATION = gql`
  mutation createPhysicalExamination(
    $clinicalAssessmentId: ID!
    $appointmentId: ID!
    $patientId: ID!
    $content: PhysicalExaminationInput!
  ) {
    createPhysicalExamination(
      clinicalAssessmentId: $clinicalAssessmentId
      appointmentId: $appointmentId
      patientId: $patientId
      content: $content
    ) {
      id
    }
  }
`;

export const UPDATE_PHYSICAL_EXAMINATION = gql`
  mutation updatePhysicalExamination(
    $id: ID!
    $content: PhysicalExaminationInput!
  ) {
    updatePhysicalExamination(id: $id, content: $content) {
      id
    }
  }
`;

export const DELETE_PHYSICAL_EXAMINATION = gql`
  mutation deletePhysicalExamination($id: ID!) {
    deletePhysicalExamination(id: $id) {
      status
      message
    }
  }
`;

export const GET_RATING_INFO = gql`
  query getRatingInfo($clinicId: ID!, $doctorId: ID) {
    getRatingInfo(clinicId: $clinicId, doctorId: $doctorId) {
      avgRating
      maxRating
      minRating
      rating
      totalRatingCount
      totalReviewCount
    }
  }
`;

export const GET_RATING_AND_REVIEW_INFO = gql`
  query getRatingAndReviewInfoByFilters(
    $clinicId: ID!
    $doctorId: ID
    $startDate: String
    $endDate: String
    $status: Bool
    $isMostHelpfull: Bool
    $page: PaginationInput
  ) {
    getRatingAndReviewInfoByFilters(
      clinicId: $clinicId
      doctorId: $doctorId
      startDate: $startDate
      endDate: $endDate
      status: $status
      isMostHelpfull: $isMostHelpfull
      page: $page
    ) {
      totalCount
      reviews {
        feedbackSubmitId
        text
        patient {
          patientId
          profileImage
          title
          firstName
          middleName
          lastName
          addresses {
            state
            country
            district
          }
        }
        doctor {
          doctorId
          title
          firstName
          middleName
          lastName
          profilePhotoUrl
        }
        appointment {
          completedAt
          slot {
            mode
          }
        }
        rating
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_FEEDBACK_SUBMIT = gql`
  query getFeedbackSubmit($id: ID!) {
    getFeedbackSubmit(id: $id) {
      id
      feedbackId
      feedbackAnswers {
        question
        answer
        choices
      }
    }
  }
`;

export const UPDATE_FEEDBACK_STATUS = gql`
  mutation updateFeedbackSubmitStatus($id: ID!, $status: Bool!) {
    updateFeedbackSubmitStatus(id: $id, status: $status) {
      message
    }
  }
`;

export const GET_ALL_SOCIAL_CIRCUMSTANCES = gql`
  query getAllSocialCircumstanceFilters(
    $patientId: ID
    $clinicalAssessmentId: ID
    $page: PaginationInput
  ) {
    getAllSocialCircumstanceFilters(
      patientId: $patientId
      clinicalAssessmentId: $clinicalAssessmentId
      page: $page
    ) {
      id
      race
      educationLevel
      economicCondition
      housing
      numberInHousehold
      maritalStatus
      livesWith
      numberOfChildren
      occupation
      occupationalHealthHazards
      recordedBy {
        title
        firstName
        lastName
      }
      updatedAt
    }
  }
`;

export const CREATE_SOCIAL_CIRCUMSTANCES = gql`
  mutation createSocialCircumstance(
    $appointmentId: ID!
    $clinicalAssessmentId: ID
    $patientId: ID!
    $content: SocialCircumstanceInput
  ) {
    createSocialCircumstance(
      appointmentId: $appointmentId
      clinicalAssessmentId: $clinicalAssessmentId
      patientId: $patientId
      content: $content
    ) {
      id
    }
  }
`;

export const UPDATE_SOCIAL_CIRCUMSTANCES = gql`
  mutation updateSocialCircumstance(
    $socialCircumstanceId: ID!
    $content: SocialCircumstanceInput
  ) {
    updateSocialCircumstance(
      socialCircumstanceId: $socialCircumstanceId
      content: $content
    ) {
      id
    }
  }
`;

export const DELETE_SOCIAL_CIRCUMSTANCES = gql`
  mutation deleteSocialCircumstance($socialCircumstanceId: ID!) {
    deleteSocialCircumstance(socialCircumstanceId: $socialCircumstanceId) {
      message
    }
  }
`;

export const TRANSLATE_TEXT = gql`mutation translateMessages($content: [TranslateMessageInput!]!, $targetLanguageCode: String!) {
      translateMessages(content: $content, targetLanguageCode: $targetLanguageCode) {
        message
        timestamp
      }
}`

export const GET_APPOINTMENT_STATS = gql`
  query getAppointmentStaticsAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
    $timeOffset: Int
  ) {
    getAppointmentStaticsAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      timeOffset: $timeOffset
    ) {
      xAxis
      clinicalCount
      virtualCount
    }
  }
`;

export const GET_DAILY_VISIT_INSIGHTS = gql`
  query getDailyVisitInsightAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
    $timeOffset: Int
  ) {
    getDailyVisitInsightAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      timeOffset: $timeOffset
    ) {
      xAxis
      newPatient
      recurrentPatient
    }
  }
`;

export const GET_IN_OUT_PATIENT_STATS = gql`
  query getInOutPatientAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
    $timeOffset: Int
  ) {
    getInOutPatientAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      timeOffset: $timeOffset
    ) {
      xAxis
      inPatient
      outPatient
    }
  }
`;

export const GET_PATIENT_WAITING_TIME_STATS = gql`
  query getPatientWatingTimeAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getPatientWatingTimeAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      department
      avgTime
    }
  }
`;

export const GET_GENDER_DIAGNOSIS_STATS = gql`
  query getGenderAudienceAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getGenderAudienceAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      xAxis
      maleCount
      femaleCount
      otherCount
    }
  }
`;

export const GET_GENDER_BASED_PATIENT_STATS = gql`
  query getGenderBasedPatient(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
    $day: Day
  ) {
    getGenderBasedPatient(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      day: $day
    ) {
      totalMale
      totalFemale
      totalOther
    }
  }
`;

export const GET_PATIENT_REFERRAL_STATS = gql`
  query getPatientReferralAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getPatientReferralAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      speciality
      count
    }
  }
`;

export const GET_PRESCRIBED_MEDICINE_STATS = gql`
  query getPrescribedMedicineAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getPrescribedMedicineAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      name
      percentage
      count
    }
  }
`;

export const GET_TOTAL_PATIENT_STATS = gql`
  query getTotalPatientAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getTotalPatientAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      totalPatients
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_NO_SHOWS_STATS = gql`
  query getNoShowsAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getNoShowsAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      totalNoShows
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_REVENUE_STATS = gql`
  query getRevenueAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getRevenueAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      currencyCode
      totalRevenue
      currentWeek
      lastWeek
      change
      pendingAmount
      partialAmount
      receivedAmount
    }
  }
`;

export const GET_OUTSTANDING_BILL_STATS = gql`
  query getOutstandingBillsAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getOutstandingBillsAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      totalOutstandingBills
      currentWeek
      lastWeek
      change
      currencyCode
    }
  }
`;

export const GET_NEW_PATIENTS = gql`
  query getNewPatients(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getNewPatients(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      id
      patientId
      patient {
        firstName
        middleName
        lastName
        profileImage
      }
      appointmentOtherInfo {
        appointmentId
      }
    }
  }
`;

export const GET_PATIENT_AGE_DISTRIBUTION = gql`
  query getPatientAgeDistribution(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $clinicId: ID!
  ) {
    getPatientAgeDistribution(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      ageRange
      totalMale
      totalFemale
    }
  }
`;

export const GET_CONFIDENCE_IN_TREATMENT = gql`
  query getConfidenceInTreatment(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getConfidenceInTreatment(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      Excellent
      Good
      Average
      Poor
    }
  }
`;

export const GET_FEEDBACK_PERCENTAGE = gql`
  query getFeedbackPercentage(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getFeedbackPercentage(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      Excellent
      Neutral
      Poor
    }
  }
`;

export const GET_DEMOGRAPHIC = gql`
  query getDemographicAudienceData(
    $clinicId: ID!
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID]
    $day: Day
    $country: String
    $city: String
    $state: String
  ) {
    getDemographicAudienceData(
      clinicId: $clinicId
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      day: $day
      country: $country
      city: $city
      state: $state
    ) {
      virtualVisits
      clinicVisits
      countryName
      demographicsStats {
        diagnoses
        locality
        value
      }
    }
  }
`;

export const GET_REMOTE_REVENUE_STATS = gql`
  query getRemoteRevenueAnalytics(
    $clinicId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    getRemoteRevenueAnalytics(
      clinicId: $clinicId
      startDate: $startDate
      endDate: $endDate
    ) {
      currencyCode
      totalRevenue
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_REMOTE_TOTAL_PATIENT_STATS = gql`
  query getRemoteTotalPatientAnalytics(
    $clinicId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    getRemoteTotalPatientAnalytics(
      clinicId: $clinicId
      startDate: $startDate
      endDate: $endDate
    ) {
      totalPatients
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_REMOTE_ACTIVE_PATIENT_STATS = gql`
  query getRemoteActivePatientAnalytics(
    $clinicId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    getRemoteActivePatientAnalytics(
      clinicId: $clinicId
      startDate: $startDate
      endDate: $endDate
    ) {
      activePatients
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_PROGRAM_COMPLETION_STATS = gql`
  query getProgramCompletion(
    $clinicId: ID!
    $startDate: Date!
    $endDate: Date!
  ) {
    getProgramCompletion(
      clinicId: $clinicId
      startDate: $startDate
      endDate: $endDate
    ) {
      totalProgramComplete
      currentWeek
      lastWeek
      change
    }
  }
`;

export const GET_MEDICAL_COMPLIANCE_STATS = gql`
  query getMedicationCompliance(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
    $patientId: ID
    $medicineId: ID
  ) {
    getMedicationCompliance(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      patientId: $patientId
      medicineId: $medicineId
    ) {
      lastWeek
      data {
        day
        taken
        notTaken
        unmarked
      }
    }
  }
`;

export const GET_VITAL_RECORDING_STATS = gql`
  query getVitalRecordingFrequency(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
    $timeOffset: Int
  ) {
    getVitalRecordingFrequency(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      timeOffset: $timeOffset
    ) {
      xAxis
      frequencyCount
    }
  }
`;

export const GET_AUDIENCE_BY_GENDER = gql`
  query getRemoteGenderBasedPatient(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
  ) {
    getRemoteGenderBasedPatient(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
    ) {
      totalMale
      totalFemale
      totalOther
    }
  }
`;

export const GET_ALL_MEDICINE_BY_DOCTOR = gql`
  query getAllMedicinesByDoctors($doctorIds: [ID!], $clinicId: ID, $page:PaginationInput) {
    getAllMedicinesByDoctors(
      doctorIds: $doctorIds
      clinicId: $clinicId
      page: $page
    ) {
      prescriptionId
      genericName
      id
    }
  }
`;

export const GET_VITAL_METRIC_CHART_STATS = gql`
  query getVitalsAnalytics(
    $startDate: Date!
    $endDate: Date!
    $doctorIds: [ID!]
    $clinicId: ID!
    $timeOffset: Int
  ) {
    getVitalsAnalytics(
      startDate: $startDate
      endDate: $endDate
      doctorIds: $doctorIds
      clinicId: $clinicId
      timeOffset: $timeOffset
    ) {
      xAxis
      vitals {
        bloodPressure
        pulse
        bloodSugar
        temperature
        bloodOxygen
        respiratoryRate
      }
    }
  }
`;
