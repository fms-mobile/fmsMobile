import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';


/**
 * Generated class for the Inf01002selectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inf01002-select',
  templateUrl: 'inf01002-select.html',
})
export class Inf01002SelectPage {

  inf01001 : any;
  inf11List : Array<any> = new Array<any>();
  isVent : boolean = false;
  ventArray : Array<String> = new Array<String>();
  end_ymd : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService
    ) {
      this.inf01001 = navParams.get('inf01001');
      
      this.goSearch();
  }

  goSearch(event?) {
    let that = this;
    this.transmissionService.getApiData('/api/inf01002_select.do',
    {
      board_no:this.inf01001.bxmap.board_no
    })
    .subscribe((res : {COMTB_BOAD01 : Array<any>})=> {
    
      that.inf01001 = res.COMTB_BOAD01;
     
      
    });
  }
}