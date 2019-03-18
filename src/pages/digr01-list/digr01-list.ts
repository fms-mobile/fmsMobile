import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

/**
 * Generated class for the Digr01List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr01-list',
  templateUrl: 'digr01-list.html',
})
export class Digr01List {
  digr01 : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVars) {
    this.digr01 = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr01List');
  }

}
