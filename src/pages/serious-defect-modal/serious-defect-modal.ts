import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR12DTO } from '../../model/MANTB_DIGR12DTO';

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
  digr12 : MANTB_DIGR12DTO;

  serious_defectList : [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public globalVars:GlobalVars,
    public utilService : UtilService) {

    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
    this.digr12 = navParams.data.digr12;
    this.digr02 = this.digr01Group.digr02List[this.selectIndex];

    let facil_gbn = this.digr01Group.selectedMast01List[this.selectIndex].facil_gbn;

    globalVars.db.comtbCode02.list002({"code_group":"serious_defect","code1" :facil_gbn}, (res) => {
      this.serious_defectList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeriousDefectModal');
  }

  ionViewDidEnter() {
  }

  nodeClick(serious_defect) {
    serious_defect.selected = !serious_defect.selected;
  }
  
  goSave(){
    this.serious_defectList.forEach(serious_defect => {
      this.digr12.seriousDefectList.push(serious_defect);
    });
    this.viewCtrl.dismiss(null);
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
