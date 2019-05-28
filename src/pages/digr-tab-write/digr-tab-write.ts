import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform, AlertController, Navbar } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TempDataManage } from '../../services/TempDataManage';
import { UtilService } from '../../services/UtilService';
import { TransmissionService } from '../../services/transmisson-service';
import { Network } from '@ionic-native/network';
import { GlobalVars } from '../../services/GlobalVars';

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
  @ViewChild(Navbar) navBar: Navbar;
  digr01Group : DIGR01_GROUPDTO;
  isCreate : boolean;
  connected;
  disconnected;
  isOnline : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tempDataManage: TempDataManage
    , public utilService: UtilService, plaform :Platform,public transmissionService:TransmissionService
    , private alertCtrl : AlertController, private network : Network, private globalVars : GlobalVars,
     ) {
      this.isOnline = (network.type == 'unknown' || network.type == 'none') ? false : true;
      this.digr01Group = navParams.get('digr01Group');
      this.isCreate = navParams.get('isCreate');
  }

  /* async ionViewCanLeave() {
    const shouldLeave = await this.confirmLeave();
    return shouldLeave;
  } */

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      this.checkNetwork(data.type);
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  checkNetwork(connectionState:string){
    if(connectionState.indexOf('online') > -1) this.isOnline = true;
    if(connectionState.indexOf('offline') > -1) this.isOnline = false;
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
    let validate = this.digr01Group.validateServerObject();

    if(!validate["passFlag"]){
        let alertTile = "검증 에러";
        let alertMessage = validate["msg"];
        let alert = this.alertCtrl.create({
            title: alertTile ,
            message: alertMessage,
            cssClass : "alert-error",
            buttons: [
            {
                text: '확인',
                handler: () => {
                }
            }
            ]
        });
        alert.present();
    } else {
      if(this.isCreate) {
        this.tempDataManage.digr01GroupList.push(this.digr01Group);
      }
      this.tempDataManage.localSave();
    }
  }


  goSend(){
    if(this.isOnline) {
      this.tempDataManage.localSave();
      this.transmissionService.saveData(this.digr01Group);
    } else{
      const alertTile = "전송 에러";
      const alertMessage = '네트워크 연결여부를 확인해주세요.';
      let alert = this.alertCtrl.create({
          title: alertTile ,
          message: alertMessage,
          cssClass : "alert-error",
          buttons: [
          {
              text: '확인',
              handler: () => {
              }
          }
          ]
      });
      alert.present();
    }
  }

  

}
