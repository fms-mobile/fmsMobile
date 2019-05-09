import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ItemSliding } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { UtilService } from '../../services/UtilService';
import { TempDataManage } from '../../services/TempDataManage';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TransmissionService } from '../../services/transmisson-service';

/**
 * Generated class for the DigrGroup page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr-group',
  templateUrl: 'digr-group.html',
})
export class DigrGroupPage {
  public digrGroupList : [{}];
  public numberOfItemsToDisplay : number = 10;
  digr01GroupList : Array<DIGR01_GROUPDTO>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVars, public utilService: UtilService, private tempDataManage : TempDataManage, private transmissionService : TransmissionService) {
      this.digr01GroupList = tempDataManage.digr01GroupList;
      //this.goSearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr');
  }

  goSearch(){
    this.globalVars.db.mantbDigr01.gorup_list001({pagCount:this.numberOfItemsToDisplay}, (res) => {
      this.digrGroupList = res;
    });
  }

  goView(item){
    this.navCtrl.push("DigrTabWritePage", item);
  }

  goWrite(){
    let digr01Group : DIGR01_GROUPDTO = this.tempDataManage.createDigr01Group();
    this.navCtrl.push("DigrTabWritePage",digr01Group);
  }

  removeItem(digrGroup,i){
    const alertTile = "삭제 알림";
    const alertMessage = "선택한 정기안전점검을 삭제 하시겠습니까?";

    this.utilService.alertConfirm(alertTile,alertMessage,() => {
      this.digr01GroupList.splice(i, 1);
      this.tempDataManage.localDelete(digrGroup);
    },()=>{

    });
  }
  
  syncdata(){
    this.transmissionService.syncAllData(null,null);
  }

  undo = (slidingItem: ItemSliding) => {
    slidingItem.close();
  }
}
