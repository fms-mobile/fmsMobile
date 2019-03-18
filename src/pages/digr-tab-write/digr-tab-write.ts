import { Digr02List } from './../digr02-list/digr02-list';
import { Digr11List } from './../digr11-list/digr11-list';
import { Digr01Write } from './../digr01-write/digr01-write';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

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
export class DigrTabWrite {
  digr01Write = Digr01Write;
  digr11List = Digr11List;
  digr02List= Digr02List;

  @ViewChild('digrWriteTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigrTabWrite');
  }

  ionViewDidEnter(){
    this.tabRef.select(0);
  }
}
