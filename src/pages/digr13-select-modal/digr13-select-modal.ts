import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the Digr13SelectModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-digr13-select-modal',
  templateUrl: 'digr13-select-modal.html',
})
export class Digr13SelectModalPage {
  check_resultList : Array<number>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.check_resultList = [0,1,2];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr13SelectModal');
  }

  goSave(){
    this.viewCtrl.dismiss(null);
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
