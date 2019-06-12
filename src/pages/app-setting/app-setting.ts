import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion
    , private authGuardService : AuthGuardService
    ) {
    // appVersion.getVersionCode().then(version => this.appVersionCode = version);
  }

}
