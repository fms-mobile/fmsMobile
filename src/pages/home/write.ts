import { Component } from '@angular/core';
import { Platform, Events, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { UtilService } from '../../services/UtilService';
import { WebDataProvider } from '../../providers/WebDataProvider';
import { GlobalVars } from '../../services/GlobalVars';

@Component({
  selector: 'page-write',
  templateUrl: 'write.html'
})
export class WritePage {
    public item : any = {f1 : "",
                         f2 : "", 
                         f3 : ""};
   
    constructor(public navCtrl: NavController,
        public toastCtrl: ToastController,
        public barcodeScanner: BarcodeScanner,
        public http: HttpClient,
        public utilService: UtilService,
        public webData: WebDataProvider,
        public storage: Storage,
        public events: Events,
        public globalVars: GlobalVars,
        public param: NavParams) {

            console.log(" 화면 최초 로딩 처리"); 
        };
        
    // 페이지 이동 
    goPage(pageGbn: string) {
        if (pageGbn == "back") {
            this.navCtrl.pop();
        }
    }

    goReg() {
        if (this.item.f1 == "") {
            //alert("f1을 등록하여 주십시오.");
            this.utilService.showToast(this.toastCtrl, "f1을 등록하여 주십시오.", null);
            return;
        }

        this.globalVars.db.comtbTest01.insert(this.item, (rtn) => { 
            this.utilService.showToast(this.toastCtrl, "신규 자료를 등록하였습니다.", null);
            // 이벤트 송신 처리
            this.events.publish("list_goSearch");
            this.navCtrl.pop();
        });;
    }
}