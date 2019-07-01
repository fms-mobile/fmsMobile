import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { AuthGuardService } from '../../services/AuthGuardService';

/**
 * Generated class for the AppSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-setting',
  templateUrl: 'app-setting.html',
  providers:[
    AppVersion,
  ]
})
export class AppSettingPage {
  appVersionCode: string|number;
  appName : any;
  appVersionNumber : any;
  appPackageName : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion
    , private authGuardService : AuthGuardService
    ) {
      appVersion.getAppName().then(appName => this.appName = appName);
      appVersion.getPackageName().then(appPackageName => this.appPackageName = appPackageName);
      appVersion.getVersionCode().then(version => this.appVersionCode = version);
      appVersion.getVersionNumber().then(appVersionNumber => this.appVersionNumber = appVersionNumber);
  }

}
