import  {FormControl}  from '@angular/forms'; 
import { UserValidationService } from '../../service/com.service.uservalidation'
import {UserMgmtService} from '../../service/com.service.usermgmt'
import {ReflectiveInjector} from '@angular/core';
import {LoggingService} from '../../../common/service/logging/com.common.service.logging';
import {ConfigService} from '../../../common/service/config/com.common.service.config.configmanager';
import { Http } from '@angular/http';
export class UniqueUsernameValidators {

static userNotExists(userMgmtService:UserMgmtService){
    return (control: FormControl) => { 
        let promise = userMgmtService.checkUserExists(control.value);
        let isUserExists=false;
        promise.then((res)=>{
            if(res.userNameExists)
              isUserExists=true;
        });
        return new Promise((resolve, reject) => {
            setTimeout(function(){
            if (isUserExists){
                resolve({ userNotExists: false });
            }
            else{
                 resolve({ userNotExists: true });
             // resolve(null);
            }
            },500);
        });

    }
}
 static shouldBeUnique(userMgmtService:UserMgmtService){   
    return (control: FormControl) => { 
        let promise = userMgmtService.checkUserExists(control.value);
        let isUserExists=false;
        promise.then((res)=>{
            if(res.userNameExists)
              isUserExists=true;
        });
        return new Promise((resolve, reject) => {
            setTimeout(function(){
            if (isUserExists){
                resolve({ shouldBeUnique: true });
            }
            else
            resolve(null);
            },500);
        });

    }
 } 

 
 static emailShouldBeUnique(userMgmtService:UserMgmtService,userId){   
    return (control: FormControl) => { 
        let promise = userMgmtService.emailIdExists(control.value,userId);
        let isUserExists=false;
        promise.then((res)=>{
            if(res.emailIdExist)
              isUserExists=true;
        });
        return new Promise((resolve, reject) => {
            setTimeout(function(){
            if (isUserExists){
                resolve({ emailShouldBeUnique: true });
            }
            else
            resolve(null);
            },500);
        });

    }
 } 

 static passwordEqual(password, confirmPassword){
    return (control: FormControl) => { 
       
        if(password == confirmPassword){
            return true
        }
        else
            return false;

    }
 }
 
/* static shouldBeUnique(userMgmtService:UserMgmtService){   
    return (control: FormControl) => { 
        return new Promise((resolve, reject) => {
            setTimeout(function(){
                if (userMgmtService.checkUserExists(control.value)){
                    resolve({ shouldBeUnique: true });
                }
                else
                resolve(null);
            },1000);
            });
    }
 } */
}