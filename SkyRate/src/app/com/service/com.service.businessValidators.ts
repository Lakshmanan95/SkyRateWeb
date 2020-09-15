





import  {FormControl}  from '@angular/forms'; 

import {ReflectiveInjector,OnInit,Injector} from '@angular/core';
import { Http } from '@angular/http';
import { BusinessService } from './com.service.business';
import { SessionDataService } from '../common/service/com.common.sessiondata';
import { BaseComponent } from '../common/basic/com.common.basic.basecomponent';
import { SessionStorageService } from '../common/service/com.common.sessionstorage';

export class UniqueBusinessValidators extends BaseComponent{

    constructor(injector:Injector,
        _sessionStorageService:SessionStorageService) {
        super(injector);
    }
ngOnInit(){
    SessionDataService.getInstance().businessId$.subscribe(value => {
        
    });
}


static businessExists(businessService:BusinessService,id){

        return (control:FormControl) => {
           
             let promise = businessService.businessExists(control.value);
             let isBusinessExists = false;
             promise.then( res => {
                if(res.businessNameExists)
                isBusinessExists = true;
             });
            
    
             return new Promise( (resolve,reject) => {
                setTimeout(function(){
                   
                    if(isBusinessExists){
                        if(!id)
                        resolve({ businessExists: true });
                        else
                        resolve(null);
                    }
                    else
                    resolve(null);
                    },500); 
                });
        
        }
       
     }
}