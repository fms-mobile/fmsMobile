import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';
import { DateFormatPipe } from '../../pipes/date-format/date-format';

/**
 * Generated class for the Man32002SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man32002-select',
  templateUrl: 'man32002-select.html',
})
export class Man32002SelectPage {
  man21001 : any;
  man32001 : any;
  digr01 : any = {};
  isViewHeader : boolean = false;
  engr01List : Array<any> = new Array<any>();
  digr11List : Array<any> = new Array<any>();
  digr12List : Array<any> = new Array<any>();
  isVent : boolean = false;
  ventArray : Array<String> = new Array<String>();
  end_ymd : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService, private dateFormatPipe : DateFormatPipe,
    ) {
      this.man21001 = navParams.get('man21001');
      this.man32001 = navParams.get('man32001');
      this.isViewHeader = navParams.get('isViewHeader') ? true : false;
      this.goSearch();
  }

  goSearch(event?) {
    let that = this;
    this.transmissionService.getApiData('/api/man32002_select.do',
    {
      facil_no:this.man32001.bxmap.facil_no,
      dign_seq:this.man32001.bxmap.dign_seq,
    })
    .subscribe((res : {MANTB_DIGR01 : any, MANTB_ENGR01_LIST : Array<any>, MANTB_DIGR11_LIST: Array<any>, MANTB_DIGR12_LIST: Array<any>})=> {
      that.digr01 = res.MANTB_DIGR01;
      that.engr01List = res.MANTB_ENGR01_LIST;
      that.digr11List = res.MANTB_DIGR11_LIST;
      that.digr12List = res.MANTB_DIGR12_LIST;

      // 기존로직 사용
      that.isVent = ('AR,TU,UC'.indexOf(that.man32001.bxmap.facil_no.substr(0,2)) >= 0 && that.digr01.vent_content != '' && that.digr01.dign_gbn.startsWith('1')) ? true : false;

      if(that.isVent) {
        const splitor = 'Ð';
        let vent_content = that.digr01.vent_content+splitor+splitor;
        that.ventArray = vent_content.split(splitor);
      }

      if(that.digr01.dign4_need_yn == 'Y') {
        const end_ymd = that.digr01.end_ymd;
        let endDate = this.dateFormatPipe.returnDate(end_ymd,'YYYYMMDD');
        const year = endDate.getFullYear() + 1;
        endDate.setFullYear(year);

        that.end_ymd = this.dateFormatPipe.superTransform(endDate,'longDate');
      }
    });
  }

}
