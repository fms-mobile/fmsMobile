import { GlobalVars } from './../../services/GlobalVars';
import { MANTB_DIGR01VO } from './../../model/MANTB_DIGR01VO';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Digr02Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr02-write',
  templateUrl: 'digr02-write.html',
})
export class Digr02Write {
  digr02_select : any = {};
  state_gradeList : any = [];
  digr01 : MANTB_DIGR01VO;

  constructor(public navCtrl: NavController, public navParams: NavParams, digr01VO: MANTB_DIGR01VO,public globalVars:GlobalVars) {
    this.digr02_select = navParams.data;
    this.digr01 = globalVars.digr01;

    globalVars.db.comtbCode02.list002({code_group:"state_grade",data5 :"1"}, (res) => {
      this.state_gradeList = res;
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02Write');
  }

  goDigr13(){

  }
  
  goSave(){

  }
}
