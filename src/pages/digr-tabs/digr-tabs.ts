import { Digr01Select } from './../digr01-select/digr01-select';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the DigrTabs page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr-tabs',
  templateUrl: 'digr-tabs.html',
})
export class DigrTabs {
  selectDigr : any = {};
  digr01_select = Digr01Select;

  @ViewChild('digrTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectDigr = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigrTabs');
  }

  ionViewDidEnter(){
    this.tabRef.select(0);
  }
}
