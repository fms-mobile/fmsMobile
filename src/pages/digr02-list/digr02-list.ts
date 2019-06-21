import { GlobalVars } from './../../services/GlobalVars';
import { UtilService } from './../../services/UtilService';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, ItemSliding, ModalOptions, ViewController } from 'ionic-angular';
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
    this.digr01Group = navParams.get('digr01Group');
    this.selectedMast01List = this.digr01Group.selectedMast01List;
  }

  goWrite(mast01 : BASTB_MAST01DTO, index: number){
    let thisView : ViewController = this.navCtrl.last();
    this.navCtrl.push("FacilMainPage",{"digr01Group":this.digr01Group,"mast01":mast01,"index":index,"prevView":thisView});
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

  goViewTransDigr(event: Event,index :number){
    event.stopPropagation();

    /* const viewUrl = '/man32002_select.do';
    const title = '서버 전송 데이터 조회';
    let webUrl = this.globalVars.webUrl+"mobile";
    let fullUrl = webUrl + viewUrl;
    let transdata = this.digr01Group.responseObject[index];
    let facil_no = transdata.facil_no;
    let dign_seq = transdata.digr01rbox.bxmap.dign_seq;
    fullUrl += '?facil_no='+facil_no;
    fullUrl += '&dign_seq='+dign_seq;

    this.navCtrl.push("Iframe",{"url":fullUrl,"title":title}); */

    this.navCtrl.push("Man32002SelectPage",{man21001:this.man21001,man32001:man32001});
  }
}
