import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';
import { LeftMenu } from '../left-menu/left-menu'
import { Header } from '../header/header'

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    LeftMenu,
    Header,
  ],
})
export class MainModule {}
