import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuService } from '../services/menu-service';
import { AppSettings } from '../services/app-settings';

import { IService } from '../services/IService';
import { UtilService } from '../services/UtilService';
import { GlobalVars } from '../services/GlobalVars';
import { DbInit } from '../db/DbInit';
import { AuthService } from '../services/AuthService';
import { AuthGuardService } from '../services/AuthGuardService';
import { TempDataManage } from '../services/TempDataManage';
import { TransmissionService } from '../services/transmisson-service';

@Component({
    templateUrl: 'app.html',
    providers: [MenuService]
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;
    

    rootPage = "MainPage";
    pages: any;
    params:any;
    leftMenuTitle: string;

    constructor(
        public platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public menu: MenuController,
        private menuService: MenuService,
        public modalCtrl: ModalController,
        public utilService: UtilService,
        public globalVars: GlobalVars,
        public dbInit : DbInit,
        public tempDataManage: TempDataManage,
        public authService: AuthService,
        public authGuardService: AuthGuardService,
        public transmissionService: TransmissionService,
        ) {
        this.initializeApp();
        this.pages = menuService.getAllThemes();
        this.leftMenuTitle = menuService.getTitle();
        this.menuService.load(null).subscribe( snapshot => {
            this.params = snapshot;
            if (AppSettings.SHOW_START_WIZARD) {
              this.presentProfileModal();
            }
        });
    }

    presentProfileModal() {
      const profileModal = this.modalCtrl.create("IntroPage");
      profileModal.present();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            localStorage.setItem("mailChimpLocal", "true");
        });
    }

    openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    if (page.iframe) {
        this.menu.open();
        this.nav.push("Iframe", {
          "url": this.globalVars.webUrl+ "mobile"+page.theme,
          "title":this.getTitle(page.theme)
        });
    } else {
      this.nav.setRoot(this.getPageForOpen(page.theme), {
        componentName: page.theme
      });
    }
  }
  
  getPageForOpen(value: string): any {
    return value;
  }

  getServiceForPage(value: string): IService {
    return null;
  }

  getTitle(value) {
    let title;

    switch (value) {
      case "/int01001.do":
      title = "FMS 소개";
      break;
      case "/pub01001.do":
      title = "시설물안전등급 정보공개";
      break;  
      case "/dign_notify.do":
      title = "점검진단도래시기 사전예고";
      break;
      case "/coe01001.do":
      title = "안전진단전문기관 현황";
      break;
      case "/cof01001.do":
      title = "시설물유지관리 업체현황";
      break;
      case "/pub02001.do":
      title = "3종시설물 지정/해제";
      break;
      case "/law01001.do":
      title = "시설물 분류";
      break;
      case "/eqk01001_agree.do":
      title = "내진설계 대상여부확인";
      break;
      
      default:
        title = "FMS 모바일";
    }
    return title;
  }

  
}
