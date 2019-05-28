import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, ItemSliding } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { UtilService } from '../../services/UtilService';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR12DTO } from '../../model/MANTB_DIGR12DTO';

/**
 * Generated class for the Digr12ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-digr12-list',
  templateUrl: 'digr12-list.html',
})
export class Digr12ListPage {
  selectIndex : number;
  
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;
  digr12Array : Array<MANTB_DIGR12DTO>;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public globalVars:GlobalVars,public utilService : UtilService
    ,public modalCtrl: ModalController,public toastCtrl: ToastController
    , public viewCtrl: ViewController,) {

      this.digr01Group = navParams.get('digr01Group');
      this.selectIndex = navParams.get('index');

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];
      this.digr12Array = this.digr02.digr12Array;
  }

  addDigr12WriteModal(){
    let digr12WriteModal = this.modalCtrl.create("Digr12WriteModalPage", 
    {
      "digr01Group":this.digr01Group,
      digr02: this.digr02,
      selectMast01: this.selectMast01,
    });
    digr12WriteModal.present();
  }

  goDigr12WriteModal(digr12:MANTB_DIGR12DTO, i:number){
    let digr12WriteModal = this.modalCtrl.create("Digr12WriteModalPage", {
      "digr01Group":this.digr01Group,
      "index":i,
      digr12: digr12,
      digr02: this.digr02,
      selectMast01: this.selectMast01,
    });
    digr12WriteModal.present();
  }

  removeItem(digr12: MANTB_DIGR12DTO,i: number){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 중대결함 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.digr12Array.splice(i, 1);
    },()=>{

    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
