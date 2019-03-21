import { DigrTabWritePage } from './../digr-tab-write/digr-tab-write';
import { DigrTabsPage } from './../digr-tabs/digr-tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { TempDataManage } from '../../services/TempDataManage';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';

/**
 * Generated class for the DigrGroup page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr-group',
  templateUrl: 'digr-group.html',
})
export class DigrGroupPage {
  public digrGroupList : [{}];
  public numberOfItemsToDisplay : number = 10;
  digr01GroupList : Array<DIGR01_GROUPVO>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVars, private tempDataManage : TempDataManage) {
      this.digr01GroupList = tempDataManage.digr01GroupList;
      //this.goSearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr');
  }

  goSearch(){
    this.globalVars.db.mantbDigr01.gorup_list001({pagCount:this.numberOfItemsToDisplay}, (res) => {
      this.digrGroupList = res;
    });
  }

  goView(item){
    this.navCtrl.push(DigrTabWritePage, item);
  }

  goWrite(){
    let digr01Group : DIGR01_GROUPVO = this.tempDataManage.createDigr01Group();
    this.navCtrl.push(DigrTabWritePage,digr01Group);
  }
  
  /* addMoreItem(infiniteScroll: any){
    if (this.digrGroupList.length > this.numberOfItemsToDisplay) {
      this.numberOfItemsToDisplay += 10; // load number of more items
      infiniteScroll.complete();
    }  
  } */

}
