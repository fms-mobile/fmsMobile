import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { BASTB_MAST01VO } from '../../model/BASTB_MAST01VO';
import { MANTB_DIGR11VO } from '../../model/MANTB_DIGR11VO';

/**
 * Generated class for the Orgn11List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-orgn11-list',
  templateUrl: 'orgn11-list.html',
})
export class Orgn11ListPage {
  selectIndex : number;
  digr01Group : DIGR01_GROUPVO;
  selectMast01 : BASTB_MAST01VO;
  digr11 : MANTB_DIGR11VO;

  comtbOrgn11List : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public globalVars:GlobalVars) {
    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
    this.digr11 = this.digr01Group.digr11List[this.selectIndex];

    this.goSearch();
  }

  goSearch(){
    //let selectedIds = this.createSelectedIds();
    let group_cd = "A04780";
    this.globalVars.db.comtbOrgn11.list002({"group_cd":group_cd,"member_nm":"","retire_yn":"Y"}, (res) => {
      this.comtbOrgn11List = res;
    });
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orgn11List');
  }
  
}
