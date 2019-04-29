import { IService } from './IService';

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { LoadingService } from './loading-service'

@Injectable()
export class MenuService implements IService {

  constructor(public af: AngularFireDatabase, private loadingService: LoadingService) { }

  getId = (): string => 'menu';

  getTitle = (): string => 'UIAppTemplate';

  getAllThemes = (): Array<any> => {
    return [
      {"title" : "메인화면", "theme"  : "MainPage",  "icon" : "icon-format-align-justify", "listView" : false, "component": "", "iframe":false},
      {"title" : "FMS 소개", "theme"  : "/int01001.do",  "icon" : "icon-format-line-spacing", "listView" : false, "component": "", "iframe":true},
      {"title" : "시설물안전등급 정보공개", "theme"  : "/pub01001.do",  "icon" : "icon-lock-open-outline", "listView" : false, "component": "", "iframe":true},
      {"title" : "점검진단도래시기 사전예고", "theme"  : "/dign_notify.do",  "icon" : "icon-comment-account", "listView" : false, "component": "", "iframe":true},
      {"title" : "안전진단전문기관 현황", "theme"  : "/coe01001.do",  "icon" : "icon-apps", "listView" : false, "component": "", "iframe":true},
      {"title" : "시설물유지관리 업체현황", "theme"  : "/cof01001.do",  "icon" : "icon-logout", "listView" : false, "component": "", "iframe":true},
      {"title" : "3종시설물 지정/해제", "theme"  : "/pub02001.do",  "icon" : "icon-checkbox-marked", "listView" : false, "component": "", "iframe":true},
      {"title" : "시설물 분류", "theme"  : "/law01001.do",  "icon" : "icon-magnify", "listView" : false, "component": "", "iframe":true},
      {"title" : "내진설계 대상여부확인", "theme"  : "/eqk01001_agree.do",  "icon" : "icon-tumblr", "listView" : false, "component": "", "iframe":true},
      {"title" : "정기안전점검", "theme"  : "LoginPage",  "icon" : "icon-image-filter-tilt-shift", "listView" : false, "component": "", "iframe":false},
      /* {"title" : "List Views", "theme"  : "listViews",  "icon" : "icon-format-align-justify", "listView" : true, "component": "", "iframe":false},
      {"title" : "Parallax", "theme"  : "parallax",  "icon" : "icon-format-line-spacing", "listView" : false, "component":"", "iframe":false},
      {"title" : "Login Pages", "theme"  : "login",  "icon" : "icon-lock-open-outline", "listView" : false, "component":"", "iframe":false},
      {"title" : "Register Pages", "theme"  : "register",  "icon" : "icon-comment-account", "listView" : false, "component":"", "iframe":false},
      {"title" : "Image Gallery", "theme"  : "imageGallery",  "icon" : "icon-apps", "listView" : false, "component":"", "iframe":false},
      {"title" : "Splash Screen", "theme"  : "splashScreens",  "icon" : "icon-logout", "listView" : false, "component":"", "iframe":false},
      {"title" : "Check Boxs", "theme"  : "checkBoxes",  "icon" : "icon-checkbox-marked", "listView" : false, "component":"", "iframe":false},
      {"title" : "Search Bars", "theme"  : "searchBars",  "icon" : "icon-magnify", "listView" : false, "component":"", "iframe":false},
      {"title" : "Typo + small components", "theme"  : "textViews",  "icon" : "icon-tumblr", "listView" : false, "component":"", "iframe":false},
      {"title" : "Wizard", "theme"  : "wizard",  "icon" : "icon-cellphone-settings", "listView" : false, "component":"", "iframe":false},
      {"title" : "Spinner", "theme"  : "spinner",  "icon" : "icon-image-filter-tilt-shift", "listView" : false, "component":"", "iframe":false},
      {"title" : "Tabs", "theme"  : "tabs",  "icon" : "icon-view-array", "listView" : false, "component":"", "iframe":false},
      {"title" : "Maps", "theme"  : "maps",  "icon" : "icon-google-maps", "listView" : false, "component":"", "iframe":false},
      {"title" : "QRCode", "theme"  : "qrcode",  "icon" : "icon-qrcode", "listView" : false, "component":"", "iframe":false},
      {"title" : "Timeline", "theme"  : "timeline",  "icon" : "icon-timer", "listView" : false, "component":"", "iframe":false},
      {"title" : "Radio Button", "theme"  : "radioButton",  "icon" : "icon-radiobox-marked", "listView" : false, "component":"", "iframe":false},
      {"title" : "Range", "theme"  : "range",  "icon" : "icon-toggle-switch-off", "listView" : false, "component":"", "iframe":false},
      {"title" : "Forms", "theme"  : "form",  "icon" : "icon-content-paste", "listView" : false, "component":"", "iframe":false},
      {"title" : "Toggle", "theme"  : "toggle",  "icon" : "icon-toggle-switch", "listView" : false, "component":"", "iframe":false},
      {"title" : "Select", "theme"  : "select",  "icon" : "icon-menu-down", "listView" : true, "component":"", "iframe":false},
      {"title" : "Profile", "theme"  : "profile",  "icon" : "icon-account-outline", "listView" : false, "component":"", "iframe":false},
      {"title" : "Comments", "theme"  : "comment",  "icon" : "icon-comment-outline", "listView" : false, "component":"", "iframe":false},
      {"title" : "Payment", "theme"  : "payment",  "icon" : "icon-cash", "listView" : false, "component":"", "iframe":false},
      {"title" : "Segment", "theme"  : "segment",  "icon" : "icon-timelapse", "listView" : false, "component":"", "iframe":false},
      {"title" : "Action Sheet", "theme"  : "actionSheet",  "icon" : "icon-dots-horizontal", "listView" : false, "component":"", "iframe":false},
      {"title" : "Alert", "theme"  : "alert",  "icon" : "icon-alert", "listView" : false, "component":"", "iframe":false}, */
    ];
  };

  getDataForTheme = (menuItem: any) => {
    return {
      "background": "assets/images/background/16.png",
      "image": "assets/images/logo/login-3.png",
      "title": "FMS 시설물통합정보시스템 메뉴"
    };
  };

  getEventsForTheme = (menuItem: any): any => {
    return {};
  };

  prepareParams = (item: any) => {
    return {
      title: item.title,
      data: {},
      events: this.getEventsForTheme(item)
    };
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
      return new Observable(observer => {
        this.af
          .object('menu')
          .valueChanges()
          .subscribe(snapshot => {
            that.loadingService.hide();
            observer.next(snapshot);
            observer.complete();
          }, err => {
            that.loadingService.hide();
            observer.error([]);
            observer.complete();
          });
      });
    } else {
      return new Observable(observer => {
        that.loadingService.hide();
        observer.next(this.getDataForTheme(item));
        observer.complete();
      });
    }
  }
}
