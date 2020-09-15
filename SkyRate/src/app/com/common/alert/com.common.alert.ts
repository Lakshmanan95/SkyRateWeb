import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {Injector} from '@angular/core';
import {AlertService} from '../service/alert/com.common.service.alertservice'
@Component({
  moduleId:module.id,
  selector: 'alert',
  templateUrl: 'com.common.alert.html',
  providers: [AlertService]

})
export class Alert extends FormComponent{
  alertMsg: string='';  
  alertType :string='info';
  constructor(injector:Injector) 
  {
        super(injector);
        
        this._loggingService.logDebug(this.getName(),"Alert component initiated");
        AlertService.getInstance().myAlertMsg$.subscribe(message=> {
            // alert(message);

             var alertMessage = message.split("~");
             this.alertType = alertMessage[0];
        this.alertMsg=alertMessage[1];
        });      
   }


}