import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-man-main',
  templateUrl: 'man-main.html',
})
export class ManMainPage {
  man21001 : any;
  Man32001ListPage = "Man32001ListPage";
  Man32004ListPage = 'Man34001ListPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.man21001 = navParams.get('man21001');
  }

}
