import { Privacypolicy } from './../common/privacy policy & terms/com.privacypolicy';
import { WelcomeComponent } from './../common/register/com.common.welcome';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {CommonModule} from '../common/com.common.module';

import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {LoggingService} from '../common/service/logging/com.common.service.logging';
import {Alert} from '../common/alert/com.common.alert';
import {FileUploadModule} from "ng2-file-upload";
import {DashboardComponent} from './dashboard/com.mainmodules.dashboard';
import {SearchBusinessComponent} from './searchbusiness/com.main.searchbusiness'
import {SearchListComponent} from './searchbusiness/com.main.searchList'
import {UserMgmtModule} from  '../usermgmt/com.usermgmt.module'
import {BeforeSearchComponent} from './homepage/beforeSearch/com.beforeSearch'
import {PopularSearchComponent} from './popularsearches/com.mainmodules.popularsearches';
import {ReviewComponent} from './review/com.mainmodules.review';
import {ReviewListComponent} from './review/com.mainmodules.reviewList';
// import {MatAutocompleteModule, } from '@angular/material/autocomplete';

 import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { NgSelectModule , NgOption} from '@ng-select/ng-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { SelectModule } from 'ng-select';
import {ReportComponent} from './report/com.mainmodules.report'
import {AddReviewComponent} from './review/com.main.addReview'
import { MyDatePickerModule } from 'mydatepicker';
import {PopularListComponent} from './popularsearches/com.main.popularList'
import {UpdateBusinessComponent} from './updatebusiness/com.main.updateBusiness'
import {DataTableModule} from 'angular-4-data-table'
import {CompareBusinessComponent} from './compare/com.main.compare'
import {MatTableModule} from '@angular/material/table';
import {RightSideComponent} from './rightSidePanel/com.main.rightSidePanel'
import {BusinessDashboardComponent} from './dashboard/com.mainmodules.businessDash'
import {TrendingBusinessComponent} from './trendingbusiness/com.main.trendingbusiness'
import {UserReportComponent} from './report/com.main.userreport'
import {BusinessClaimedComponent} from './businessClaimed/com.main.businessclaimed'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown'
import { AuthGuard } from '../service/com.service.authservice';
import { AdminDashboardComponent } from './dashboard/com.mainmodules.admin';
import { MessageComponent } from './inbox/com.main.message';
import {AgmCoreModule } from '@agm/core';
import { MailToClientComponent } from './mailToClient/com.main.mailToClient';
import { TagInputModule } from 'ngx-chips';
import {AdvertisementComponent} from './advertisement/com.advertisement'
import { ContactComponent } from './contact/com.contact';
import { AboutUsComponent } from './aboutus/com.aboutus';
import { AdBannerComponent } from './advertisement/com.adbanner';
import {AdComponent} from './advertisement/com.adadvertisement';
import { WelcomeInfo } from './welcomeInfo/com.mainmodules.welcomeInfo';
import { WelcomeDashComponent } from './dashboard/com.mainmodules.welcomeDash';
import { Termsofuse } from '../common/privacy policy & terms/com.termsofuse';

// import {NgxMaskModule} from 'ngx-mask'
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports:      [ TextInputAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB-1MTGQtZtGBYCy-qClNWHpjFxD6wy4k4',
      libraries:['places']
    }),TagInputModule,
    AngularMultiSelectModule,MatTableModule,DataTableModule,MyDatePickerModule,MatInputModule,MatFormFieldModule,MatAutocompleteModule,SelectModule,BrowserModule,FormsModule,BrowserAnimationsModule,HttpModule,ReactiveFormsModule,RouterModule,CommonModule,FileUploadModule,UserMgmtModule],
  declarations: [ Privacypolicy,Termsofuse,WelcomeComponent,WelcomeDashComponent,WelcomeInfo,AdComponent,DashboardComponent,AboutUsComponent,MailToClientComponent ,MessageComponent ,AdminDashboardComponent,BusinessDashboardComponent,CompareBusinessComponent,AddReviewComponent,PopularListComponent,ReviewComponent, ReviewListComponent,ReportComponent,
                  BeforeSearchComponent,AdBannerComponent,ContactComponent,AdvertisementComponent,UserReportComponent,BusinessClaimedComponent,TrendingBusinessComponent,RightSideComponent,UpdateBusinessComponent, SearchBusinessComponent, PopularSearchComponent,SearchListComponent],
  exports:    [ Privacypolicy,Termsofuse,WelcomeComponent,WelcomeDashComponent,WelcomeInfo,AdComponent, DashboardComponent,AboutUsComponent ,MailToClientComponent,MessageComponent ,AdminDashboardComponent,BusinessDashboardComponent,CompareBusinessComponent,AddReviewComponent,PopularListComponent,ReviewComponent, ReviewListComponent,ReportComponent,
                BeforeSearchComponent,AdBannerComponent ,AdvertisementComponent,ContactComponent, UserReportComponent,BusinessClaimedComponent,TrendingBusinessComponent,RightSideComponent, UpdateBusinessComponent,SearchBusinessComponent,PopularSearchComponent,SearchListComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
               UserProfileService ,
              SessionStorageService,
              LoggingService,AuthGuard],
  
})
export class MainModule { }


