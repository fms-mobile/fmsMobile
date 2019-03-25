import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { MANTB_DIGR11VO } from '../../model/MANTB_DIGR11VO';

/**
 * Generated class for the Digr11Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr11-write',
  templateUrl: 'digr11-write.html',
})
export class Digr11WritePage {
  digr01Group : DIGR01_GROUPVO;
  index : number;
  digr11 : MANTB_DIGR11VO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.digr01Group = navParams.data.digr01Group;
    this.index = navParams.data.index;
    this.digr11 = this.digr01Group.digr11List[this.index];

    if(this.digr11 === undefined) {
      this.digr11 = new MANTB_DIGR11VO();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11Write');
  }

  goSave(){
    if(this.index === undefined) {
      this.digr01Group.digr11List.push(this.digr11);
    }
    this.navCtrl.pop();
  }
}
