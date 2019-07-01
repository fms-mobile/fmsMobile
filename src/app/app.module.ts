import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppSettings } from '../services/app-settings'
import { ToastService } from '../services/toast-service'
import { LoadingService } from '../services/loading-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from '../services/AuthGuardService';
import { AuthService } from '../services/AuthService';
import { GlobalVars } from '../services/GlobalVars';
import { UtilService } from '../services/UtilService';
import { Network } from '@ionic-native/network';
import { TempDataManage } from '../services/TempDataManage';
import { DbInit } from '../db/DbInit';
import { DbInitData } from '../db/DbInitData';
import { TransmissionService } from '../services/transmisson-service';
import { DatePicker } from '@ionic-native/date-picker'
import { registerLocaleData } from '@angular/common';
import localeKo from '@angular/common/locales/ko';
import { PipesModule } from '../pipes/pipes.module';
import { DateFormatPipe } from '../pipes/date-format/date-format';
import { Firebase } from '@ionic-native/firebase';
import { NotificationService } from '../services/notification-service';

export function jwtOptionsFactory(storage) {
    return {
      tokenGetter: () => {
        return storage.get('access_token');
      },
      whitelistedDomains: ['localhost:8080']
    }
  }

registerLocaleData(localeKo,'ko');

@NgModule({
    declarations: [MyApp],
    providers: [
        StatusBar, SplashScreen, Camera, Network, File, FilePath, Transfer, WebView,
        DbInit, DbInitData, Firebase,
        DatePicker, DateFormatPipe,
        { provide : LOCALE_ID, useValue:'ko'},
        ToastService, LoadingService, AuthService, AuthGuardService, GlobalVars, UtilService, TempDataManage, TransmissionService,
        NotificationService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ],
    imports: [
        BrowserModule,
        HttpModule, HttpClientModule, JwtModule,
        AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
        AngularFireDatabaseModule, AngularFireAuthModule,
        PipesModule,
        PipesModule.forRoot(),
        IonicStorageModule.forRoot({
          name: 'fmsmb',
          driverOrder: ['indexeddb', 'sqlite', 'websql'],
        }),
        IonicModule.forRoot(MyApp),
        JwtModule.forRoot({
          jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtOptionsFactory,
              deps: [Storage],
          }
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
