import { Component } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
declare var $ :any;
@Component({
  moduleId:module.id,
  selector: 'my-menu',
  styleUrls:['com.common.menu.css'],
  templateUrl: 'com.common.menu.html',
  providers:[RestApiService]
})
export class Menu extends FormComponent{
    roleId:number;
    userId: number = 0;
    categories:any;
    subCategories:any;
    
    // isCollapsed = true;
     constructor(injector:Injector, private _userProfileService: UserProfileService,
    private _restService:RestApiService) {
       
          super(injector);
          
        
        

     }
     toggle(){
      $("[data-toggle=popover]").popover({
        html: true, 
      content: function() {
              return $('#popover-content').html();
            }
    });
     }
     closeToggle(){

      
     }
    
    
 }
