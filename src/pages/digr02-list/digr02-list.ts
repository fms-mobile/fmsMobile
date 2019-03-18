import { GlobalVars } from './../../services/GlobalVars';
import { Mast01List } from './../mast01-list/mast01-list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Digr02Write } from '../digr02-write/digr02-write';

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
export class Digr02List {
  selectedMast01List : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars:GlobalVars) {
    this.selectedMast01List = this.globalVars.selectedMast01List;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02List');
  }

  goWrite(mast01 : any){
    this.navCtrl.push(Digr02Write,mast01);
  }

  addMast01(){
    this.navCtrl.push(Mast01List);
  }
}
