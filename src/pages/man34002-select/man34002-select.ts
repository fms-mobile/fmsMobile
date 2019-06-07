import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Man34002SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man34002-select',
  templateUrl: 'man34002-select.html',
})
export class Man34002SelectPage {
  man21001 : any;
  man34001 : any;
  amdr01 : any;
  amdr11List : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService,
    ) {
      this.man21001 = navParams.get('man21001');
      this.man34001 = navParams.get('man34001');
      this.goSearch();
  }

  goSearch(event?) {
    let that = this;
    this.transmissionService.getApiData('/api/man34002_select.do',
    {
      facil_no:this.man34001.bxmap.facil_no,
      amend_seq:this.man34001.bxmap.amend_seq,
    })
    .subscribe((res : {MANTB_AMDR01 : any, MANTB_AMDR11_LIST : Array<any>})=> {
      that.amdr01 = res.MANTB_AMDR01;
      that.amdr11List = res.MANTB_AMDR11_LIST;
    });
  }
}
