import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeftMenu } from './left-menu';

@NgModule({
  declarations: [
    LeftMenu,
  ],
  imports: [
    IonicPageModule.forChild(LeftMenu),
  ],
})
export class LeftMenuModule {}
