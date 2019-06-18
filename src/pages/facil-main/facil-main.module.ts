import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilMainPage } from './facil-main';
import { Digr13_1ListPageModule } from '../digr13-1-list/digr13-1-list.module';
import { Digr11ListPageModule } from '../digr11-list/digr11-list.module';

@NgModule({
  declarations: [
    FacilMainPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilMainPage),
    Digr11ListPageModule,
    Digr13_1ListPageModule,
  ],
})
export class FacilMainPageModule {}
