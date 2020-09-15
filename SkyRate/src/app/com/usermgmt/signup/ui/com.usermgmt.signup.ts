import { Component } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';


//----
import {User} from '../../model/com.usermgmt.user.model'
import {UsernameValidators} from '../../signup/validators/com.usermgmt.username.validator'
import {UniqueUsernameValidators} from '../../signup/validators/com.usermgmt.uniqueuser.validator'
import {SessionDataService} from '../../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../../service/com.service.usermgmt'

@Component({
  moduleId:module.id,
  selector: 'sign-up',
  templateUrl: 'com.usermgmt.signup.html',
  styleUrls: ['../styles/com.usermgmt.signup.css'],
  providers: [SessionDataService,UserMgmtService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class SignUpComponent {
   user = new User();
   isFormValid :boolean= true;
   formValidationErrorMsg :string = "";
location: Location;
  signupForm : FormGroup;
  terms:boolean = false;
  //myForm:FormGroup;

 constructor(private _router: Router,
 //location: Location,
    private _userMgmtService: UserMgmtService,
    private fb: FormBuilder){
    // _userMgmtService.checkUserExists("dd");
   // this.location = location;
   


      this.signupForm = this.fb.group({ 
        _userName: ['', Validators.compose([
                                              Validators.required,
                                              Validators.minLength(3),
                                              UsernameValidators.cannotContainSpace]),
                                              UniqueUsernameValidators.shouldBeUnique(this._userMgmtService)],
        _firstName: ['',Validators.required],
        _lastName: ['',Validators.required],
         _email: ['',Validators.compose([
          Validators.required]),
         UniqueUsernameValidators.emailShouldBeUnique(this._userMgmtService,this.user.id)],
          _phoneNumber: ['',Validators.required],
        _password: ['', Validators.compose([
                                              Validators.required,
                                              Validators.minLength(3)])],
        _confirmPassword: ['',Validators.required],
        _terms:['', Validators.required]
      });


 }
  move2ConfirmationScreen() {
    var userData = JSON.stringify(this.user);
    SessionDataService.getInstance().setMessage(userData);
    this._router.navigate(['confirmsignup'])
  }


/* passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
}*/





 

 }

  

