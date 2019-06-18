import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Cof01001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cof01001-list',
  templateUrl: 'cof01001-list.html',
})
export class Cof01001ListPage {
  cof01001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/cof01002_list.do',{page_count:this.page,unit_count:this.unit_count}).subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.cof01001List.push(...res);
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

  goManMain(cof01001){
    this.navCtrl.push("CofMainPage",{cof01001:cof01001});
  }

}
