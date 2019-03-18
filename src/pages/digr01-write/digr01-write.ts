import { MANTB_DIGR01VO } from './../../model/MANTB_DIGR01VO';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';


/**
 * Generated class for the Digr01Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr01-write',
  templateUrl: 'digr01-write.html',
})
export class Digr01Write {
  regular_gbnList : [{}];
  digr01 : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams , globalVars: GlobalVars ) {
    this.digr01 = globalVars.digr01;

    globalVars.db.comtbCode02.list002({code_group:"regular_gbn",}, (res) => {
      this.regular_gbnList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr01Write');
  }

}
