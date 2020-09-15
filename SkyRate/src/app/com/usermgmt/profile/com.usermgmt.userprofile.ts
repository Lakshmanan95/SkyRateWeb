import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
//----
import {User} from '../model/com.usermgmt.user.model'
import {UserExt} from '../model/com.usermgmt.user.model'
import {ChangePasswordRequest} from '../model/com.usermgmt.user.model'
import {UsernameValidators} from '../signup/validators/com.usermgmt.username.validator'
import {UniqueUsernameValidators} from '../signup/validators/com.usermgmt.uniqueuser.validator'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../service/com.service.usermgmt'
import {Address} from '../../common/model/com.common.model.address';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'com.usermgmt.skyrateuserprofile.html',
  styleUrls:['com.userprofile.css'],
  providers: [SessionDataService,UserMgmtService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class UserProfile extends BaseComponent{
   user = new User();
   userExt = new UserExt();
   tabId:number=0;
   changePasswordRequest = new ChangePasswordRequest();
   isFormValid :boolean= true;
   isPictureUpdate: boolean = false;
   isModalOpen: boolean = false;
   spinLoader:boolean = false;
   spinPassLoader:boolean = false;
   profileImage:string="boy.png"
   formValidationErrorMsg :string = "";
location: Location;
  profileForm : FormGroup;
changePasswordForm : FormGroup;
  USER_PROFILE_UPLOADER_URL="upload/profileImageUploader";
  isExistingImageAvailable=true;
  EditPictureButtonLabel="Edit Picture"
 constructor(private _router: Router,
            injector:Injector,
            private _userProfileService: UserProfileService,
    private _userMgmtService: UserMgmtService,
    private fb: FormBuilder){
      super(injector); 
        this.loadUserProfile();


      this.profileForm = this.fb.group({ 
        _firstName: [''],
        _lastName: [''],
        _email: ['',Validators.compose([
          Validators.required]),
          UniqueUsernameValidators.emailShouldBeUnique(this._userMgmtService,this.user.id)],
          _phoneNumber: ['',Validators.required],
          _businessName: [''],
          _doctorName :[],
          _doctorPhone :[]
      });

      this.changePasswordForm = this.fb.group({ 
        _oldPassword: ['',Validators.required],
        _password: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(3)])],
        _confirmPassword: ['',Validators.required]
      });
      window.scrollTo(0, 0)
 }
 ValidForm(){
   if(this.profileForm.valid && !this.isPictureUpdate)
    return true;
  else
    return false;
 }
 keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
 loadUserProfile(){
  // alert(this._sessionStorageService.getObject("userProfile"))
   this.user = this._sessionStorageService.getObject("userProfile");
   this.profileImage = this.user.profileImageUrl
  //  alert(JSON.stringify(this.user))
  //  this.profileImage = this._sessionStorageService.getObject("image");
  //  if(this.profileImage == null)
  //   this.profileImage = 'boyUser.png'
  //  this.userExt.profileImageUrl = this.user.profileImageUrl;
  //  if(!this.userExt){
  //    this.userExt = new UserExt();
  //  }

 }
  saveProfile() {
    
    if(this.user.phoneNumber != null && this.user.phoneNumber != "" ){
  this.spinLoader = true;
  this.isModalOpen =true;
  this.user.profileImageUrl 
      this.userExt.userId = this.user.id;
    var request ={
      user: this.user,
      userExt: this.userExt
    }
    
    this._userMgmtService.updateUserProfile(request).then(res => this.cb_updateUserProfile(res));
  }
  }
  cb_updateUserProfile(res){
    if(res.isSuccess){
      this.spinLoader = false;
      this.profileForm.markAsUntouched()
      this._sessionStorageService.setObject("userProfile",this.user)
     // this.loadUserProfile()
      this.isModalOpen =false;
      this._sessionStorageService.setObject("image", this.user.profileImageUrl)
      this._userProfileService.setUserProfileValue("firstName", this.user.firstName);
      this._userProfileService.setUserProfileValue("lastName", this.user.lastName);
      this._userProfileService.setUserProfileValue("email", this.user.email);
      this._userProfileService.setUserProfileValue("phoneNumber", this.user.phoneNumber);
      this._userProfileService.setUserProfileValue("userExt", this.userExt);
      AlertService.getInstance().publishMessage('success','Profile is updated.');
    //  alert('User profile updated successfully');
      this.mapRefresh();
    }else{
      this.spinLoader = false;
      AlertService.getInstance().publishMessage('danger','User profile not updated!');
    }
  }
  mapRefresh(){
    SessionDataService.getInstance().refresh(''+ 1);
  }
  changePassword(){
    //alert(JSON.stringify(this.changePasswordForm));
  //  alert(JSON.stringify(this.changePasswordRequest))
  this.spinPassLoader = true;
  this.isModalOpen = true;
    this.changePasswordRequest.userId = this._userProfileService.getUserId();

    this._userMgmtService.changePassword(this.changePasswordRequest).then(res => this.cb_changePassword(res));
  }
  cb_changePassword(res){
      if(res.isSuccess){
        this.spinPassLoader = false;
        this.changePasswordForm.reset()
        this.isModalOpen =false;
        SessionDataService.getInstance().forgotPassword(''+1);
         AlertService.getInstance().publishMessage('success','Password changed successfully.');
         SessionDataService.getInstance().refresh(''+"0")
        this._router.navigate(['/skyrate/refresh'])
        // alert('Password changed successfully');
     //   this.showDashboard();
      }else{
        AlertService.getInstance().publishMessage('danger','Old Password not matching.' );
        this.spinPassLoader = false;
      }
    //alert(JSON.stringify(res));
  }
 uploadComplete(event){
   this.user.profileImageUrl=event.uploadedURL;
   this.profileForm.markAsTouched()
  //  alert(this.user.profileImageUrl)  
 }
  editPicture(){
    this.isExistingImageAvailable=!this.isExistingImageAvailable;
    if(this.isExistingImageAvailable){
      this.EditPictureButtonLabel="Edit Picture"
    }else{
      this.EditPictureButtonLabel="Cancel Edit"
      this.ValidForm();
    }
  }
  showDashboard(){
    this._router.navigate(['dashboard']);
  }

  openProfile(){
    $('.passwordTab').hide();
    $('#password').removeClass('new-tab')
     $('#profile').addClass('new-tab')
    $('.profileTab').show();
    this.tabId = 0;
  }
  openPassword(){
    $('.profileTab').hide();
    $('#profile').removeClass('new-tab')
    $('#password').addClass('new-tab')
    $('.passwordTab').show();
    this.tabId = 1;
  }
  getLogin(){
    if(this.tabId == 0){
      var styles = {
        'color':'#D9B310',
        'border-bottom':'3px solid #D9B310'
      }
      return styles;
    }
  }
  getPassword(){
    if(this.tabId == 1){
      var styles = {
        'color':'#D9B310',
        'border-bottom':'3px solid #D9B310'
      }
      return styles;
    }
  }
  
 }

  

