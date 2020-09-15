import { Subject }    from 'rxjs/Subject';


export class SessionDataService
{
    message:String;
    static instance:SessionDataService;
    static isCreating:Boolean = false;
    data={};
 
    constructor() {
        if (!SessionDataService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }
    static init(){
        return this.getInstance();
    }
    static getInstance() {
        if (SessionDataService.instance == null) {
            SessionDataService.isCreating = true;
            SessionDataService.instance = new SessionDataService();
            SessionDataService.isCreating = false;
        }
 
        return SessionDataService.instance;
    }
    setData(key,value){
        //alert(key)
        this.data[key]=value;
    }
    getData(key){
        return this.data[key];
    }
    setMessage(msg:String) {
        this.message = msg;
        console.log(this.message);
    }
 
    getMessage() {
        return this.message;
        //console.log(message);
    }
    setObject (key, valueObj){
        localStorage.setItem(key,valueObj);
    }
    getObject(key){
        return localStorage.getItem(key);
    }

    private categoryValue = new Subject<string>();
    categoryValue$ = this.categoryValue.asObservable();

    categoryValueMethod(totalStr:string){
        this.categoryValue.next(totalStr);
    }

    private countryValue = new Subject<string>();
    countryValue$ = this.countryValue.asObservable();

    countryValueMethod(totalStr:string){
        this.countryValue.next(totalStr);
    }

    private totalCartItemCountSource = new Subject<string>();
    totalCartItemCount$ = this.totalCartItemCountSource.asObservable();

    updateTotalCartItemsCount(totalStr:string){
        this.totalCartItemCountSource.next(totalStr);
    }

    private wishListActive = new Subject<string>();
    wishList$ = this.wishListActive.asObservable();

    updateWishListActive(totalStr:string){
        this.wishListActive.next(totalStr);
    }

    private totalWishListCount = new Subject<string>();
    totalCount$ = this.totalWishListCount.asObservable();

    updateWishListCount(totalStr:string){
        this.totalWishListCount.next(totalStr);
    }

    private searchUpdate = new Subject<any>();
    updateSearch$ = this.searchUpdate.asObservable();

    updateSearch(totalStr:any){
       this.searchUpdate.next(totalStr);
    }

    private userRefresh = new Subject<string>();
    refresh$ = this.userRefresh.asObservable();

    refresh(totalStr:any){
        this.userRefresh.next(totalStr)
    }

    private limitExceed = new Subject<string>();
    limitExceed$ = this.limitExceed.asObservable();
    limitExceeds(totalStr:any){
        this.limitExceed.next(totalStr);
     }

    private moveToFavorite = new Subject<string>();
    moveToFavorite$ = this.moveToFavorite.asObservable();

    moveFavorites(totalStr:any){
        this.moveToFavorite.next(totalStr);
    }

    private favoriteRefresh = new Subject<string>();
    favoriteRefresh$ = this.favoriteRefresh.asObservable();

    refreshFavorite(totalStr:any){
        this.favoriteRefresh.next(totalStr);
    }

    private claimBusiness = new Subject<string>();
    claimBusiness$ = this.claimBusiness.asObservable();

    claimForBusiness(totalStr:any){
        this.claimBusiness.next(totalStr);
    }

    private businessId = new Subject<string>();
    businessId$ = this.businessId.asObservable();

    businessIdRefresh(totalStr:any){
        this.businessId.next(totalStr);
    }
    
    private alertMessage = new Subject<string>();
    alertMessage$ = this.alertMessage.asObservable();

    alertService(totalStr){
        this.alertMessage.next(totalStr);
    }

    private forgotPass = new Subject<string>();
    forgotPass$ = this.forgotPass.asObservable();

    forgotPassword(totalStr){
        this.forgotPass.next(totalStr);
    }

    private toId = new Subject<string>();
    toId$ = this.toId.asObservable();

    toIdMail(totalStr){
        this.toId.next(totalStr);
    }

    private showingAd = new Subject<string>();
    showingAd$ = this.showingAd.asObservable();

    showCurrentAd(totalStr){
        this.showingAd.next(totalStr);
    }

    private bookMarkRefresh = new Subject<string>();
    bookMarkReresh$ = this.bookMarkRefresh.asObservable();

    addbookMarkRefresh(totalStr){
        this.bookMarkRefresh.next(totalStr);
    }

    private addCount = new Subject<string>();
    addCount$ = this.addCount.asObservable();

    addcount(totalStr){
        this.addCount.next(totalStr)
    }

    clear(){
        this.data={};
    }

}