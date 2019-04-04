import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the Inappbrowser page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-inappbrowser',
  templateUrl: 'inappbrowser.html',
})
export class Inappbrowser {
  url : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    this.url = navParams.data;
    const option : InAppBrowserOptions = {
      location: 'no',
      hideurlbar: 'yes',
      clearcache: 'yes',
      zoom: 'yes'
    };
    const browser = this.iab.create(this.url,'_self',option);
    browser.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Inappbrowser');
  }

}
