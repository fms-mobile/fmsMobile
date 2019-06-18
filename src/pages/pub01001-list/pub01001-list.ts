import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Pub01001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pub01001-list',
  templateUrl: 'pub01001-list.html',
})
export class Pub01001ListPage {
  pub01001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/pub01002_list.do',{page_count:this.page,unit_count:this.unit_count}).subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.pub01001List.push(...res);
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

  goManMain(pub01001){
    this.navCtrl.push("PubMainPage",{pub01001:pub01001});
  }

  goPub01002Select(pub01001){
    this.navCtrl.push("Pub01002SelectPage",{pub01001:pub01001});
  }

}
