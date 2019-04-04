import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { LeftMenu } from '../left-menu/left-menu'
import { Header } from '../header/header'
import { Inappbrowser } from './../inappbrowser/inappbrowser';

@NgModule({
  declarations: [
    MainPage,
    Inappbrowser,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    LeftMenu,
    Header,
    Inappbrowser,
  ],
})
export class MainModule {}
