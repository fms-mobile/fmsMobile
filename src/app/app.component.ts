import { Component, ViewChild } from '@angular/core';
import { Platform, App, ViewController, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

//import { LoginPage } from '../pages/home/login';
import { MainPage } from '../pages/main/main';
import { Iframe } from './../pages/iframe/iframe';
import { Inappbrowser } from './../pages/inappbrowser/inappbrowser';
import { DigrGroupPage } from '../pages/digr-group/digr-group';

import { UtilService } from '../services/UtilService';
import { GlobalVars } from '../services/GlobalVars';
import { TempDataManage } from '../services/TempDataManage';


import { DbInit } from '../db/DbInit';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MainPage;
  @ViewChild(Nav) nav : Nav;
  appTitle :  string = "FMS 모바일";

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public utilService: UtilService,
              public globalVars: GlobalVars,
              public tempDataManage: TempDataManage,
              public screenOrientation: ScreenOrientation,
              public dbInit : DbInit,
              public menuCtrl: MenuController,
              app: App) {
    
    // 화면 세로 고정
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

    platform.ready().then(() => {
      console.log("platform ready");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      // // let status bar overlay webview
      statusBar.overlaysWebView(false);
      // // // set status bar to white
      statusBar.backgroundColorByHexString('#488aff');
      
      splashScreen.hide();
    });

    platform.registerBackButtonAction(() => {

      let nav = app.getActiveNav();
      const portal = app._appRoot._getPortal();
      let activeView: ViewController = nav.getActive();
      
      if (this.globalVars.isScan == false) {
        if (nav.canGoBack()) {
          nav.pop();
        } else if (typeof activeView.instance.dismiss === 'function'){
          activeView.instance.dismiss();
        } else if (portal.length() != 0) {
          app._appRoot._overlayPortal.getActive().dismiss();//팝업 창이 뜬게 있다면 팝업 창도 닫아줌
        } else {
          this.utilService.backButtonAction();
        }
      } else {
        this.globalVars.isScan = false;
      }
    });
  }

  goMainPage(){
    this.appTitle = "FMS 모바일";
    this.nav.setRoot(MainPage);
    this.menuCtrl.close();
  }

  goIframePage(url :string, title : string){
    this.appTitle = title;
    this.nav.setRoot(Iframe,url);
    this.menuCtrl.close();
  }
  goInappbrowserPage(url :string, title : string){
    this.appTitle = title;
    this.nav.setRoot(Inappbrowser,url);
    this.menuCtrl.close();
  }

  goDigrGroupPage() {
    this.appTitle = "정기안전점검";
    this.nav.setRoot(DigrGroupPage);
    this.menuCtrl.close();
  }
}
