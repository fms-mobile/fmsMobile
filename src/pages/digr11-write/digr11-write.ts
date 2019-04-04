import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { MANTB_DIGR11VO } from '../../model/MANTB_DIGR11VO';
import { Orgn11ListPage } from '../orgn11-list/orgn11-list';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.digr01Group = navParams.data.digr01Group;
    this.index = navParams.data.index;

    this.digr11 = this.digr01Group.digr11List[this.index];

    if(this.digr11 === undefined) {
      this.digr11 = new MANTB_DIGR11VO();
      this.digr01Group.digr11List.push(this.digr11);
      this.index = this.digr01Group.digr11List.length;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11Write');
  }

  goOigr11List() {
    let digr11ListPage = this.modalCtrl.create(Orgn11ListPage,{"digr01Group":this.digr01Group,"index":this.index});
    digr11ListPage.present();
  }

  goSave(){
    this.navCtrl.pop();
  }
}
