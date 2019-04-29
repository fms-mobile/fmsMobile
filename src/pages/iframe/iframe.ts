import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the Iframe page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html',
})
export class Iframe {
  url : string;
  title : string;
  externalLink : SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer) {
    this.url = navParams.get("url");
    this.title = navParams.get("title");
    if(this.url) {
      this.externalLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      this.navCtrl.setRoot("MainPage");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Iframe');
  }

}
