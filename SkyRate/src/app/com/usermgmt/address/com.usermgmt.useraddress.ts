import { Component,EventEmitter, Output,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
//----

import { UserMgmtService } from '../service/com.service.usermgmt'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {Address} from '../../common/model/com.common.model.address';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
@Component({
  moduleId: module.id,
  selector: 'user-address',
  styleUrls:['com.usermgmt.address.css'],
  templateUrl: 'com.usermgmt.useraddress.html',
  providers: [SessionDataService,UserMgmtService,RestApiService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class UserAddress extends BaseComponent{


   addressType:number = 0;
   addressHeader:string ="Profile Address";
   isFormValid :boolean= true;
   editAddress:string= "demo0";
   formValidationErrorMsg :string = "";
   user:any;
location: Location;
states: any;
cities: any;
address : Address;
@Output() change = new EventEmitter();


@ViewChild('addAddressButton') demo:ElementRef;
 constructor(private _router: Router,
            injector:Injector,
            private _userProfileService: UserProfileService,
                private _userMgmtService: UserMgmtService,
                private _restApiService : RestApiService,
    private fb: FormBuilder){
      super(injector); 
      this.user = this._sessionStorageService.getObject("userProfile");
        this.loadAddress();
        if(!this.address){
          //alert(this.shippingAddress)
          this.address = new Address();
        }

 }
 loadAddress(){

   this.address = this._userProfileService.getUserProfileValue('address');
   if(!this.address){
     AlertService.getInstance().publishMessage('warning','User profile address required!');
   }
  this._restApiService.get("/address/getStates/").then(res => this.cb_getState(res));
   if(this.address!=null){
    this.getCities(0,this.address.state);
   }
 }
 getShippingAddress(res){
    if(res.isSuccess){
      this.address = res.address
    }
 }
 cb_getState(res){
  // alert(JSON.stringify(res));
  this.states = res.states;
 }


 getCities(index,stateId){
  // alert(stateId);
   this._restApiService.getById("/address/getCitiesByStateName/", stateId).then(res => this.cb_getCities(res));
 }
cb_getCities(res){
  // alert(JSON.stringify(res));
  this.cities = res.cities;
 }

  addNewAddress(){
  //  alert(this.shippingAddress);
 
    this.address.addressType = 0;
    // this.address.id = 0;
    this.address.userId=this._userProfileService.getUserId();
    this._loggingService.logDebug(this.getName(), JSON.stringify(this.address));
    this._userMgmtService.addNewAddress(this.address).then(res => this.cb_addNewAddress(res));
  }  
  cb_addNewAddress(res){
    if(res.isSuccess){
        if(res.addressType == 0){
      this.address.id = res.addressId;
    // this.profileAddress = this.shippingAddress;_userProfileService
      this._userProfileService.setUserProfileValue('address',this.address);
      AlertService.getInstance().publishMessage('success','Address updated!:'+ this.address.street+"..");
    //  alert(this.demo);
      this.demo.nativeElement.click();
       // alert('Address changed successfully');
        this.change.emit({addressId: res.addressId})
      //this.showDashboard();
      //$('.collapse').collapse()
     // console.log("session log ",this._sessionStorageService.getObject("session"))
      var value = this._sessionStorageService.getObject("session")
          if(value === 1){
           this._router.navigate(['/dashboard/checkout-cart']);
           this._sessionStorageService.setObject("session",0)
          }
      }
      else{
        alert("Shipping address Added")
        this.demo.nativeElement.click();
      }
    }
  }
  showDashboard(){
    this._router.navigate(['dashboard']);
  }

  checkAddressPresentOrNot(){
    var id;
    this._restApiService.getById('/usermgmt/getShippingAddressById/',this.user.id).then(res=>id = res.address.id);
    if(id == null)
      id= this.address.id
    return id;
  }
 }

  

