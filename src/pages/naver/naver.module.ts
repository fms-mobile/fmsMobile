import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Naver } from './naver';

@NgModule({
  declarations: [
    Naver,
  ],
  imports: [
    IonicPageModule.forChild(Naver),
  ],
})
export class NaverModule {}
