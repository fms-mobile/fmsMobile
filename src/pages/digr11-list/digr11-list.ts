import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { UtilService } from '../../services/UtilService';

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
    , private utilService : UtilService,
  ) {
    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = navParams.get('index');

    this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
    this.digr02 = this.digr01Group.digr02List[this.selectIndex];

    this.digr11List = this.digr02.digr11Array;
  }

  goDigr11Write(digr11) {
    let param = {digr01Group :this.digr01Group,index:this.selectIndex };
    if(digr11)  param['digr11'] = digr11;
    this.navCtrl.push('Digr11WritePage',param);
  }

  removeItem(digr11: MANTB_DIGR11DTO,i: number){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 결함 및 손상 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.digr11List.splice(i, 1);
    },()=>{
    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
