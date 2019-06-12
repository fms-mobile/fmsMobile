import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Noti01001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noti01001-list',
  templateUrl: 'noti01001-list.html',
})
export class Noti01001ListPage {
  noti01001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService,
    ) {

      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/noti01001_list.do',
    {
      page_count:this.page,
      unit_count:this.unit_count,
    })
    .subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.noti01001List.push(...res);
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

  goNoti01002Select(noti01001){
    this.navCtrl.push("Noti01002SelectPage",{noti01001:noti01001});
  }
}
