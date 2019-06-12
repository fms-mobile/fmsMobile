import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Noti01001ListPage } from './noti01001-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Noti01001ListPage,
  ],
  imports: [
    IonicPageModule.forChild(Noti01001ListPage),
    PipesModule,
  ],
})
export class Noti01001ListPageModule {}
