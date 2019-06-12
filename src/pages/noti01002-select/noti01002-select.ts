import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Noti01002SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noti01002-select',
  templateUrl: 'noti01002-select.html',
})
export class Noti01002SelectPage {
  noti01001 : any;
  noti01002 : any;
  mesg01List : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService,
    ) {
      this.noti01001 = navParams.get('noti01001');
      this.goSearch();
  }

  goSearch(event?) {
    let that = this;
    this.transmissionService.getApiData('/api/noti01002_select.do',
    {
      notice_no:this.noti01001.bxmap.notice_no,
    })
    .subscribe((res : {MOBTB_NOTI01 : any, COMTB_MESG01_LIST : Array<any>})=> {
      this.noti01002 = res.MOBTB_NOTI01;
      if(this.noti01002.bxmap.ref_table == 'COMTB_MESG01'){
        this.mesg01List = res.COMTB_MESG01_LIST;
      }
    });
  }

}
