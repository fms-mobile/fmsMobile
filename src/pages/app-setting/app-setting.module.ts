import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppSettingPage } from './app-setting';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [
    AppSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(AppSettingPage),
  ],
})
export class AppSettingPageModule {}
