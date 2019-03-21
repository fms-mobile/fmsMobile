import { GlobalVars } from './../../services/GlobalVars';
import { Mast01ListPage } from './../mast01-list/mast01-list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Digr02WritePage } from '../digr02-write/digr02-write';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { BASTB_MAST01VO } from '../../model/BASTB_MAST01VO';

/**
 * Generated class for the Digr02List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr02-list',
  templateUrl: 'digr02-list.html',
})
export class Digr02ListPage {
  selectedMast01List : Array<BASTB_MAST01VO>;
  digr01Group : DIGR01_GROUPVO;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars) {
    this.digr01Group = navParams.data;
    this.selectedMast01List = this.digr01Group.selectedMast01List;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02List');
  }

  goWrite(digr01Group : DIGR01_GROUPVO, index: number){
    this.navCtrl.push(Digr02WritePage,{"digr01Group":digr01Group,"index":index});
  }

  addMast01(){
    this.navCtrl.push(Mast01ListPage,this.digr01Group);
  }
}
