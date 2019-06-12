import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Noti01002SelectPage } from './noti01002-select';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    Noti01002SelectPage,
  ],
  imports: [
    IonicPageModule.forChild(Noti01002SelectPage),
    PipesModule,
  ],
})
export class Noti01002SelectPageModule {}
