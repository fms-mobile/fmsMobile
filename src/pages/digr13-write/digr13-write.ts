import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { Digr13SelectModalPage } from '../digr13-select-modal/digr13-select-modal';

/**
 * Generated class for the Digr13Write page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr13-write',
  templateUrl: 'digr13-write.html',
})
export class Digr13WritePage {
  digr01Group : DIGR01_GROUPVO;
  index : number;
  check_resultList : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.digr01Group = navParams.data.digr01Group;
    this.index = navParams.data.index;
    this.check_resultList = [0,1,2,3,4,5,6,7];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr13Write');
  }

  goDigr13SelectModal(index: number){
    let digr13SelectModal = this.modalCtrl.create(Digr13SelectModalPage, {"digr01Group":this.digr01Group,"index":index});
    digr13SelectModal.present();
  }

  goSave(){
    this.navCtrl.pop();
  }
}
