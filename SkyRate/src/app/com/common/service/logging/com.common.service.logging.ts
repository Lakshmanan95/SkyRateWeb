import { Injectable } from '@angular/core';
//import {ConfigService} from '../config/com.common.service.config.configmanager';
import { Http } from '@angular/http';
@Injectable()
export class LoggingService {
    isLogDebug:boolean = true;
    isLogError: boolean = true;
    isLogInfo :boolean =true;

    constructor(){
     //   this.isLogDebug = _configService.getProperty("loggingLevel")["isLogDebug"];
     //   this.isLogError = _configService.getProperty("loggingLevel")["isLogError"];
     //   this.isLogInfo = _configService.getProperty("loggingLevel")["isLogInfo"];

        console.log("[LoggingService]>>Log Level Debug :"+this.isLogDebug);
        console.log("[LoggingService]>>Log Level Info :"+this.isLogInfo);
        console.log("[LoggingService]>>Log Level Error :"+this.isLogError);
    }

    logInfo(component:string,msg:String){
        console.log ("["+component+":I:]>>" + msg);
    }
    logDebug(component:string,msg:String){
        console.log ("["+component+":D:]>>"+msg);
    }
    logError(component:string,msg:String){
        console.log ("["+component+":E:]>>"+msg);
    }

}