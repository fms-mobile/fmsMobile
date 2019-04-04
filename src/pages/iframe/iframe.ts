import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

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
  /* @ViewChild("#test") test : any; */

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer,private http: Http) {
    this.url = navParams.data;
    this.externalLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);

    /* this.http.get(this.url).toPromise().then( data =>{
      console.log(data.status);
    }).catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    }); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Iframe');
  }

}
