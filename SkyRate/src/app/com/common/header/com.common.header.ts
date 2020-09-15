import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { SessionStorageService } from '../service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
@Component({
   moduleId: module.id,
  selector: 'header',
  templateUrl: 'com.common.header.html',
  styleUrls:['com.common.header.css'],
  providers:[SessionStorageService]
})
export class HeaderComponent {
   
  userId:number;

  constructor(private _router: Router,
    private _userProfileService: UserProfileService){
      this.userId = this._userProfileService.getUserId();
  }

  product(){
    if(this.userId != 0)
      this._router.navigate(['dashboard/grocery-products']);
    else
      this._router.navigate([''])
  }
 }
