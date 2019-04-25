import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage  } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR13DTO } from '../../model/MANTB_DIGR13DTO';

/**
 * Generated class for the Digr13SelectModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr13-select-modal',
  templateUrl: 'digr13-select-modal.html',
})
export class Digr13SelectModalPage {
  digr01Group : DIGR01_GROUPDTO;
  digr13 : MANTB_DIGR13DTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.digr01Group = navParams.data.digr01Group;
    this.digr13 = navParams.data.digr13;
    
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
