import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Coe01001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coe01001-list',
  templateUrl: 'coe01001-list.html',
})
export class Coe01001ListPage {
  coe01001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/coe01002_list.do',{page_count:this.page,unit_count:this.unit_count}).subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.coe01001List.push(...res);
          this.page = this.page + 1;
        } else{
          this.isPaging = false;  
        }
        
        if(event) {
          event.complete();
        }
      },200);
    });
  }

  goManMain(coe01001){
    this.navCtrl.push("CoeMainPage",{coe01001:coe01001});
  }

}
