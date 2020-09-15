export class Business {
    id: number=0;
    name:string;
    address:string;
    address2:string;
    address3:string;
    city:string;
    state:string;
    zip:string;
    website:string;
    phoneNumber:string;
    designatorCode:string;
    businessDescription:string;
    certificateNumber:string;
    certificateHoldingOffice:string;
    category:string;
    active:number = 0;
    country:string;
    overview:string | undefined;
    capabilities:string;
    description:string;
    userId:number = 0;
    imageUrl:string = "assets/img/building.jpg";
    adImageUrl:string;
    adImageWebsite:string;
    createdBy:string="Customer"
    createdId:number;
    businessType: number;
}

export class BusinessList {
    
}

export class BusinessRatingSummary{
    id:number;
    businessId:number;
    ratingCount:number = 0;
    reviewCount;number = 0;
    ratingAverage:number =0;
    notRecommend:number;
    isRecommend:number;
    pricingAverage:number;
    overallRating:number;
    deliverySpeedAvg:number;
}

export class BusinessClaimMapping {
    id:number;
    userId:number;
    businessId:number;
    approval:number;
}