import { Component } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
declare var $ :any;
@Component({
  moduleId:module.id,
  selector: 'logo',
  styleUrls:['com.common.logo.css'],
  templateUrl: 'com.common.logo.html',
  providers:[RestApiService]
})
export class Logo extends FormComponent{
    roleId:number;
    userId: number = 0;
    categories:any;
    subCategories:any;
    // isCollapsed = true;
     constructor(injector:Injector, private _userProfileService: UserProfileService,
    private _restService:RestApiService) {
       
          super(injector);
          
        
        

     }


    
    
 }
