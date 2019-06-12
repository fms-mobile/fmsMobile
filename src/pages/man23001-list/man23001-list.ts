import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Man23001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man23001-list',
  templateUrl: 'man23001-list.html',
})
export class Man23001ListPage {
  man23001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
      this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/man23001_list.do',
    {
      page_count:this.page,
      unit_count:this.unit_count,
    })
    .subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.man23001List.push(...res);
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
}
