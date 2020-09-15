import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import {SignUpComponent} from './signup/ui/com.usermgmt.signup';
import {ConfirmSignUpComponent} from './signup/ui/com.usermgmt.signup.confirm';
import {SignUpSuccessComponent} from './signup/ui/com.usermgmt.signup.success';
import {SignUpErrorComponent} from './signup/ui/com.usermgmt.signup.error';
import {ForgotUsername} from './forgot/com.usermgmt.forgotusername';
import {ForgotPassword} from './forgot/com.usermgmt.forgotpassword';
import {CommonModule} from '../common/com.common.module';
import {UserProfile} from '../usermgmt/profile/com.usermgmt.userprofile';
import {UserAddress} from '../usermgmt/address/com.usermgmt.useraddress';
import {EqualValidator} from '../usermgmt/signup/validators/com.usermgmt.equal.validator.directive'
import {SkyrateComponent} from '../usermgmt/skyrate/com.usermgmt.skyrate'
import { LoginRefreshComponent } from './loginrefresh/com.usermgmt.loginrefresh';

@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,ReactiveFormsModule,RouterModule,CommonModule,],
  declarations: [ SignUpComponent,SkyrateComponent,ConfirmSignUpComponent,SignUpSuccessComponent,SignUpErrorComponent,UserProfile,ForgotUsername,ForgotPassword,
                  UserAddress,EqualValidator,LoginRefreshComponent],
  exports:    [ SignUpComponent,SkyrateComponent,ConfirmSignUpComponent,SignUpSuccessComponent,SignUpErrorComponent,ForgotUsername,ForgotPassword,
                  UserProfile,UserAddress,EqualValidator,LoginRefreshComponent]
})
export class UserMgmtModule { }