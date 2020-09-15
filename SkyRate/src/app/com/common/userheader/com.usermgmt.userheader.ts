import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OnInit ,OnDestroy,OnChanges,AfterViewInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {UserProfileService}  from '../../usermgmt/service/com.service.userprofile'
@Component({
moduleId:module.id,
  selector: 'user-header',
  templateUrl: 'com.sample.header.html',
  providers: [SessionStorageService,SessionDataService]

})
export class UserHeader{
  subscription: any;
  userName:string='';  
  profileImageUrl;
  roleId:number = 4;
  wishLists;any;
  count:any;
  userId:any;
  isWishEmpty:boolean = false;
  constructor(private _router: Router,
    private _userProfileService : UserProfileService,
    private _sessionStorageService: SessionStorageService) {
        this.roleId = this._sessionStorageService.getObject("roleId")
        this.userId = this._userProfileService.getUserId(),
   // alert(this.roleId)
     this.getLoggedUser();
    
    //  SessionDataService.getInstance().totalCount$.subscribe(value => {
    //    this.count = value
    //  })
    
   //  this.getWishList()
    // alert(document.location.hostname);

  }
  
 /* ngOnInit(): void {
   let timer = TimerObservable.create(2, 1000);
    this.subscription = timer.subscribe(t => {
        console.log("YYYY##")
       
    });
    
  }
  ngAfterViewInit() {
    
   // this.setTimeOut2()
  }
  setTimeOut2(){
       setTimeout(() => {
            this.getLoggedUser()
        },100 );
  }
   ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
  */
  
  getLoggedUser(){
    //  alert(1)
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
     //   alert(JSON.stringify(userProfileObj));
        var userName;
        if(userProfileObj){
            userName = userProfileObj["firstName"];
            console.log(" username  : "+userName)
        }
        if(userName!=null){
            this.userName=userName;
        }
        if(userProfileObj && userProfileObj.userExt){
         this.profileImageUrl =userProfileObj.userExt.profileImageUrl;
        }
  }
  logout(){
      this._sessionStorageService.clear();
      this.userName='';
      this._router.navigate([''])
  }
  showUserProfile(){
      this._router.navigate(['dashboard/user-profile']);
  }
  

}