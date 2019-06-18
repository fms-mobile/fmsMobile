import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';

/**
 * Generated class for the Digr11ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr11-list',
  templateUrl: 'digr11-list.html',
})
export class Digr11ListPage {
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  selectIndex : number;
  digr02 : MANTB_DIGR01DTO;
  digr11List : Array<MANTB_DIGR11DTO>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ) {
    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = navParams.get('index');

    this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
    this.digr02 = this.digr01Group.digr02List[this.selectIndex];

    this.digr11List = this.digr02.digr11Array;
  }

  goDigr11Write() {
    this.navCtrl.push('Digr11WritePage',{digr01Group :this.digr01Group,index:this.selectIndex });
  }
}
