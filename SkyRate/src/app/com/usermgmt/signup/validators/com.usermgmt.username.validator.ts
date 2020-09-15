import  {FormControl}  from '@angular/forms'; 
import { UserValidationService } from '../../service/com.service.uservalidation'
import {UserMgmtService} from '../../service/com.service.usermgmt'
import {ReflectiveInjector} from '@angular/core';
import {LoggingService} from '../../../common/service/logging/com.common.service.logging';
import {ConfigService} from '../../../common/service/config/com.common.service.config.configmanager';
import { Http } from '@angular/http';

export class UsernameValidators {

constructor(ss:string){

}

 static cannotContainSpace(control: FormControl) {
    if (control.value){
        if (control.value.indexOf(' ')>=0)
             return ({ cannotContainSpace: true });
        }
 }
 static confirmPassword(control1: string, control2: string) {
    // debugger;
    // alert(control1);
    // alert(control2);
    return
  
 }

static shouldBeUnique(control: FormControl,str:string){
   return new Promise((resolve, reject) => {
       setTimeout(function(){
        if (control.value=="raj"){
            
               let injector = ReflectiveInjector.resolveAndCreate([UserValidationService,UserMgmtService,LoggingService, ConfigService, Http]);
               let service = injector.get(UserValidationService);
               service.checkUserExists("eS");
            resolve({ shouldBeUnique: true });
        }
        else
           resolve(null);
       },1000);
     });
} 
static userExists(control: FormControl,str:string){
   return new Promise((resolve, reject) => {
       setTimeout(function(){
        if (control.value=="raj"){
            
               let injector = ReflectiveInjector.resolveAndCreate([UserValidationService,UserMgmtService,LoggingService, ConfigService, Http]);
               let service = injector.get(UserValidationService);
               service.checkUserExists("eS");
            resolve({ userExists: true });
        }
        else
           resolve(null);
       },1000);
     });
} 

}