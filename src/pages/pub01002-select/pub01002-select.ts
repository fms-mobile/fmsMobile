import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';


/**
 * Generated class for the Pub01002selectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pub01002-select',
  templateUrl: 'pub01002-select.html',
})
export class Pub01002SelectPage {

  pub01001 : any;
  isVent : boolean = false;
  ventArray : Array<String> = new Array<String>();
  end_ymd : any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService
    ) {
      this.pub01001 = navParams.get('pub01001');
      
      this.goSearch();
  }

  goSearch(event?) {
    let that = this;
    this.transmissionService.getApiData('/api/pub01003_select.do',
    {
      facil_no:this.pub01001.bxmap.facil_no
    })
    .subscribe((res : {BASTB_MAST01 : Array<any>})=> {
    
      that.pub01001 = res.BASTB_MAST01;
     
      
    });
  }
}