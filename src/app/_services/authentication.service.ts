import { Injectable } from '@angular/core';
import { Subject, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UtilityService } from '../_services/utility.service';
//import { ApiService } from '../api.service';


@Injectable()
export class AuthenticationService {
    private paneltoggle = new Subject();
    paneltoggle$ = this.paneltoggle.asObservable();

    private toggle = new Subject();
    toggle$ = this.toggle.asObservable();

    constructor(
        private httpService: HttpService,
        private utilityService: UtilityService,

        ) {

         }

    /**  Login  **/
    login(data) {
      return new Promise((resolve, reject)=>{
       // this.httpService.postJson('patient/signin', data).subscribe(res  => {
        this.httpService.postJson('common/auth/signIn', data).subscribe(res  => {
      // console.log('login response',res);
          this.utilityService.setCurrentUser(res['user_data']);
         // console.log(this.utilityService)
          resolve(res['user_data']);
        }, (err)=> {
          reject(err);
        });
      });
    }

    /** Send Forgot Password link to email **/
    resetLink(data) {
      return new Promise((resolve, reject)=>{
        this.httpService.postJson('/forgot/password', data).subscribe(res=>{
          resolve(res);
        }, (err)=> {
          reject(err);
        });
      });
    }

    /** Reset Password **/
    resetPassword(data) {
      return new Promise((resolve, reject)=>{
        this.httpService.postJson('/reset/password', data).subscribe(res=>{
          resolve(res);
        }, (err)=> {
          reject(err);
        });
      });
    }

    getNewUser(data){
      this.httpService.postJson('/get/created/user', data).pipe(map(response => response.json()));
    }

    /**  Creating New Account for User/Accountant **/
    createAccount(data) {
      return new Promise((resolve, reject)=>{
        this.httpService.postJson('/register', data).subscribe(res=>{
          resolve(res);
        }, (err)=> {
          reject(err);
        });
      });
    }
    // login(email: string, user_hash: string) {

    //     return this.httpService.postJson('/login', {
    //         email: email,
    //         password : user_hash
    //     }).pipe(map(data => {
    //         this.utilityService.setCurrentUser(data);

    //         return data;
    //     }));
    // }
    resetpass(email: any) {
      return this.httpService.postJson('/reset', {
          email: email
        }).pipe(map(data => {
          this.toggle.next(false);
          return data;
      }));
    }
    // register(registrationRequest: RegistrationRequest) {
    //   return this.httpService.postJson('/register', registrationRequest).pipe(map(data => {
    //       this.paneltoggle.next(0);
    //       return data;
    //     }),
    //     catchError((err, caught) => {
    //       this.paneltoggle.next(0);
    //       return empty();
    //   }));
    // }

    emailvalidate(key: string) {
      return this.httpService.postJson('/register_email_validate', {key: key});
    }

    /**  Logout **/
    logout() {
      this.utilityService.removeCurrentUser();
      this.utilityService.removeUserPermission();
    }

}
