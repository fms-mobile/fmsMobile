import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TempDataManage } from '../../services/TempDataManage';
import { UtilService } from '../../services/UtilService';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the DigrTabWrite page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr-tab-write',
  templateUrl: 'digr-tab-write.html',
})
export class DigrTabWritePage {
  digr01Group : DIGR01_GROUPDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tempDataManage: TempDataManage
    , public utilService: UtilService, plaform :Platform,public transmissionService:TransmissionService ) {
    this.digr01Group = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigrTabWrite');
  }

  async ionViewCanLeave() {
    const shouldLeave = await this.confirmLeave();
    return shouldLeave;
  }

  confirmLeave(){
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);

    if(!this.tempDataManage.checkDigr01GroupValidate(null)) {
      const alertTile = "삭제 알림";
      const alertMessage = "점검 필수정보를 입력하지 않아 점검 정보 데이터가 삭제됩니다. 삭제하시겠습니까?";
      this.utilService.alertConfirm(alertTile,alertMessage,() => {
        this.tempDataManage.digr01GroupList.pop();
        resolveLeaving(true);
      },()=>{
        resolveLeaving(false);
      });
    } else {
      resolveLeaving(true);
    }
    return canLeave;
  }

  goSave(){
    this.tempDataManage.localSave();
  }

  goSend(){
    this.tempDataManage.localSave();
    this.transmissionService.saveData(this.digr01Group);
  }
}
