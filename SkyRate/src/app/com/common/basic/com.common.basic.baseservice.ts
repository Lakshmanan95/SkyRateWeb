import {Injector, Inject} from '@angular/core';
import {BaseComponent} from './com.common.basic.basecomponent';
import {Http} from '@angular/http';
import {HttpUtil} from './../../common/util/com.common.util.httputil';

export class BaseService extends BaseComponent {
  protected _http: Http;
  // protected _APIURL : string;
  protected _httpHeaderOptions: any;

  constructor(injector: Injector) {
    super(injector);
    this._http = injector.get(Http);
    console.log('Basic service');
    // this._APIURL = this._configService.getProperty("RESTAPIService");
    this._httpHeaderOptions = HttpUtil.getHeaderOptions();
  }

  
}
