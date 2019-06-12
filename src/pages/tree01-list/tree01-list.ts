import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Tree01ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tree01-list',
  templateUrl: 'tree01-list.html',
})
export class Tree01ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goTree01Write(){
    this.navCtrl.push('Tree01WritePage');
  }
}
