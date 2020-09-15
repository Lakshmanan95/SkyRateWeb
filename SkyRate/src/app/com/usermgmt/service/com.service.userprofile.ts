import { Injectable } from '@angular/core';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';


@Injectable()
export class UserProfileService {

    constructor(
        private _sessionStorageService :SessionStorageService) {
    }

   getUserId(){

        var userProfileObj = this.getUserProfile();
        var userId;
        if(userProfileObj){
            userId = userProfileObj["id"];
        }
        if(userId!=null){
            return userId;
        }else{
            return "";
        }
   }
   getAddress(){
        var userProfileObj = this.getUserProfile();
        var address;
        if(userProfileObj){
            address = userProfileObj["address"];
        }
        if(address!=null){
            return address;
        }else{
            return "";
        }      
   }
   getUserProfile(){
        return this._sessionStorageService.getObject("userProfile");
   }
   getUserProfileValue(key){
       return this._sessionStorageService.getObject("userProfile")[key];
   }
   setUserProfileValue(key,value){
       var userProfile = this._sessionStorageService.getObject("userProfile");
       userProfile[key]=value;
       this._sessionStorageService.setObject("userProfile",userProfile);
   }
}