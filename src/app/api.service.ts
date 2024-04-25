import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { map } from "rxjs/operators";
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import { UtilityService } from './_services';
// import formdata from 'form-data';
import { environment } from 'src/environments/environment';
import { getMultimediaURL } from 'src/app/graphql.module';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Doctor Profile api
  accesstoken: any = '';

  public httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
  devUrl: string;




  constructor(private httpClient: HttpClient, http: HttpClient, private utilityService: UtilityService) {
    //this.devUrl = 'https://artelir.com:3018';

    this.devUrl = environment.api_url;
    // this.user = this.utilityService.getCurrentUser();

    // if (localStorage.getItem('currentUser') != null) {
    //   this.user = JSON.parse(localStorage.getItem('currentUser'));
    // }

    // // console.log("checkuser",this.user.access_token)
    // if (this.user == undefined) {
    //   this.accesstoken = '';
    //   // this.httpOptions = { headers: new HttpHeaders({ 'access_token': 'accessToken-1qq99l6jkcynurttb58b791d76bc82697b65ae14a4efbcf0' , 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
    //   this.httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };

    // } else {
    //   this.accesstoken = this.user.access_token;
    //   this.httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
    //   // this.httpOptions = { headers: new HttpHeaders({ 'access_token': 'accessToken-1qq99l6jkcynurttb58b791d76bc82697b65ae14a4efbcf0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };

    // }


  }




  public user: any = []; ks
  public setUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user == undefined) {
      this.accesstoken = '';
      this.httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
      // this.httpOptions = { headers: new HttpHeaders({ 'access_token': 'accessToken-1qq99l6jkcynurttb58b791d76bc82697b65ae14a4efbcf0' , 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };

    } else {
      this.accesstoken = this.user.access_token;
      this.httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
      // this.httpOptions = { headers: new HttpHeaders({ 'access_token': 'accessToken-1qq99l6jkcynurttb58b791d76bc82697b65ae14a4efbcf0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };

    }
  }

  // // get title 
  // public getTitle() {

  //   let user_type = '{user_type}';
  //   return this.httpClient.get(this.devUrl + `common/getTitle/2`).map((res: HttpResponse<JSON>) => res);
  // }


  // // coutry state city API's here
  // public countryApi() {
  //   return this.httpClient.get(this.devUrl + `user/get_country`);
  // }

  // public getState(countryiduser: any) {
  //   let params = new HttpParams();
  //   params = params.append('country_id', countryiduser);
  //   return this.httpClient.post(this.devUrl + `user/get_state`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getCity(countryiduser: any, userstate: any) {
  //   let params = new HttpParams();
  //   params = params.append('country_id', countryiduser);
  //   params = params.append('state_id', userstate);
  //   return this.httpClient.post(this.devUrl + `user/get_city`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // // doctor registration POST api
  // public PostDrReg(title: any, firstName: any, lastName: any, email: any, countrycode: any, mobile: any, dob: any, password: any): Observable<any> {
  //   let user = "2";
  //   let divice = "3";
  //   let token = "2";
  //   let ltiud = "";
  //   let longtud = "";
  //   let date = dob;
  //   // let dobjson = date.year + '-0' + date.month + '-' + date.day;

  //   let dobjson = date.split("-");
  //   let year = dobjson[0];
  //   let params = {
  //     'title': title,
  //     'first_name': firstName,
  //     'last_name': lastName,
  //     'email_id': email,
  //     'country_code': countrycode,
  //     'mobile_number': mobile,
  //     'date_of_birth': dob,
  //     'dob_yy': year,
  //     'password': password,
  //     'user_type': user,
  //     'device_type': divice,
  //     'device_token': token,
  //     'latitude': ltiud,
  //     'longitude': longtud
  //   }
  //   return this.httpClient.post(this.devUrl + "common/auth/registration", params, this.httpOptions).map((res: HttpResponse<JSON>) => res).pipe(catchError(this.handleError));
  //   // return this.httpClient.post(this.devUrl + "patient/registration_web", params, this.httpOptions).map((res: HttpResponse<JSON>) => res).pipe(catchError(this.handleError));
  // }
  // public sentOPTRequest(otp_type: string, mobile_number: any, country_code: string, email: any): Observable<any> {

  //   let params = {
  //     "otp_type": otp_type,
  //     "user_type": this.user.user_type,
  //     "mobile_number": mobile_number,
  //     "country_code": country_code,
  //     "email_id": email
  //   }
  //   return this.httpClient.post(this.devUrl + `common/auth/sendOtp`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public PostOTP(otp: any): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('verification_code', otp);
  //   return this.httpClient.post(this.devUrl + `common/auth/signupOtpVerify`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);

  //   //return this.httpClient.post(this.devUrl + `patient/signup_otp_verify`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public emailOTP(firstName: any, email: any): Observable<any> {
  //   let user = "2";
  //   let divice = "3";
  //   let token = "2";
  //   let ltiud = "";
  //   let longtud = "";
  //   let params = new HttpParams();
  //   params = params.append('first_name', firstName);
  //   params = params.append('email_id', email);
  //   params = params.append('user_type', user);
  //   params = params.append('device_type', divice);
  //   params = params.append('device_token', token);
  //   params = params.append('latitude', ltiud);
  //   params = params.append('longitude', longtud);


  //   return this.httpClient.post(this.devUrl + `common/send_otp`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public resendOTP(firstName: any, countrycode: any, mobile: any): Observable<any> {
  //   let user = "2";
  //   let divice = "3";
  //   let token = "2";
  //   let ltiud = "";
  //   let longtud = "";
  //   console.log(countrycode);
  //   let params = {
  //     'first_name': firstName,
  //     'country_code': countrycode,
  //     'mobile_number': mobile,
  //     'user_type': user,
  //     'device_type': divice,
  //     'device_token': token,
  //     'otp_type': 'mobile',
  //     'latitude': ltiud,
  //     'longitude': longtud
  //   }
  //   return this.httpClient.post(this.devUrl + `common/send_otp`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public changeNumber(params) {
  //   return this.httpClient.put(this.devUrl + `patient/change_number`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public changeEmail(params) {
  //   return this.httpClient.post(this.devUrl + `common/change_email_number`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // //End here

  // // profile  header api
  // public SaveProfileImageDetails(logo) {


  //   const params = {
  //     user_type: this.user.user_type,
  //     user_id: this.user.user_id,
  //     profile_photo: logo
  //   };
  //   return this.httpClient.post(this.devUrl + `doctor/professional_images`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getDoctorProfile() {

  //   // let params = new HttpParams();
  //   // params = params.append('user_id', this.user.user_id);
  //   // params = params = params.append('method', 'get_image_data');
  //   return this.httpClient.get(this.devUrl + `common/userDetails/getUserData`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + `doctor/professional_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getClinicDetailsList(): Observable<any> {
  //   // let params = new HttpParams();
  //   // params = params.append('user_id', this.user.user_id);
  //   return this.httpClient.get(this.devUrl + `doctor/clinic/getClinicDetails`).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + `doctor/get_clinic_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getTreatmnentListByName(specialityId) {
  //   let params = new HttpParams();
  //   params = params.append('specialityId', specialityId);
  //   // params = params.append('speciality_name', name);
  //   // params = params.append('searchTxt', "");
  //   // params = params.append('searchType', "TREATMENT");
  //   // return this.httpClient.post(this.devUrl + `common/getsuggestion_treatment`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   return this.httpClient.get(this.devUrl + `common/getTreatmentList`, { params: params }).map((res: HttpResponse<JSON>) => res);
  // }

  // // Home Screen APi

  // // public getSpecilityHome() {
  // //   return this.httpClient.get(this.devUrl + `doctor/clinic/specialityList`,this.httpOptions);
  // //  // return this.httpClient.get(this.devUrl + `specilityData/getSpecilityList`);

  // // }

  // // End here



  // // public getClinicSpeciality(): Observable<any> {
  // //   let params = new HttpParams();

  // //   params = params.append('searchTxt', "");
  // //   params = params.append('searchType', "SPECIALITY");

  // //   return this.httpClient.post(this.devUrl + `common/get_sugestion_speciality`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // // }

  // public getDoctorEduDetails() {
  //   return this.httpClient.get(this.devUrl + `doctor/profile/educationalDetails/getEducationData`, this.httpOptions);
  //   // return this.httpClient.get(this.devUrl + `patient/get_educationQualification_details`, this.httpOptions);

  // }
  // public postDoctorEducation(formData): Observable<any> {
  //   let params = {
  //     school: formData.adduserschool,
  //     // user_type: this.user.user_type,
  //     // user_id: this.user.user_id,
  //     degree: formData.adduserdegree,
  //     college_university: formData.addusercollege,
  //     grade: formData.addusergrade,
  //     description: formData.adduserdescrip,
  //     year: formData.addselectyear + '-' + formData.addendtyear,
  //     // method: formData.method,
  //     certificate_file: formData.certificate_file,
  //     education_id: formData.education_id
  //   }
  //   if (formData.education_id !== '' && formData.education_id !== null) {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/educationalDetails/updateEducationData`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   } else {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/educationalDetails/insertEducationData`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   }

  //   // return this.httpClient.post(this.devUrl + `doctor/educational_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getEditDetailsEducation(education_id: any) {
  //   return this.httpClient.get(this.devUrl + `doctor/profile/educationalDetails/getEducationData/` + education_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public deleteEducation(education_id: any) {
  //   //  let params = new HttpParams();
  //   //  params = params.append('education_id', education_id);
  //   this.httpOptions['body'] = {
  //     education_id: education_id,
  //   }
  //   return this.httpClient.delete(this.devUrl + `doctor/profile/educationalDetails/deleteEducationData`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + `doctor/educational_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getDoctorRegistrationDetails() {
  //   return this.httpClient.get(this.devUrl + `doctor/profile/registrationDetails/getRegistrationData`, this.httpOptions);

  //   // return this.httpClient.get(this.devUrl + `patient/get_registration_details`, this.httpOptions);
  // }

  // public postDoctorRegistration(formData): Observable<any> {
  //   let params = {
  //     registration_no: formData.regisnumber,
  //     // user_type: this.user.user_type,
  //     // user_id: this.user.user_id,
  //     country: formData.countryiduser,
  //     registration_year: formData.regisyear,
  //     state: formData.userstate,
  //     expiry_certificate_date: formData.certiexpyear,
  //     city: formData.usercity,
  //     registration_council: formData.regiscouncilnumber,
  //     // method: formData.method,
  //     registration_id: formData.registration_id,
  //     certificate_file: formData.certificate_file
  //   }
  //   if (formData.registration_id != '' && formData.registration_id != null) {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/registrationDetails/updateRegistrationData`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   } else {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/registrationDetails/insertRegistrationData`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   }
  //   // return this.httpClient.post(this.devUrl + `doctor/doctor_registration`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getEditDetailsReg(reg_id: any) {
  //   // return this.httpClient.post(this.devUrl + `patient/get_registration_details_post`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   return this.httpClient.get(this.devUrl + `doctor/profile/registrationDetails/getRegistrationData/` + reg_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public deleteRegistrationDetails(registration_id: any) {
  //   this.httpOptions['body'] = {
  //     registration_id: registration_id,
  //   }
  //   return this.httpClient.delete(this.devUrl + `doctor/profile/registrationDetails/deleteRegistrationData`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + `doctor/registration_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // // public validateWorkingHours(params): Observable<any> {
  // //   // params.user_id = this.user.user_id;
  // //   console.log('in service validateWorkingHours', params);
  // //   return this.httpClient.post(this.devUrl + 'doctor/clinic/validateWorkingHours', params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // // }
  // public postAddClinicBasic(params): Observable<any> {
  //   // params.user_id = this.user.user_id;
  //   console.log('in service add clinic object', params);
  //   return this.httpClient.post(this.devUrl + 'doctor/clinic/addClinic', params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + 'doctor/add_new_clinic', params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public postEditClinicBasic(params): Observable<any> {
  //   // params.user_id = this.user.user_id;
  //   return this.httpClient.put(this.devUrl + `doctor/clinic/editClinic/` + params.clinic_id, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);

  //   console.log(params);
  // }

  // // public postSaveSlot(params): Observable<any> {
  // //   return this.httpClient.post(this.devUrl + `appointment/edit_calender_timeslots`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // // }

  // public GetClinicById(param): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/clinic/clinicDetails/` + param, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.post(this.devUrl + `doctor/getclinicdetails`, param, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public deleteClinic(clinic_id: any): Observable<any> {
  //   return this.httpClient.delete(this.devUrl + `doctor/clinic/deleteClinic/` + clinic_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   // return this.httpClient.delete(this.devUrl + `doctor/delete_clinic`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public getPaymentHistory(clinic_id: any) {
  //   return this.httpClient.get(this.devUrl + `doctor/wallet/getPaymentHistory/` + clinic_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public getInsurancesList(clinic_id: any) {
  //   return this.httpClient.get(this.devUrl + `doctor/wallet/getInsurance/` + clinic_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public postInsurancesList(formValue) {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/setupInsurance`, formValue).map((res: HttpResponse<JSON>) => res);
  // }


  // public DoctorprofUpdate(
  //   usertitle: any,
  //   userfirstName: any,
  //   userlastName: any,
  //   usergender: any,
  //   useremail: any,
  //   userdob: any,
  //   userccode: any,
  //   usermobile: any,
  //   userspecialty: any,
  //   customelang: any,
  //   usercliniclist: any,
  //   userwebsite: any,
  //   aboutme: any,
  //   IdProofImageArray,
  //   document_type,
  //   digital_signature): Observable<any> {
  //   console.log(' in service digital_signature', digital_signature);

  //   let params = {
  //     title: usertitle,
  //     user_type: this.user.user_type,
  //     user_id: this.user.user_id,
  //     first_name: userfirstName,
  //     last_name: userlastName,
  //     gender: usergender,
  //     email_id: useremail,
  //     date_of_birth: userdob,
  //     country_code: userccode,
  //     mobile_number: usermobile,
  //     speciality: userspecialty,
  //     select_language: customelang,
  //     practicing_in: usercliniclist,
  //     website: userwebsite,
  //     about_me: aboutme,
  //     // reg_year: "2020",
  //     method: 'update_data',
  //     id_proof: IdProofImageArray,
  //     document_type: document_type,
  //     digital_signature: digital_signature
  //   }
  //   return this.httpClient.post(this.devUrl + `common/userDetails/insertUserData`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   //return this.httpClient.post(this.devUrl + `doctor/professional_details`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public getCurrencyType() {
  //   return this.httpClient.get(this.devUrl + `doctor/wallet/getCurrencyType`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getSetupFeesDetails(clinic_id) {
  //   return this.httpClient.get(this.devUrl + `doctor/wallet/web/getFee/` + clinic_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public PostSetupFeesDetails(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/webaddFee`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public PostSetupBankDetails(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/web/setupBankDetails`, formData).map((res: HttpResponse<JSON>) => res);
  // }




  // // subscribe email -
  // public emailSubscribeService(email: any) {
  //   let params = new HttpParams();
  //   params = params.append('email', email);
  //   return this.httpClient.post(this.devUrl + `patient/insert_subscription`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // //End here

  // public getSpeciality(): Observable<any> {
  //   // let params = new HttpParams();
  //   // params = params.append('searchTxt', "");
  //   // params = params.append('searchType', "SPECIALITY");
  //   // return this.httpClient.post(this.devUrl + `common/get_sugestion_speciality`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   return this.httpClient.get(this.devUrl + `common/getSpecialityList`).map((res: HttpResponse<JSON>) => res);
  // }

  // public launguageApi() {
  //   let params = new HttpParams();
  //   return this.httpClient.post(this.devUrl + `common/get_suggestion?searchTxt=&searchType=LANGUAGE`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public facilitiesApi() {
  //   let params = new HttpParams();
  //   return this.httpClient.post(this.devUrl + `common/get_suggestion?searchTxt=&searchType=FACILITIES`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // public DrregAbout(about_me: any): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('about_me', about_me);

  //   return this.httpClient.post(this.devUrl + `patient/adduser_profile`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }


  // public getNews(block_type: any) {
  //   let params = new HttpParams();
  //   params = params.append('block_type', block_type);
  //   return this.httpClient.post(this.devUrl + `website/getComments`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }


  // public livecorona() {
  //   return this.httpClient.get(`https://coronavirus-19-api.herokuapp.com/all`);
  // }


  // public livecoronadata() {
  //   return this.httpClient.get(`https://coronavirus-19-api.herokuapp.com/countries`);
  // }


  // public PostNews(name: any, email: any, comment: any, block_type: any): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('name', name);
  //   params = params.append('email', email);
  //   params = params.append('comment', comment);
  //   params = params.append('block_type', block_type);

  //   return this.httpClient.post(this.devUrl + `website/postComments`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }




  // // contact US API

  // public ContactUs(email: any, name: any, number: any, subject: any, message: any,) {
  //   let params = new HttpParams();
  //   params = params.append('email_id', email);
  //   params = params.append('mobile_number', number);
  //   params = params.append('subject', subject);
  //   params = params.append('name', name);
  //   params = params.append('message', message);
  //   return this.httpClient.post(this.devUrl + `common/contact_us_web`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }

  // // End here



  // getsuspectedCase() {
  //   return this.httpClient.get("https://apigw.nubentos.com:443/t/nubentos.com/ncovapi/1.0.0/cases/suspected", {
  //     headers: new HttpHeaders().set(
  //       "Authorization",
  //       "Bearer 8bbc49b2-2f84-34dc-b201-cc673dd26f3a"
  //     )
  //   });
  // }

  // handleError(err) {
  //   if (err instanceof HttpErrorResponse) {
  //     //Serverside error
  //   } else {
  //     // this is client side error
  //   }
  //   return throwError(err);
  // }
  // public favouriteArticleLikeDislike(article_id: string, is_like: boolean) {
  //   // this.httpOptions['body'] = {
  //   //   registration_id: is_like,
  //   // }
  //   return this.httpClient.get(this.devUrl + `individual/healthEducation/favouriteArticle/` + article_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // // my calender 
  // public getTimeSlots(appointment_type: Number, slot_day: string, clinic_id: string, selected_date: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/calendar/getTimeSlots/` + appointment_type + `/` + slot_day + `/` + clinic_id + `/` + selected_date).map((res: HttpResponse<JSON>) => res);
  // }

  // public getDoctorStatus(status_type: any) {
  //   let params = new HttpParams();
  //   params = params.append('status', status_type);
  //   return this.httpClient.get(this.devUrl + `doctor/appointment/setOnlineStatus?` + params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public getCancelAppointmentsResons() {
  //   return this.httpClient.get(this.devUrl + `common/getCancelAppointmentReasons`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getAppointmentsList(appointment_type, slot_date = null) {
  //   let params = new HttpParams();
  //   params = params.append('appointment_period_id', appointment_type);
  //   if (slot_date !== null)
  //     params = params.append('slot_date', slot_date);
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/getAppointments`, params, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public postApproverAppointment(formValue) {
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/approveAppointment`, formValue).map((res: HttpResponse<JSON>) => res);
  // }
  // public postCancelAppointment(formValue) {
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/cancelAppointment`, formValue).map((res: HttpResponse<JSON>) => res);
  // }
  // public PostRescheduleAppointment(formValue) {
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/rescheduleAppointment`, formValue).map((res: HttpResponse<JSON>) => res);
  // }
  // public accessHeathRecord(patient_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/medicalTransactionGenerate/` + patient_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public verifyHealthOtp(formValue) {
  //   return this.httpClient.post(this.devUrl + `doctor/ehr/verifyMedicalRecord`, formValue).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPataientInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/user/` + med_id + '/' + doc_id + '/' + pat_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public getMedicalInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/medical/` + med_id + '/' + doc_id + '/' + pat_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public getRxInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/rx_details/` + med_id + '/' + doc_id + '/' + pat_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public getConsertFormInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/consent_form/` + med_id + '/' + doc_id + '/' + pat_id, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public getHomeEnvironmentInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/homeEnvironment/` + med_id + '/' + doc_id + '/' + pat_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public getFamilyHistoryInfo(med_id: string, doc_id: string, pat_id: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/ehr/getMedicalRecordsDetails/familyHistory/` + med_id + '/' + doc_id + '/' + pat_id).map((res: HttpResponse<JSON>) => res);
  // }

  // public getErxGenericBrandList(type: string) {
  //   return this.httpClient.get(this.devUrl + `doctor/eRx/genericBrandList/` + type).map((res: HttpResponse<JSON>) => res);
  // }
  // public getCountries(): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `common/getCountry`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getCountryState(id): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `common/getState/${id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getStateCity(id): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `common/getCity/${id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getFacility(): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `common/getSuggestion/Facilities`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getClinicDeails(id): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/clinic/clinicDetails/${id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getDrTimeSlots(data): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `individual/appointment/getDoctorSlots`, data).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPatientVitals(patient_id): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/appointmentInfo/patientVitals/${patient_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPatienVitalIndividually(obj): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `individual/vital/analytics/${obj.vital_sign}/${obj.filter}/${obj.date}?fetch_graph_ranges_only=${obj.fetch_graph_ranges_only}&mealtime=${obj.mealtime}&patient_id=${obj.patient_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // ///doctor/vital/additionalData/{vital_sign}?tags={true, false}&favorite_unit={true, false}&min_max_range={true, false}
  // public addPatienVitalAdditionalData(obj): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/vital/additionalData/${obj.vital_sign}?tags=true&favorite_unit=${obj.favorite_unit}&min_max_range=true`).pipe(map((res: HttpResponse<JSON>) => res));
  // }
  // public addPatienVital(obj): Observable<any> {
  //   return this.httpClient.put(this.devUrl + `doctor/vital/${obj.endpoint}`, obj).map((res: HttpResponse<JSON>) => res);
  // }
  // public editPatienVital(obj): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/vital/${obj.endpoint}/${obj.vital_id}`, obj).map((res: HttpResponse<JSON>) => res);
  // }
  // public docProfileUpdate(obj): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `common/userDetails/insertUserData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public getIdProofList(): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/profile/getIdProofList`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public updateProfileData(obj): Observable<any> {
  //   return this.httpClient.put(this.devUrl + `doctor/profile/professionalDetails/updateProfileData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public addUpdateDoctorEducation(obj): Observable<any> {
  //   if (obj.education_id !== '' && obj.education_id !== null) {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/educationalDetails/updateEducationData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   } else {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/educationalDetails/insertEducationData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   }
  // }
  // public addUpdateDoctorRegistration(obj): Observable<any> {
  //   if (obj.registration_id != '' && obj.registration_id != null) {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/registrationDetails/updateRegistrationData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   } else {
  //     return this.httpClient.post(this.devUrl + `doctor/profile/registrationDetails/insertRegistrationData`, obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  //   }
  // }
  // public walletAddFee(obj): Observable<any> {
  //   return this.httpClient.post(this.devUrl + 'doctor/wallet/addFee', obj, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  // }
  // public postSetupBankDetails(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/web/setupBankDetails`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public checkIBAN(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/validateIBAN`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getBankDetails(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/getBankDetails`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getInsuranceList(): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `common/getInsuranceList`).map((res: HttpResponse<JSON>) => res);
  // }
  // public saveInsurance(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/saveInsurance`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public setupInsurance(formData): Observable<any> {
  //   return this.httpClient.post(this.devUrl + `doctor/wallet/setupInsurance`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getDoctorInsuranceList(clinic_id): Observable<any> {
  //   return this.httpClient.get(this.devUrl + `doctor/wallet/getInsurance/${clinic_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getDosageeList() {
  //   return this.httpClient.get(this.devUrl + `doctor/eRx/getDosageList`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getUnitList() {
  //   return this.httpClient.get(this.devUrl + `doctor/eRx/getUnitList`).map((res: HttpResponse<JSON>) => res);
  // }
  // public addRxPrescription(formData) {
  //   return this.httpClient.post(this.devUrl + `doctor/eRx/addRxPrescription`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getRxPreview(appointment_id) {
  //   return this.httpClient.get(this.devUrl + `doctor/eRx/getRxPreview/` + appointment_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteRxPreview(rx_prescription_id) {
  //   return this.httpClient.delete(this.devUrl + `doctor/eRx/deletePrescription/` + rx_prescription_id).map((res: HttpResponse<JSON>) => res);
  // }
  // public editRxPreview(formData) {
  //   return this.httpClient.put(this.devUrl + `doctor/eRx/editRxPrescription`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public addHolidays(formData) {
  //   return this.httpClient.post(this.devUrl + `doctor/calendar/addHolidays`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getHolidays(clinic_id) {
  //   return this.httpClient.get(this.devUrl + `doctor/calendar/getHolidays/${clinic_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  public createSlots(formData) {
    return this.httpClient.post(this.devUrl + `doctor/calendar/createSlots`, formData).pipe(map((res: HttpResponse<JSON>) => res));
  }
  // public getEncounterMeta() {
  //   return this.httpClient.get(this.devUrl + `doctor/encounter/meta`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getEncounters(patient_id) {
  //   return this.httpClient.get(this.devUrl + `doctor/encounters/${patient_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getDoctorList(queryParam) {
  //   return this.httpClient.get(this.devUrl + `common/doctorNameList?name=${queryParam}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getDoctorClinicList(doctor_id) {
  //   return this.httpClient.get(this.devUrl + `individual/myHealth/clinicList/${doctor_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public createEncounter(formData) {
  //   return this.httpClient.post(this.devUrl + `doctor/encounter`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getICD10Code(search_text, favorite = false, most_used = false) {
  //   return this.httpClient.get(this.devUrl + `common/icd10Codes?search_text=${search_text}&favorite=${favorite}&most_used=${most_used}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getEncounterConditionMeta() {
  //   return this.httpClient.get(this.devUrl + `doctor/encounter/condition/meta`).map((res: HttpResponse<JSON>) => res);
  // }
  // public addFavICDCode(formData) {
  //   return this.httpClient.post(this.devUrl + `common/icd10Codes/favorite`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteFavICDCode(icd_code_id) {
  //   return this.httpClient.delete(this.devUrl + `/common/icd10Codes/favorite/${icd_code_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getAdmittingConditionMeta() {
  //   return this.httpClient.get(this.devUrl + `doctor/encounter/condition/meta`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getQuesionListPatient() {
  //   return this.httpClient.get(this.devUrl + `common/tutorials/patient?answers=true`).map((res: HttpResponse<JSON>) => res);
  //   //  return this.httpClient.post(this.apiBaseURL+`helthcare/get_article_admin`, params).map((res: HttpResponse<JSON>) => res);
  // }
  // public getQuesionListDoctor() {
  //   return this.httpClient.get(this.devUrl + `common/tutorials/doctor?answers=true`).map((res: HttpResponse<JSON>) => res);
  //   //  return this.httpClient.post(this.apiBaseURL+`helthcare/get_article_admin`, params).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteHoliday(holiday_id) {
  //   return this.httpClient.delete(this.devUrl + `doctor/calendar/deleteHolidays/${holiday_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  public txtTranslate(data) {
    return this.httpClient.get(this.devUrl + `service/translate/${data.lang}/${data.text}`).pipe(map((res: HttpResponse<JSON>) => res));
  }
  // public getConitiveServiceToken() {
  //   return this.httpClient.get(this.devUrl + `service/get-speech-token`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getBodyParts(search_text, favorite = false, most_used = false) {
  //   return this.httpClient.get(this.devUrl + `individual/body-parts-codes?search_text=${search_text}&favorite=${favorite}&most_used=${most_used}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public addFavBodyPart(formData) {
  //   return this.httpClient.post(this.devUrl + `individual/body-parts-codes/favorite`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteFavBodyPart(body_part_code_id) {
  //   return this.httpClient.delete(this.devUrl + `individual/body-parts-codes/favorite/${body_part_code_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public createPresentIllness(formData) {
  //   return this.httpClient.post(this.devUrl + `individual/history-present-illness`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPresentIllness(patient_id) {
  //   return this.httpClient.get(this.devUrl + `individual/history-present-illness/${patient_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public deletePresentIllness(present_illness_id) {
  //   return this.httpClient.delete(this.devUrl + `individual/history-present-illness/${present_illness_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public updatePresentIllness(formData, present_illness_id) {
  //   return this.httpClient.put(this.devUrl + `individual/history-present-illness/${present_illness_id}`, formData).map((res: HttpResponse<JSON>) => res);
  // }

  // public getSymptomCodes(search_text, favorite = false, most_used = false) {
  //   return this.httpClient.get(this.devUrl + `individual/symptom-code?search_text=${search_text}&favorite=${favorite}&most_used=${most_used}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public addFavSymptomCode(formData) {
  //   return this.httpClient.post(this.devUrl + `individual/symptom-code/favorite`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteFavSymptomCode(symptom_id) {
  //   return this.httpClient.delete(this.devUrl + `individual/symptom-code/favorite/${symptom_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public createSymptom(formData) {
  //   return this.httpClient.post(this.devUrl + `individual/symptom`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getSymptom(patient_id) {
  //   return this.httpClient.get(this.devUrl + `individual/symptom/${patient_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public deleteSymptom(symptom_id) {
  //   return this.httpClient.delete(this.devUrl + `individual/symptom/${symptom_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public updateSymptom(formData, symptom_id) {
  //   return this.httpClient.put(this.devUrl + `individual/symptom/${symptom_id}`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // // public getDayView(data) {
  // //   return this.httpClient.post(this.devUrl + `individual/appointment/calendar-view`, data).map((res: HttpResponse<JSON>) => res);
  // // }
  // public getDayView(slot_date, period_id) {
  //   // let params = new HttpParams();
  //   // params = params.append('appointment_period_id', '0');
  //   // if (slot_date !== null)
  //   //   params = params.append('slot_date', slot_date);
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/getAppointments?appointment_period_id=${period_id}&slot_date=${slot_date}`, {}).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPatientViewFile(formData) {
  //   return this.httpClient.post(this.devUrl + `individual/appointment/viewFile`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  // public getConsentForm(patient_id, appointment_id) {
  //   return this.httpClient.get(this.devUrl + `doctor/appointment/getPatientConsentForm/${patient_id}/${appointment_id}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public getPatients() {
  //   return this.httpClient.post(this.devUrl + `doctor/appointment/getAppointments?appointment_period_id=2&slot_date=`, {}).map((res: HttpResponse<JSON>) => res);
  // }
  // public contactHI(formData) {
  //   return this.httpClient.post(this.devUrl + `v2/common/settings/contactHI`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  public addTreatment(formData) {
    return this.httpClient.put(this.devUrl + `common/addTreatment`, formData).pipe(map((res: HttpResponse<JSON>) => res));
  }
  // public getTreatment(specialityId) {
  //   return this.httpClient.get(this.devUrl + `common/getTreatmentList?specialityId=${specialityId}`).map((res: HttpResponse<JSON>) => res);
  // }
  // public validateWorkingHours(formData) {
  //   return this.httpClient.post(this.devUrl + `doctor/clinic/validateWorkingHours`, formData).map((res: HttpResponse<JSON>) => res);
  // }
  public imgUpload(image, type) {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    }
    const formData = new FormData();
    if (type === 'single') {
      formData.append('document', image);
    } else {
      image.map((img, index) => {
        formData.append(`document_${index + 1}`, img);
      });
    }
    return this.httpClient.post(`${getMultimediaURL()}upload/document`, formData).pipe(map((res: HttpResponse<JSON>) => res));
  }

  public uploadDocument(file) {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    }
    const formData = new FormData();
    formData.append('document', file);
    return this.httpClient.post(`${getMultimediaURL()}upload/document`, formData).pipe(map((res: HttpResponse<JSON>) => res))
  }

  public sendMessage(formData) {
    return this.httpClient.post(`${environment.CHAT_GPT_API_URL}` + `/doctor-bot`, formData).pipe(map((res: HttpResponse<JSON>) => res))
  }

  public patientInstrucions(formData) {
    return this.httpClient.post(`${environment.CHAT_GPT_API_URL}` + `/patient-instruction`, formData).pipe(map((res: HttpResponse<JSON>) => res))
  }

  public getDrugInteractions(formData) {
    return this.httpClient.post(`${environment.CHAT_GPT_API_URL}` + `/drug-drug-interaction`, formData).pipe(map((res: HttpResponse<JSON>) => res))
  }

  public getAutomatedReportSummary(data) {
    const formData = new FormData();
    data.map((file, index) => {
      formData.append(`${file.name}_${index + 1}`, file);
    });

    return this.httpClient.post(`${environment.CHAT_GPT_API_URL}` + `/report-summary`, formData).pipe(map((res: HttpResponse<JSON>) => res))
  }

  public getDictatePrescription(message) {
    return this.httpClient
      .post(
        `${environment.CHAT_GPT_API_URL}` + `/doctor-bot/dictate-prescription`,
        { message }
      )
      .pipe(map((res: HttpResponse<JSON>) => res))
  }

  public searchMedicine(formData) {
    return this.httpClient
      .post(
        `${environment.CHAT_GPT_API_URL}` + `/doctor-bot/medicine-search`,
        formData
      )
      .pipe(map((res: HttpResponse<JSON>) => res))
  }
}
