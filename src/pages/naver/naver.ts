import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl } from '@angular/platform-browser';

/**
 * Generated class for the Naver page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-naver',
  templateUrl: 'naver.html',
})
export class Naver {
  url : string
  externalLink : SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser) {
    /* this.url = navParams.data;
    this.externalLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url); */
    const option : InAppBrowserOptions = {
      location: 'no',
      hideurlbar: 'yes',
      clearcache: 'yes',
      zoom: 'yes'
    };
    const browser = this.iab.create('https://naver.com/','_self',option);
    browser.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Naver');
  }

}
