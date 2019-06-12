import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the Man32001ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man32001-list',
  templateUrl: 'man32001-list.html',
})
export class Man32001ListPage {
  man21001 : any;
  man32001List : Array<any> = new Array<any>();
  isPaging : boolean = true;
  page : number = 1;
  unit_count : number = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private transmissionService : TransmissionService,
    ) {
    this.man21001 = navParams.get('man21001');
    this.goSearch();
  }

  goSearch(event?) {
    this.transmissionService.getApiData('/api/man32001_list.do',
    {
      page_count:this.page,
      unit_count:this.unit_count,
      facil_no:this.man21001.bxmap.facil_no,
    })
    .subscribe((res : Array<any>)=> {

      setTimeout(() => {
        if(res.length > 0) {
          this.man32001List.push(...res);
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

  goMan32002Select(man32001){
    this.navCtrl.push("Man32002SelectPage",{man21001:this.man21001,man32001:man32001});
  }
}
