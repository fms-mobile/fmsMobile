import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage, ViewController, ToastController, Platform } from 'ionic-angular';
import { GlobalVars, DatePickerCustomOptions } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_ENGR01DTO } from '../../model/MANTB_ENGR01DTO';
import { UtilService } from '../../services/UtilService';
import { DatePickerOptions, DatePicker } from '@ionic-native/date-picker';
import { DateFormatPipe } from '../../pipes/date-format/date-format';

/**
 * Generated class for the engr01Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-engr01-write',
  templateUrl: 'engr01-write.html',
})
export class Engr01WritePage {
  digr01Group : DIGR01_GROUPDTO;
  index : number;
  engr01 : MANTB_ENGR01DTO;
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

    this.engr01 = this.digr01Group.engr01List[this.index];

    if(this.engr01 === undefined) {
      this.isCreate = true;
      this.engr01 = new MANTB_ENGR01DTO();
    }

    this.datePickerOptions = new DatePickerCustomOptions();

    globalVars.db.comtbCode02.list002({code_group:"tech_grade",}, (res) => {
      this.tech_gradeList = res;
    });
  }

  goOigr11List() {
    this.isOigr11 = true;
    let orgn11ListPage = this.modalCtrl.create("Orgn11ListPage",{"digr01Group":this.digr01Group,"index":this.index});
    orgn11ListPage.present();

    orgn11ListPage.onWillDismiss((data: any ) => {
      if(data != null){
        this.engr01.engineer_nm = data.member_nm;
        this.engr01.member_seq = data.member_seq;
        this.engr01.birth_ymd = data.birth_ymd;
        this.engr01.sex = data.sex;
        this.engr01.tech_grade = data.tech_grade;
        this.engr01.tech_grade_nm = data.tech_grade_nm;
      }
      this.isOigr11 = false;
    });
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  repYnChange(checkBox) {
    /* if(checkBox.checked) {
      let repYnData = this.digr01Group.engr01List.find(data => data.rep_yn == true);
      if(repYnData) {
        const alertMessage = '책임기술자가 이미 존재합니다.';
        this.utilService.showToast(this.toastCtrl,alertMessage,() =>{
        });
      }
    } */
  }

  goSave(){
    let validateObject = this.validateengr01();
    if(!validateObject.passFlag) {
      const alertMessage = validateObject.msg;
      this.utilService.showToast(this.toastCtrl,alertMessage,() =>{
      });
      return ;
    }
    if(this.isCreate) {
      this.digr01Group.engr01List.push(this.engr01);
      this.index = this.digr01Group.engr01List.length;
    }
    this.viewCtrl.dismiss(null);
  }

  validateengr01() : {passFlag : boolean ,msg: string} {
    let returnObject : {passFlag : boolean ,msg: string} = {passFlag:true,msg:''};
    let passFlag = true;
    let msg = "";

    let engr01 = this.engr01;
    while (true) {
      if(!engr01.engineer_nm || engr01.engineer_nm == '') {
        passFlag = false;
        msg = '기술자를 선택하지 않았습니다.';
        break;
      }
      if(!engr01.start_ymd || engr01.start_ymd == '') {
        passFlag = false;
        msg = '참여기간 시작일을 입력하지 않았습니다.';
        break;
      }
      if(!engr01.end_ymd || engr01.end_ymd == '') {
        passFlag = false;
        msg = '참여기간 종료일을 입력하지 않았습니다.';
        break;
      }
      if(!engr01.parti_rate) {
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

    datePickerOptions.date = (this.engr01.start_ymd) ? this.dateFormatPipe.returnDate(this.engr01.start_ymd,'YYYYMMDD') : new Date();

    if(this.engr01.end_ymd){
      let maxDate = this.dateFormatPipe.returnDate(this.engr01.end_ymd,'YYYYMMDD');
      if(this.platform.is('ios')){
        datePickerOptions.maxDate = maxDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.maxDate = maxDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.engr01.start_ymd = dateString;
        this.calcParti_days();
      },
      err => console.log(err)
    );
  }

  pickEnd_ymd() {
    let datePickerOptions = this.datePickerOptions;    
    datePickerOptions.minDate = null;
    datePickerOptions.maxDate = null;
    
    datePickerOptions.date = (this.engr01.end_ymd) ? this.dateFormatPipe.returnDate(this.engr01.end_ymd,'YYYYMMDD') : new Date();
    if(this.engr01.start_ymd) {
      let minDate = this.dateFormatPipe.returnDate(this.engr01.start_ymd,'YYYYMMDD');
      
      if(this.platform.is('ios')){
        datePickerOptions.minDate = minDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.minDate = minDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.engr01.end_ymd = dateString;
        this.calcParti_days();
      },
      err => console.log(err)
    );
  }

  calcParti_days() {
    if(this.engr01.start_ymd && this.engr01.end_ymd) {
      let startYmd : Date = this.dateFormatPipe.returnDate(this.engr01.start_ymd,'YYYYMMDD');
      let endYmd : Date = this.dateFormatPipe.returnDate(this.engr01.end_ymd,'YYYYMMDD');
      let diff = endYmd.valueOf() - startYmd.valueOf();
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      this.engr01.parti_days = diffDays;
    }
  }
}