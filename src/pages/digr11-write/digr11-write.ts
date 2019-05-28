import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, ViewController, ToastController, Platform } from 'ionic-angular';
import { GlobalVars, DatePickerCustomOptions } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR11DTO } from '../../model/MANTB_DIGR11DTO';
import { UtilService } from '../../services/UtilService';
import { DatePickerOptions, DatePicker } from '@ionic-native/date-picker';
import { DateFormatPipe } from '../../pipes/date-format/date-format';

/**
 * Generated class for the Digr11Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr11-write',
  templateUrl: 'digr11-write.html',
})
export class Digr11WritePage {
  digr01Group : DIGR01_GROUPDTO;
  index : number;
  digr11 : MANTB_DIGR11DTO;
  tech_gradeList: Array<any>;
  isOigr11 : boolean = false;
  isCreate : boolean = false;
  datePickerOptions : DatePickerOptions;
  placeholder : Object = {
    engineer_nm:"성명 입력",
    birth_ymd:"생년월일 입력",
    rep_yn:"책임기술자 여부",
    start_ymd:"참여 시작일 입력",
    end_ymd:"참여 종료일 입력",
    parti_days:"참여일수 입력",
    parti_rate:"참여율 입력",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,globalVars: GlobalVars, 
    public utilService:UtilService,public modalCtrl: ModalController
    ,public viewCtrl: ViewController ,private toastCtrl :ToastController
    ,private datePicker : DatePicker, private platform : Platform, private dateFormatPipe : DateFormatPipe,
    ) {
     
    this.digr01Group = navParams.get('digr01Group');
    this.index = navParams.get('index');

    this.digr11 = this.digr01Group.digr11List[this.index];

    if(this.digr11 === undefined) {
      this.isCreate = true;
      this.digr11 = new MANTB_DIGR11DTO();
    }

    this.datePickerOptions = new DatePickerCustomOptions();

    globalVars.db.comtbCode02.list002({code_group:"tech_grade",}, (res) => {
      this.tech_gradeList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11Write');
  }

  goOigr11List() {
    this.isOigr11 = true;
    let orgn11ListPage = this.modalCtrl.create("Orgn11ListPage",{"digr01Group":this.digr01Group,"index":this.index});
    orgn11ListPage.present();

    orgn11ListPage.onWillDismiss((data: any ) => {
      if(data != null){
        this.digr11.engineer_nm = data.member_nm;
        this.digr11.member_seq = data.member_seq;
        this.digr11.birth_ymd = data.birth_ymd;
        this.digr11.sex = data.sex;
        this.digr11.tech_grade = data.tech_grade;
        this.digr11.tech_grade_nm = data.tech_grade_nm;
      }
      this.isOigr11 = false;
    });
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  goSave(){
    let validateObject = this.validateDigr11();
    if(!validateObject.passFlag) {
      const alertMessage = validateObject.msg;
      this.utilService.showToast(this.toastCtrl,alertMessage,() =>{
      });
      return ;
    }
    if(this.isCreate) {
      this.digr01Group.digr11List.push(this.digr11);
      this.index = this.digr01Group.digr11List.length;
    }
    this.viewCtrl.dismiss(null);
  }

  /* async ionViewCanLeave() {
    const shouldLeave = await this.confirmLeave();
    return shouldLeave;
  } */

  confirmLeave(){
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);

    if(!this.validateDigr11() && !this.isOigr11) {
      const alertTile = "삭제 알림";
      const alertMessage = "기술자 필수정보를 입력하지 않아 기술자 정보 데이터가 삭제됩니다. 삭제하시겠습니까?";
      this.utilService.alertConfirm(alertTile,alertMessage,() => {
        this.digr01Group.digr11List.pop();
        resolveLeaving(true);
      },()=>{
        resolveLeaving(false);
      });
    } else {
      resolveLeaving(true);
    }
    return canLeave;
  }

  validateDigr11() : {passFlag : boolean ,msg: string} {
    let returnObject : {passFlag : boolean ,msg: string} = {passFlag:true,msg:''};
    let passFlag = true;
    let msg = "";

    let digr11 = this.digr11;
    while (true) {
      if(!digr11.engineer_nm || digr11.engineer_nm == '') {
        passFlag = false;
        msg = '기술자를 선택하지 않았습니다.';
        break;
      }
      if(!digr11.start_ymd || digr11.start_ymd == '') {
        passFlag = false;
        msg = '참여기간 시작일을 입력하지 않았습니다.';
        break;
      }
      if(!digr11.end_ymd || digr11.end_ymd == '') {
        passFlag = false;
        msg = '참여기간 종료일을 입력하지 않았습니다.';
        break;
      }
      if(!digr11.parti_rate) {
        passFlag = false;
        msg = '참여율을 입력하지 않았습니다.';
        break;
      }
      break;
    }

    returnObject.passFlag = passFlag;
    returnObject.msg = msg;
    return returnObject;
  }

  pickStart_ymd() {
    let datePickerOptions = this.datePickerOptions;    
    datePickerOptions.minDate = null;
    datePickerOptions.maxDate = null;

    datePickerOptions.date = (this.digr11.start_ymd) ? this.dateFormatPipe.returnDate(this.digr11.start_ymd,'YYYYMMDD') : new Date();

    if(this.digr11.end_ymd){
      let maxDate = this.dateFormatPipe.returnDate(this.digr11.end_ymd,'YYYYMMDD');
      if(this.platform.is('ios')){
        datePickerOptions.maxDate = maxDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.maxDate = maxDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.digr11.start_ymd = dateString;
        this.calcParti_days();
      },
      err => console.log(err)
    );
  }

  pickEnd_ymd() {
    let datePickerOptions = this.datePickerOptions;    
    datePickerOptions.minDate = null;
    datePickerOptions.maxDate = null;
    
    datePickerOptions.date = (this.digr11.end_ymd) ? this.dateFormatPipe.returnDate(this.digr11.end_ymd,'YYYYMMDD') : new Date();
    if(this.digr11.start_ymd) {
      let minDate = this.dateFormatPipe.returnDate(this.digr11.start_ymd,'YYYYMMDD');
      
      if(this.platform.is('ios')){
        datePickerOptions.minDate = minDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.minDate = minDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.digr11.end_ymd = dateString;
        this.calcParti_days();
      },
      err => console.log(err)
    );
  }

  calcParti_days() {
    if(this.digr11.start_ymd && this.digr11.end_ymd) {
      let startYmd : Date = this.dateFormatPipe.returnDate(this.digr11.start_ymd,'YYYYMMDD');
      let endYmd : Date = this.dateFormatPipe.returnDate(this.digr11.end_ymd,'YYYYMMDD');
      let diff = endYmd.valueOf() - startYmd.valueOf();
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      this.digr11.parti_days = diffDays;
    }
  }
}