import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SignUpRequest } from '../signup/model/com.usermgmt.signup.model';
import { LoginRequest } from '../login/model/com.usermgmt.login.model';
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';
import {User} from '../model/com.usermgmt.user.model'

@Injectable()
export class UserValidationService {

    constructor(@Inject(Http) private http:Http){
        alert(2)
    }
    checkUserExists(userName:string){
        alert(userName);
    }
}