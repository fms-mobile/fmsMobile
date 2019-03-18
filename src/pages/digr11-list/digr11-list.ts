import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Digr11Write } from '../digr11-write/digr11-write';

/**
 * Generated class for the Digr11List page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr11-list',
  templateUrl: 'digr11-list.html',
})
export class Digr11List {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr11List');
  }

  goWrite(){
    this.navCtrl.push(Digr11Write);
  }
}
