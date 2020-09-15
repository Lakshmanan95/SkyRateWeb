import {Component,Injector} from '@angular/core'
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';

export class Sample {
    constructor(injector:Injector,private _router:Router,
        private _restApiService:RestApiService,
    ){

     this._restApiService.get("teacher").then(res => {
         console.log("response", res)
     })
    }
}