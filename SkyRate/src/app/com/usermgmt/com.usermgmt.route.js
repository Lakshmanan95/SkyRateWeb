"use strict";
var router_1 = require('@angular/router');
//----------
var com_usermgmt_signup_1 = require('./com/usermgmt/signup/ui/com.usermgmt.signup');
var com_usermgmt_signup_confirm_1 = require('./com/usermgmt/signup/ui/com.usermgmt.signup.confirm');
var com_usermgmt_signup_success_1 = require('./com/usermgmt/signup/ui/com.usermgmt.signup.success');
exports.usermgmtRouting = router_1.RouterModule.forChild([
    { path: 'signup', component: com_usermgmt_signup_1.SignUpComponent },
    { path: 'confirmsignup', component: com_usermgmt_signup_confirm_1.ConfirmSignUpComponent },
    { path: 'signupsuccess', component: com_usermgmt_signup_success_1.SignUpSuccessComponent }
]);
//# sourceMappingURL=com.usermgmt.route.js.map