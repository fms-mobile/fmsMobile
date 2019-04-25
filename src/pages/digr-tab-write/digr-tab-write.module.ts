import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigrTabWritePage } from './digr-tab-write';
import { Digr01WritePage } from './../digr01-write/digr01-write';
import { Digr02ListPage } from './../digr02-list/digr02-list';
import { Digr11ListPage } from './../digr11-list/digr11-list';

@NgModule({
  declarations: [
    DigrTabWritePage,
    Digr01WritePage,
    Digr02ListPage,
    Digr11ListPage,
  ],
  imports: [
    IonicPageModule.forChild(DigrTabWritePage),
  ],
})
export class DigrTabWritePageModule {}
