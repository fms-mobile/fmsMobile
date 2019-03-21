import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DIGR01_GROUPVO } from '../../model/DIGR01_GROUPVO';
import { MANTB_DIGR01VO } from '../../model/MANTB_DIGR01VO';
import { FacilPartSearchModalPage } from '../facil-part-search-modal/facil-part-search-modal';
import { SeriousDefectModalPage } from '../serious-defect-modal/serious-defect-modal';

/**
 * Generated class for the Digr12WriteModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr12-write-modal',
  templateUrl: 'digr12-write-modal.html',
})
export class Digr12WriteModalPage {
  digr01Group : DIGR01_GROUPVO;
  selectIndex : number;
  digr02 : MANTB_DIGR01VO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
    this.digr02 = this.digr01Group.digr02List[this.selectIndex];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr12WriteModal');
  }

  goFacilPartSerachModal(){
    let facilPartSearchModalPage = this.modalCtrl.create(FacilPartSearchModalPage);
    facilPartSearchModalPage.present();
  }

  goSeriousDefectModal(){
    let seriousDefectModalPage = this.modalCtrl.create(SeriousDefectModalPage);
    seriousDefectModalPage.present();
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

}
