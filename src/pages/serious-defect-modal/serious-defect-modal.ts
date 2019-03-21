import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilService } from '../../services/UtilService';

/**
 * Generated class for the SeriousDefectModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-serious-defect-modal',
  templateUrl: 'serious-defect-modal.html',
})
export class SeriousDefectModalPage {
  selectOptions : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private elementRef : ElementRef, public utilService : UtilService,public renderer :Renderer2) {
    this.selectOptions["multiple"] = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeriousDefectModal');
  }

  ionViewDidEnter() {
    this.selectOptions["AllItems"] = this.elementRef.nativeElement.querySelectorAll('ion-item');
  }
  
  goSave(){

  }

  dismiss(){
    this.viewCtrl.dismiss(null);
  }
}
