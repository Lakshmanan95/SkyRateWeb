import { Component } from '@angular/core';
import {ReflectiveInjector,Injector} from '@angular/core';
import {LoggingService} from './../../common/service/logging/com.common.service.logging';
import {ConfigService} from './../../common/service/config/com.common.service.config.configmanager';
//mport { Router,Route } from '@angular/router';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import { ConnectionBackend,Http } from '@angular/http';
import {SessionDataService} from '../service/com.common.sessiondata'

export class BaseComponent {
    protected _loggingService: LoggingService;
    protected _configService :ConfigService;
    protected _sessionStorageService :SessionStorageService;
    protected _APIURL : string;

    constructor(injector2:Injector) {

        var injector = ReflectiveInjector.resolveAndCreate([
                            LoggingService,
                            SessionStorageService,
                            ConfigService
                            ]);

                            console.log("Base Component")
         // this._configService = injector.get(ConfigService);
          this._loggingService = injector.get(LoggingService);
           this._sessionStorageService = injector.get(SessionStorageService);
       //   alert(this._sessionStorageService.getObject("configData"));
         //  alert(JSON(.stringthis._sessionStorageService.getObject("configData")));
         // this._APIURL = this._configService.getProperty("RESTAPIService");

        this._APIURL =  SessionDataService.init().getData("configData").RESTAPIService;

    //     this._APIURL = this._sessionStorageService.getObjectFromLocalStorage("configData").RESTAPIService;
       //  alert(this._APIURL)
     //  alert(sessionStorage.getItem("configData"))
   //    this._APIURL="http://localhost:8080/ebizWAPI";
        console.log("base component loaded");
    }

    getName() {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any>this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}

