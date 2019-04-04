import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Inappbrowser } from './../inappbrowser/inappbrowser';

/**
 * Generated class for the Main page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  inappbrowser : Inappbrowser
  url : string

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
