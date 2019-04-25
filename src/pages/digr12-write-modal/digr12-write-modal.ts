import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, IonicPage } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { MANTB_DIGR01DTO } from '../../model/MANTB_DIGR01DTO';
import { MANTB_DIGR12DTO } from '../../model/MANTB_DIGR12DTO';

/**
 * Generated class for the Digr12WriteModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-digr12-write-modal',
  templateUrl: 'digr12-write-modal.html',
})
export class Digr12WriteModalPage {
  digr01Group : DIGR01_GROUPDTO;
  selectIndex : number;
  digr02 : MANTB_DIGR01DTO;
  digr12 :MANTB_DIGR12DTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.digr01Group = navParams.data.digr01Group;
    this.selectIndex = navParams.data.index;
    this.digr02 = this.digr01Group.digr02List[this.selectIndex];
    this.digr12 = new MANTB_DIGR12DTO();
    this.digr12.facil_no = this.digr02.facil_no;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr12WriteModal');
  }

  goFacilPartSerachModal(){
    let facilPartSearchModalPage = this.modalCtrl.create("FacilPartSearchModalPage",{"digr01Group":this.digr01Group,"index":this.selectIndex,"digr12":this.digr12});
    facilPartSearchModalPage.present();
  }

  goSeriousDefectModal(){
    let seriousDefectModalPage = this.modalCtrl.create("SeriousDefectModalPage",{"digr01Group":this.digr01Group,"index":this.selectIndex,"digr12":this.digr12});
    seriousDefectModalPage.present();
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }

  goSave(){

  }

}
