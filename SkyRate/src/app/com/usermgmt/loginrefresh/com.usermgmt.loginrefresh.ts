import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../service/com.service.usermgmt'
import {UsernameValidators} from '../signup/validators/com.usermgmt.username.validator'
import {UniqueUsernameValidators} from '../signup/validators/com.usermgmt.uniqueuser.validator'
import { User } from '../model/com.usermgmt.user.model';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
declare var $ :any;
@Component({
  selector: 'login-refresh',
  templateUrl: 'com.usermgmt.loginrefresh.html',
  styleUrls:['../forgot/com.usermgmt.forgot.css'],
  providers: [SessionDataService,UserMgmtService],
})
export class LoginRefreshComponent {

  roleId:number = 4;
  userName: string = '';
  isUser: boolean = false;
  forgotRefresh: number = 0;
  user = new User();

    constructor(private _router: Router,
        protected _sessionStorageService : SessionStorageService,
        private _userMgmtService: UserMgmtService,
        private fb: FormBuilder){
        
      }

    signIn(){
      $('.signUpTab').hide();
      $('.loginTab').show();
      $('#login').addClass('new-tab')
      $('#signUp').removeClass('new-tab');
        $('#loginModal').modal('toggle');
      }
      openLogin() {
        $('.signUpTab').hide();
        $('#signUp').removeClass('new-tab');
        $('#login').addClass('new-tab');
        $('.loginTab').show();
      }
    
      openSignUp() {
        $('.loginTab').hide();
        $('#login').removeClass('new-tab');
        $('#signUp').addClass('new-tab');
        $('.signUpTab').show();
      }
      loginResult(value) {
        $('#loginModal').modal('toggle');
        this.user = this._sessionStorageService.getObject('userProfile');
        // this._router.navigate(['search']);
        if (value === 'Success') {
          this.user = this._sessionStorageService.getObject('userProfile');
          // alert(this.user.firstName)
          this.userName = this._sessionStorageService.getObject('userName');
          this.isUser = true;
        }
          SessionDataService.getInstance().forgotPassword('' + 0);
          this._router.navigate(['']);
      }
      registerResult(value) {
        
            // $(function () {
            $('#loginModal').modal('toggle');
            // this._router.navigate(['search']);
            // });
            if (value === 'Success') {
              this.userName = this._sessionStorageService.getObject('userName');
              this.user = this._sessionStorageService.getObject('userProfile');
              this.roleId = this._sessionStorageService.getObject('roleId');
              if (this.roleId == null)
                this.roleId = 4;
              this.isUser = true;
            }
            else {
              this.isUser = false;
              $(function () {
                $('#registerModal').modal('toggle');
              });
            }
          }
}