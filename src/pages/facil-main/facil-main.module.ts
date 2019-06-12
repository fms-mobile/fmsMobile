import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilMainPage } from './facil-main';
import { Tree01ListPageModule } from '../tree01-list/tree01-list.module';
import { Digr13_1ListPageModule } from '../digr13-1-list/digr13-1-list.module';

@NgModule({
  declarations: [
    FacilMainPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilMainPage),
    Tree01ListPageModule,
    Digr13_1ListPageModule,
  ],
})
export class FacilMainPageModule {}
