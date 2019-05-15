import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';
import { GlobalVars, DatePickerCustomOptions } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';

import { ModalController } from 'ionic-angular';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';
import { DateFormatPipe } from '../../pipes/date-format/date-format';

/**
 * Generated class for the Digr01Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr01-write',
  templateUrl: 'digr01-write.html',
  providers:[
    DateFormatPipe,
  ]
})
export class Digr01WritePage {
  regular_gbnList : [{}];
  digr01 : MANTB_DIGR01DTO;
  digr01Group : DIGR01_GROUPDTO;
  start_ymd_input : any;
  end_ymd_input : any;
  datePickerOptions : DatePickerOptions;
  placeholder : Object ={
    start_ymd:"점검진단기간 시작일 입력",
    end_ymd:"점검진단기간 종료일 입력",
    wrt_person_nm:"작성자 이름 입력",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams , globalVars: GlobalVars
    , public modalCtrl: ModalController,private elementRef : ElementRef,
    private datePicker : DatePicker, private dateFormatPipe : DateFormatPipe, private platform : Platform,
    ) {
    this.digr01Group = navParams.data;
    this.digr01 = this.digr01Group.digr01;
    this.digr01.dign_corp_cd = globalVars.userInfo.group_cd;
    this.digr01.dign_corp_nm = globalVars.userInfo.group_nm;

    this.datePickerOptions = new DatePickerCustomOptions();

    globalVars.db.comtbCode02.list002({code_group:"regular_gbn",}, (res) => {
      this.regular_gbnList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr01Write');
  }

  setRegular_gbn(event,regular_gbn){
    this.digr01.regular_gbn_nm = regular_gbn.data1;
  }

  pickStart_ymd() {
    let datePickerOptions = this.datePickerOptions;    
    datePickerOptions.minDate = null;
    datePickerOptions.maxDate = null;

    datePickerOptions.date = (this.digr01.start_ymd) ? this.dateFormatPipe.returnDate(this.digr01.start_ymd,'YYYYMMDD') : new Date();

    if(this.digr01.end_ymd) {
      let maxDate : Date = this.dateFormatPipe.returnDate(this.digr01.end_ymd,'YYYYMMDD');
      
      if(this.platform.is('ios')){
        datePickerOptions.maxDate =  maxDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.maxDate = maxDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.digr01.start_ymd = dateString;
      },
      err => console.log(err)
    );
  }

  pickEnd_ymd() {
    let datePickerOptions = this.datePickerOptions;    
    datePickerOptions.minDate = null;
    datePickerOptions.maxDate = null;
    
    datePickerOptions.date = (this.digr01.end_ymd) ? this.dateFormatPipe.returnDate(this.digr01.end_ymd,'YYYYMMDD') : new Date();

    if(this.digr01.start_ymd){
      let minDate : Date = this.dateFormatPipe.returnDate(this.digr01.start_ymd,'YYYYMMDD');

      if(this.platform.is('ios')){
        datePickerOptions.minDate = minDate;
      } else if(this.platform.is('android')) {
        datePickerOptions.minDate = minDate.valueOf();
      }
    }

    this.datePicker.show(datePickerOptions).then(
      (date : Date) => {
        let dateString = this.dateFormatPipe.superTransform(date,'yyyyMMdd');
        this.digr01.end_ymd = dateString;
        this.digr01.report_yy = this.dateFormatPipe.transform(date,'yyyy');
      },
      err => console.log(err)
    );
  }
}
