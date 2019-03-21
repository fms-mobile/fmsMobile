import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

/**
 * Generated class for the Digr01Select page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-digr01-select',
  templateUrl: 'digr01-select.html',
})
export class Digr01SelectPage {
  digr01_select : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVars) {
    this.digr01_select = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr01Select');
  }

}
