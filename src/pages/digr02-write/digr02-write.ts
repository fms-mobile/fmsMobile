import { GlobalVars } from './../../services/GlobalVars';
import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';

/**
 * Generated class for the Digr02Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr02-write',
  templateUrl: 'digr02-write.html',
})

export class Digr02WritePage {
  selectIndex : number;
  state_gradeList : Array<any> = [];
  vent_amend_ynList :Array<any> = [
    {text:'보수필요',value:'Y'},
    {text:'보수불필요',value:'N'},
    {text:'해당없음',value:'X'},
  ];
  
  digr01Group : DIGR01_GROUPDTO;
  selectMast01 : BASTB_MAST01DTO;
  digr02 : MANTB_DIGR01DTO;
  placeholder : Object ={
    dign_content: "주요 점검진단결과 입력",
    amend_content: "주요 보수보강(안) 입력",
    dign_amt : "비용 입력",
    dign4_need_yn : "정밀안전진단 필요",
    vent_amend_yn : "환기구 보수 필요 여부",
    vent_chk_result : "환기구 점검 결과 입력",
  };

  isFacilClass : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public globalVars:GlobalVars,public utilService : UtilService
    ,public modalCtrl: ModalController,public toastCtrl: ToastController
    , public viewCtrl: ViewController, ) {
      this.digr01Group = navParams.get('digr01Group');
      this.selectIndex = navParams.get('index');

      this.selectMast01 = this.digr01Group.selectedMast01List[this.selectIndex];
      this.digr02 = this.digr01Group.digr02List[this.selectIndex];

      // 기존 로직에서 등급 구분 방식 적용
      let data5 : any = "";
      if(this.digr02.dign_gbn.substring(0,1) == '2' || this.digr02.dign_gbn.substring(0,1) == '3' || this.selectMast01.facil_class == '3') {
        data5 = '2';
      } else if(this.digr02.dign_gbn.substring(0,1) == '1' || this.digr02.dign_gbn.substring(0,1) == '9') {
        data5 = '1';
      } else {
      }
      globalVars.db.comtbCode02.list002({code_group:"state_grade",data5 :data5}, (res) => {
        this.state_gradeList = res;
      });

      this.isFacilClass = ('1,2'.includes(this.selectMast01.facil_class)) ? true : false;
      
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  goSave(){
    this.viewCtrl.dismiss();
  }

  goDigr02ListModal() {
    let digr02ListModal = this.modalCtrl.create("Digr02ListModalPage", this.digr01Group);
    digr02ListModal.present();

    let that = this;

    digr02ListModal.onWillDismiss((data: { digr01Group : DIGR01_GROUPDTO, index:number }) => {
      if(data != null){
        that.selectIndex = data.index;
        that.selectMast01 = data.digr01Group.selectedMast01List[data.index];
        that.digr02 = data.digr01Group.digr02List[data.index];
      }
    });
  }

  state_gradeChange(event,state_grade){
    this.digr02.state_grade_nm = state_grade.data1
  }

  ventChange(event){
    if(!event.checked) {
      this.digr02.vent_amend_yn = 'X';
      this.digr02.vent_chk_result = '';
      this.digr02.vent_content = '';
    }
  }

  addDigr12WriteModal() {
    let digr12WriteModal = this.modalCtrl.create("Digr12WriteModalPage", {"digr01Group":this.digr01Group,"index":this.selectIndex});
    digr12WriteModal.present();
  }

  goPrev(){
    let prevIndex = this.selectIndex-1;
    let prevSelectMast01 = this.digr01Group.selectedMast01List[prevIndex];
    let prevDigr02 = this.digr01Group.digr02List[prevIndex];

    if(prevSelectMast01 && prevDigr02) {
      this.selectIndex = prevIndex;
      this.selectMast01 = prevSelectMast01;
      this.digr02 = prevDigr02;
    } else {
      this.utilService.showToast(this.toastCtrl, "처음 시설물입니다.",null);
    }
  }

  goNext(){
    let prevView = this.navParams.get('prevView');
    let prevViewIndex = this.navCtrl.indexOf(prevView);
    this.navCtrl.popTo(prevView);

    /* let thisView : ViewController = this.navCtrl.last();


    this.navCtrl.push("Digr13_1ListPage",{"digr01Group":this.digr01Group,"index":this.selectIndex,"prevView":thisView}); */
  }

  async ionViewCanLeave() {
    const shouldLeave = await this.confirmLeave();
    return shouldLeave;
  }

  confirmLeave(){
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    let validate = this.validateDigr02();

    if(validate.passFlag) {
      const alertTile = "필수 입력 알림";
      const alertMessage = validate.msg + '';
      this.utilService.alertConfirm(alertTile,alertMessage,() => {
        resolveLeaving(true);
      },()=>{
        resolveLeaving(false);
      });
    } else {
      resolveLeaving(true);
    }
    return canLeave;
  }

  validateDigr02() : {passFlag : boolean ,msg: string} {
    let returnObject : {passFlag : boolean ,msg: string} = {passFlag:true,msg:''};
    let passFlag = true;
    let msg = "";

    // MANTB_DIGR01 체크
    let digr02 = this.digr02;
    while (true) {
      if(!digr02.dign_content || digr02.dign_content == '') {
          passFlag = false;
          msg = '주요 점검진단결과를 입력하지 않았습니다.';
          break;
      }
      if(!digr02.start_ymd || digr02.start_ymd == '') {
          passFlag = false;
          msg = '주요 보수보강(안)을 입력하지 않았습니다.';
          break;
      }
      if(!digr02.dign_amt) {
          passFlag = false;
          msg = '비용을 입력하지 않았습니다.';
          break;
      }
      if(!digr02.state_grade || digr02.state_grade == '') {
          passFlag = false;
          msg = '안전등급을 입력하지 않았습니다.';
          break;
      }
      break;
    }

    returnObject["passFlag"] = passFlag;
    returnObject["msg"] = msg;
    return returnObject;

  }
}
