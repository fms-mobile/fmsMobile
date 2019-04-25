import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
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

export function jwtOptionsFactory(storage) {
    return {
      tokenGetter: () => {
        return storage.get('access_token');
      },
      whitelistedDomains: ['localhost:8080']
    }
  }

@NgModule({
    declarations: [MyApp],
    providers: [
        StatusBar, SplashScreen, BarcodeScanner, Camera, Network,
        DbInit, DbInitData,
        ToastService, LoadingService, AuthService, AuthGuardService, GlobalVars, UtilService, TempDataManage, TransmissionService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ],
    imports: [
        BrowserModule,
        HttpModule, HttpClientModule, JwtModule,
        AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
        AngularFireDatabaseModule, AngularFireAuthModule,
        IonicStorageModule.forRoot(),
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
