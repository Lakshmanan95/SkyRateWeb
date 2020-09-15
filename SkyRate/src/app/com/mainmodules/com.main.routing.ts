import { Termsofuse } from './../common/privacy policy & terms/com.termsofuse';
import { Privacypolicy } from './../common/privacy policy & terms/com.privacypolicy';
import {Router, RouterModule} from '@angular/router';
import {BeforeSearchComponent} from './homepage/beforeSearch/com.beforeSearch';
import {DashboardComponent} from './dashboard/com.mainmodules.dashboard';
import {ReviewComponent} from './review/com.mainmodules.review';
import {SearchListComponent} from './searchbusiness/com.main.searchList';
import {ReportComponent} from './report/com.mainmodules.report';
import {PopularListComponent} from './popularsearches/com.main.popularList';
import {UpdateBusinessComponent} from './updatebusiness/com.main.updateBusiness';
import {CompareBusinessComponent} from './compare/com.main.compare';
import {UserReportComponent} from './report/com.main.userreport';
import {BusinessDashboardComponent} from './dashboard/com.mainmodules.businessDash';
import {AuthGuard} from '../service/com.service.authservice';

import {BusinessClaimedComponent} from './businessClaimed/com.main.businessclaimed';
import {AdminDashboardComponent} from './dashboard/com.mainmodules.admin';
import {MessageComponent} from './inbox/com.main.message';
import {MailToClientComponent} from './mailToClient/com.main.mailToClient';
import {ContactComponent} from './contact/com.contact';
import {AboutUsComponent} from './aboutus/com.aboutus';
import {AdComponent} from './advertisement/com.adadvertisement';
import {WelcomeComponent} from '../common/register/com.common.welcome';
import {WelcomeDashComponent} from './dashboard/com.mainmodules.welcomeDash';
import {WelcomeInfo} from './welcomeInfo/com.mainmodules.welcomeInfo';
import {AuthRouteGuard} from '../service/com.guard.router.authservice';
//----------


export const MainModuleRouting = RouterModule.forChild([
  {path: 'search', component: DashboardComponent},
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'review/:id1/:id2', component: ReviewComponent},
      {path: 'reviewBusiness/:id', component: ReviewComponent},
      {path: 'search-list', component: SearchListComponent},
      {path: 'popular-searches', component: PopularListComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'feedback', component: ContactComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'privacypolicy', component:Privacypolicy },
      {path: 'termsofuse', component:Termsofuse},
     
//    {path:'update_business', component:UpdateBusinessComponent},
//    {path:'edit_business/:id', component:UpdateBusinessComponent},


    ]
  },
  {
    path: 'business', component: BusinessDashboardComponent,
    children: [
      {path: 'update_business', component: UpdateBusinessComponent},
      {path: 'mail', component: MailToClientComponent},
      {path: 'message', canActivate: [AuthRouteGuard], component: MessageComponent},
      {path: 'message/:toUserId', canActivate: [AuthRouteGuard], component: MessageComponent},
      {path: 'edit_business/:id', component: UpdateBusinessComponent},
      {path: 'compare', component: CompareBusinessComponent},
      {path: 'business-claimed', canActivate: [AuthGuard], component: BusinessClaimedComponent},
      {path: 'userReport/:id1/:id2', component: UserReportComponent}
    ]
  },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      {path: 'report', canActivate: [AuthGuard], component: ReportComponent},
      {path: 'adadvertisement', component: AdComponent},
      {path: 'welcome', component: WelcomeComponent},
    ]
  },
  {
    path: 'welcome', component: WelcomeDashComponent,
    children: [
      {path: 'info', component: WelcomeInfo}
    ]
  }
]);
