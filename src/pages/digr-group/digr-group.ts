import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ItemSliding } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { UtilService } from '../../services/UtilService';
import { TempDataManage } from '../../services/TempDataManage';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { TransmissionService } from '../../services/transmisson-service';
import { MenuService } from '../../services/menu-service';

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
  public digrGroupList : Array<DIGR01_GROUPDTO>;
  public numberOfItemsToDisplay : number = 10;
  digr01GroupList : Array<DIGR01_GROUPDTO>;
  menuObject : Object;
  searchTerm: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public globalVars: GlobalVars, public utilService: UtilService, private tempDataManage : TempDataManage,
    private transmissionService : TransmissionService, private menuService : MenuService) {
      this.menuObject = menuService.getDigrGroupMenu();

      this.tempDataManage.loadLoctbData01().then(()=>{
        this.digr01GroupList = tempDataManage.digr01GroupList;
        this.digrGroupList = this.digr01GroupList;
        this.navCtrl.viewWillLeave.subscribe(()=>{
          this.tempDataManage.autoSave();
        });
      });
  }

  findDigr01Group(){
    let searchKey =this.searchTerm;
    this.digrGroupList = this.digr01GroupList.filter((data,index) => {
      let digr01 = data.digr01;
      let name : string;
      if(digr01.regular_gbn_nm) {
        name = digr01.regular_gbn_nm + ' ' + digr01.dign_gbn_nm;
      } else {
        name = '정기안전점검 리스트 '+(index+1);
      }

      return name.includes(searchKey);
    });
  }

  goView(item : DIGR01_GROUPDTO){
    let digr01Group = item;
    if(item.transFlag) {
      digr01Group = JSON.parse(JSON.stringify(item));
    }
    // (item.transFlag) ? Object.assign(digr01Group,item) : digr01Group = item;

    this.navCtrl.push("DigrTabWritePage", {digr01Group:digr01Group,isCreate: false});
  }

  goWrite(){
    let digr01Group : DIGR01_GROUPDTO = new DIGR01_GROUPDTO();
    this.navCtrl.push("DigrTabWritePage",{digr01Group:digr01Group,isCreate: true});
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
