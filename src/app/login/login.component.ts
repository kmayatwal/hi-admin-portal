import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../_services/utility.service';
import { StateService } from '../stateService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../common.style.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  errorLoginMessage: boolean;

  showPassword: boolean = false;
  rememberMe: boolean = false;
  passwordError: string = '';
  emailError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.getForm();
    // this.authenticationService.logout();
    // console.log(this.route.snapshot.queryParams['returnUrl']);
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/individuals';
    // this.checkRemberMe();
  }

  getForm() {
    this.loginForm = this.formBuilder.group({
      email_id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      device_type: ['3'],
      user_type: ['2'],
    });
  }

  checkEmailStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('email')) {
        return true;
      }
  }

  checkEmailError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.emailError = 'This field is required.';
        return true;
      } else if (formControl.hasError('email')) {
        this.emailError = 'Please enter valid email.';
        return true;
      }
  }

  checkPasswordStyleError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required') || formControl.hasError('minLength')) {
        return true;
      }
  }

  checkPasswordError(formControl) {
    if (formControl.touched)
      if (formControl.hasError('required')) {
        this.passwordError = 'This field is required.';
        return true;
      } else if (formControl.hasError('minLength')) {
        this.passwordError = 'Password must be at least 8 characters long.';
        return true;
      }
  }

  passwordEye() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.loginForm.valid) {
    //   this.submitted = false;
    //   this.spinner.show();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile/dashboard';

    //   const errorLink = onError(({ graphQLErrors, networkError }) => {
    //     console.log('this is graphQLErrors', graphQLErrors);
    //     console.log('this is networkError', networkError);
    //     this.spinner.hide();

    //     if (graphQLErrors) {
    //       // this.setUser();
    //       console.log('this is graphQLErrors', graphQLErrors);
    //       this.toastr.error(graphQLErrors[0].message);
    //       graphQLErrors.map(({ message, locations, path }) =>
    //         console.log(
    //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //         ),
    //       );
    //     }

    //     if (networkError) {
    //       this.toastr.error(networkError.message);
    //       console.log(`[Network error]: ${networkError}`);
    //     }
    //   });
    //   const httpLink = this.httpLink.create({
    //     uri: getIMURL(),
    //   });
    //   const link = ApolloLink.from([errorLink, httpLink]);

    //   this.apollo.removeClient();
    //   this.apollo.create({
    //     cache: new InMemoryCache(),
    //     link: link
    //   });

    //   let content = {
    //     username: this.loginForm.get('email_id').value,
    //     password: this.loginForm.get('password').value
    //   }

    //   this.apollo
    //     .mutate({
    //       mutation: LOGIN,
    //       variables: {
    //         content
    //       }
    //     })
    //     .subscribe((result: any) => {
    //       console.log('this is the result of Doctor Profile Update', result);
    //       const accessToken = result.data.loginUser.access_token;
    //       const decoded = jwt_decode(accessToken);
    //       const userRole = decoded['realm_access'].roles;

    //       if (userRole?.indexOf('doctor') >= 0) {
    //         this.getUserDetails(accessToken, 'doctor', null);
    //       } else {
    //         this.getUserDetails(accessToken, 'staff', decoded['sub']);
    //       }
    //       this.getUserSubscriptionFeature(accessToken, decoded['sub']);
    //     });
    // }
    const username = 'hi.hub@artlir.com';
    const password = 'Art@1234';
    this.stateService.doctorData$ = { name: 'Hi Hub', email: 'hi.hub@artlir.com', access_token: 'AFDSLAZN40G43FDNV48Q3NKDV48' };
    this.utilityService.setCurrentUser(this.stateService.doctorData$);
    this.stateService.selectedClinic$ = {
      clinicId: '572'
    }
    this.router.navigate(['/dashboard']);
  }

  get lctrl() { return this.loginForm.controls; }

}
