import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 

//----
import { UserMgmtService } from '../../service/com.service.usermgmt'
import {User} from '../../model/com.usermgmt.user.model'
import {UsernameValidators} from '../../signup/validators/com.usermgmt.username.validator'
import {SessionDataService} from '../../../common/service/com.common.sessiondata'

@Component({
  moduleId:module.id,
  selector: 'confirm-signup',
  templateUrl: 'com.usermgmt.signup.confirm.html',
  styleUrls: ['../styles/com.usermgmt.signup.css'],
  providers: [UserMgmtService,SessionDataService]
})
export class ConfirmSignUpComponent {

    user: User=new User();
    isModalOpen:boolean =false;

    constructor(private _router: Router,
        private _userMgmtService: UserMgmtService,
        private fb: FormBuilder){

        var userData = SessionDataService.getInstance().getMessage();
        if(userData)
        this.user = JSON.parse(String(userData));

    }

    registerUser() {
      this.isModalOpen = true;
       this._userMgmtService.registerUser(this.user).then(res => this.handleLoginResult(res))
    }


    handleLoginResult(res) {
      if (res.isSuccess) {
        this.isModalOpen = false;
       // this._router.navigate(['usermgmt.signup.success'])
       this._router.navigate(['usermgmt.signup.success'])
      } else {
        this._router.navigate(['usermgmt.signup.error'])
      }
    }


 }

  

