import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../_services';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  accesstoken: any = '';
  curentUser: any;
  public user: any = [];
  accesstokenUser: any = '';

  public httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstokenUser, 'alpha': this.accesstoken, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
  apiBaseURL = environment.api_url;
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    this.user = this.utilityService.getCurrentUser();
    if (localStorage.getItem('currentUser') != null) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.accesstokenUser = this.user.access_token;
  }

  public getChartValues(vital_sign: string, filter: string, date: string, unit: string, alpha: string, patient_id: string) {

    console.log('vital_sign', vital_sign);
    console.log('filter', filter);
    console.log('date', date);
    console.log('unit', unit);
    console.log('patient_id', patient_id);
    console.log('this.accesstokenUser', this.accesstokenUser);
    console.log('alpha', alpha);
    this.httpOptions = { headers: new HttpHeaders({ 'access_token': this.accesstokenUser, 'alpha': alpha, 'device_type': '3', 'version': '1.0', 'Access-Control-Expose-Headers': 'Access-Control-*', 'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Accept', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Origin': '*', 'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD' }) };
    // let params = new HttpParams()
    // //   params = params.append('vital_sign', vital_sign);
    // // params = params.append('filter', filter);
    // // params = params.append('date', date);
    // params = params.append('unit', unit);
    // params = params.append('patient_id', patient_id);
    const additnalUrl = vital_sign + '/' + filter + '/' + date + '?';
    console.log('this is api', this.apiBaseURL + `individual/vital/analytics/graph/${additnalUrl}unit=fahrenheit&mealtime=fasting&patient_id=${patient_id}`)
    return this.httpClient.get(this.apiBaseURL + `individual/vital/analytics/graph/${additnalUrl}unit=fahrenheit&mealtime=fasting&patient_id=${patient_id}`, this.httpOptions).map((res: HttpResponse<JSON>) => res);
  }

}
