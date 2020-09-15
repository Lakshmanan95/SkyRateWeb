
import { Component ,EventEmitter, Output, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Injector } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core' /*Import View Child*/
import { ActivatedRoute } from '@angular/router';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { SessionDataService } from '../../common/service/com.common.sessiondata'
import { BaseComponent } from '../../common/basic/com.common.basic.basecomponent';
import { AlertService } from '../../common/service/alert/com.common.service.alertservice'
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';

@Component({
    moduleId: module.id,
    selector: 'ebiz-image-uploader',
    templateUrl: 'com.common.imageuploader.html',
    providers: [SessionDataService, RestApiService, Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    inputs: ['imageURL','isExistingImageAvailable','showDeleteButton','isExistingFileAvailable']
})
export class ImageUploader extends BaseComponent {

    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    private IMAGE_UPLOAD_URL;
    uploadedFiles = [];
    isExistingImageAvailable: boolean;
    isExistingFileAvailable: boolean = false;
    showDeleteButton=false;
 //   uploadedURL:string;
    @Output() change = new EventEmitter();
    @Output() changeFile = new EventEmitter();
    @Input() uploaderURL="";
     imageURL="boy.png";
  //   @Input() inputImageURL;
    constructor(private _router: Router,
        injector: Injector, ) {
        super(injector);
        if(this.imageURL!=null){
            this.isExistingImageAvailable=true;
        }
        
      //  this.IMAGE_UPLOAD_URL = this._APIURL +"/"+ this.uploaderURL;
      
        this.uploader = new FileUploader({ url: this.IMAGE_UPLOAD_URL });
     //   alert("ImageURL:"+this.imageURL)
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.uploadedFiles.push(response)
            // alert("response "+response)
            this.imageURL = response;
            this.isExistingImageAvailable = true;
            var url1 = "assets/img/"+this.imageURL
            this.change.emit({uploadedURL: this.imageURL})
        };

    }
    ngInit(){

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    public dragFileAccepted(e: any): void {
     //   alert(this.imageURL)
     this.IMAGE_UPLOAD_URL = this._APIURL +"/"+ this.uploaderURL;
    //  alert(this.IMAGE_UPLOAD_URL)
     this.uploader.setOptions({ url: this.IMAGE_UPLOAD_URL });

      
            this.upload();
     

    }

    public upload() {
        for (let item of this.uploader.queue) {
            if (!item.isSuccess) {
                console.log("Uploading ..." + item._file);
                item.upload()
            }

        }
    }
}