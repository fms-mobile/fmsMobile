import { DigrTabWrite } from './../digr-tab-write/digr-tab-write';
import { DigrTabs } from './../digr-tabs/digr-tabs';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

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
export class DigrGroup {
  public digrGroupList : [{}];
  public numberOfItemsToDisplay : number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVars) {
      this.goSearch();
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
    this.navCtrl.push(DigrTabs, item);
  }

  goWrite(){
    this.navCtrl.push(DigrTabWrite);
  }

  /* addMoreItem(infiniteScroll: any){
    if (this.digrGroupList.length > this.numberOfItemsToDisplay) {
      this.numberOfItemsToDisplay += 10; // load number of more items
      infiniteScroll.complete();
    }  
  } */

}
