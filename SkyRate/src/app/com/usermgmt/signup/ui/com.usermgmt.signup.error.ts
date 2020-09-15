import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


//----

import {User} from '../../model/com.usermgmt.user.model'
import {SessionDataService} from '../../../common/service/com.common.sessiondata'

@Component({
  moduleId:module.id,
  selector: 'signup-success',
  templateUrl: 'com.usermgmt.signup.error.html',
  styleUrls: ['../styles/com.usermgmt.signup.css'],
  providers: [SessionDataService]
})
export class SignUpErrorComponent {

   user: User=new User();

   constructor(private _router: Router){

        var userData = SessionDataService.getInstance().getMessage();
        if(userData)
        this.user = JSON.parse(String(userData));

    }

    move2UserProfileScreen() {
     //this._userMgmtService.registerUser(this.user).then(res => this.handleLoginResult(res))
     alert(1);
    }


 }

  