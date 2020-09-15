import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import {BaseService} from '../../basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';

@Injectable()
export class RestApiService extends BaseService {

  private PAYMENT_URL = this._APIURL;


  constructor(injector: Injector) {
    super(injector);
  }

  get(apiPath: string): Promise<any> {
    return this._http.get("https://34.93.195.145:8080/" + apiPath, this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  getById(apiPath: string, id: any): Promise<any> {
    return this._http.get(this.PAYMENT_URL + apiPath + '/' + id, this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }

  post(operation: string, request: any): Promise<any> {
    // alert(operation)
    return this._http.post(this.PAYMENT_URL + operation, JSON.stringify(request), this._httpHeaderOptions)
      .toPromise()
      .then(res => res.json());
  }


}
