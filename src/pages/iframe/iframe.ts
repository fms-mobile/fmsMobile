import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthGuardService } from '../../services/AuthGuardService';
import { AuthService } from '../../services/AuthService';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private domSanitizer: DomSanitizer, private authService : AuthService, private authGuardService: AuthGuardService,
     ) {
      this.url = navParams.get("url");
      this.title = navParams.get("title");

      if(this.url) {
        if(authGuardService.canActivate()) {
          this.url = (this.url.indexOf('?') > -1) ? this.url += '&token=' + this.authService.tokenKey : this.url += '?token=' + this.authService.tokenKey;
        }
        this.externalLink = domSanitizer.bypassSecurityTrustResourceUrl(this.url);
      } else {
        this.navCtrl.setRoot("MainPage");
      }

  }

}
