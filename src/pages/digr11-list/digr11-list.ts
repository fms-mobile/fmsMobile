import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Digr11WritePage } from '../digr11-write/digr11-write';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';

/**
 * Generated class for the Digr11List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr11-list',
  templateUrl: 'digr11-list.html',
})
export class Digr11ListPage {
  digr01Group : DIGR01_GROUPVO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.digr01Group = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11List');
  }

  goWrite(index:number){
    this.navCtrl.push(Digr11WritePage,{"digr01Group":this.digr01Group,"index":index});
  }

  addDigr11(){
    this.navCtrl.push(Digr11WritePage,{"digr01Group":this.digr01Group});
  }
}
