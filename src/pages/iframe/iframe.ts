import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthGuardService } from '../../services/AuthGuardService';
import { AuthService } from '../../services/AuthService';
import { UrlHelperService } from '../../services/url-helper-service';

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
  providers: [
    UrlHelperService,
  ]
})
export class Iframe implements OnInit {
  url : string;
  title : string;
  externalLink : SafeResourceUrl;
  @ViewChild('iframe') iframe: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private domSanitizer: DomSanitizer, private authService : AuthService, private authGuardService: AuthGuardService,
     public urlHelperService : UrlHelperService
     ) {
      this.url = navParams.get("url");
      this.title = navParams.get("title");

      if(this.url) {
        this.externalLink = domSanitizer.bypassSecurityTrustResourceUrl(this.url);
      } else {
        this.navCtrl.setRoot("MainPage");
      }
  }

  ngOnInit(){
    /* this.iframe.nativeElement.src = this.externalLink; */
    /* this.urlHelperService.get(this.url)
      .subscribe(blob => this.iframe.nativeElement.src = blob); */
  }
}
