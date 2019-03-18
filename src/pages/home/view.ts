import { Component } from '@angular/core';
import { Platform, Events, NavController, NavParams, ToastController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { UtilService } from '../../services/UtilService';
import { WebDataProvider } from '../../providers/WebDataProvider';
import { GlobalVars } from '../../services/GlobalVars';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
    public item : any = {}; 
   
    constructor(public navCtrl: NavController,
        public toastCtrl: ToastController,
        public alertController: AlertController,
        public barcodeScanner: BarcodeScanner,
        public http: HttpClient,
        public utilService: UtilService,
        public webData: WebDataProvider,
        public storage: Storage,
        public events: Events,
        public globalVars: GlobalVars,
        public param: NavParams) {

            console.log(" 화면 최초 로딩 처리");
            this.item = param.data;
        };
        
    // 페이지 이동 
    goPage(pageGbn: string) {
        if (pageGbn == "back") {
            this.navCtrl.pop();
        }
    }

    goDel() {
        this.presentAlertConfirm();
    }

    ionViewDidLoad() {
        console.log("view 페이지가 로딩 되었을때의 이벤트");
    } 

    ionViewDidEnter() {
        console.log("view 페이지가 활성화 되었을 때 이벤트");
    }

    ionViewWillLeave() {
        console.log("view 페이지를 이동하기 전 이벤트");
    }

    ionViewDidLeave() {
        console.log("view 페이지를 이동한 후 이벤트");
    }

    ionViewWillUnload() {
        console.log("view 페이지가 없어지기 전 이벤트");
    }

    // 삭제 확인 Dialog
    async presentAlertConfirm() {
        const alert = await this.alertController.create({ 
          message: '자료를 삭제하시겠습니까?',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                // 취소 버튼에 대한 처리
              }
            }, {
              text: '확인',
              handler: () => {
                this.globalVars.db.comtbTest01.delete(this.item, (rtn) => { 
                    this.utilService.showToast(this.toastCtrl, "자료를 삭제 하였습니다.", null);
                    // 이벤트 송신처리
                    this.events.publish("list_goSearch");
                    this.navCtrl.pop();
                });;
              }
            }
          ]
        });
    
        await alert.present();
      }
}