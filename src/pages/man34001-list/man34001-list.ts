import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Man34001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man34001-list',
  templateUrl: 'man34001-list.html',
})
export class Man34001ListPage {
  man21001 : any;
  man34001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private transmissionService : TransmissionService,
    ) {
    this.man21001 = navParams.get('man21001');
    this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/man34001_list.do',
    {
      page_count:this.page,
      unit_count:this.unit_count,
      facil_no:this.man21001.bxmap.facil_no,
    })
    .subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.man34001List.push(...res);
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

  goMan34002Select(man34001){
    this.navCtrl.push("Man34002SelectPage",{man21001:this.man21001,man34001:man34001});
  }
}
