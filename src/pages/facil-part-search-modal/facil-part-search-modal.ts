import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the FacilPartSearchModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-facil-part-search-modal',
  templateUrl: 'facil-part-search-modal.html',
})
export class FacilPartSearchModalPage {
  selectOptions : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private elementRef : ElementRef, public utilService : UtilService,public renderer :Renderer2) {
    this.selectOptions["multiple"] = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacilPartSearchModal');
  }

  ionViewDidEnter() {
    this.selectOptions["AllItems"] = this.elementRef.nativeElement.querySelectorAll('.facilPart ion-item');
  }

  goSave(){

  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
