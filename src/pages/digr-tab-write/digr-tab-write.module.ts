import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigrTabWritePage } from './digr-tab-write';
import { PipesModule } from '../../pipes/pipes.module';
import { Digr01WritePageModule } from '../digr01-write/digr01-write.module';
import { Digr02ListPageModule } from '../digr02-list/digr02-list.module';
import { Digr11ListPageModule } from '../digr11-list/digr11-list.module';

@NgModule({
  declarations: [
    DigrTabWritePage,
    
  ],
  imports: [
    IonicPageModule.forChild(DigrTabWritePage),
    Digr01WritePageModule,
    Digr02ListPageModule,
    Digr11ListPageModule,
    PipesModule,
  ],
})
export class DigrTabWritePageModule {}
