import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ItemSliding, ModalController } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_ENGR01DTO } from '../../model/MANTB_ENGR01DTO';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the engr01List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-engr01-list',
  templateUrl: 'engr01-list.html',
})
export class Engr01ListPage {
  digr01Group : DIGR01_GROUPDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,public utilService:UtilService,public modalCtrl: ModalController) {
    this.digr01Group = navParams.get('digr01Group');
  }

  goWrite(index:number){
    let Engr01WritePageeModal = this.modalCtrl.create("Engr01WritePage", {"digr01Group":this.digr01Group,"index":index});
    Engr01WritePageeModal.present();
  }

  addengr01(){
    let Engr01WritePageeModal = this.modalCtrl.create("Engr01WritePage", {"digr01Group":this.digr01Group});
    Engr01WritePageeModal.present();
  }

  removeItem(engr01:MANTB_ENGR01DTO, i: number){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 기술자 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.digr01Group.engr01List.splice(i, 1);
    },()=>{

    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
