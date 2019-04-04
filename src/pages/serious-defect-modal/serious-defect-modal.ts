import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { GlobalVars } from '../../services/GlobalVars';

import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { BASTB_MAST01VO } from '../../model/BASTB_MAST01VO';
import { MANTB_DIGR01VO } from '../../model/MANTB_DIGR01VO';

/**
 * Generated class for the SeriousDefectModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-serious-defect-modal',
  templateUrl: 'serious-defect-modal.html',
})
export class SeriousDefectModalPage {
  selectOptions : any = {};
  selectIndex : number;
  digr01Group : DIGR01_GROUPVO;
  selectMast01 : BASTB_MAST01VO;
  digr02 : MANTB_DIGR01VO;

  serious_defectList : [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public globalVars:GlobalVars,
    private elementRef : ElementRef, public utilService : UtilService,public renderer :Renderer2) {
    this.selectOptions["multiple"] = true;

    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
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
    this.selectOptions["AllItems"] = this.elementRef.nativeElement.querySelectorAll('ion-item');
  }
  
  goSave(){

  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
