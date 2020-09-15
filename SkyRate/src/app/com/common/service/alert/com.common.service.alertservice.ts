import { Injectable } from '@angular/core';
import {ConfigService} from '../config/com.common.service.config.configmanager';
import { Subject }    from 'rxjs/Subject';
// import {BaseService} from '../../basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';


export class AlertService
{
    private myAlert = new Subject<string>();
    myAlertMsg$ = this.myAlert.asObservable();
    static instance:AlertService;
    static isCreating:Boolean = false;
 
    constructor() {
        if (!AlertService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }

    static getInstance() {
        if (AlertService.instance == null) {
            AlertService.isCreating = true;
            AlertService.instance = new AlertService();
            AlertService.isCreating = false;
        }
 
        return AlertService.instance;
    }
    publishMessage(alertType:string, newMessage:string){
        this.myAlert.next(alertType+"~"+newMessage);
    }

}