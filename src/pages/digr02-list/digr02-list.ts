import { GlobalVars } from './../../services/GlobalVars';
import { UtilService } from './../../services/UtilService';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, ItemSliding, ModalOptions } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';

/**
 * Generated class for the Digr02List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr02-list',
  templateUrl: 'digr02-list.html',
})
export class Digr02ListPage {
  selectedMast01List : Array<BASTB_MAST01DTO>;
  digr01Group : DIGR01_GROUPDTO;
  defaultImg : string = 'assets/images/avatar/17.jpg';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars, public utilService:UtilService,public modalCtrl: ModalController) {
    this.digr01Group = navParams.data;
    this.selectedMast01List = this.digr01Group.selectedMast01List;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02List');
  }

  goWrite(digr01Group : DIGR01_GROUPDTO, index: number){
    /* let mast01ListPageModal = this.modalCtrl.create(Digr02WritePage, {"digr01Group":this.digr01Group,"index":index});
    mast01ListPageModal.present(); */
    let digr02WritePageModal = this.modalCtrl.create("Digr02WritePage", {"digr01Group":this.digr01Group,"index":index});
    digr02WritePageModal.present();
  }

  async addMast01(){
    const modalOptions = {
      cssClass: 'test'
    }
    const mast01ListPageModal = await this.modalCtrl.create("Mast01ListPage", this.digr01Group,modalOptions);
    return await mast01ListPageModal.present();
  }

  goDigr13(event:any,index: number){
    event.stopPropagation();
    this.navCtrl.push("Digr13WritePage",{"digr01Group":this.digr01Group,"index":index});
  }

  removeItem(mast01: BASTB_MAST01DTO,i: number){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 시설물 점검 정보를 삭제 하시겠습니까?";
    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.selectedMast01List.splice(i, 1);
      this.digr01Group.digr02List.splice(i, 1);
    },()=>{

    });
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
