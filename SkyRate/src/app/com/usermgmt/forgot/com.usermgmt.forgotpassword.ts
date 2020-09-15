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
  moduleId: module.id,
  selector: 'forgot-password',
  templateUrl: 'com.usermgmt.forgotpassword.html',
  styleUrls:['com.usermgmt.forgot.css'],
  providers: [SessionDataService,UserMgmtService],
})
export class ForgotPassword {
  roleId: number = 4;
 username : string;
 isSuccess :boolean;
 user = new User();
 userName: string = '';
 isUser: boolean = false;
basicForm : FormGroup;
loginFailed:boolean = false;
isSpin:boolean=false;
 constructor(private _router: Router,
    private _userMgmtService: UserMgmtService,
    protected _sessionStorageService: SessionStorageService,
    private fb: FormBuilder){
      this.basicForm = this.fb.group({ 
        //  _username: ['',Validators.required]
        _username: ['', Validators.compose([
                                              Validators.required,
                                              Validators.minLength(3),
                                              UsernameValidators.cannotContainSpace])   ]       
      });

  }
   onSubmit(f: NgForm) {
   this.isSpin = true;
    this._userMgmtService.forgotPassword({"username":this.username}).then(res => this.cb_forgotPassword(res))
  
  }
  cb_forgotPassword(res){
    this.isSpin = false;
    if(res.isSuccess){
      SessionDataService.getInstance().forgotPassword(''+1);
      this.isSuccess =res.isSuccess;
      this.loginFailed = false;
    }else{
      this.isSuccess =false;
      this.loginFailed= true;
    }
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

  

