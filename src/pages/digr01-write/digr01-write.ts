import { MANTB_DIGR01VO } from './../../model/MANTB_DIGR01VO';
import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVars } from '../../services/GlobalVars';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';

import { ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";

/**
 * Generated class for the Digr01Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr01-write',
  templateUrl: 'digr01-write.html',
})
export class Digr01WritePage {
  regular_gbnList : [{}];
  digr01 : MANTB_DIGR01VO;
  digr01Group : DIGR01_GROUPVO;
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

  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: '점검진단 기간'
    };

    if(this.digr01.start_ymd != "" && this.digr01.end_ymd != "") {
      options.defaultDateRange = {
        "from" : new Date(this.digr01.start_ymd),
        "to" : new Date(this.digr01.end_ymd)
      };
    }

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    let that = this;

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      if(date) {
        that.digr01Group.digr01.start_ymd = date.from.string;
        that.digr01Group.digr01.end_ymd = date.to.string;
        that.start_ymd_input.value = date.from.string;
        that.end_ymd_input.value = date.to.string;
      } else {
        that.start_ymd_input.value = that.digr01Group.digr01.start_ymd;
        that.end_ymd_input.value = that.digr01Group.digr01.end_ymd;
      }
    });
  }

}
