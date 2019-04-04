import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the Iframe page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html',
})
export class Iframe {
  url : string;
  externalLink : SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer) {
    this.url = navParams.data;
    this.externalLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Iframe');
  }

}
