export class Rating{
    id:number;
    userId:number;
    businessId:number;
    
    createdDate:string;
    lastModifiedDate:string;
}

export class Reviews{
    id:number;
    userId:number;
    businessId:number;
    ratingId:string;
    review:string;
    recommended:boolean;
    approved:boolean;
    createdDate:string;
    lastModifiedDate:string;
    pricing:number;
    deliverySpeed:number;
}

export class Bookmark{
    id:number;
    userId:number;
    businessId:number;
    marked:boolean = false;
}