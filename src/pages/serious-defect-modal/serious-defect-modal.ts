import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
//import { MANTB_DIGR12DTO } from '../../model/MANTB_DIGR12DTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';

/**
 * Generated class for the SeriousDefectModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-serious-defect-modal',
  templateUrl: 'serious-defect-modal.html',
})
export class SeriousDefectModalPage {
  selectIndex : number;
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;
  digr11 : MANTB_DIGR11DTO;
  // digr12 : MANTB_DIGR12DTO;

  serious_defectList : Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams,public globalVars:GlobalVars,
    public utilService : UtilService) {

    this.digr01Group = navParams.get('digr01Group');
    this.selectIndex = navParams.get('index');
    // this.digr12 = navParams.get('digr12');
    this.digr11 = navParams.get('digr11');
    this.digr02 = navParams.get('digr02');
     
    this.selectMast01 = navParams.get('selectMast01');
    let facil_gbn = this.selectMast01.facil_no.slice(0,2);

    globalVars.db.comtbCode02.list002({"code_group":"serious_defect","code1" :facil_gbn}, (res) => {
      this.serious_defectList = res;
      if(this.digr11.serious_defect != null){
        let selectedSerious_defect = this.serious_defectList.find(item => item.code2 == this.digr11.serious_defect.code2);
        selectedSerious_defect.selected = true;
      }
    });
  }

  nodeClick(serious_defect) {
    if(serious_defect) {
      //serious_defect.selected = !serious_defect.selected;
      this.digr11.serious_cd = serious_defect.code2;
    } else {
      this.digr11.serious_cd = '';
    }
    this.digr11.serious_defect = serious_defect;

    this.navCtrl.pop();
  }

  goTree01Write(){
    this.navCtrl.pop();
  }
  
  /* goSave(){
    this.digr12.seriousDefectList = [];
    this.serious_defectList.forEach(serious_defect => {
      if(serious_defect.selected) {
        this.digr12.seriousDefectList.push(serious_defect);
      }
    });
    this.digr12.defect_cd = this.digr12.seriousDefectList.map(serious_defect => serious_defect.code2).join('|');
    this.viewCtrl.dismiss(this.digr12);
  } */

}
