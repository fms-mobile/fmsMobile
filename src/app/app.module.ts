import { MANTB_DIGR01VO } from './../model/MANTB_DIGR01VO';
import { BASTB_MAST01VO } from './../model/BASTB_MAST01VO';
import { MANTB_DIGR11VO } from './../model/MANTB_DIGR11VO';
import { MANTB_DIGR12VO } from './../model/MANTB_DIGR12VO';
import { DIGR01_GROUPVO } from './../model/DIGR01_GROUPVO';

import { Digr02WritePage } from './../pages/digr02-write/digr02-write';
import { Digr02ListPage } from './../pages/digr02-list/digr02-list';
import { Digr02ListModalPage } from './../pages/digr02-list-modal/digr02-list-modal';
import { Mast01ListPage } from './../pages/mast01-list/mast01-list';
import { Digr01SelectPage } from './../pages/digr01-select/digr01-select';
import { Digr01WritePage } from '../pages/digr01-write/digr01-write';
import { Digr11ListPage } from '../pages/digr11-list/digr11-list';
import { Digr11WritePage } from './../pages/digr11-write/digr11-write';
import { Digr13WritePage } from './../pages/digr13-write/digr13-write';
import { Digr12WriteModalPage } from './../pages/digr12-write-modal/digr12-write-modal';
import { Digr13SelectModalPage } from './../pages/digr13-select-modal/digr13-select-modal';
import { FacilPartSearchModalPage } from './../pages/facil-part-search-modal/facil-part-search-modal';
import { SeriousDefectModalPage } from './../pages/serious-defect-modal/serious-defect-modal';
import { DigrTabWritePage } from './../pages/digr-tab-write/digr-tab-write';
import { DigrTabsPage } from './../pages/digr-tabs/digr-tabs';
import { DigrGroupPage } from './../pages/digr-group/digr-group';

import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule  } from 'ionic-angular';
import { MyApp } from './app.component';
import { UUID } from 'angular2-uuid';
import { CalendarModule } from "ion2-calendar";

import { LoginPage } from '../pages/home/login';
import { AssetsPage } from '../pages/home/assets';
import { ListPage } from '../pages/home/list';
import { ViewPage } from '../pages/home/view';
import { WritePage } from '../pages/home/write';
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { CustFilter } from '../services/CustFilter';
import { TempDataManage } from '../services/TempDataManage';
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
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { CurrencyPipe } from '@angular/common';
 
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
    Digr01SelectPage,
    DigrGroupPage,
    DigrTabsPage,
    DigrTabWritePage,
    FacilPartSearchModalPage,
    SeriousDefectModalPage,
    Digr01WritePage,
    Digr11ListPage,
    Digr11WritePage,
    Digr13WritePage,
    Digr12WriteModalPage,
    Digr13SelectModalPage,
    Mast01ListPage,
    Digr02ListPage,
    Digr02ListModalPage,
    Digr02WritePage
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
    CalendarModule,
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
    Digr01SelectPage,
    DigrGroupPage,
    DigrTabsPage,
    DigrTabWritePage,
    FacilPartSearchModalPage,
    SeriousDefectModalPage,
    Digr01WritePage,
    Digr11ListPage,
    Digr11WritePage,
    Digr13WritePage,
    Digr12WriteModalPage,
    Digr13SelectModalPage,
    Mast01ListPage,
    Digr02ListPage,
    Digr02WritePage,
    Digr02ListModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Insomnia,
    Camera,
    BarcodeScanner,
    Network,
    GlobalVars,
    UtilService,
    TempDataManage,
    WebDataProvider,
    DbInit,
    DbInitData,
    ScreenOrientation,
    MANTB_DIGR01VO,
    BASTB_MAST01VO,
    MANTB_DIGR11VO,
    DIGR01_GROUPVO,
    MANTB_DIGR12VO,
    CurrencyPipe,
    UUID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
