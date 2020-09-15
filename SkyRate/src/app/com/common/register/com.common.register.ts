import {Component, Injector, Output, EventEmitter} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from '../basic/com.common.basic.formcomponent';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
import { UserProfileService } from '../../usermgmt/service/com.service.userprofile';
import { BaseComponent } from '../basic/com.common.basic.basecomponent';
import { UserMgmtService } from '../../usermgmt/service/com.service.usermgmt';
import {UsernameValidators} from '../../usermgmt/signup/validators/com.usermgmt.username.validator'
import {UniqueUsernameValidators} from '../../usermgmt/signup/validators/com.usermgmt.uniqueuser.validator'
import {User} from '../../usermgmt/model/com.usermgmt.user.model'
import { SessionStorageService } from '../service/com.common.sessionstorage';
import { CookieService } from 'ngx-cookie-service';
import { SessionDataService } from '../service/com.common.sessiondata';
declare var $ :any;
@Component({
    selector:'register',
    templateUrl:'com.common.register.html',
    styleUrls:['com.common.register.css'],
    providers:[RestApiService,UserMgmtService,SessionStorageService,CookieService]
})
export class RegisterComponent {

  @Output()
  registerSuccess = new EventEmitter();
  policy:boolean = false;
  isPolicyOpen:boolean = false;
  isTermsOpen:boolean= false;
    user = new User();
    isFormValid :boolean= true;
    formValidationErrorMsg :string = "";
 location: Location;
 isSpin:boolean=false;
   signupForm : FormGroup;
   terms:boolean = false;
   public mask =   [ /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
   //myForm:FormGroup;
 
  constructor(private _router: Router,private _sessionStorageService:SessionStorageService,
  //location: Location,
  private _cookie : CookieService,
     private _userMgmtService: UserMgmtService,
     private fb: FormBuilder){
     // _userMgmtService.checkUserExists("dd");
    // this.location = location;
 
 
       this.signupForm = this.fb.group({ 
        
         _firstName: ['',Validators.required],
         _lastName: ['',Validators.required],
         _userName:['',Validators.compose([
          Validators.required]),
          UniqueUsernameValidators.shouldBeUnique(this._userMgmtService)],
          _email: ['',Validators.compose([
           Validators.required]),
           UniqueUsernameValidators.emailShouldBeUnique(this._userMgmtService,0)],
           _phoneNumber: ['',Validators.required],
         _password: ['', Validators.compose([
                                               Validators.required,
                                               Validators.minLength(3)])],
         _confirmPassword: ['', Validators.required],
         _businessName:['',Validators.required],
         _policy:['',Validators.required,]
       });
 
     
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
}
  onSubmit(){
    this.isSpin = true;
    this.isPolicyOpen = false;
    var request = {
      user : this.user
    }
    this._userMgmtService.registerUser(request).then(res => this.cb_register(res));
  }

  cb_register(res){
    this.signupForm.reset();
    this.policy = false;
    this.isSpin = false;
    if(res.isSuccess){
      $('#loginModal').modal('toggle');
        this._router.navigate(['admin/welcome'])
      
      // SessionDataService.getInstance().refresh(''+'1');
      // var id = this._sessionStorageService.setObject("userId",res.user.id);
      // this._sessionStorageService.setObject("userName",res.user.firstName)
      // this._sessionStorageService.setObject("userProfile",res.user)
      // this._sessionStorageService.setObject("image",res.user.profileImageUrl);
      // this._cookie.set("Refresh",res.userRefresh);
      // this.registerSuccess.emit("Success")
    }
    else{
      this.registerSuccess.emit("Failure")
    }
  }
  
  formControlValueChanged() {
    const phoneControl = this.signupForm.get('_policy');
    this.signupForm.get('_policy').valueChanges.subscribe(
        (mode: string) => {
            console.log("mode "+mode);
          if(mode == "true"){
            this.signupForm.valid;
            return true;
          }
          else{
            this.signupForm.invalid;
            return false;
          }
        });
}
privacyPolicy(value){
    if(value)
    
    this.isTermsOpen = false;
    else
    this.isPolicyOpen = true;
  }
 
  termsAndPolicy(value){
    
    if(value)
    this.isPolicyOpen = false;
    else
      this.isTermsOpen = true;
  }
    
}