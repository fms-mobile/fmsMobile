import { MANTB_DIGR01DTO } from './../../model/MANTB_DIGR01DTO';
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';

import { ModalController } from 'ionic-angular';
// import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";

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
})
export class Digr01WritePage {
  regular_gbnList : [{}];
  digr01 : MANTB_DIGR01DTO;
  digr01Group : DIGR01_GROUPDTO;
  start_ymd_input : any;
  end_ymd_input : any;

  constructor(public navCtrl: NavController, public navParams: NavParams , globalVars: GlobalVars, public modalCtrl: ModalController,private elementRef : ElementRef
    ) {
    this.digr01Group = navParams.data;
    this.digr01 = this.digr01Group.digr01;

    globalVars.db.comtbCode02.list002({code_group:"regular_gbn",}, (res) => {
      this.regular_gbnList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr01Write');
  }

  ionViewDidEnter() {
    this.start_ymd_input = this.elementRef.nativeElement.querySelector('#start_ymd input');
    this.end_ymd_input = this.elementRef.nativeElement.querySelector('#end_ymd input');

    this.start_ymd_input.value = this.digr01.start_ymd;
    this.end_ymd_input.value = this.digr01.end_ymd;
  }

  setReport_ymd(event){
    let start_ymd : string = event.target.value;
    this.digr01.report_yy = start_ymd.substr(0,4);
  }

  setRegular_gbn(value){
    let regular_gbn : string = value;
    let regular_gbnList = this.regular_gbnList;

    if(regular_gbnList) {
      regular_gbnList.forEach((res : any) => {
        if(res.code1 == regular_gbn) {
          this.digr01.regular_gbn_nm = res.data1;
        }
      });
    }
  }

}
