import {Http, ConnectionBackend} from '@angular/http';
import {Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {ReflectiveInjector, Injectable} from '@angular/core';
import {SessionDataService} from '../com.common.sessiondata';
import {AuthValidatorProvider} from '../com.service.authvalidator';

@Injectable()
export class ConfigService {
  private Server = 'http://localhost:8080/skyrateWAPI';
  private AppKey = 'http://localhost:4000';
  private configData: any;

  constructor(private _http: Http, private authValidatorProvider: AuthValidatorProvider) {
   
  }


  public load() {
    return new Promise((resolve, reject) => {
      const host = window.location.host;
      this._http.get('assets/' + this.getDomain() + '.config.json')
        .map(res => res.json())
        .subscribe(
          (data: any) => {
            this.Server = data.server;
            this.AppKey = data.appkey;
            this.configData = data;
            SessionDataService.init().setData('configData', data);
            this.authValidatorProvider.appAuthInitializer(data.RESTAPIService)
              .then(response => resolve(true));
          },
          err => console.log(err)
        );
    });
  }

  getDomain() {
    const host = window.location.host;
    const domain = host.split(':');
    return domain[0];
  }

  public getServer() {
    return this.Server;
  }

  public getAppKey() {
    return this.AppKey;
  }

  public getProperty(key: string) {
    return this.configData[key];
  }
}
