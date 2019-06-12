import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Man21001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man21001-list',
  templateUrl: 'man21001-list.html',
})
export class Man21001ListPage {
  man21001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/man21001_list.do',{page_count:this.page,unit_count:this.unit_count}).subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.man21001List.push(...res);
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

  goManMain(man21001){
    this.navCtrl.push("ManMainPage",{man21001:man21001});
  }
}
