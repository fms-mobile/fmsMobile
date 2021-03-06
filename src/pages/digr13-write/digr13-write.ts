import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR13DTO } from '../../model/MANTB_DIGR13DTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
import { GlobalVars } from '../../services/GlobalVars';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the Digr13Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr13-write',
  templateUrl: 'digr13-write.html',
})
export class Digr13WritePage {
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  index : number;
  digr02 : MANTB_DIGR01DTO;
  digr13Array : Array<MANTB_DIGR13DTO>;
  dign1_checklist : Array<any>;
  dign1_checkObject : Object;
  check_resultList : Array<any> =
  [
    {value:"1",name:"양호"},
    {value:"2",name:"보통"},
    {value:"3",name:"불량"},
    {value:"",name:"해당없음"},
  ];
  placeholder : Object = {
    amend_need_yn : "보수필요 여부",
    dign_opinion : "의견 입력"
  };
  codeMap : { depth,array,data,code_prefix } = {
    depth : "depth",
    array : "array",
    data : "data",
    code_prefix : "check_cd",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public globalVars: GlobalVars
    ,public utilService : UtilService,public toastCtrl: ToastController) {
    this.digr01Group = navParams.get('digr01Group');
    this.index = navParams.get('index');
    this.digr02 = navParams.get('digr02');
    this.selectMast01 = navParams.get('selectMast01');

    this.dign1_checkObject = navParams.get('dign1_checkObject');
    this.dign1_checklist = navParams.get('dign1_checklist');
    this.digr13Array = navParams.get('digr13Array');
  }

  goSave(){
    let prevView : ViewController = this.navParams.get('prevView');
    this.navCtrl.push("Digr02WritePage",{"digr01Group":this.digr01Group,"index":this.index, prevView: prevView});
  }

  goPrev(){
    this.navCtrl.pop();
  }

  goExit(){
    this.navCtrl.popToRoot();
  }

}