import {Router, RouterModule} from '@angular/router';

//----------

import {SignUpComponent} from './signup/ui/com.usermgmt.signup';
import {ConfirmSignUpComponent} from './signup/ui/com.usermgmt.signup.confirm';
import {SignUpSuccessComponent} from './signup/ui/com.usermgmt.signup.success';
import {SignUpErrorComponent} from './signup/ui/com.usermgmt.signup.error';
import {ForgotUsername} from './forgot/com.usermgmt.forgotusername';
import {ForgotPassword} from './forgot/com.usermgmt.forgotpassword';
import {SkyrateComponent} from './skyrate/com.usermgmt.skyrate';
import {UserProfile} from './profile/com.usermgmt.userprofile';
import {LoginRefreshComponent} from './loginrefresh/com.usermgmt.loginrefresh';

export const UsermgmtRouting = RouterModule.forChild([
  {path: 'signup', component: SignUpComponent},
  {path: 'confirmsignup', component: ConfirmSignUpComponent},
  {path: 'usermgmt.signup.success', component: SignUpSuccessComponent},
  {path: 'usermgmt.signup.error', component: SignUpErrorComponent},
  {path: 'forgot-username', component: ForgotUsername},
  {
    path: 'skyrate', component: SkyrateComponent,
    children: [
      {path: 'forgot-password', component: ForgotPassword, data: {hideSubMenu: true}},
      {path: 'profile-update', component: UserProfile},
      {path: 'refresh', component: LoginRefreshComponent}
    ]
  }


]);
