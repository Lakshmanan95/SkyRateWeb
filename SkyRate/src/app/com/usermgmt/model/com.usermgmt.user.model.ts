export class User{
    userName:string;
    firstName:string;
    lastName: string;
    email: string;
    phoneNumber:string;
    password: string;
    confirmPassword:string;
    username:string;
    id:number;
    businessName:string;
    profileImageUrl:string="img/boy.png";
};
export class UserExt{
    userId:number;
    doctorName:string;
    doctorPhone:string;
    profileImageUrl:string;

}
export class ChangePasswordRequest{
    oldPassword: string;
    newPassword: string;
    confirmPassword:string;
    userId: string;
}

export class ContactInfo {
    name:string;
    street:string;
    street2:string;
    city:string;
    state:string;
    country:string;
    zipCode:string;
    phoneNumber:string;
    email:string;
}