import {Component, Injector} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';


@Component({
    selector:'popular-search',
    templateUrl:'com.mainmodules.popularsearch.html',
    styleUrls:['com.main.popularsearch.css'],
    providers: [BusinessService,SessionDataService,RestApiService]
})
export class PopularSearchComponent extends BaseComponent{

    userId:number;
    columnDivision:number = 2;
    favoriteArray:number[];
    category:any;

    constructor(injector:Injector,
        private _router : Router,private _restApiService:RestApiService,
        private _businessService : BusinessService,
        private _route : ActivatedRoute,
       ) {
        super(injector); 
        SessionDataService.getInstance().refresh$.subscribe(value =>{
            this.getUserId()
            //  alert(this.userId)
        });
            this.getUserId();
            this.getCategory();
    }
   
    getUserId(){
        this.userId = this._sessionStorageService.getObject("userId");
        if(this.userId == null)
        this.userId = 0;
    }
    getCategory(){
        this._restApiService.get('/report/getCategory').then(res => this.cb_getCategory(res))
    }
    cb_getCategory(res){
        this.category = res.category;
    }
    moveToCategory(value){
        // alert(value)
        this._router.navigate(['dashboard/popular-searches/'],{ queryParams: { category: value } });
        // this._router.navigate(['dashboard/popular-searches/',value]);
    }
    getStyles(){
        if(this.userId != 0){
            var styles = {
                'margin':'0px'
            }
            return styles;
        }
    }

    
}