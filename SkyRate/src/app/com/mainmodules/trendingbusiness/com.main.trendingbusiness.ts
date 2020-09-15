import {Component, Injector} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'

import { BusinessService } from '../../service/com.service.business';
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { SessionDataService } from '../../common/service/com.common.sessiondata';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';


@Component({
    selector:'trending-business',
    templateUrl:'com.main.trendingbusiness.html',
    styleUrls:['com.main.trendingbusiness.css'],
    providers: [BusinessService,SessionDataService,RestApiService]
})
export class TrendingBusinessComponent extends BaseComponent{

    userId:number;
    mostViewed:any;
    mostReviewed:any;
    mostRated:any;

    constructor(injector:Injector,
        private _router : Router,
        private _businessService : BusinessService,
        private _restApiService : RestApiService,
        private _route : ActivatedRoute,
       ) {
        super(injector); 
       
       this.userId = this._sessionStorageService.getObject("userId")
       if(this.userId == null)
            this.userId = 0;

        this.getTrendingBusiness()
    }

    getTrendingBusiness(){
        this._restApiService.get("/report/getTrending").then(res => this.cb_getTrendingBusiness(res))
    }
    cb_getTrendingBusiness(res){
        this.mostRated = res.mostRated;
        this.mostReviewed = res.mostReviewd;
        this.mostViewed = res.mostViewd;
    }
    getBusiness(id,name){
        // alert(name)
        this._router.navigate(['dashboard/review/'+id,name]);
    }
}