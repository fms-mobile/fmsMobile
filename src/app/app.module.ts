import { MANTB_DIGR01VO } from './../model/MANTB_DIGR01VO';
import { BASTB_MAST01VO } from './../model/BASTB_MAST01VO';
import { Digr02Write } from './../pages/digr02-write/digr02-write';
import { Digr02List } from './../pages/digr02-list/digr02-list';
import { Mast01List } from './../pages/mast01-list/mast01-list';

import { Digr01Select } from './../pages/digr01-select/digr01-select';
import { Digr01Write } from '../pages/digr01-write/digr01-write';
import { Digr11List } from '../pages/digr11-list/digr11-list';
import { Digr11Write } from './../pages/digr11-write/digr11-write';
import { DigrTabWrite } from './../pages/digr-tab-write/digr-tab-write';
import { DigrTabs } from './../pages/digr-tabs/digr-tabs';
import { DigrGroup } from './../pages/digr-group/digr-group';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule  } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/home/login';
import { AssetsPage } from '../pages/home/assets';
import { ListPage } from '../pages/home/list';
import { ViewPage } from '../pages/home/view';
import { WritePage } from '../pages/home/write';
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { CustFilter } from '../services/CustFilter';
import { ModalPage } from '../pages/modal/modal';

import { WebDataProvider } from '../providers/WebDataProvider';

import { DbInit} from '../db/DbInit';
import { DbInitData} from '../db/DbInitData';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

 
@NgModule({
  declarations: [
    MyApp,
    LoginPage,  
    AssetsPage,
    ListPage,
    ViewPage,
    WritePage,
    CustFilter,
    ModalPage,
    Digr01Select,
    DigrGroup,
    DigrTabs,
    DigrTabWrite,
    Digr01Write,
    Digr11List,
    Digr11Write,
    Mast01List,
    Digr02List,
    Digr02Write
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    // 로그인 태그 포커스시 스크롤 제어
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    IonicPageModule.forChild(ModalPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AssetsPage,
    ListPage,
    ViewPage,
    WritePage,
    ModalPage,
    Digr01Select,
    DigrGroup,
    DigrTabs,
    DigrTabWrite,
    Digr01Write,
    Digr11List,
    Digr11Write,
    Mast01List,
    Digr02List,
    Digr02Write
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    Network,
    GlobalVars,
    UtilService,
    WebDataProvider,
    DbInit,
    DbInitData,
    ScreenOrientation,
    MANTB_DIGR01VO,
    BASTB_MAST01VO,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
