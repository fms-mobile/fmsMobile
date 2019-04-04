import { Digr02ListPage } from './../digr02-list/digr02-list';
import { Digr11ListPage } from './../digr11-list/digr11-list';
import { Digr01WritePage } from './../digr01-write/digr01-write';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';

/**
 * Generated class for the DigrTabWrite page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr-tab-write',
  templateUrl: 'digr-tab-write.html',
})
export class DigrTabWritePage {
  digr01WritePage = Digr01WritePage;
  digr11ListPage = Digr11ListPage;
  digr02ListPage = Digr02ListPage;
  digr01Group : DIGR01_GROUPVO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.digr01Group = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigrTabWrite');
  }

  ionViewDidEnter(){
    
  }

}
