import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01DTO } from '../../model/BASTB_MAST01DTO';
/**
 * Generated class for the Digr02ListModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-digr02-list-modal',
  templateUrl: 'digr02-list-modal.html',
})
export class Digr02ListModalPage {
  selectedMast01List : Array<BASTB_MAST01DTO>;
  digr01Group : DIGR01_GROUPDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl: ViewController) {
    this.digr01Group = navParams.data;
    this.selectedMast01List = this.digr01Group.selectedMast01List;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Digr02ListModal');
  }

  goWrite(digr01Group : DIGR01_GROUPDTO, index: number){
    this.viewCtrl.dismiss({"digr01Group":digr01Group,"index":index});
  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
