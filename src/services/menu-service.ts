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
      { "title": "메인화면", "theme": "MainPage", "icon": "icon-format-align-justify", "listView": false, "component": "", "iframe": false },
      { "title": "FMS 소개", "theme": "/int01001.do", "icon": "icon-format-line-spacing", "listView": false, "component": "", "iframe": true },
      { "title": "시설물안전등급 정보공개", "theme": "/pub01001.do", "icon": "icon-lock-open-outline", "listView": false, "component": "", "iframe": true },
      { "title": "점검진단도래시기 사전예고", "theme": "/dign_notify.do", "icon": "icon-comment-account", "listView": false, "component": "", "iframe": true },
      { "title": "안전진단전문기관 현황", "theme": "/coe01001.do", "icon": "icon-apps", "listView": false, "component": "", "iframe": true },
      { "title": "시설물유지관리 업체현황", "theme": "/cof01001.do", "icon": "icon-logout", "listView": false, "component": "", "iframe": true },
      { "title": "3종시설물 지정/해제", "theme": "/pub02001.do", "icon": "icon-checkbox-marked", "listView": false, "component": "", "iframe": true },
      { "title": "시설물 분류", "theme": "/law01001.do", "icon": "icon-magnify", "listView": false, "component": "", "iframe": true },
      { "title": "내진설계 대상여부확인", "theme": "/eqk01001_agree.do", "icon": "icon-tumblr", "listView": false, "component": "", "iframe": true },
      { "title": "정기안전점검", "theme": "LoginPage", "icon": "icon-image-filter-tilt-shift", "listView": false, "component": "", "iframe": false },
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

  getMainPageMenu = (): any => {
    return {
      "headerImage": "assets/images/background/main_visual.png",
      "title": "FMS 메뉴",
      "iconLike": "icon-thumb-up",
      "iconFavorite": "icon-heart",
      "iconShare": "icon-share-variant",
      "menus": [
        {
          "id": 1,
          "title": "FMS 소개",
          "url": "/int01001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 2,
          "title": "시설물안전등급 정보공개",
          "url": "/pub01001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 3,
          "title": "점검진단도래시기 사전예고",
          "url": "/dign_notify.do",
          "icon": "icon-cloud-download",
        },
        {

          "id": 4,
          "title": "안전진단전문기관 현황",
          "url": "/coe01001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 5,
          "title": "시설물유지관리 업체현황",
          "url": "/cof01001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 6,
          "title": "3종시설물 지정/해제",
          "url": "/pub02001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 7,
          "title": "시설물 분류",
          "url": "/law01001.do",
          "icon": "icon-cloud-download",
        },
        {
          "id": 8,
          "title": "내진설계 대상여부확인",
          "url": "/eqk01001_agree.do",
          "icon": "icon-cloud-download",
        },
      ]
    }
  }

  getDigrGroupMenu = (): any => {
    return {
      "headerImage": "assets/images/background/9.jpg",
    }
  }
}
