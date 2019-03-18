import { Component } from '@angular/core';
import { NavController, ToastController, Events} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { UtilService } from '../../services/UtilService';
import { WebDataProvider } from '../../providers/WebDataProvider'; 
import { GlobalVars } from '../../services/GlobalVars';

import { ViewPage } from '../home/view';
import { WritePage } from '../home/write';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    public testList : [{}];  
   
    constructor(public navCtrl: NavController,
        public toastCtrl: ToastController,
        public barcodeScanner: BarcodeScanner,
        public http: HttpClient,
        public utilService: UtilService,
        public webData: WebDataProvider,
        public storage: Storage,
        public events: Events,
        public globalVars: GlobalVars) {

            console.log(" 화면 최초 로딩 처리");
            this.goSearch();

            // Event 를 수신하는 처리
            this.events.subscribe('list_goSearch', (eventData) => {
                this.goSearch();
            });
        };

        goSearch() {
            this.globalVars.db.comtbTest01.list001({}, (res) => {
                this.testList = res;
                console.log("list size : " + this.testList.length);
            }); 
        }
        
        goWrite() {
            this.navCtrl.push(WritePage);
        }
 
        goView(item) {
            this.navCtrl.push(ViewPage, item);
        }

        ionViewDidLoad() {
            console.log("list 페이지가 로딩 되었을때의 이벤트");
        } 

        ionViewDidEnter() {
            console.log("list 페이지가 활성화 되었을 때 이벤트");
        }

        ionViewWillLeave() {
            console.log("list 페이지를 이동하기 전 이벤트");
        }

        ionViewDidLeave() {
            console.log("list 페이지를 이동한 후 이벤트");
        }

        ionViewWillUnload() {
            console.log("list 페이지가 없어지기 전 이벤트");
        }
 
}