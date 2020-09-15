import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../service/com.service.usermgmt'

@Component({
  moduleId: module.id,
  selector: 'forgot-username',
  templateUrl: 'com.usermgmt.forgotusername.html',
  providers: [SessionDataService,UserMgmtService],
})
export class ForgotUsername {
 email : string;
 emailId:string;
 isSuccess :boolean;
basicForm : FormGroup;
 constructor(private _router: Router,
    private _userMgmtService: UserMgmtService,
    private fb: FormBuilder){
      this.basicForm = this.fb.group({ 
          _email: ['',Validators.required]
      });

  }
   onSubmit(f: NgForm) {
   // alert(f.value._email)
    this._userMgmtService.forgotUsername({email:f.value._email}).then(res => this.cb_forgotUsername(res))
  
  }
  cb_forgotUsername(res){
    if(res.isSuccess){
      this.isSuccess =res.isSuccess;
      this.emailId= this.email;
    //    this.email="":
     // alert(1)
       // this._router.navigate(['confirmsignup'])
    }else{
      this.isSuccess =true;
      this.emailId= this.email;
      //this.email="":
     // alert(2)
    }
  }

 }

  

