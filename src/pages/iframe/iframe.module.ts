import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Iframe } from './iframe';

@NgModule({
  declarations: [
    Iframe,
  ],
  imports: [
    IonicPageModule.forChild(Iframe),
  ],
})
export class IframeModule {}
