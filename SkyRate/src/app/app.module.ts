import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {routing} from './app.routing';
import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER} from '@angular/core';
import {AppComponent} from './app.component';
import {MessageService} from './com/service/com.service.message';

let localStorageServiceConfig = {
  prefix: 'my-app',
  storageType: 'sessionStorage'
};

import {UserMgmtModule} from './com/usermgmt/com.usermgmt.module';
import {UsermgmtRouting} from './com/usermgmt/com.usermgmt.routing';
import {HomeModule} from './com/home/com.home.module';
import {CommonModule} from './com/common/com.common.module';
import {ConfigService} from './com/common/service/config/com.common.service.config.configmanager';
import {AppUtil} from './app.util';
import {MainModule} from './com/mainmodules/com.main.modules';
import {MainModuleRouting} from './com/mainmodules/com.main.routing';
import {CookieService} from 'ngx-cookie-service';
import {AuthValidatorProvider} from './com/common/service/com.service.authvalidator';
import {AuthRouteGuard} from './com/service/com.guard.router.authservice';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    HomeModule,
    MainModule,
    UserMgmtModule,
    UsermgmtRouting,
    MainModuleRouting,
    routing
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/',},
    CookieService,
    ConfigService,
    MessageService,
    AuthValidatorProvider,
    AuthRouteGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: AppUtil.initConfigFactory,
      deps: [ConfigService],
      multi: true
    }
  ]

})

export class AppModule {

}
