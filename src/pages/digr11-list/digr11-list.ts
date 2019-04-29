import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ItemSliding } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { UtilService } from './../../services/UtilService';

/**
 * Generated class for the Digr11List page.
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public utilService:UtilService) {
    this.digr01Group = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11List');
  }

  goWrite(index:number){
    this.navCtrl.push("Digr11WritePage",{"digr01Group":this.digr01Group,"index":index});
  }

  addDigr11(){
    this.navCtrl.push("Digr11WritePage",{"digr01Group":this.digr01Group});
  }

  removeItem(digr11:MANTB_DIGR11DTO, i: number){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 기술자 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.digr01Group.digr11List.splice(i, 1);
    },()=>{

    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
