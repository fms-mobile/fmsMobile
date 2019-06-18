import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav } from 'ionic-angular';
import { DIGR01_GROUPDTO } from '../../model/DIGR01_GROUPDTO';
import { BASTB_MAST01 } from '../../db/BASTB_MAST01';

/**
 * Generated class for the FacilMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-facil-main',
  templateUrl: 'facil-main.html',
})
export class FacilMainPage {
  @ViewChild('facilContents') facilNav : Nav;
  digr01Group : DIGR01_GROUPDTO;
  mast01 : BASTB_MAST01;
  index : number;
  prevView : ViewController;
  isStep1 : boolean = false;
  isStep2 : boolean = false;
  isStep3 : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ) {
    this.digr01Group = navParams.get('digr01Group');
    this.mast01 = navParams.get('mast01');
    this.index = navParams.get('index');
    this.prevView = navParams.get('prevView');
  }

  ionViewDidLoad(){
    this.goDigr11List();
  }

  initStep() {
    this.isStep1 = false;
    this.isStep2 = false;
    this.isStep3 = false;
  }

  goDigr02Write(){
    this.initStep();
    this.isStep3 = true;
    this.facilNav.setRoot('Digr02WritePage',{"digr01Group":this.digr01Group,"index":this.index,"prevView":this.prevView});
  }

  goDigr11List() {
    this.initStep();
    this.isStep1 = true;
    this.facilNav.setRoot('Digr11ListPage',{"digr01Group":this.digr01Group,"index":this.index,"prevView":this.prevView});
  }

  goDigr13List(){
    this.initStep();
    this.isStep2 = true;
    this.facilNav.setRoot('Digr13_1ListPage',{"digr01Group":this.digr01Group,"index":this.index,"prevView":this.prevView});
  }

  goNext(){
    this.navCtrl.pop();
  }
}