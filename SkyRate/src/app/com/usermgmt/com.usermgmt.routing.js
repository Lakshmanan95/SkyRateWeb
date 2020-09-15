"use strict";
var router_1 = require('@angular/router');
//----------
var com_usermgmt_signup_1 = require('./signup/ui/com.usermgmt.signup');
var com_usermgmt_signup_confirm_1 = require('./signup/ui/com.usermgmt.signup.confirm');
var com_usermgmt_signup_success_1 = require('./signup/ui/com.usermgmt.signup.success');
var com_usermgmt_signup_error_1 = require('./signup/ui/com.usermgmt.signup.error');
var com_usermgmt_forgotusername_1 = require('./forgot/com.usermgmt.forgotusername');
var com_usermgmt_forgotpassword_1 = require('./forgot/com.usermgmt.forgotpassword');
exports.UsermgmtRouting = router_1.RouterModule.forChild([
    { path: 'signup', component: com_usermgmt_signup_1.SignUpComponent },
    { path: 'confirmsignup', component: com_usermgmt_signup_confirm_1.ConfirmSignUpComponent },
    { path: 'usermgmt.signup.success', component: com_usermgmt_signup_success_1.SignUpSuccessComponent },
    { path: 'usermgmt.signup.error', component: com_usermgmt_signup_error_1.SignUpErrorComponent },
    { path: 'forgot-username', component: com_usermgmt_forgotusername_1.ForgotUsername },
    { path: 'forgot-password', component: com_usermgmt_forgotpassword_1.ForgotPassword }
]);
//# sourceMappingURL=com.usermgmt.routing.js.map