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

  serious_defectList : [any];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public globalVars:GlobalVars,
    public utilService : UtilService) {

    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
    this.digr12 = navParams.data.digr12;
    this.digr02 = navParams.data.digr02;
     
    this.selectMast01 = navParams.data.selectMast01;
    let facil_gbn = this.selectMast01.facil_no.slice(0,2);

    globalVars.db.comtbCode02.list002({"code_group":"serious_defect","code1" :facil_gbn}, (res) => {
      this.serious_defectList = res;
      Object.assign(this.serious_defectList, this.digr12.seriousDefectList);
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
    this.digr12.seriousDefectList = [];
    this.serious_defectList.forEach(serious_defect => {
      if(serious_defect.selected) {
        this.digr12.seriousDefectList.push(serious_defect);
      }
    });
    this.viewCtrl.dismiss(this.digr12);
  }

  dismiss(){
    this.viewCtrl.dismiss(this.digr12);
  }
}
