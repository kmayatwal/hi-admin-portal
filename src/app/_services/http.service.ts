import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, finalize, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import DownloadedFile from '../_models/downloaded-file';
import { ToastrService } from 'ngx-toastr';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { UtilityService } from './utility.service';
// import { saveAs } from 'file-saver';
import { Location } from '@angular/common';
import { WINDOW } from '../_providers/window.provider';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Injectable()
export class HttpService {
  public static DOWNLOAD_PROGRESS_TITLE: string = 'Downloading Contents';
  public static DOWNLOAD_PROGRESS_MESSAGE: string = 'Content download in progress, please wait';
  public static DOWNLOAD_COMPLETED_TITLE: string = 'Downloading Contents';
  public static DOWNLOAD_COMPLETED_MESSAGE: string = 'Completed';
  public static DOWNLOAD_ERROR_TITLE: string = 'Error';
  public static DOWNLOAD_ERROR_MESSAGE: string = 'The content could not be downloaded, please try again';
  public static GENERIC_ERROR_TITLE = 'Error';
  private ngProgressRef: NgProgressRef;

  constructor(@Inject(WINDOW) private window: Window,
    private http: HttpClient,
    private ngProgress: NgProgress,
    private toastr: ToastrService,
    private utilityService: UtilityService,
    private router: Router,
    private loc: Location,
    private spinner: NgxSpinnerService) {
    // console.log(this.loc.path());
    this.ngProgressRef = this.ngProgress.ref();
  }
  getHostname(): string {
    return (this.window.location.hostname.split(".")[0]);
  }

  get(url: string): Observable<any> {

    let httpHeaders = this.getJsonHeaders();
    let basedomaine = this.getHostname();
    //(basedomaine);
    this.spinner.show();
    // console.log(environment.api_url)
    let httpObservable = this.http.get<any>(environment.api_url + url, {
      headers: httpHeaders
    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    });

    return this.handleResponse(httpObservable);

  }

  pageget(url: string): Observable<any> {
    let httpHeaders = this.getJsonHeaders();
    let basedomaine = this.getHostname();
    // console.log(basedomaine);
    let httpObservable = this.http.get<any>(url, {
      headers: httpHeaders
    });

    return this.handleResponse(httpObservable);
  }

  postJson(url: string, body: any): Observable<any> {
    let httpHeaders = this.getJsonHeaders();
    let basedomaine = this.getHostname();
    let httpObservable = this.http.post<any>(
      environment.api_url + url, body, {
      headers: httpHeaders
    }
    );

    return this.handleResponse(httpObservable);
  }

  postForm(url: string, formData: FormData): Observable<any> {
    let httpHeaders = this.getFormHeaders();
    let basedomaine = this.getHostname();
    //console.log(basedomaine);
    let httpObservable = this.http.post<any>(
      environment.api_url + url, formData, {
      headers: httpHeaders
    });

    return this.handleResponse(httpObservable);
  }

  downloadFile(
    url: string,
    body: any,
    progressTitle: string = HttpService.DOWNLOAD_PROGRESS_TITLE,
    progressMessage: string = HttpService.DOWNLOAD_PROGRESS_MESSAGE,
    completedTitle: string = HttpService.DOWNLOAD_COMPLETED_TITLE,
    completedMessage: string = HttpService.DOWNLOAD_COMPLETED_MESSAGE,
    errorTitle: string = HttpService.DOWNLOAD_ERROR_TITLE,
    errorMessage: string = HttpService.DOWNLOAD_ERROR_MESSAGE) {
    const toast = this.toastr.warning(progressMessage, progressTitle, {
      disableTimeOut: true,
      tapToDismiss: false
    });
    this.getFile(url, body)
      .pipe(finalize(() => this.toastr.remove(toast.toastId)))
      .subscribe(
        data => {
          // console.log(data);
          // this.downloadFilebrowser(data);
          this.toastr.success(completedMessage, completedTitle);

          // saveAs(data.blob, data.filename);
        },
        (error) => {
          console.log(error);
          this.toastr.error(errorMessage, errorTitle, {
            closeButton: true,
            disableTimeOut: true
          });
        }
      );
  }
  downloadFilebrowser(data: Response) {
    const blob = new Blob([data.url], { 'type': "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  uploadFile(url: string, formData: FormData) {
    let httpHeaders = this.getFormHeaders();
    let basedomaine = this.getHostname();
    // console.log(basedomaine);
    this.ngProgressRef.start();
    return this.http.post(environment.api_url + url, formData, {
      observe: 'events',
      reportProgress: true,
      headers: httpHeaders
    }).pipe(
      map(data => {
        if (data.type === HttpEventType.UploadProgress) {
          // progress
          this.ngProgressRef.set(data.loaded / data.total);
        } else if (data.type === HttpEventType.Response) {
          // response
          return data.body;
        }
        return null;
      }),
      filter(data => data !== null),
      finalize(() => this.ngProgressRef.complete())
    );
  }

  private getFile(url: string, body: any): Observable<DownloadedFile> {
    let httpHeaders = this.getJsonHeaders();
    let basedomaine = this.getHostname();
    // console.log(basedomaine);
    this.ngProgressRef.start();

    return this.http.post<Blob>(environment.api_url + url, body, {
      headers: httpHeaders,
      responseType: 'blob' as 'json',
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(data => {
        if (data.type === HttpEventType.DownloadProgress) {
          // progress
          this.ngProgressRef.set(data.loaded / data.total);
        } else if (data.type === HttpEventType.Response) {
          // response
          const content = data.headers.get('Content-Disposition');
          if (content.toString().indexOf('=') > 0) {
            let filename = content.split('filename=');
            return {
              blob: data.body,
              content_type: data.headers.get('Content-Type'),
              filename: filename[1]
            };
          }
          else {
            return null;
          }
        }
        return null;
      }),
      filter(data => data !== null),
      finalize(() => this.ngProgressRef.complete())
    );
  }

  //Check Company Url Valid
  checkCompany(url: string): Observable<any> {
    let httpHeaders = this.getJsonHeaders();
    let httpObservable = this.http.get<any>(environment.api_url + url, {
      headers: httpHeaders
    });
    return this.handleResponse(httpObservable);
  }

  private handleResponse(httpObservable: Observable<any>): Observable<any> {
    return httpObservable.pipe(
      map(response => {
        let message = null;
        if (response.message !== null
          && response.message !== undefined) {
          message = response.message;
        }

        return response.response;
        // if (response.status == 'success') {
        //     if(response.data == ''){
        //         return response;
        //     }else{
        //         return response.data;
        //     }
        //     //return response.data;
        // } else if (response.status == 'error') {
        //     this.spinner.hide();
        //     if(response.message == 'Unauthorised')
        //         this.router.navigate(['/Login']);
        //     throw new Error(message);
        // }else if(response.status == 'nocompany'){
        //   window.location.href = 'https://healthcareinterface.com'
        // }else if(response.status == 'upgrade'){
        //   window.location.href = response.data;
        // }else if(response.status == 'warning'){
        //     return response;
        // }
      }),
      catchError((error: any) => {
        let message = null;
        if (error.message !== null
          && error.message !== undefined) {
          message = error.message;
        } else {
          message = error;
        }
        // if (error.status == 403) {
        //   this.toastr.error(error.error.message, HttpService.GENERIC_ERROR_TITLE, {
        //     closeButton: true,
        //     disableTimeOut: false
        //   });

        // }
        return throwError(error);
      })
    );
  }

  getJsonHeaders() {
    let httpHeadersList = this.getDefaultHeadersList();

    Object.assign(httpHeadersList, {
      'Content-Type': 'application/json',
      'X-domain-company': this.getHostname(),
    });
    //  console.log(httpHeadersList);
    return new HttpHeaders(httpHeadersList);
  }

  private getFormHeaders() {
    let httpHeadersList = this.getDefaultHeadersList();
    Object.assign(httpHeadersList, {
      'X-domain-company': this.getHostname(),
    });

    return new HttpHeaders(httpHeadersList);
  }

  private getDefaultHeadersList() {
    let token = this.utilityService.getCurrentUserToken();
    // console.log('getDefaultHeadersList', token);
    let httpHeadersList = {
      'Access-Control-Allow-Origin': '*',
      'User-Timezone': this.utilityService.getCurrentTimezone()
    }

    if (token !== null) {
      Object.assign(httpHeadersList, {
        'Authorization': 'Bearer ' + token
      });
    } else {
      Object.assign(httpHeadersList, {
        'Authorization': 'Basic Ym9va2Vwcl9wcm9qZWN0OjE2MDAyMzExMjcwNzNBQjE4QzA5ODlGNjE3RUVDRDkxMkNENTYyOUU='
      });
    }

    return httpHeadersList;
  }
}
