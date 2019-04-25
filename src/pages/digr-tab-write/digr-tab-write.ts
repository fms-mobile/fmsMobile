import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TempDataManage } from '../../services/TempDataManage';

/**
 * Generated class for the DigrTabWrite page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr-tab-write',
  templateUrl: 'digr-tab-write.html',
})
export class DigrTabWritePage {
  digr01Group : DIGR01_GROUPDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tempDataManage: TempDataManage ) {
    this.digr01Group = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigrTabWrite');
  }

  ionViewDidEnter(){
    
  }

  goSave(){
    this.tempDataManage.localSave();
  }
}
